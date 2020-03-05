import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  login,
  register,
  checkUser,
  clearReducer
} from '../../redux/userReducer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Auth.css'

function Auth(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [registerBool, setRegisterBool] = useState(false)
  if (props.err) {
    toast.error(props.errMsg, {
      position: toast.POSITION.BOTTOM_RIGHT
    })
    props.clearReducer()
  }
  useEffect(() => {
    props.checkUser()
    if (props.user.user_name) props.history.push('/dashboard')
  })
  const resetInput = () => {
    setUsername('')
    setPassword('')
  }
  return (
    <section className='Auth'>
      <div className='auth-input-container'>
        <h1 className='auth-header'>jeepThings</h1>
        <input
          value={username}
          className='auth-input'
          type='text'
          placeholder='username'
          onChange={e => setUsername(e.target.value)}
        />
        <input
          value={password}
          className='auth-input'
          type='password'
          placeholder='password'
          onChange={e => setPassword(e.target.value)}
        />
        {!registerBool ? (
          <>
            <button
              className='auth-button'
              onClick={() => {
                if (username !== '' && password !== '') {
                  props.register(username, password)
                  resetInput()
                } else {
                  toast.error('please fill out all the fields', {
                    position: toast.POSITION.BOTTOM_RIGHT
                  })
                }
              }}
            >
              Register
            </button>
            <p className='auth-change-text'>
              If you already have a account click{' '}
              <a
                className='auth-link'
                onClick={() => setRegisterBool(!registerBool)}
              >
                here
              </a>{' '}
              to login
            </p>
          </>
        ) : (
          <>
            <button
              className='auth-button'
              onClick={() => {
                if (username !== '' && password !== '') {
                  props.login(username, password)
                  resetInput()
                } else {
                  toast.error('please fill out all the fields', {
                    position: toast.POSITION.BOTTOM_RIGHT
                  })
                }
              }}
            >
              Login
            </button>
            <p className='auth-change-text'>
              If you don't have a account click{' '}
              <a
                className='auth-link'
                onClick={() => setRegisterBool(!registerBool)}
              >
                here
              </a>{' '}
              to sign up
            </p>
          </>
        )}
      </div>
      <ToastContainer autoClose={2000} />
    </section>
  )
}

const mapStateToProps = reduxState => {
  return reduxState
}

const mapDispatchToProps = {
  login,
  register,
  checkUser,
  clearReducer
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
