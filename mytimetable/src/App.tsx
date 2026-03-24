import Home from './pages/Home';
import { TimetableProvider } from './contexts/TimetableContext';

function App() {
  return (
    <TimetableProvider>
      <Home />
    </TimetableProvider>
  )
}

export default App
