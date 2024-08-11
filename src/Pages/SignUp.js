import React from 'react'
import Header from '../components/Header'
import SignUpcomponent from '../components/signup/signin'

function SignUp() {
  return (
    <div>
        <Header/>
        <div className='wrapper'>
            <SignUpcomponent/>
        </div>
   </div>
  )
}

export default SignUp