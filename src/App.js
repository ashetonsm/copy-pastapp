import './App.css'
import { TextInputProvider } from './context/TextInputContext'
import { Home } from './pages/Home'

function App() {
  return (
    <TextInputProvider>
      <div className="App">
        <Home />
      </div>
    </TextInputProvider>
  )
}

export default App
