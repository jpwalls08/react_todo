import React from 'react'
import { Formik, Form, Field } from 'formik'
import catSchema from '../../utilities/validationSchema' 
import axios from 'axios'

export default function CatForm(props) {

    const handleSubmit = (values) => {
        console.log(values)
        //Below is the Create logic of handleSubmit
        if(!props.category){
            //Below is the logic for creating a new category
            const catToCreate = values//assemble a temp object to send in our request

            //send the object in a POST request to the API
            axios.post(`https://localhost:7273/api/Categories`, catToCreate).then(() => {
                props.setShowCreate(false)//this will close the form. We passed this callback function rom Categories.js
                props.getCategories()//This makes a GET request to the API, also passed from Categories.js
            })
        }
        //Below is the Edit logic of handleSubmit()
        else {
            //Because our form only captures the Category name and description, we need to pass an entire object 
            //into the PUT request, including the categoryId
            const catToEdit = {
                categoryId: props.category.categoryId,
                catName: values.catName,
                catDesc: values.catDesc
            }

            axios.put(`https://localhost:7273/api/Categories/${props.category.categoryId}`, catToEdit).then(() => {
                props.setShowEdit(false)
                props.getCategories()
            })
        }
    }
  return (
    <div className='createCategory m-2 text-white text-center'>
        <Formik
            initialValues={{
                
                catName: props.category ? props.category.catName : '',
                catDesc: props.category ? props.category.catDesc : ''
            }}
            validationSchema={catSchema}
            onSubmit={values => handleSubmit(values)}
        >
                {({errors, touched}) => (
                    //Inside parens are the forms
                    <Form id='catForm' className='row text-center m-auto'>
                        <div className='form-group m-1 p-1'>
                            <Field name='catName' className='form-control' placeholder='Name' />
                            {errors.catName && touched.catName ? 
                                <div className='text-danger'>{errors.catName}</div>
                            : null}                            
                        </div>
                        <div className='form-group m-1 p-1'>
                            <Field name='catDesc' className='form-control' placeholder='Description' />
                            {errors.catDesc && touched.catDesc ? 
                                <div className='text-danger'>{errors.catDesc}</div>
                            : null}
                        </div>
                        <div className='form-group m-1'>
                            <button type='submit' className='btn btn-success'>Submit Category to API</button>
                        </div>
                    </Form>
                )}
        </Formik>
    </div>
  )
}
