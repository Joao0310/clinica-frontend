const API_URL = "http://localhost:5000"

export async function listarPacientes() {
  const response = await fetch(`${API_URL}/pacientes/`)

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
    headers: {
      "Content-Type": "application/json",
    },
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
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })

  if (!response.ok) {
    throw new Error("Erro ao atualizar paciente")
  }

  return response.json()
}
