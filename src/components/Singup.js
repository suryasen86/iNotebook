import React ,{useState} from 'react'
import { useHistory } from 'react-router-dom'
import { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';
const Singup = () => {
    const [eye, seteye] = useState(true)
    let history=useHistory();
    const context = useContext(noteContext)
    const {showalert ,host}=context
    const [credentials, setcredentials] = useState({
        name:'',
       email:"",
       password:"",
       cpassword:""
    })
    const onChange =(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }

    const handlesubmit = async (e)=>{
        e.preventDefault()
        // console.log(credentials) 

        const response = await fetch(`${host}/api/auth/createuser/`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc. 
            headers: {
              'Content-Type': 'application/json',
              
   
            },  body: JSON.stringify({name:credentials.name, email:credentials.email,password:credentials.password})  
          });
          const json=  await response.json(); 
          console.log(json)
         if (json.success===true){
            localStorage.setItem('token',json.authtoken)
            history.push('/');
            showalert("account created ","success")
         }
        else {
            showalert("email already register","danger")
        }
    }
    const handleeye=()=>{
      
        if(eye===true){
            seteye(false)
       
            document.getElementById("password").type="text"
            document.getElementById("cpassword").type="text"
        }
        else{
        
            console.log("true")
            document.getElementById("password").type="password"
            document.getElementById("cpassword").type="password"
        }
    
    }
    return (
        <div>
                        <form onSubmit={handlesubmit}>
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" name="name" onChange={onChange}  aria-describedby="emailHelp"  required/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" name="email" onChange={onChange}  aria-describedby="emailHelp"  required/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" name="password"  onChange={onChange} id="password"  required/>
                        <div onClick={handleeye}  >
                {eye===false?      <i class="fas fa-eye-slash"></i>  :      <i class="fas fa-eye"></i>  }

                    </div>
                    </div>
                    <div class="mb-3">
                        <label for="cpassword" class="form-label">confirm  Password</label>
                        <input type="password" class="form-control" name="cpassword"  onChange={onChange} id="cpassword"  required/>
                        <div onClick={handleeye}  >
                {eye===false?      <i class="fas fa-eye-slash"></i>  :      <i class="fas fa-eye"></i>  }

                    </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
        </div>
    )
}

export default Singup
