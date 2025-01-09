import Header from './Header'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../styles/Login.css'


function Login() {
  
  const [message, setMessage] = useState();

  const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

      const formData = new FormData(e.target);
      const payload = Object.fromEntries(formData);
      
      fetch(`${import.meta.env.VITE_API_URL}/log-in`, {
        method: 'Post', 
        headers: {
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
        let token = response.token;
        localStorage.setItem("SavedToken", 'Bearer ' + token);
        if (token) {
          navigate('/feed')
        }
      })
      .catch((err) => {
        console.log(err.toString());
        setMessage("Incorrect Login Details");
      });
    }

    return (
      <div className='loginPage'>
        <div className="left">
          <h1>sukoshibook</h1>
          <p>Sukoshibook helps you connect and share with the people in your life.</p>
        </div>
        <div className="right">
          <div className="loginCard">
            <form action={`${import.meta.env.VITE_API_URL}/log-in`} method="POST" onSubmit={handleSubmit}>
                <input type="email" name='username' placeholder='Email address'/>
                <input type="password" name='password' placeholder='Password'/>
                <button>Log In</button>
            </form>
            <p>{message}</p>
            <div className="line"></div>
            <Link to="/SignUp">
              <button className='signUpButton'>Create New Account</button>
            </Link>
          </div>
            <p><strong>Create a Page</strong> for a celebrity, brand or business.</p>
        </div>
      </div>
    )
  }
  
  export default Login