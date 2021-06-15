import React, { useEffect, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    console.log("EFFECT RUNNING");//1.FIRST ARGUMENT: it runs AFTER the component first mounts/aka the component is rendered for the first time (With no dep it runs also AFTER any state update eg. user's input)
  return () => {
    console.log("EFFECT CLEANUP")//3a. CLEANUP FUNCTION runs BEFORE the state function at a whole runs but NOT BEFORE the first time the state function runs for the very first time!!
  }; //3b. CLEANUP FUNCTION + EMPTY ARRAY: EFFECT RUNNING runs once and EFFECT CLEANUP runs after the component is no longer rendered in the DOM (aka the user has logged in and the form is no longer rendered on screen) 
  },[enteredPassword])//2a.EMPTY ARRAY: the function is executed ONCE, AFTER the componet is rendered for the very first time
//2b.ARRAY WITH DEP. the function re-runs every time the component was re-evealuated + the dep state changed

  useEffect(() => {
    const cleanAndSend = setTimeout(() => {//debouncing
      console.log("Checking form validity!");
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 3000);    

    return () => {
      console.log("CLEANUP")
      clearTimeout(cleanAndSend)
    };//CLEANUP function 
  }, [setFormIsValid, enteredPassword, enteredEmail ]);

  //CLEANUP function is in this case an anonymous arrow function 
  //and does not run before the very first time the component is rendered
  //it will instead run before every side effect execution
  //it will clean up the counter of inputs before the setFormIsValid 
  //(every time!) 

//✨ cleanup collects user inputs and send to validation only once, after the 3000 delay
  
//the logic function will run only if AT LEAST one of the dep has changed
  //in this case the dependencies are the function itself
  //you can also avoid mentioning setFormIsValid

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes('@')
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

/* 
what to add as dep to useEffect()
So long story short: 
You must add all "things" you use in your effect function 
if those "things" could change because your component 
(or some parent component) re-rendered. 
That's why variables or state defined in 
component functions, 
props or 
functions defined in component functions 
have to be added as dependencies! */

