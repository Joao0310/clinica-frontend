import { useEffect, useState } from "react"
import styled from "styled-components"
import { atualizarPaciente, criarPaciente, excluirPaciente, listarPacientes } from "../services/api"
import type { Paciente } from "../types/paciente"
import FormularioPaciente from "../components/FormularioPaciente"
import type { FormData } from "../components/FormularioPaciente"

type Vista = "lista" | "novo" | "editar"
type Msg   = { tipo: "ok" | "erro"; texto: string }

const Page      = styled.div`min-height: 100vh; background: #f0f4ff;`
const Navbar    = styled.header`
  background: #2563eb; height: 56px; padding: 0 32px;
  display: flex; align-items: center; gap: 12px;
`
const NavLogo   = styled.div`
  width: 32px; height: 32px; background: rgba(255,255,255,0.2);
  border-radius: 8px; color: #fff; font-weight: 700; font-size: 16px;
  display: flex; align-items: center; justify-content: center;
`
const NavTitle  = styled.span`color: #fff; font-weight: 700; font-size: 16px; flex: 1;`
const LogoutBtn = styled.button`
  background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3);
  color: #fff; border-radius: 6px; padding: 6px 14px; font-size: 13px; cursor: pointer;
  &:hover { background: rgba(255,255,255,0.25); }
`
const Main      = styled.main`max-width: 900px; margin: 32px auto; padding: 0 24px;`
const TopRow    = styled.div`display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;`
const Title     = styled.h2`font-size: 22px; font-weight: 700; color: #1e3a8a; margin: 0;`
const BtnPrimary = styled.button`
  background: #2563eb; color: #fff; border: none; border-radius: 8px;
  padding: 9px 18px; font-size: 14px; font-weight: 600; cursor: pointer;
  &:hover { background: #1d4ed8; }
`
const Msg       = styled.p<{ $tipo: "ok" | "erro" }>`
  border-radius: 8px; padding: 10px 14px; font-size: 13px; margin-bottom: 16px;
  ${p => p.$tipo === "ok"
    ? "background:#f0fdf4; color:#16a34a; border:1px solid #bbf7d0;"
    : "background:#fef2f2; color:#dc2626; border:1px solid #fecaca;"}
`
const Table     = styled.table`
  width: 100%; border-collapse: collapse; background: #fff;
  border-radius: 12px; overflow: hidden; border: 1px solid #e0e7ff;
  box-shadow: 0 2px 12px rgba(37,99,235,0.06);
`
const Th        = styled.th`
  background: #eff6ff; color: #1e3a8a; font-size: 12px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.05em;
  padding: 12px 16px; text-align: left; border-bottom: 1px solid #e0e7ff;
`
const Td        = styled.td`padding: 13px 16px; font-size: 14px; color: #374151; border-bottom: 1px solid #f1f5f9;`
const Actions   = styled.div`display: flex; gap: 8px;`
const Badge     = styled.span<{ $esp: string }>`
  display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600;
  ${p => p.$esp === "Fisioterapia" ? "background:#eff6ff; color:#1d4ed8;"
       : p.$esp === "Nutrição"     ? "background:#f0fdf4; color:#15803d;"
       :                             "background:#faf5ff; color:#7e22ce;"}
`
const BtnEdit   = styled.button`
  background: #eff6ff; color: #2563eb; border: 1.5px solid #bfdbfe;
  border-radius: 6px; padding: 5px 12px; font-size: 13px; cursor: pointer;
  &:hover { background: #dbeafe; }
`
const BtnDanger = styled.button`
  background: #fff; color: #dc2626; border: 1.5px solid #fecaca;
  border-radius: 6px; padding: 5px 12px; font-size: 13px; cursor: pointer;
  &:hover { background: #fef2f2; }
`
const Footer = styled.footer`
  margin-top: 40px;
  padding: 16px;
  text-align: center;
  font-size: 13px;
  color: #6b7280;
`

const Empty     = styled.p`text-align: center; color: #6b7280; margin-top: 48px; font-size: 15px;`
const Loading   = styled.div`display:flex; align-items:center; justify-content:center; height:100vh; color:#2563eb;`
const ORDEM_ESPECIALIDADES = ["Fisioterapia", "Nutrição", "Psicologia"]

export default function Pacientes({ onLogout }: { onLogout: () => void }) {
  const [pacientes, setPacientes]               = useState<Paciente[]>([])
  const [carregando, setCarregando]             = useState(true)
  const [vista, setVista]                       = useState<Vista>("lista")
  const [pacienteEditando, setPacienteEditando] = useState<Paciente | null>(null)
  const [msg, setMsg]                           = useState<Msg | null>(null)

  useEffect(() => { carregar() }, [])

  async function carregar() {
    try { setPacientes(await listarPacientes()) }
    catch { setMsg({ tipo: "erro", texto: "Erro ao carregar pacientes" }) }
    finally { setCarregando(false) }
  }

  function irParaLista()       { setVista("lista"); setPacienteEditando(null); setMsg(null) }
  function irParaNovo()        { setVista("novo");  setMsg(null) }
  function irParaEditar(p: Paciente) { setPacienteEditando(p); setVista("editar"); setMsg(null) }

  async function salvarNovo(dados: FormData) {
    await criarPaciente(dados)
    await carregar()
    setMsg({ tipo: "ok", texto: "Paciente cadastrado!" })
    irParaLista()
  }

  async function salvarEdicao(dados: FormData) {
    await atualizarPaciente(pacienteEditando!.id, dados)
    await carregar()
    setMsg({ tipo: "ok", texto: "Paciente atualizado!" })
    irParaLista()
  }

  async function excluir(id: string) {
    if (!confirm("Deseja excluir este paciente?")) return
    try { await excluirPaciente(id); setMsg({ tipo: "ok", texto: "Paciente excluído!" }); await carregar() }
    catch { setMsg({ tipo: "erro", texto: "Erro ao excluir paciente" }) }
  }

  if (carregando) return <Loading>Carregando...</Loading>

  return (
    <Page>
      <Navbar>
        <NavLogo>V</NavLogo>
        <NavTitle>VitaClin</NavTitle>
        <LogoutBtn onClick={onLogout}>Sair</LogoutBtn>
      </Navbar>

      <Main>
        {vista === "lista" && (
          <>
            <TopRow>
              <Title>Pacientes</Title>
              <BtnPrimary onClick={irParaNovo}>+ Novo paciente</BtnPrimary>
            </TopRow>

            {msg && <Msg $tipo={msg.tipo}>{msg.texto}</Msg>}

            {pacientes.length === 0 ? (
  <Empty>Nenhum paciente cadastrado.</Empty>
) : (
  ORDEM_ESPECIALIDADES.map((area) => {
    const pacientesDaArea = pacientes
      .filter(p => p.especialidade === area)
      .slice()
      .sort((a, b) => a.nome.localeCompare(b.nome))

    if (pacientesDaArea.length === 0) return null

            return (
              <div key={area} style={{ marginBottom: "24px" }}>
                <Title style={{ fontSize: "18px", marginBottom: "12px" }}>{area}</Title>

                <Table>
                  <thead>
                    <tr><Th>Nome</Th><Th>Área</Th><Th>Contato</Th><Th>Ações</Th></tr>
                  </thead>
                  <tbody>
                    {pacientesDaArea.map(p => (
                      <tr key={p.id}>
                        <Td><strong>{p.nome}</strong></Td>
                        <Td><Badge $esp={p.especialidade}>{p.especialidade}</Badge></Td>
                        <Td>{p.contato}</Td>
                        <Td>
                          <Actions>
                            <BtnEdit onClick={() => irParaEditar(p)}>Editar</BtnEdit>
                            <BtnDanger onClick={() => excluir(p.id)}>Excluir</BtnDanger>
                          </Actions>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )
          })
        )}
          </>
        )}

        {vista === "novo" && (
          <FormularioPaciente onSalvar={salvarNovo} onCancelar={irParaLista} />
        )}

        {vista === "editar" && pacienteEditando && (
          <FormularioPaciente inicial={pacienteEditando} onSalvar={salvarEdicao} onCancelar={irParaLista} />
        )}
      </Main>
      <Footer>
        © 2026 VitaClin — Sistema de gestão de pacientes
      </Footer>
    </Page>
  )
}
