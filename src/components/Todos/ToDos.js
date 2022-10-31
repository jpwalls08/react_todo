import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Container } from 'react-bootstrap';
import FilterCat from './FilterCat';
import ToDosCreate from './ToDosCreate';
import SingleToDo from './SingleToDo';
import './ToDos.css'

export default function ToDos() {

  const [toDos, setToDos] = useState([]);

  const {currentUser} = useAuth()

  const [showCreate, setShowCreate] = useState(false);

  const [filter, setFilter] = useState(0);

  const getToDos = () => {
    axios.get(`https://localhost:7273/api/ToDos`).then(response => {
      console.log(response)
      setToDos(response.data)
    })
  }

  useEffect(() => {
    getToDos()
  }, []);

  return (
    <section className='toDos'>
        <article className='bg-info p-5'>
            <h1 className='text-center'>To-Do's Dashboard</h1>
        </article>
        {/* CREATE UI */}
        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
            <div className='bg-dark p-2 mb-3 text-center'>
                <button className='btn btn-info' onClick={() => setShowCreate(!showCreate)}>
                    {!showCreate ? 'Create New To-Do' : 'Close Form'}
                </button>
                <div className='createContainer'>
                    {showCreate && 
                        //Conditionally render ResourceCreate if showCreate is true
                        <ToDosCreate
                            setShowCreate={setShowCreate}
                            getToDos={getToDos} />
                    }
                </div>
            </div>
        }
        {/* END OF CREATE UI */}

        <FilterCat setFilter={setFilter} />
        <Container>
            <article className='toDosGallery row justify-content-center'>
                
                {filter === 0 ? toDos.map(x =>
                    
                    <SingleToDo key={x.toDoId} toDos={x} getToDos={getToDos} />
                ) :
                toDos.filter(x => x.categoryId === filter).map(x => 
                    <SingleToDo key={x.toDoId} toDos={x} getToDos={getToDos} />
                )}
                {filter !== 0 && toDos.filter(x => x.categoryId === filter).length === 0 &&
                    <h2 className='alert alert-warning text-dark'>
                        There are no results for this category.
                    </h2>
                }
            </article>
        </Container>
    </section>
  )
}
