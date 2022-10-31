import React, {useState, useEffect} from 'react'
import { Formik, Field, Form } from 'formik'
import { toDosSchema } from '../../utilities/validationSchema'
import axios from 'axios'

export default function ToDosForm(props) {

    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        axios.get(`https://localhost:7273/api/Categories`).then(response => setCategories(response.data))
    }



    const handleSubmit = (values) => {
        console.log(values)
        
        if(!props.toDos) {
            const toDosToCreate = values

            axios.post(`https://localhost:7273/api/ToDos`, toDosToCreate).then(() => {
                props.getToDos()//updates ToDos from the API
                props.setShowCreate(false)//close the create form
            })
        }
        else {
            const toDosToEdit= {
                toDoId: props.toDos.toDoId,
                name: values.name,
                done: values.done,
                categoryId: values.categoryId
            }

            axios.put(`https://localhost:7273/api/ToDos/${props.toDos.toDoId}`, toDosToEdit).then(() => {
                props.getToDos()
                props.setShowEdit(false)
            })
        }
    }

    useEffect(() => {
        getCategories()
    }, []);

  return (
    <Formik
        initialValues={{
            name: props.toDos ? props.toDos.name : '',
            done: props.toDos ? props.toDos.done : 'false',
            categoryId: props.toDos ? props.toDos.categoryId : ''
        }}
        validationSchema={toDosSchema}
        onSubmit={(values) => handleSubmit(values)}
    >
        {({errors, touched}) => (
            <Form id='toDosForm'>
                <div className='form-group m-3'>
                    <Field name='name' className='form-control'
                    placeholder='Name' />
                    {errors.name && touched.name ? (
                        <div className='text-danger'>{errors.name}</div>
                    ) : null}
                </div>
                <div className='form-group m-3'>
                    <Field name='category' className='form-control' placeholder='Category' />
                    {errors.category && touched.category ? (
                        <div className='text-danger'>{errors.category}</div>
                    ) : null}
                </div>
                <div className='form-group m-3 col-1'><span className=''>Done?   </span>
                    <label><Field name='done' type='checkbox' className='checkbox' /></label>
                    {errors.done && touched.done ? (
                        <div className='text-danger'>{errors.done}</div>
                    ) : null}
                </div>
                <div className='form-group m-3'>
                    <Field as='select' name='categoryId' className='form-control'>
                        <option value='' disabled>[Please Select]</option>
                        {categories.map(cat =>
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.catName}
                            </option>
                        )}
                    </Field>
                </div>
                <div className='form-group m-3'>
                    <button type='submit' className='btn btn-info m-3'>Submit ToDo to API</button>
                </div>
            </Form>
        )}
    </Formik>
  )
}
