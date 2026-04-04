const API_URL = "http://localhost:5000"

function getAuthHeaders() {
  const token = localStorage.getItem("token")

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

export async function listarPacientes() {
  const response = await fetch(`${API_URL}/pacientes/`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error("Erro ao buscar pacientes")
  }

  return response.json()
}

export async function criarPaciente(dados: {
  nome: string
  data_nascimento: string
  contato: string
  especialidade: string
  observacoes?: string
}) {
  const response = await fetch(`${API_URL}/pacientes/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(dados),
  })

  if (!response.ok) {
    throw new Error("Erro ao criar paciente")
  }

  return response.json()
}

export async function excluirPaciente(id: string) {
  const response = await fetch(`${API_URL}/pacientes/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error("Erro ao excluir paciente")
  }

  return response.json()
}

export async function atualizarPaciente(
  id: string,
  dados: {
    nome: string
    data_nascimento: string
    contato: string
    especialidade: string
    observacoes?: string
  }
) {
  const response = await fetch(`${API_URL}/pacientes/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(dados),
  })

  if (!response.ok) {
    throw new Error("Erro ao atualizar paciente")
  }

  return response.json()
}