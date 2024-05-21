import { useState } from 'react';
import Header from './Header';
import { Link, useNavigate } from "react-router-dom";
import '../styles/SignUp.css'

function Shop() {
  
  const [message, setMessage] = useState();

  const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

      const formData = new FormData(e.target);
      const payload = Object.fromEntries(formData);
      
      fetch(`https://sukoshibook.adaptable.app/blog/signUp`, {
        method: 'Post', 
        headers: {
          'Authorization': `${localStorage.getItem('SavedToken')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((response) => {
        setMessage(response);
        if (response==='user created') {
          navigate('/');
        }
      })
      .catch((err) => {
        setMessage(err.toString());
      });
    }

  
    return (
      <div className='signUpPage'>
        <div className="signUpCard">
          <h1>Sign Up</h1>
          <p>It&apos;s quick and easy.</p>
          <form action="https://sukoshibook.adaptable.app/blog/signUp" method="POST" onSubmit={handleSubmit}>
              <label htmlFor="firstName"> First Name </label>
              <input type="text" name='firstName' placeholder='First Name' required/> <br />
              <label htmlFor="lastName"> Surname </label>
              <input type="text" name='lastName' placeholder='Surname' required/> <br />
              <label htmlFor="email"> Email </label>
              <input type="email" name='email' placeholder='Email' required/> <br />
              <label htmlFor="password"> Password </label>
              <input type="password" name='password' placeholder='password' required/> <br />
              <label htmlFor="passwordConfirm"> Confirm Password </label>
              <input type="password" name='passwordConfirm' placeholder='Confirm password' required/> <br />
              <button>Sign Up</button>
          </form>
          <p>{message}</p>
          <div className="line"></div>
            <Link to="/">
              <button className='loginButton'>Login</button>
            </Link>
        </div>
      </div>
    )
  }
  
  export default Shop