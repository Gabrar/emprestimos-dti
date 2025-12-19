import { useEffect, useState } from 'react'
import Items from './components/Items'
import Materials from './components/Materials'
import { useAuth } from './AuthContext'
import { v4 } from 'uuid'

function App() {
  const [professores, setProfessores] = useState([])
  const [cabos, setCabos] = useState([])
  const [controles, setControles] = useState([])
  const [notebooks, setNotebooks] = useState([])
  const [fontes, setFontes] = useState([])
  const [caixas, setCaixas] = useState([])

  const { user, logout } = useAuth()

  if (!user || !user.sheetUrl) {
    return <div>EROO: Dados de administrador incompletos.</div>
  }

  // URL DO BANCO DE DADOS
  const API_URL = "http://10.69.69.248:3000"

  useEffect(() => {
    const Load = async () => {
      try {
        // REQUISIÇÕES
        const [resProfessores, resCabos, resControles, resNotes, resFontes, resCaixas] = await Promise.all([
          fetch(`${API_URL}/professores`),
          fetch(`${API_URL}/hdmis`),
          fetch(`${API_URL}/controles`),
          fetch(`${API_URL}/notebooks`),
          fetch(`${API_URL}/fontes`),
          fetch(`${API_URL}/caixas`)
        ]);

        // CONVERTE TUDO PARA JSON
        const professoresData = await resProfessores.json()
        const cabosData = await resCabos.json()
        const controlesData = await resControles.json()
        const notebooksData = await resNotes.json()
        const fontesData = await resFontes.json()
        const caixasData = await resCaixas.json()

        // ATUALIZA OS STATES
        setProfessores(professoresData)
        setCabos(cabosData)
        setControles(controlesData)
        setNotebooks(notebooksData)
        setFontes(fontesData)
        setCaixas(caixasData)

      } catch (error) {
        console.error("Erro ao carregar dados:", error)
      }
    };

    Load();
  }, [])

  // ARRAY QUE SALVA OS ITENS EMPRESTADOS + SALVAMENTO DE DADOS LOCAIS
  const [emprestados, setEmprestados] = useState(() => {
    const saves = localStorage.getItem("sistema-emprestimos")
    if (saves) {
      return JSON.parse(saves)
    }
    return [] // SE NÃO TIVER NADA SALVO, INICIA VAZIO
  })

  // SALVA A LISTA CONVERTENDO PARA JSON
  useEffect(() => {
    localStorage.setItem("sistema-emprestimos", JSON.stringify(emprestados))
  }, [emprestados])

  let hour
  let date

  // FUNÇÃO PARA REALIZAR O EMPRÉSTIMO
  function onAddEmpSubmit(prof, cab, contr, note, font, cx) {

    hour = new Date().toLocaleTimeString()
    date = new Date().toLocaleDateString()

    const NewEmp = {
      id: v4(),
      prof,
      cab,
      contr,
      note,
      font,
      hora: hour,
      data: date,
      cx
    }
    
    setEmprestados([...emprestados, NewEmp])
    console.log(NewEmp)
  }

  // FUNÇÃO QUE ENVIA OS DADOS EMPRESTADOS PARA UMA PLANILHA ONLINE EXCEL
  const CURRENT_SHEET_URL = user.sheetUrl

  function onDevolverSubmit(item, observacaoTexto) {
    const dataSheets = {
      Professor: item.prof.nome,
      Cabo: item.cab.hdmi,
      Controle: item.contr.controle,
      Notebook: item.note.notebook,
      Fonte: item.font.fonte,
      Som: item.cx.caixa,
      Hora_do_empréstimo: item.hora,
      Data_do_empréstimo: item.data,
      Hora_da_devolução: new Date().toLocaleTimeString(),
      Data_da_devolução: new Date().toLocaleDateString(),
      Observações: observacaoTexto,
    }

    fetch(CURRENT_SHEET_URL, {
      method: 'POST',
      headers: {
        'Accept': 'aplication/json',
        'Content-Type': 'aplication/json'
      },
      body: JSON.stringify({ data: dataSheets })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("SUCESSOK! SALVO NA PLANILHA:", data);
      })
      .catch((error) => {
        console.error('ERRO AO SALVAR:', error);
        alert("ERRO AO SALVAR NA NUVEM")
      })
  }

  // FUNÇÃO PARA DELETAR OS ITENS EMPRESTADOS / CONFIRMAR A DEVOLUÇÃO
  function onDeleteEmp(empId) {
    const newEmp = emprestados.filter((emp) => emp.id !== empId)
    setEmprestados(newEmp)
  }

  return (
    <div className='h-screen flex bg-slate-300'>

      <div className='w-60 h-screen bg-slate-200 p-4 flex flex-col gap-5 shadow-2xl'>
        <a href="https://univs.edu.br/" target='_BLANK'>
          <img src="https://univs.edu.br/wp-content/themes/portalv1.0/imagens/logo2.svg" />
        </a>
        <Items
          professores={professores}
          cabos={cabos}
          notebooks={notebooks}
          fontes={fontes}
          controles={controles}
          caixas={caixas}
          onAddEmpSubmit={onAddEmpSubmit}
        />

        <button 
        className='fixed bottom-4 left-3 bg-white p-2 rounded-md cursor-pointer hover:bg-slate-300 duration-100 ease-in self-center outline-1 outline-slate-400'
        onClick={() => logout()}
        >LogOut</button>
      </div>

      <div className='flex-1 m-4 bg-slate-200 rounded-xl'>

        <div className='space-y-3'>
          <Materials
            emprestados={emprestados}
            onDeleteEmp={onDeleteEmp}
            onAddEmpSubmit={onAddEmpSubmit}
            onDevolverSubmit={onDevolverSubmit}
          />        
        </div>

      </div>

    </div>
  )
}

export default App
