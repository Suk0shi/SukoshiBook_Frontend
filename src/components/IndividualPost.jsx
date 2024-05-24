import Header from './Header'
import { useState, useEffect } from 'react';
import '../styles/Blog.css'

function IndividualPost({id, setId, blogData}) {
    const [data, setData] = useState();
    const [message, setMessage] = useState();
    const [comments, setComments] = useState(false);
    console.log(id)
  
    //fetch individual blog post with comments 
    useEffect(() => {
        fetch(`https://sukoshibook.adaptable.app/blog/post/${id}`, {
          mode: 'cors'})
          .then((response) => response.json())
          .then((data) => { console.log(data), setData(data)})
      }, [id, message ]);

      const handleSubmit = (e) => {
        e.preventDefault();

      const formData = new FormData(e.target);
      const payload = Object.fromEntries(formData);
      
      fetch(`https://sukoshibook.adaptable.app/blog/comment/${id}`, {
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
      .then(() => {
        setMessage("Comment Sent");
        
      })
      .catch((err) => {
        setMessage(err.toString());
      });
    }

    function handleDelete(id) {
    
      if (id !== undefined) {
        fetch(`https://sukoshibook.adaptable.app/blog/comment/${id}/delete`, {
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
        {(data === undefined) ? <h1>Loading</h1> :
        (typeof(id) !== "string") ? <h1>Reclick the comment section you want</h1> : 
        <div className='postCardContainer'>
          <div className='postCard overflowY'>
            <button className='backButton' onClick={() => setId(undefined)}>X</button>
            <img className='userIcon' src={data.post.iconUrl} alt="Users profile picture" />
            <h3>{data.post.name}</h3>
            <p className='date'>{data.post.date}</p>
            <p className='text'>{data.post.text}</p>
            <img className='imgUrl' src={data.post.imgUrl} alt="" />
            <h3 className='commentsH3'>Comments</h3> 
            {(data.post_comments.length === 0) ? <p className='commentsContainer'>No comments. Be the first?</p> : 
            <div className='commentsContainer'>
              {data.post_comments.map((data, index) => (
              <div className='comments' key={index+`div`}>
                <img key={index+'icon'} className='userIcon' src={data.iconUrl} alt="Users profile picture" />
                <p className='username' key={index+`name`}> {data.name}</p>
                <p className='date' key={index+`date`}> {data.date}</p>
                <p className='text' key={index+`text`}> {data.text}</p>
              </div>
            ))}
            </div>
            }
            <CreateComment id={id} 
            message={message} handleSubmit={handleSubmit}/>
          </div>
        </div>
        }
      </>
    )
  }

  function CreateComment({id, message, handleSubmit}) {
  
    //fetch if user is logged in 

    return (
      <>
        <form action={`https://sukoshibook.adaptable.app/blog/comment/${id}`} method="POST" 
        onSubmit={handleSubmit}>
            <label htmlFor="text"> Text </label>
            <input type="text" name='text' placeholder='text'/>
            <button>Send</button>
        </form>
      </>
    )
  }
  
  export default IndividualPost