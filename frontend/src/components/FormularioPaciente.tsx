import { useState } from "react"
import styled from "styled-components"
import type { Paciente } from "../types/paciente"

export type FormData = {
  nome: string
  data_nascimento: string
  contato: string
  especialidade: string
  observacoes: string
}

const ESPECIALIDADES = ["Fisioterapia", "Nutrição", "Psicologia"]
const FORM_VAZIO: FormData = { nome: "", data_nascimento: "", contato: "", especialidade: "", observacoes: "" }

function mascaraContato(valor: string) {
  const numeros = valor.replace(/\D/g, "").slice(0, 11)

  if (numeros.length <= 2) return numeros
  if (numeros.length <= 6) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`
  if (numeros.length <= 10) return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`
  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`
}

const FormCard    = styled.div`
  background: #fff; border-radius: 12px; border: 1px solid #e0e7ff;
  padding: 24px; box-shadow: 0 2px 12px rgba(37,99,235,0.06);
`
const FormTitle   = styled.h3`font-size: 16px; font-weight: 700; color: #1e3a8a; margin: 0 0 18px;`
const StyledForm  = styled.form`display: flex; flex-direction: column; gap: 14px;`
const FormRow     = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 14px;`
const Field       = styled.div`display: flex; flex-direction: column; gap: 5px;`
const Label       = styled.label`font-size: 12px; font-weight: 600; color: #374151; text-transform: uppercase; letter-spacing: 0.04em;`
const Input       = styled.input`
  padding: 9px 12px; border: 1.5px solid #d1d5db; border-radius: 7px;
  font-size: 14px; color: #111827; outline: none; width: 100%; box-sizing: border-box;
  &:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
`
const Select      = styled.select`
  padding: 9px 12px; border: 1.5px solid #d1d5db; border-radius: 7px;
  font-size: 14px; color: #111827; outline: none; width: 100%; box-sizing: border-box; background: #fff;
  &:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
`
const Textarea    = styled.textarea`
  padding: 9px 12px; border: 1.5px solid #d1d5db; border-radius: 7px;
  font-size: 14px; color: #111827; outline: none; width: 100%; box-sizing: border-box; resize: vertical;
  &:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
`
const FormActions = styled.div`display: flex; gap: 10px; justify-content: flex-end; margin-top: 4px;`
const BtnPrimary  = styled.button`
  background: #2563eb; color: #fff; border: none; border-radius: 8px;
  padding: 9px 18px; font-size: 14px; font-weight: 600; cursor: pointer;
  &:hover { background: #1d4ed8; }
  &:disabled { opacity: 0.65; cursor: not-allowed; }
`
const BtnSecondary = styled.button`
  background: #fff; color: #374151; border: 1.5px solid #d1d5db;
  border-radius: 7px; padding: 8px 16px; font-size: 13px; cursor: pointer;
  &:hover { border-color: #9ca3af; }
`
const ErrorMsg = styled.p`
  font-size: 13px; color: #dc2626; background: #fef2f2;
  border: 1px solid #fecaca; border-radius: 6px; padding: 8px 12px; margin: 0;
`

export default function FormularioPaciente({
  inicial,
  onSalvar,
  onCancelar,
}: {
  inicial?: Paciente
  onSalvar: (dados: FormData) => Promise<void>
  onCancelar: () => void
}) {
  const [form, setForm]         = useState<FormData>(
    inicial
      ? { nome: inicial.nome, data_nascimento: inicial.data_nascimento, contato: inicial.contato, especialidade: inicial.especialidade, observacoes: inicial.observacoes || "" }
      : FORM_VAZIO
  )
  const [erro, setErro]         = useState("")
  const [salvando, setSalvando] = useState(false)

  const set = (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
        setForm(f => ({
        ...f,
        [key]: key === "contato" ? mascaraContato(e.target.value) : e.target.value,
        }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSalvando(true)
    try { await onSalvar(form) }
    catch { setErro("Erro ao salvar paciente") }
    finally { setSalvando(false) }
  }

  return (
    <FormCard>
      <FormTitle>{inicial ? "Editar paciente" : "Novo paciente"}</FormTitle>
      {erro && <ErrorMsg>{erro}</ErrorMsg>}
      <StyledForm onSubmit={handleSubmit}>
        <FormRow>
          <Field><Label>Nome</Label><Input value={form.nome} onChange={set("nome")} required /></Field>
          <Field><Label>Data de nascimento</Label><Input type="date" value={form.data_nascimento} onChange={set("data_nascimento")} required /></Field>
        </FormRow>
        <FormRow>
          <Field><Label>Contato</Label><Input value={form.contato} onChange={set("contato")} required /></Field>
          <Field>
            <Label>Especialidade</Label>
            <Select value={form.especialidade} onChange={set("especialidade")} required>
              <option value="">Selecione...</option>
              {ESPECIALIDADES.map(e => <option key={e}>{e}</option>)}
            </Select>
          </Field>
        </FormRow>
        <Field><Label>Observações</Label><Textarea rows={3} value={form.observacoes} onChange={set("observacoes")} /></Field>
        <FormActions>
          <BtnSecondary type="button" onClick={onCancelar}>Cancelar</BtnSecondary>
          <BtnPrimary type="submit" disabled={salvando}>
            {salvando ? "Salvando..." : inicial ? "Salvar alterações" : "Cadastrar"}
          </BtnPrimary>
        </FormActions>
      </StyledForm>
    </FormCard>
  )
}
