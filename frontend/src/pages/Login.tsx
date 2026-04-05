import { useState } from "react"
import axios from "axios"
import styled from "styled-components"

const Page = styled.div`
  min-height: 100vh;
  background: #f0f4ff;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 40px 36px;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 4px 24px rgba(37, 99, 235, 0.08);
  border: 1px solid #e0e7ff;
`
const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
`
const Logo = styled.div`
  width: 52px;
  height: 52px;
  background: #2563eb;
  color: #fff;
  border-radius: 14px;
  font-size: 22px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;
`
const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #1e3a8a;
  margin: 0 0 4px;
`
const Subtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`
const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
`
const Input = styled.input`
  padding: 10px 14px;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #111827;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`
const ErrorMsg = styled.p`
  font-size: 13px;
  color: #dc2626;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  padding: 8px 12px;
  margin: 0;
`
const Button = styled.button`
  padding: 11px;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 4px;
  transition: background 0.15s;
  &:hover:not(:disabled) { background: #1d4ed8; }
  &:disabled { opacity: 0.65; cursor: not-allowed; }
`

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const API = import.meta.env.VITE_API_URL

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const response = await axios.post(`${API}/auth/login`, { email, password })
      localStorage.setItem("token", response.data.token)
      onLogin()
    } catch {
      setError("Email ou senha inválidos")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page>
      <Card>
        <Header>
          <Logo>V</Logo>
          <Title>VitaClin</Title>
          <Subtitle>Gestão de pacientes</Subtitle>
        </Header>
        <Form onSubmit={handleLogin}>
          <Field>
            <Label>Email</Label>
            <Input type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </Field>
          <Field>
            <Label>Senha</Label>
            <Input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </Field>
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <Button type="submit" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</Button>
        </Form>
      </Card>
    </Page>
  )
}
