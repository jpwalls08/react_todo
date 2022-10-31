import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext'
import SingleCategory from './SingleCategory';
import CatCreate from './CatCreate';
import { Container } from 'react-bootstrap';


export default function Categories() {

  const [categories, setCategories] = useState([])

  const {currentUser} = useAuth()

  const [showCreate, setShowCreate] = useState(false)

  const getCategories = () => {
    axios.get(`https://localhost:7273/api/Categories`).then(response => {
      console.log(response)
      setCategories(response.data)
    })
  }

  useEffect(() => {
    getCategories()
  }, []);

  return (
    <section className='categories'>
        <article className='bg-info p-5'>
            <h1 className='text-center'>Categories Dashboard</h1>
        </article>
        {/* CREATE UI */}
        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
            <div className='bg-dark p-2 mb-3 text-center'>
                {showCreate ?
                    <>
                        <button onClick={() => setShowCreate(false)} className='btn btn-warning'>Cancel</button>
                        <CatCreate
                            getCategories={getCategories}
                            setShowCreate={setShowCreate} />
                    </>
                : <button className='btn btn-info' onClick={() => setShowCreate(true)}>Create Category</button>
                }
            </div>
        }
        {/* END CREATE UI */}
        <Container className='p-2'>
            <table className='table bg-info table-dark my-3'>
                <thead className='table-secondary text-uppercase'>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        {/* EDIT/DELETE column for icons to display */}
                        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
                            <th>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {/* READ UI */}
                    {categories.map(x => 
                        //For edit/delete we need getCategories as a prop so we can call it from the SingleCategory component
                        <SingleCategory key={x.categoryId} category={x} getCategories={getCategories} />
                    )}
                    {/* END READ UI */}
                </tbody>
            </table>
        </Container>
    </section>
  )
}
