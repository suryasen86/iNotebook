import noteContext from "./NoteContext";
import { useState } from "react";
 

const NoteState =(props)=>{
  const [alert, setalert] = useState(null)
  const showalert = (msg, type) => {
 
    setalert(
      {
        msg: msg,
        type: type
      }
    )

    setTimeout(() => {
      setalert(null);
    }, 1500);
  }
    // const s1={
    //     "name":"tonu",
    //     "class":"14 syit"
    // }
    // const [state, setstate] = useState(s1)

    // const update=()=>{
    //     setTimeout(() => {
    //         setstate({
    //             "name":"suryasem",
    //             "class":"upper class"
    //         })
    //     }, 3000);
    // }
    const host="http://localhost:5000"
// let a= localStorage.getItem('token')
// console.log(a)
    const initialnotes=[];
      const [notes, setnotes] = useState(initialnotes)


      const getNote= async()=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc. 
        headers: {
          'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token')

        },    
      });
      const json=await response.json()
      // console.log(json)
      setnotes(json)
}
      const addNote= async (title,description,tag)=>{
        
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc. 
          headers: {
            'Content-Type': 'application/json',
            "auth-token":localStorage.getItem('token')
 
          },  body: JSON.stringify({title,description,tag})  
        });
        const json=  response.json(); 
        console.log(json)
        getNote();

      }
      const deleteNote= async (id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc. 
          headers: {
            'Content-Type': 'application/json',
            "auth-token":localStorage.getItem('token')
 
          },   
        });
        const json=await response.json()
        console.log(json)
        const  newNote=notes.filter((note)=>{return note._id !==id})
        console.log("delitng not with id" +id)
        setnotes(newNote);
      }
      const editNote= async (id,title,description,tag)=>{
        
        
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc. 
          headers: {
            'Content-Type': 'application/json',
            "auth-token":localStorage.getItem('token')
 
          },  body: JSON.stringify({title,description,tag})  
        });
        const json=  response.json(); 
        console.log(json)
            getNote();
    
      
      }
 
    return (
        
            <noteContext.Provider value={{notes,setnotes , alert, showalert, addNote,editNote,deleteNote ,getNote}}>
                {props.children}
            </noteContext.Provider>
    )
}
export default NoteState;