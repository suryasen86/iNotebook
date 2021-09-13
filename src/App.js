import './App.css';
 
import {BrowserRouter as Router,Switch,Route } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Singup from './components/Singup';
 

 

 
function App() {
 
  return (
    
    <>
    <NoteState>
   <Router>
<Navbar/>
<Alert />
<div className="container">


   <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
     
          <Route exact path="/login">
           <Login/>
          </Route>
          <Route exact path="/singup">
            <Singup/>
          </Route>
        </Switch>
        </div>
   </Router>
   </NoteState>
    </>
  );
}

export default App;
