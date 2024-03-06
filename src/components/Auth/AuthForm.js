import { useState, useRef } from 'react';
import classes from './AuthForm.module.css';
import {createUserWithEmailAndPassword , signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../../services/firebase';

const AuthForm = () => {
  // using ref for email and password
  const emailInputRef = useRef();
  const passwordInputRef = useRef()

  const [isLogin, setIsLogin] = useState(true);
  const [submitBtn , setSubmitBtn] = useState(isLogin ? 'LOGIN' : 'SIGN UP')

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setSubmitBtn((prevState)=>{
      if(prevState === 'LOGIN'){
        setSubmitBtn('SIGN UP')
      }
      else{
        setSubmitBtn("LOGIN")
      }
    })
  };

  const submitHandler = async(event)=>{
    event.preventDefault();
    try{
      const emailInput = emailInputRef.current.value
      const passwordInput = passwordInputRef.current.value
  
      if ( isLogin){
        setSubmitBtn('Sending request...')
        let userCredentials = await signInWithEmailAndPassword(auth,emailInput,passwordInput)
        setSubmitBtn(isLogin ? 'LOGIN' : 'SIGN UP')
        console.log(userCredentials)
        emailInputRef.current.value = ''
        passwordInputRef.current.value = ''
      }
      else{
        setSubmitBtn('Sending request...')
        let userCredentials = await createUserWithEmailAndPassword(auth,emailInput,passwordInput)
        setSubmitBtn(isLogin ? 'LOGIN' : 'SIGN UP')
        console.log(userCredentials)
        emailInputRef.current.value = ''
        passwordInputRef.current.value = ''
      }

    }
    catch(err){
      console.log(err)
      alert(err.code)
      setSubmitBtn(isLogin ? 'LOGIN' : 'SIGN UP')
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button
            type='submit'
            className={classes.submit}
            onClick={submitHandler}
          >
            {submitBtn}
          </button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
