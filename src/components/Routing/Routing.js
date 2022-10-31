import React from 'react'
import './Routing.css'
import { Container, Row } from 'react-bootstrap'
import AuthInfo from './AuthInfo'
import RouterInfo from './RouterInfo'

export default function Routing() {
  return (
    <section className='routing'>
    <article className='text-center m-0 p-5 bg-info'>
        <h1>Routing and Authentication</h1>        
    </article>
    <Container>
        <Row>
            <RouterInfo />
            <AuthInfo />
        </Row>
    </Container>
</section>

  )
}
