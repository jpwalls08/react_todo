import React from 'react'
import { Modal } from 'react-bootstrap'
import ToDosForm from './ToDosForm'

export default function ToDosEdit(props) {
  return (
    <Modal
        show={props.showEdit}
        onHide={() => props.setShowEdit(false)}
    >
        <Modal.Header>
            <h3>Editing {props.toDos.name}</h3>
        </Modal.Header>
        <Modal.Body>
            <ToDosForm
                toDos={props.toDos}
                setShowEdit={props.setShowEdit}
                getToDos={props.getToDos} />
        </Modal.Body>
    </Modal>
  )
}
