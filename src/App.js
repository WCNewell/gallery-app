import React from 'react'
import './app.css'
import Login from './components/login'
import Home from './components/home'
import Header from './components/header'

export const AuthContext = React.createContext()

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("user", JSON.stringify(action.payload.user))
            localStorage.setItem("token", JSON.stringify(action.payload.token))
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload.user,
            token: action.payload.token
        }
        case "LOGOUT":
            localStorage.clear();
            return {
            ...state,
            isAuthenticated: false,
            user: null
        }
        default:
            return state;
     }
}

function App() {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    return (
        <AuthContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            <Header />
                <div className="App">{!state.isAuthenticated ? <Login /> : <Home />}</div>
        </AuthContext.Provider>
    )
}
export default App