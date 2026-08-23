import React from 'react'
import "../auth.form.scss"
import { Link } from 'react-router'

const Login = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="emil" name='email' placeholder='Enter email' />
          </div>

          <div className="input-group">
            <label htmlFor="password">password</label>
            <input type="password" name='password' placeholder='Enter password' />
          </div>

          <button className='button primary-button'>Login</button>

        </form>

        <p>Already have a account?<Link to={"/Register"}>register</Link></p>
      </div>
    </main>
  )
}

export default Login
