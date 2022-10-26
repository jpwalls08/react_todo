import React from 'react'
import { useAuth } from '../../contexts/AuthContext' 
import './Profile.css'

export default function Profile() {
    const { currentUser } = useAuth()

  return (
    <span className='profile p-2'>
        {/* Below we call to the currentUser object to properly greet a logged in user. If displayName was null, we display 
            currentUser.email. If we have a displayName to call upon, we call it using .split:
            currentUser.displayName.split(' ')[0] will show the first name only */}
        Hello {!currentUser.displayName ? currentUser.email : currentUser.displayName.split(' ')[0]}!
        <img src={currentUser.photoURL} alt='User profile pic' />
    </span>
  )
}
