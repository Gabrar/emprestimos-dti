import { useEffect, useState } from 'react'
import logoUnivs from './assets/logo2.svg'
import './App.css'
import Items from './components/Items'

function App() {
  const [professores, setProfessores] = useState([])

  useEffect(() => {
    const buscarProfs = async () => {
      try {
        const url = `http://localhost:9999/professores`
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
        const url = `http://localhost:9999/notebooks`
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
        const url = `http://localhost:9999/fontes`
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
                const url = `http://localhost:9999/hdmis`
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
                const url = `http://localhost:9999/controles`
                const resposta = await fetch(url)
                const json = await resposta.json()
                setControles(json);
            } catch (error) {
                console.error('Erro ao buscar professor', error)
            }
        }

        buscarControles();
    }, []);

  return (
    <div className='w-screen h-screen flex justify-center bg-slate-300'>

      <div className='w-60 h-screen bg-slate-200 absolute left-0 p-4 flex flex-col gap-5 shadow-2xl'>
        <a href="https://univs.edu.br/" target='_BLANK'>
          <img src="https://univs.edu.br/wp-content/themes/portalv1.0/imagens/logo2.svg" />
        </a>
        <Items
          professores={professores}
          notebooks={notebooks}
          fontes={fontes}
          cabos={cabos}
          controles={controles}
        />
      </div>
    </div>
  )
}

export default App
