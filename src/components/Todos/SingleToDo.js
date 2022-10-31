import React, {useState} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import ToDosEdit from './ToDosEdit'
import axios from 'axios'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'


export default function SingleToDo(props) {
  const {currentUser} = useAuth()

  const [showEdit, setShowEdit] = useState(false);

  const deleteToDo = (id) => {
    if (window.confirm(`Are you sure you want to delete ${props.toDos.name}`)) {
      axios.delete(`https://localhost:7273/api/ToDos/${id}`).then(() => {props.getToDos()})
    }
  }

  return (
    <div className='singleToDo col-md-5 m-4'>
      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
        <div>
        <button id='editLink' onClick={() => setShowEdit(true)}>
            <FaEdit />
        </button>
        <button className='m-1 rounded' id='deleteLink' onClick={() => deleteToDo(props.toDos.toDoId)}>
            <FaTrashAlt />
          </button>

        {showEdit &&
          <ToDosEdit
            toDos={props.toDos}
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            getToDos={props.getToDos} />
        }
      </div>
      }
        <h3>{props.toDos.name}</h3>
        {props.toDos.name !== null ?
            <p>{props.toDos.name}</p> :          
          <>    
            <p>No Description Provided</p>
            <p>{props.toDos.done !== null ?
            <p>Complete</p> :
            <p>Incomplete</p>}</p> 
            
          </>
        }
        
    </div>
  )
}
