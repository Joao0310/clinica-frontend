import { useState, useEffect } from "react"
import { createGlobalStyle } from "styled-components"
import Pacientes from "./pages/Pacientes"
import Login from "./pages/Login"

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: #f0f4ff;
    color: #111827;
    -webkit-font-smoothing: antialiased;
  }
`

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) setIsAuthenticated(true)
  }, [])

  const handleLogin = () => setIsAuthenticated(true)

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
  }

  return (
    <>
      <GlobalStyle />
      {isAuthenticated
        ? <Pacientes onLogout={handleLogout} />
        : <Login onLogin={handleLogin} />}
    </>
  )
}

export default App
