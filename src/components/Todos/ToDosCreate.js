import React from 'react'
import ToDosForm from './ToDosForm'

export default function ToDosCreate(props) {
  return (
    <article className='createToDo m-2 text-white justify-content-center'>
        <ToDosForm
            setShowCreate={props.setShowCreate}
            getToDos={props.getToDos} />
    </article>
  )
}