import React from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

function Alert() {
    const context = useContext(noteContext)
    const {alert}=context
    return (
        <div style={{height:"100px"}}>
            
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          <strong>{alert.type==="danger"?"error":alert.type}</strong>  {alert.msg}
          
      </div>}
        </div>
  )

}

export default Alert
