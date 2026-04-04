import { useEffect, useState } from "react"
import {
  atualizarPaciente,
  criarPaciente,
  excluirPaciente,
  listarPacientes,
} from "../services/api"
import type { Paciente } from "../types/paciente"

export default function Pacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [loading, setLoading] = useState(true)

  const [nome, setNome] = useState("")
  const [dataNascimento, setDataNascimento] = useState("")
  const [contato, setContato] = useState("")
  const [especialidade, setEspecialidade] = useState("")
  const [observacoes, setObservacoes] = useState("")

  const [erro, setErro] = useState("")
  const [sucesso, setSucesso] = useState("")

  const [idEditando, setIdEditando] = useState<string | null>(null)

  async function carregarPacientes() {
    try {
      const data = await listarPacientes()
      setPacientes(data)
    } catch (error) {
      console.error("Erro ao carregar pacientes:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarPacientes()
  }, [])

  function limparFormulario() {
    setNome("")
    setDataNascimento("")
    setContato("")
    setEspecialidade("")
    setObservacoes("")
    setIdEditando(null)
  }

  function iniciarEdicao(paciente: Paciente) {
    setIdEditando(paciente.id)
    setNome(paciente.nome)
    setDataNascimento(paciente.data_nascimento)
    setContato(paciente.contato)
    setEspecialidade(paciente.especialidade)
    setObservacoes(paciente.observacoes || "")
    setErro("")
    setSucesso("")
  }

  async function enviarFormulario(e: React.FormEvent) {
    e.preventDefault()
    setErro("")
    setSucesso("")

    const dados = {
      nome,
      data_nascimento: dataNascimento,
      contato,
      especialidade,
      observacoes,
    }

    try {
      if (idEditando) {
        await atualizarPaciente(idEditando, dados)
        setSucesso("Paciente atualizado com sucesso!")
      } else {
        await criarPaciente(dados)
        setSucesso("Paciente cadastrado com sucesso!")
      }

      limparFormulario()
      await carregarPacientes()
    } catch (error) {
      console.error(error)
      setErro(idEditando ? "Erro ao atualizar paciente" : "Erro ao cadastrar paciente")
    }
  }

  async function handleExcluir(id: string) {
    setErro("")
    setSucesso("")

    try {
      await excluirPaciente(id)
      setSucesso("Paciente excluído com sucesso!")
      await carregarPacientes()
    } catch (error) {
      console.error(error)
      setErro("Erro ao excluir paciente")
    }
  }

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Pacientes</h1>

      <form onSubmit={enviarFormulario} style={{ marginBottom: 24 }}>
        <div>
          <label>Nome</label>
          <br />
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div>
          <label>Data de nascimento</label>
          <br />
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />
        </div>

        <div>
          <label>Contato</label>
          <br />
          <input
            type="text"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
          />
        </div>

        <div>
          <label>Especialidade</label>
          <br />
          <input
            type="text"
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
          />
        </div>

        <div>
          <label>Observações</label>
          <br />
          <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          />
        </div>

        <button type="submit">
          {idEditando ? "Salvar alterações" : "Cadastrar paciente"}
        </button>

        {idEditando && (
          <button type="button" onClick={limparFormulario} style={{ marginLeft: 8 }}>
            Cancelar edição
          </button>
        )}
      </form>

      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {sucesso && <p style={{ color: "green" }}>{sucesso}</p>}

      {pacientes.length === 0 ? (
        <p>Nenhum paciente encontrado</p>
      ) : (
        <ul>
          {pacientes.map((p) => (
            <li key={p.id} style={{ marginBottom: 12 }}>
              <strong>{p.nome}</strong> - {p.especialidade}
              <button
                type="button"
                onClick={() => iniciarEdicao(p)}
                style={{ marginLeft: 12 }}
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => handleExcluir(p.id)}
                style={{ marginLeft: 8 }}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}