import React from 'react'
import { Modal } from 'react-bootstrap'
import CatForm from './CatForm'

export default function CatEdit(props) {
  return (
    <Modal
        //Allows us to pass a bootstrap Modal (ex. showHideHook)
        show={props.showEdit}
        //Click off the Modal, bootstrap will exit the Modal
        //Setting to true will close and open back up
        onHide={() => props.setShowEdit(false)}
        size='lg'
    >
        <Modal.Header closeButton>
            <h2>Editing {props.category.categoryName}</h2>
        </Modal.Header>
        <Modal.Body>
            <CatForm
                setShowEdit={props.setShowEdit}
                getCategories={props.getCategories}
                category={props.category} />
        </Modal.Body>
    </Modal>
  )
}
