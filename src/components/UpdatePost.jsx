// create posts here with a form 
import Header from './Header'
import { useState } from 'react';
import '../styles/UpdatePost.css'

function CreatePost({editInfo}) {
  console.log(editInfo)
    const [message, setMessage] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

      const formData = new FormData(e.target);
      const payload = Object.fromEntries(formData);
      
      if (editInfo.id !== undefined) {
        fetch(`${import.meta.env.VITE_API_URL}/blog/post/${editInfo.id}/update`, {
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
          
        })
        .catch((err) => {
          setMessage(err.toString());
        });
      } else {
          setMessage('No post found. Please try again');
      }
    }

    const handleDelete = (e) => {
      e.preventDefault();
    
      if (editInfo.id !== undefined) {
        fetch(`${import.meta.env.VITE_API_URL}/blog/post/${editInfo.id}/delete`, {
          method: 'Post', 
          headers: {
            'Authorization': `${localStorage.getItem('SavedToken')}`,
          },
        })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }

          return response.json();
        })
        .then((response) => {
          setMessage(response);
          
        })
        .catch((err) => {
          setMessage(err.toString());
        });
      } else {
          setMessage('No post found. Please try again');
      }
    }

    return (
      <>
        <Header ></Header>
        {/* if user is logged in */}
        <form method="POST" onSubmit={handleSubmit}>
            <label htmlFor="name"> Name </label>
            <input type="text" name='name' placeholder='name' defaultValue={undefined===editInfo ? '' : editInfo.name}/> <br />
            <label htmlFor="title"> Title </label>
            <input type="text" name='title' placeholder='title' defaultValue={undefined===editInfo ? '' : editInfo.title}/> <br />
            <label htmlFor="text"> Text </label>
            <input type="text" name='text' placeholder='text' defaultValue={undefined===editInfo ? '' : editInfo.text}/> <br />
            <label htmlFor="published"> Published </label>
            <input type="checkbox" name='published'/> <br />
            <button>Update Post</button>
        </form>
        <button onClick={handleDelete} className='deletePost'>Delete Post</button>
        <p className='message'>{message}</p>
      </>
    )
  }
  
  export default CreatePost