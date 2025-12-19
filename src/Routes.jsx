import { Routes, Route} from 'react-router-dom'
import App from './App'
import Login from './Login'
import PrivateRoute from './PrivateRoute'

function AppRouter() {
    return (
        <Routes>

            <Route path='/' element={<Login />}></Route>

            <Route element={<PrivateRoute />}>
                <Route path='/app' element={<App />}></Route>
            </Route>

            <Route path='*' element={<h1>Página não encontrada.</h1>}></Route>
        </Routes>
    )

}

export default AppRouter