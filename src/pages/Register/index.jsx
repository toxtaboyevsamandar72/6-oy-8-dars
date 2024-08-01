import { useNavigate } from 'react-router-dom';
import './index.css';
import { useRef } from 'react';

function Register() {
  const navigate = useNavigate();
  const usernameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const repasswordRef = useRef('');

  function validate(username, email, password, repassword) {
    const minLength = 3;

    if (username.current.value.length < minLength) {
      alert('Username is not valid');
      username.current.focus();
      username.current.style.outlineColor = 'red';
      return false;
    }
    
    if (email.current.value.length < minLength) {
      alert('Email is not valid');
      email.current.focus();
      email.current.style.outlineColor = 'red';
      return false;
    }

    if (password.current.value.length < minLength) {
      alert('Password is not valid');
      password.current.focus();
      password.current.style.outlineColor = 'red';
      return false;
    }

    if (repassword.current.value.length < minLength) {
      alert('Repassword is not valid');
      repassword.current.focus();
      repassword.current.style.outlineColor = 'red';
      return false;
    }

    if (password.current.value !== repassword.current.value) {
      alert('Passwords do not match');
      password.current.focus();
      repassword.current.value = '';
      return false;
    }

    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const isValid = validate(usernameRef, emailRef, passwordRef, repasswordRef);
    if (!isValid) return;

    const user = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    fetch("https://auth-rg69.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      if (data.message === "Failed Email is already in use!") {
        alert(data.message);
        emailRef.current.focus();
        return;
      } 
      if (data.message === "Failed Username is already in use!") {
        alert(data.message);
        usernameRef.current.focus();
        return;
      } 
      if (data.message === "User registered successfully!") {
        navigate('/login');
      }
    })
    .catch(err => {
      console.error("Error:", err);
    });
  }

  return (
    <div>
      <form className='form'>
        <input ref={usernameRef} type="text" placeholder='Enter username' />
        <input ref={emailRef} type="email" placeholder='Enter email' />
        <input ref={passwordRef} type="password" placeholder='Enter password' />
        <input ref={repasswordRef} type="password" placeholder='Enter repassword' />
        <button className='btn' onClick={handleSubmit}>Register</button>
      </form>
    </div>
  );
}

export default Register;
