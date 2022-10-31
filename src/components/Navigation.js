import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Navigation() {

  return (
    <Navbar expand='md' variant='dark' bg='dark' className='p-3'>
      <Navbar.Brand href='/'>React ToDo's</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className='justify-content-end'>
        <Nav>
          {/* <Link to='/home' className='nav-link'>Home</Link> */}
          <Link to='/toDos' className='nav-link'>ToDo</Link>
          <Link to='/categories' className='nav-link'>Category</Link>
          <Link to='/login' className='nav-link'>Login</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
