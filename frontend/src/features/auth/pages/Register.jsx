import React from 'react'
import { Link, useNavigate } from 'react-router'

const Register = () => {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="username">username</label>
            <input type="text" name='username' placeholder='Enter username' />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="emil" name='email' placeholder='Enter email' />
          </div>

          <div className="input-group">
            <label htmlFor="password">password</label>
            <input type="password" name='password' placeholder='Enter password' />
          </div>

          <button className='button primary-button'>Register</button>

        </form>
        <p>Already have a account?<Link to={"/Login"}>Login</Link></p>
      </div>
    </main>
  )
}

export default Register
