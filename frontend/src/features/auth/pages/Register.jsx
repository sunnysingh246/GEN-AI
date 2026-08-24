import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'


const Register = () => {

  const navigate = useNavigate()
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { loading, handleRegister } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleRegister({ username, email, password })
    navigate('/')
  }

  if(loading){
    return <main><h1>Loading....</h1></main>
  }


  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="username">username</label>
            <input
              onChange={(e) => { setUserName(e.target.value) }}
              type="text" name='username' placeholder='Enter username' />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => { setEmail(e.target.value) }}
              type="emil" name='email' placeholder='Enter email' />
          </div>

          <div className="input-group">
            <label htmlFor="password">password</label>
            <input
              onChange={(e) => { setPassword(e.target.value) }}
              type="password" name='password' placeholder='Enter password' />
          </div>

          <button className='button primary-button'>Register</button>

        </form>
        <p>Already have a account ?<Link to={"/Login"}>Login</Link></p>
      </div>
    </main>
  )
}

export default Register
