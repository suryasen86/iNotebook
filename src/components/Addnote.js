import React,{useState,useContext} from 'react'
import noteContext from '../context/notes/NoteContext';

const Addnote = () => {
const context = useContext(noteContext)
const {addNote ,showalert}=context;
const [note, setnote] = useState({
    title:"",
    description:"",
    tag:""
})
    const hanldeClick =(e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag);
        setnote({
            title:"",
            description:"",
            tag:""
        })
        showalert("notes added", "success")
    }
    const onChange =(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div className="container my-5">
        <h2> Add notes</h2>
  
            <div className="mb-3">
                <label htmlFor="title" className="form-label">title</label>
                <input type="text" className="form-control" value={note.title} name="title" id="title"  onChange={onChange} minLength={5} aria-describedby="emailHelp" required />
         
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">description</label>
                <input type="text" className="form-control"  value={note.description} name="description" onChange={onChange} minLength={10} id="description" required />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">tag</label>
                <input type="text" className="form-control" value={note.tag}  name="tag" onChange={onChange} id="tag" />
            </div>
            <button type="submit" disabled={note.title.length<5 || note.description.length <10 } className="btn btn-primary" onClick={hanldeClick}>Submit</button>
        
    </div>
    )
}

export default Addnote
