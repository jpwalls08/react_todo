import React, {useState} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import CatEdit from './CatEdit'
import { FaTrashAlt, FaEdit}  from 'react-icons/fa'

export default function SingleCategory(props) {

    const {currentUser} = useAuth()

    const [showEdit, setShowEdit] = useState(false);

    const deleteCat = (id) => {
      if(window.confirm(`Are you sure you want to delete ${props.category.catName}?`)) {
        axios.delete(`https://localhost:7273/api/Categories/${id}`).then(() => {props.getCategories()})
      }
    }

  return (
    <tr>
        <td>{props.category.catName}</td>
        <td>{props.category.catDesc}</td>

        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
          <td>
            <button className='m-1 rounded' id='editLink' onClick={() => setShowEdit(true)}>
              <FaEdit />
            </button>
            <button className='m-1 rounded' id='deleteLink' onClick={() => deleteCat(props.category.categoryId)}>
              <FaTrashAlt />
            </button>
            {showEdit &&
              <CatEdit
                showEdit={showEdit} //Tied to the opening/closing of the modal (if true, modal opens)
                setShowEdit={setShowEdit} //Tied to closing the modal in CatEdit
                getCategories={props.getCategories} //Needed for running a get request after editing
                category={props.category} //needed for populating the edit form
                />
            }
          </td>
        }        
    </tr>
  )
}
