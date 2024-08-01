import { useNavigate } from 'react-router-dom';
import './index.css';
import { useRef } from 'react';

function Login() {
  const navigate = useNavigate();
  const usernameRef = useRef('');
  const passwordRef = useRef('');

  function validate(username, password) {
    if (username.current.value.length < 3) {
      alert('Username is not valid');
      username.current.focus();
      username.current.style.outlineColor = 'red';
      return false;
    }

    if (password.current.value.length < 3) {
      alert('Password is not valid');
      password.current.focus();
      password.current.style.outlineColor = 'red';
      return false;
    }
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const isValid = validate(usernameRef, passwordRef);
    if (!isValid) {
      return;
    }
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    fetch("https://auth-rg69.onrender.com/api/auth/signin", {
      method: "POST",
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "User not found") {
          alert(data.message);
          usernameRef.current.focus();
          return;
        } else if (data.message === "Invalid Password") {
          alert(data.message);
          passwordRef.current.focus();
        } else if (data.accessToken) {
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("token", data.accessToken);
          navigate('/');
        }
      })
      .catch(err => {
        console.error("Error:", err);
      });
  }

  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        <input ref={usernameRef} type="text" placeholder='Enter username' />
        <input ref={passwordRef} type="password" placeholder='Enter password' />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
