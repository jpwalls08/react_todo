import * as Yup from 'yup'

const catSchema = Yup.object().shape({
    //Below we call to each property that we need to be validated and use Yup to define the requirements
    //for each propety (required, maxLength, etc.)
    catName: Yup.string().max(25, 'Max 25 characters').required('Required'),
    catDesc: Yup.string().max(100, 'Max 100 characters')
})

const toDosSchema = Yup.object().shape({
    name: Yup.string().max(100, 'Cannot exceed 100 characters').required(),
    done: Yup.bool().required(),
    categoryId: Yup.number().required()
    
})


export { toDosSchema }
export default catSchema