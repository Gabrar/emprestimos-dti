import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import { useState } from "react"
import bg from './assets/login-background.jpg'
import { FaGithub, FaLinkedin } from "react-icons/fa"
import Message from './components/Message'
import Loading from "./components/Loading"


const FIXED_USERS = [
    {
        username: 'clinica',
        password: '123',
        token: 'token-clinica',
        nome: 'DTI - CLínica',
        tipoUsuario: 'ADMIN',
        id: 1,

        sheetUrl: 'https://sheetdb.io/api/v1/20zt5715g33sz?sheet=Clínica'
    },
    {
        username: 'predio',
        password: '321',
        token: 'token-predio',
        nome: 'DTI - Prédio',
        tipoUsuario: 'ADMIN',
        id: 2,

        sheetUrl: 'https://sheetdb.io/api/v1/20zt5715g33sz?sheet=Prédio'
    }
]

function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const [isMessageVisible, setIsMessageVisible] = useState(false);
    // STATES DA FLASH MESSAGE QUE ATUALIZARÃO APÓS CLICAR NO BOTÃO DE CONFIRMAR
    const closeMessage = () => {
        setIsMessageVisible(false)
    }

    const Submit = (e) => {
        e.preventDefault()
        setError('')

        const userMatch = FIXED_USERS.find(
            u => u.username === username && u.password === password
        )

        if (userMatch) {
            setIsLoading(true)
            setIsMessageVisible(true)

            const { token, ...userData } = userMatch

            login(userData);

            setTimeout(() => {
                setIsLoading(false)
                setIsMessageVisible(false)
                navigate('/app', { replace: true })
            }, 1500)

        } else {
            setError('Credenciais inválidas.')
        }
    }

    return (
        <div className="relative h-screen w-full overflow-hidden flex  items-center justify-around " >

            <div className="absolute inset-0 bg-cover bg-center blur scale-103 -z-10 "
                style={{ backgroundImage: `url(${bg})` }}
            >
                
            </div>

            {isLoading && <Loading />}

            <div className="max-w-lg grid grid-cols-1 font-bold">
                
                <h1 className="text-6xl text-black leading-tight">
                    Seja bem vindo!
                </h1>
                <p>
                    Esta é uma aplicação desenvolvida pelo funcionário da UniVS Gabriel do setor DTI, 
                    para a automatização dos empréstimos realizados para os docentes.
                </p>

                

                <div className="my-15 flex gap-10">
                    <a href="https://github.com/Gabrar" target="_BLANK">
                        <FaGithub className="size-12 cursor-pointer hover:text-gray-800" />
                    </a>
                    <a href="https://www.linkedin.com/in/gabriel-dias-siqueira/" target="_BLANK">
                        <FaLinkedin className="size-12 cursor-pointer hover:text-gray-800" />
                    </a>
                </div>
            </div>

            <form
                onSubmit={Submit}
                className=" bg-slate-50/10 flex flex-col h-80 w-80 rounded-lg text-center">

                <input
                    className="bg-white p-3 m-4 rounded-md outline-none my-10"
                    type="text"
                    placeholder="Usuário"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    className="bg-white p-3 m-4 rounded-md outline-none"
                    type="password"
                    placeholder="Senha"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="bg-white p-3 mt-4 rounded-md cursor-pointer text-slate-800 font-semibold transition duration-300 ease-in-out hover:bg-slate-300 w-1/2 mx-auto"
                    onClick={() => {
                        if (userMatch) {
                            setIsMessageVisible(true)
                        }
                    }}
                >
                    Entrar
                </button>
            </form>
            
        </div>
    )
}

export default Login