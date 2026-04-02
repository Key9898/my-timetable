import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { TimetableInput, TimetableItem, TimetableStatus } from '../models/Timetable'

const COLLECTION_NAME = 'timetables'

const createId = () => Math.random().toString(36).slice(2, 11)

const normalizeTimetableItem = (item: Partial<TimetableItem>, id?: string): TimetableItem => {
  const createdAt = item.createdAt || item.updatedAt || new Date().toISOString()

  return {
    id: id || item.id || createId(),
    userId: item.userId || '',
    subject: item.subject || 'Untitled Task',
    startTime: item.startTime || '00:00',
    endTime: item.endTime || '00:00',
    day: item.day || 'Monday',
    room: item.room || '',
    color: item.color || 'purple',
    isRecurring: item.isRecurring ?? true,
    status: item.status || 'active',
    createdAt,
    updatedAt: item.updatedAt || createdAt,
    completedAt: item.completedAt,
    archivedAt: item.archivedAt,
  }
}

const applyStatusTransition = (
  item: TimetableItem,
  nextStatus: TimetableStatus,
  changedAt: string,
): TimetableItem => {
  if (nextStatus === 'completed') {
    return {
      ...item,
      status: 'completed',
      updatedAt: changedAt,
      completedAt: changedAt,
      archivedAt: undefined,
    }
  }

  if (nextStatus === 'archived') {
    return {
      ...item,
      status: 'archived',
      updatedAt: changedAt,
      archivedAt: changedAt,
    }
  }

  return {
    ...item,
    status: 'active',
    updatedAt: changedAt,
    completedAt: undefined,
    archivedAt: undefined,
  }
}

export const timetableService = {
  getTimetable: async (userId: string): Promise<TimetableItem[]> => {
    const timetablesRef = collection(db, COLLECTION_NAME)
    const q = query(timetablesRef, where('userId', '==', userId), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)

    const items: TimetableItem[] = []
    snapshot.forEach((doc) => {
      const data = doc.data()
      items.push(normalizeTimetableItem(data, doc.id))
    })

    return items
  },

  addItem: async (item: TimetableInput, userId: string): Promise<TimetableItem> => {
    const now = new Date().toISOString()
    const newItem: Omit<TimetableItem, 'id'> = {
      ...item,
      userId,
      status: 'active',
      createdAt: now,
      updatedAt: now,
    }

    const docRef = await addDoc(collection(db, COLLECTION_NAME), newItem)

    return {
      id: docRef.id,
      ...newItem,
    }
  },

  updateItem: async (id: string, updates: Partial<TimetableItem>): Promise<TimetableItem> => {
    const docRef = doc(db, COLLECTION_NAME, id)
    const updatedAt = new Date().toISOString()

    const updatedData: Partial<TimetableItem> = {
      ...updates,
      updatedAt,
    }

    if (updates.status) {
      const currentItem = normalizeTimetableItem(updates, id)
      const transitionedItem = applyStatusTransition(currentItem, updates.status, updatedAt)
      Object.assign(updatedData, {
        status: transitionedItem.status,
        completedAt: transitionedItem.completedAt,
        archivedAt: transitionedItem.archivedAt,
      })
    }

    await updateDoc(docRef, updatedData)

    return normalizeTimetableItem(
      {
        ...updates,
        ...updatedData,
        id,
      },
      id,
    )
  },

  deleteItem: async (id: string): Promise<void> => {
    const docRef = doc(db, COLLECTION_NAME, id)
    await deleteDoc(docRef)
  },
}
