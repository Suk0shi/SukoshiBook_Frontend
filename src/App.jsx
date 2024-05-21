import { useLayoutEffect, useState } from 'react'
import Header from './components/Header'
import { useEffect } from 'react';
import { Link, useNavigate, useLinkClickHandler, useLocation } from "react-router-dom";
import IndividualPost from './components/IndividualPost';

import './styles/Blog.css'
import './App.css'

function App({ setEditInfo}) {
  const [blogData, setBlogData] = useState()
  const [message, setMessage] = useState();
  const [id, setId] = useState();
  const [postForm, setPostForm] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/blog/posts', {
      mode: 'cors', 
      headers: {
        'Authorization': `${localStorage.getItem('SavedToken')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((data) => { console.log(data), setBlogData(data)})
  }, [ message ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    console.log(JSON.stringify(payload))
    fetch(`http://localhost:3000/blog/post`, {
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
      if(response==='post sent') {
        //navigate('/profile')
      }
    })
    .catch((err) => {
      setMessage(err.toString());
    });
  }

  function handleLikeSubmit(id) {
    
  
    fetch(`http://localhost:3000/blog/like/${id}`, {
      method: 'Post', 
      headers: {
        'Authorization': `${localStorage.getItem('SavedToken')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then(() => {
      //make thumb icon blue
    })
    .catch((err) => {
      setMessage(err.toString());
    });
  }
  
  function handleLikeClick(e, index) {
    e.preventDefault();
    handleLikeSubmit(blogData.posts[index]._id);
    changeSvgColor(index);
  }
  
  function changeSvgColor(index) {
    const svgRect = document.querySelector(`#likeSvg${index} rect`);
    const svgPath = document.querySelector(`#likeSvg${index} path`);
  
    if (blogData.posts[index].liked === true) {
      svgRect.setAttribute('fill', '#ffffff');
      svgPath.setAttribute('fill', '#ffffff');
      setBlogData(prevData => {
        const newPosts = [...prevData.posts]; // Create a copy of the posts array
        newPosts[index].liked = false; // Update the liked status
        newPosts[index].likesCount -= 0.5; // Update the liked status
        return { ...prevData, posts: newPosts }; // Update the state with the new posts array
      });
    } else {
      svgRect.setAttribute('fill', '#0866ff');
      svgPath.setAttribute('fill', '#0866ff');
      setBlogData(prevData => {
        const newPosts = [...prevData.posts]; // Create a copy of the posts array
        newPosts[index].liked = true; // Update the liked status
        newPosts[index].likesCount += 0.5; // Update the liked status
        return { ...prevData, posts: newPosts }; // Update the state with the new posts array
      });
    }
  }

  function Card({data, setId}) {
    return (<div className='postCardContainer'>
      {data.map((data, index) => (
        <div className='postCard' key={index+`div`}>
          <img className='userIcon' src={data.iconUrl} alt="Users profile picture" />
          <h3 key={index+`name`}> {data.name}</h3>
          <p className='date' key={index+`date`}> {data.date}</p>
          <p className='text' key={index+`text`}> {data.text}</p>
          <img className='imgUrl' key={index+`imgUrl`} src={data.imgUrl} alt="" />
          <p className='likesNumber'>{data.likesCount} Likes</p>
          <p className='commentsNumber'>{data.commentsCount} Comments</p>
          <div className="line"></div>
          <button key={index} className='likeButton' onClick={(e) => {handleLikeClick(e, index)}}>
            <svg id={`likeSvg${index}`} width="20px" height="20px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <desc/>
              {data.liked===true?
              <g>
              <rect fill="#0866ff" height="16" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" width="6" x="3" y="15"/>
              <path d="M9,15l5-5l2-7h0   c2.209,0,4,1.791,4,4v8h5h0c2.209,0,4,1.791,4,4v0l-1.721,10.329C27.118,30.293,26.283,31,25.306,31H9V15z" fill="#0866ff" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
              </g>
              :
              <g>
              <rect fill="none" height="16" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" width="6" x="3" y="15"/>
              <path d="M9,15l5-5l2-7h0   c2.209,0,4,1.791,4,4v8h5h0c2.209,0,4,1.791,4,4v0l-1.721,10.329C27.118,30.293,26.283,31,25.306,31H9V15z" fill="none" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
              </g>
              }
            </svg>
            Like
          </button>
          <button className='commentButton' onClick={() => setId(data._id)}>
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="style=linear">
              <g id="comment">
              <path id="vector" d="M1.98608 11.1034C1.98608 13.3236 2.78607 15.376 4.13153 16.9992C5.93153 19.238 8.78608 20.6746 11.9861 20.6746C11.9861 20.6746 15.5028 21.9659 17.8427 22.4553C18.6528 22.6248 19.5517 22.0692 19.5517 21.3173C19.5517 20.4026 17.9861 18.753 17.9861 18.753C19.1009 17.959 20.033 16.9462 20.7162 15.7808C21.526 14.3994 21.9861 12.8036 21.9861 11.1034C21.9861 9.39876 21.5255 7.7997 20.7162 6.41587C19.9666 5.13402 18.9178 4.03683 17.6588 3.21143C16.0406 2.12931 14.0952 1.51367 11.9861 1.51367C6.45881 1.51367 1.98608 5.80475 1.98608 11.1034Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              </g>
            </svg>
            Comment
          </button>
        </div>
      ))}
    </div>)  
  }

  return (
    <>
      {/* display blog posts */console.log(blogData)}
      {(blogData === undefined) ? 
        <Header page="feed" iconUrl='https://i.pinimg.com/736x/3c/67/75/3c67757cef723535a7484a6c7bfbfc43.jpg'></Header>
        :
        <Header page="feed" iconUrl={blogData.iconUrl} blogData={blogData}></Header>
      }
      
      <div className="pageLayout">
        <div className="left">
          {(blogData === undefined) ? undefined : <button><img className='userIcon' src={blogData.iconUrl} alt="User Profile Picture" /><p>{blogData.firstName + ' ' + blogData.lastName}</p></button>}
          <Link to="/Friends">
            <button className='findFriendsButton'>
              <svg fill="#0866ff" width="40px" height="40px" viewBox="0 -64 640 640" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"></path></g></svg>
              <p>Find Friends</p>
            </button>
          </Link>      
          <div className="line"></div>
        </div>
        <div className="middle">
          {(blogData === undefined) ? <h1>Loading</h1> : 
          <>
            <div className="feedPostContainer">
              <div className="feedPostButton">
                <button onClick={() => setPostForm(!postForm)}>{`What's on your mind, ${blogData.firstName}?`}</button>
              </div>
            </div>
            <Card data = {blogData.posts} setId={setId}/>
          </>}
        </div>
        <div className="right">

        </div>
      </div>
      {(id === undefined) ? null : 
        <div className="individualPost">
          <IndividualPost id={id} setId={setId} blogData={blogData}></IndividualPost>  
        </div>
      }
      {(postForm === false) ? null : 
        <div className="individualPost">
          <form className='feedPost' method="POST" onSubmit={handleSubmit}>
                <h3>Create Post</h3>
                <button className='backButton' onClick={() => setPostForm(!postForm)}>X</button>
                <div className="line"></div>
                <input type="text" name='text' placeholder={`What's on your mind, ${blogData.firstName}?`} required/> <br />
                <input type="text" name='imgUrl' placeholder={`Input an image URL here (optional)`}/> <br />
                <button>Post</button>
            </form>
            <p>{message}</p>
        </div>
      }
    </>
  )
}

export default App