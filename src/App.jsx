import { useEffect, useState } from 'react'
import Items from './components/Items'
import Materials from './components/Materials'
import { v4 } from 'uuid'

function App() {
  const [professores, setProfessores] = useState([])
  const [cabos, setCabos] = useState([])
  const [controles, setControles] = useState([])
  const [notebooks, setNotebooks] = useState([])
  const [fontes, setFontes] = useState([])
  const [caixas, setCaixas] = useState([])

  // URL DO BANCO DE DADOS
  const API_URL = "http://10.69.64.230:3000"

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


  // FUNÇÃO PARA REALIZAR O EMPRÉSTIMO
  function onAddEmpSubmit(prof, cab, contr, note, font, cx, obs) {
    const NewEmp = {
      id: v4(),
      prof,
      cab,
      contr,
      note,
      font,
      cx
    }
    setEmprestados([...emprestados, NewEmp])
    console.log(NewEmp)
  }

  // FUNÇÃO QUE ENVIA OS DADOS EMPRESTADOS PARA UMA PLANILHA ONLINE EXCEL
  function onDevolverSubmit(item, observacaoTexto) {
    const dataSheets = {
      professor: item.prof.nome,
      cabo: item.cab.hdmi,
      controle: item.contr.controle,
      notebook: item.note.notebook,
      fonte: item.font.fonte,
      som: item.cx.caixa,
      data: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),
      observação: observacaoTexto,
    }

    fetch('https://sheetdb.io/api/v1/2akz4c3q3y2z9', {
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
