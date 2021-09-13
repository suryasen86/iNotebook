import React ,{useContext ,useEffect ,useRef ,useState} from 'react'
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import Addnote from './Addnote'
import { useHistory } from 'react-router';

const Notes = () => {
    let history =useHistory()
    const [note, setnote] = useState({
        id:"",
        etitle:"",
        edescription:"",
        etag:""
    })
    const onChange =(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    const context = useContext(noteContext);
    const {notes,getNote ,showalert ,editNote}=context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNote();
        }
      else {
          history.push('/login')
      }
         // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refclose = useRef(null)
    const updateNote=(currentNote)=>{
        console.log(currentNote);
        ref.current.click()
        setnote({ id:currentNote._id ,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    }
    const handleClick=()=>{
        console.log(note)
        refclose.current.click();
        editNote(note.id,note.etitle,note.edescription,note.etag)
        showalert("notes updated","success")
    }
    return (
        <>
            <Addnote/>
        
<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

 
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
    
      <div className="mb-3">
                <label htmlFor="etitle" className="form-label">title</label>
                <input type="text" className="form-control" name="etitle" id="etitle" value={note.etitle}  minLength={5} required onChange={onChange} aria-describedby="emailHelp" />
         
            </div>
            <div className="mb-3">
                <label htmlFor="edescription" className="form-label">description</label>
                <input type="text" className="form-control"  name="edescription"  value={note.edescription} minLength={10} required onChange={onChange} id="edescription" />
            </div>
            <div className="mb-3">
                <label htmlFor="etag" className="form-label">tag</label>
                <input type="text" className="form-control"  name="etag" onChange={onChange} value={note.etag} id="etag" />
            </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" ref={refclose} data-bs-dismiss="modal">Close</button>
        <button type="button"  disabled={note.etitle.length<5 || note.edescription.length <10 } className="btn btn-primary" onClick={handleClick} >Update note</button>
      </div>
    </div>
  </div>
</div>
           <div className="row">
                <h1>Your notes</h1>
                <div className="container">
                    {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note)=>{
                    return  <NoteItem key={note._id}  updateNote={updateNote} note={note} />
                })}
            </div> 
        </>
    )
}

export default Notes
