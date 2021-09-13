import React ,{useState} from 'react'
import { useHistory } from 'react-router-dom'
import { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';
const Login = () => {
    const context = useContext(noteContext)
    const {showalert}=context
    const [eye, seteye] = useState(false)
    let history=useHistory();
    const [credentials, setcredentials] = useState({
       email:"",
       password:""
    })
    const onChange =(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }

    const handlesubmit =async (e)=>{
        e.preventDefault()
        console.log(credentials)


        const response = await fetch("http://localhost:5000/api/auth/login/", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc. 
            headers: {
              'Content-Type': 'application/json',
              
   
            },  body: JSON.stringify({email:credentials.email,password:credentials.password})  
          });
          const json=  await response.json(); 
          console.log(json)
         if (json.success===true){
            localStorage.setItem('token',json.authtoken)
            history.push('/');
            showalert("logged in success","success")
         }
        else {
             
            showalert("invalid credentials","danger")
        }
      
    
    }
    const handleeye=()=>{
      
        if(eye===true){
            seteye(false)
            console.log("false")
            document.getElementById("password").type="text"    
        }


        else{
            seteye(true)
            console.log("true")
            document.getElementById("password").type="password"
        }
    
    }
    return (
        <div>
           <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange}  name="email" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
            
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password}  onChange={onChange} name="password" id="password" required/>
                    <div onClick={handleeye}  >
                {eye===false?     <i class="fas fa-eye"></i>:       <i class="fas fa-eye-slash"></i>}

                    </div>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
