import React from 'react'
import Logout from './Auth/Logout'
//Logout will be conditionally rendered if the user is Logged in, so we need user info
import { useAuth } from '../contexts/AuthContext'

export default function Footer() {
  const { currentUser } = useAuth()

  return (
    <>
    {currentUser &&
      <Logout />
    }
    <footer className='text-center text-white bg-info p-4'>
        <strong>&copy; {new Date().getFullYear()} Centriq Training, All Rights Reserved</strong>
    </footer>
    </>
  )
}
