import { useState } from 'react'
import './App.css'
import RecaptchaButton from './components/RecaptchaButton'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="body">
   < RecaptchaButton/>
    </div>
  )
}

export default App
