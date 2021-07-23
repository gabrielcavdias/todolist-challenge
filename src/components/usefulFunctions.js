import React from "react"
function doItExists(text, todoList){
    let exists = false
    if(text === ''|| text.startsWith(' ')){
        exists = true
    }else{
        for(let i=0; i<todoList.length; i++){
            if(todoList[i].content===text){
                exists = true
                break
            }
        }
    }
    return exists
}
function handleListing(currentFilter, todoList,checkedItems, setCheckedItems){
    if(currentFilter==='completed'){
        todoList.filter(item=>item.checked===true).map(listItem =>{
            let listItemReference = listItem.content.replaceAll(' ','_')
            return (
            <li key={`${listItem.content}`}>
               <input type="checkbox" name={`${listItemReference}`} id={`${listItemReference}`} defaultChecked={listItem.checked}  onClick={()=>{
                   if(listItem.checked){
                       listItem.checked = false
                       setCheckedItems(checkedItems-1)
                   }else{
                       listItem.checked = true
                       setCheckedItems(checkedItems+1  )
                   }
               }} />
               <label htmlFor={`${listItemReference}`}>
                   <span className="checkbox__list"></span>
                   {`${listItem.content}`}
               </label>
            </li>
            )/*Fim do return JSX*/
        })/*Fim da lista renderizada.map*/
    }else if(currentFilter==='active'){
        todoList.filter(item=>item.checked===false).map(listItem =>{
            let listItemReference = listItem.content.replaceAll(' ','_')
            return (
            <li key={`${listItem.content}`}>
               <input type="checkbox" name={`${listItemReference}`} id={`${listItemReference}`} defaultChecked={listItem.checked}  onClick={()=>{
                   if(listItem.checked){
                       listItem.checked = false
                       setCheckedItems(checkedItems-1)
                   }else{
                       listItem.checked = true
                       setCheckedItems(checkedItems+1  )
                   }
               }} />
               <label htmlFor={`${listItemReference}`}>
                   <span className="checkbox__list"></span>
                   {`${listItem.content}`}
               </label>
            </li>
            )/*Fim do return JSX*/
        })/*Fim da lista renderizada.map*/
    }else{
        todoList.map( listItem =>{
            let listItemReference = listItem.content.replaceAll(' ','_')
            return (
            <li key={`${listItem.content}`}>
               <input type="checkbox" name={`${listItemReference}`} id={`${listItemReference}`} defaultChecked={listItem.checked}  onClick={()=>{
                   if(listItem.checked){
                       listItem.checked = false
                       setCheckedItems(checkedItems-1)
                   }else{
                       listItem.checked = true
                       setCheckedItems(checkedItems+1  )
                   }
               }} />
               <label htmlFor={`${listItemReference}`}>
                   <span className="checkbox__list"></span>
                   {`${listItem.content}`}
               </label>
            </li>
            )/*Fim do return JSX*/
        })/*Fim da lista renderizada.map*/
    }
}

export {doItExists, handleListing}