import { useEffect, useState } from 'react'
import './App.css'
import Items from './components/Items'
import Materials from './components/Materials'
import { v4 } from 'uuid'

function App() {
  const [professores, setProfessores] = useState([])

  // REQUISIÇÃO DOS MATERIAS QUE ESTÃO NO BANCO DE DADOS MYSQL
  useEffect(() => {
    const buscarProfs = async () => {
      try {
        const url = `http://10.69.102.195:3000/professores`
        const resposta = await fetch(url)
        const json = await resposta.json()
        setProfessores(json);
      } catch (error) {
        console.error('Erro ao buscar professor', error)
      }
    }

    buscarProfs();
  }, []);

  const [notebooks, setNotebooks] = useState([])

  useEffect(() => {
    const buscarNotes = async () => {
      try {
        const url = `http://10.69.102.195:3000/notebooks`
        const resposta = await fetch(url)
        const json = await resposta.json()
        setNotebooks(json);
      } catch (error) {
        console.error('Erro ao buscar professor', error)
      }
    }

    buscarNotes();
  }, []);

  const [fontes, setFontes] = useState([])

  useEffect(() => {
    const buscarFontes = async () => {
      try {
        const url = `http://10.69.102.195:3000/fontes`
        const resposta = await fetch(url)
        const json = await resposta.json()
        setFontes(json);
      } catch (error) {
        console.error('Erro ao buscar professor', error)
      }
    }

    buscarFontes();
  }, []);

  const [cabos, setCabos] = useState([])

  useEffect(() => {
    const buscarCabos = async () => {
      try {
        const url = `http://10.69.102.195:3000/hdmis`
        const resposta = await fetch(url)
        const json = await resposta.json()
        setCabos(json);
      } catch (error) {
        console.error('Erro ao buscar cabos', error)
      }
    }

    buscarCabos();
  }, []);

  const [controles, setControles] = useState([])

  useEffect(() => {
    const buscarControles = async () => {
      try {
        const url = `http://10.69.102.195:3000/controles`
        const resposta = await fetch(url)
        const json = await resposta.json()
        setControles(json);
      } catch (error) {
        console.error('Erro ao buscar professor', error)
      }
    }

    buscarControles();
  }, []);
  // FIM DAS REQUISIÇÕES


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
  function onAddEmpSubmit(prof, cab, contr, note, font, cx) {
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
          onAddEmpSubmit={onAddEmpSubmit}
        />
      </div>

      <div className='flex-1 m-4 bg-slate-200 rounded-xl'>

        <div className='space-y-3'>
          <Materials
            emprestados={emprestados}
            onDeleteEmp={onDeleteEmp}
          />
        </div>

      </div>
    </div>
  )
}

export default App
