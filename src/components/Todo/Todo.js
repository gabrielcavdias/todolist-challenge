import React, { useState } from 'react'
import './Todo.css'
import Logo from '../Logo/Logo.js'
import darkSwitch from '../../assets/icon-moon.svg'
import lightSwitch from '../../assets/icon-sun.svg'
import closeIcon from '../../assets/icon-cross.svg'
import { doItExists } from '../usefulFunctions'

const Todo = props =>{
    //Todos os itens
    const [todoList, setTodoList] = useState(() => {
        const localList = localStorage.getItem('todoList')
        return localList ? JSON.parse(localList) : []
    })
    const [currentFilter, setCurrentFilter] = useState('all')
    /*
     useEffect recebe uma função de callback e um array de 
     componentes, sempre que um dos componentes for atualizado
     ele executa a função de callback
    */
    React.useEffect(()=>{
        window.localStorage.setItem('todoList', JSON.stringify(todoList))
    },[todoList])
    //Um array que armazena três arrays, Todo, todo.filter(checked:true) e todo.filter(checked:false)
    //A todo list renderizada apontará para um dos três sempre que o menu de filtro for clicado. 
    return(
    //Se for true o tema é claro, se for false o tema é claro
    <main className={`todo__app ${props.theme ? 'lightTheme' : 'darkTheme'}`}>
        <header>
            <Logo />
            <span>
                <img src={props.theme ? darkSwitch : lightSwitch} alt={`${props.theme ? "Ícone da lua" : "Ícone do sol"}`}
                onClick={()=>{
                        if(props.theme){
                            props.setTheme(false)
                            localStorage.setItem('theme', false)
                        }else{
                            props.setTheme(true)
                            localStorage.setItem('theme', true)
                        }
                   }
                } />
            </span>
        </header>
        <main>
             <form id="todo__input" name="todo__input" action="#">
                 <input type="text" name="listItem" aria-label="Create a new todo..." placeholder="Create a new todo..." />
                 <input type="submit" value="Acrescentar" className="hidden__btn" onClick={e=>{
                     e.preventDefault()
                     let newItem = new FormData(e.target.parentElement)
                     if(!doItExists(newItem.get('listItem'), todoList)){
                         setTodoList([...todoList, {content: newItem.get('listItem'), checked: false}])
                         e.currentTarget.previousElementSibling.value = ''
                    }
                 }} />
             </form>    
             <ul className="todoList">  
                 {
                 (todoList && currentFilter==='all' && todoList.map(listItem =>{
                            let listItemReference = listItem.content.replaceAll(' ','_')
                            return (
                            <li key={`${listItem.content}`}>
                               <input type="checkbox" name={`${listItemReference}`} id={`${listItemReference}`} defaultChecked={listItem.checked}  onClick={()=>{
                                   if(listItem.checked){
                                       listItem.checked = false
                                       setTodoList([...todoList])
                                   }else{
                                       listItem.checked = true
                                       setTodoList([...todoList])
                                   }
                               }} />
                               <label htmlFor={`${listItemReference}`}>
                                   <span className="checkbox__list"></span>
                                   {`${listItem.content}`}
                               </label>
                               <div>
                                   <img src={closeIcon} alt="icon for deleting" className="deleteIcon" onClick={
                                       ()=>{setTodoList(todoList.filter(item => item!==listItem))}
                                   } />
                               </div>
                            </li>
                            )/*Fim do return JSX*/
                        })/*Fim do all.map*/  ) ||
                        (todoList && currentFilter==='active' && todoList.filter(item => item.checked ===false).map(listItem =>{
                            let listItemReference = listItem.content.replaceAll(' ','_')
                            return (
                            <li key={`${listItem.content}`}>
                               <input type="checkbox" name={`${listItemReference}`} id={`${listItemReference}`} defaultChecked={listItem.checked}  onClick={()=>{
                                   if(listItem.checked){
                                       listItem.checked = false
                                   }else{
                                       listItem.checked = true
                                   }
                               }} />
                               <label htmlFor={`${listItemReference}`}>
                                   <span className="checkbox__list"></span>
                                   {`${listItem.content}`}
                               </label>
                               <div>
                                   <img src={closeIcon} alt="icon for deleting" className="deleteIcon" onClick={
                                       ()=>{setTodoList(todoList.filter(item => item!==listItem))}
                                   } />
                               </div>
                            </li>
                            )/*Fim do return JSX*/
                        })/*Fim do all.map*/ )
                        ||
                        (todoList && currentFilter==='completed' && todoList.filter(item => item.checked ===true).map(listItem =>{
                            let listItemReference = listItem.content.replaceAll(' ','_')
                            return (
                            <li key={`${listItem.content}`}>
                               <input type="checkbox" name={`${listItemReference}`} id={`${listItemReference}`} defaultChecked={listItem.checked}  onClick={()=>{
                                   if(listItem.checked){
                                       listItem.checked = false
                                   }else{
                                       listItem.checked = true
                                   }
                               }} />
                               <label htmlFor={`${listItemReference}`}>
                                   <span className="checkbox__list"></span>
                                   {`${listItem.content}`}
                               </label>
                               <div>
                                   <img src={closeIcon} alt="icon for deleting" className="deleteIcon" onClick={
                                       ()=>{setTodoList(todoList.filter(item => item!==listItem))}
                                   } />
                               </div>
                            </li>
                            )/*Fim do return JSX*/
                        })/*Fim do all.map*/ )
                    }
                 <li className="todoList__controls">
                     <div><p>{todoList.length - todoList.filter(item => item.checked).length} items left</p></div>
                     <div>
                         <button className={`${currentFilter==='all' ? 'current__filter': 'unactive__filter'}`} onClick={()=>{setCurrentFilter('all')}}>All</button>
                         <button className={`${currentFilter==='active' ? 'current__filter': 'unactive__filter'}`} onClick={()=>{setCurrentFilter('active')}}>Active</button>
                         <button className={`${currentFilter==='completed' ? 'current__filter': 'unactive__filter'}`} onClick={()=>{setCurrentFilter('completed')}}>Completed</button>
                     </div>
                     <div>
                         <button className="unactive__filter" onClick={()=>{
                             setTodoList(todoList.filter(item =>item.checked===false))                             
                         }}>Clear Completed</button>
                     </div>
                 </li>
             </ul>
                                                <div className="mobileFilters" style={window.screen.width <=600 ? {display: "flex"} : {display: "none"}}>
                <button className={`${currentFilter==='all' ? 'current__filter': 'unactive__filter'}`} onClick={()=>{setCurrentFilter('all')}}>All</button>
                <button className={`${currentFilter==='active' ? 'current__filter': 'unactive__filter'}`} onClick={()=>{setCurrentFilter('active')}}>Active</button>
                <button className={`${currentFilter==='completed' ? 'current__filter': 'unactive__filter'}`} onClick={()=>{setCurrentFilter('completed')}}>Completed</button>
            </div>
        </main>
        
    </main>

    )
}

export default Todo