import React from 'react'
import './App.css'
import Todo from './components/Todo/Todo.js'

if(!localStorage.getItem('theme')){
    localStorage.setItem('theme', true)
}

const App = () =>{
    //Local Storage só armazena String, portanto é preciso fazer um parse para boolean
    const [theme, setTheme] = React.useState(JSON.parse(localStorage.getItem('theme')))
    return (
            <div className={`app__wrapper ${theme ? 'lightTheme' : 'darkTheme'}`}>
                <Todo theme={theme} setTheme={setTheme}  />
            </div>
    )
}

export default App
