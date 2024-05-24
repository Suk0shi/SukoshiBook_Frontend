import { useLayoutEffect, useState } from 'react'
import Header from './Header'
import { useEffect } from 'react';
import { Link, useNavigate, useLinkClickHandler, useLocation } from "react-router-dom";
import IndividualPost from './IndividualPost';

import '../styles/Blog.css'
import '../styles/Profile.css'

function Profile({ setEditInfo}) {
  const [blogData, setBlogData] = useState()
  const [message, setMessage] = useState();
  const [id, setId] = useState();
  const [postForm, setPostForm] = useState(false);
  const [profileIconForm, setProfileIconForm] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://sukoshibook.adaptable.app/blog/profilePosts', {
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
    fetch(`https://sukoshibook.adaptable.app/blog/post`, {
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
    
  
    fetch(`https://sukoshibook.adaptable.app/blog/like/${id}`, {
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

  const handleIconSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    console.log(JSON.stringify(payload))
    fetch(`https://sukoshibook.adaptable.app/blog/editIcon`, {
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
        newPosts[index].likesCount -= 1; // Update the liked status
        return { ...prevData, posts: newPosts }; // Update the state with the new posts array
      });
    } else {
      svgRect.setAttribute('fill', '#0866ff');
      svgPath.setAttribute('fill', '#0866ff');
      setBlogData(prevData => {
        const newPosts = [...prevData.posts]; // Create a copy of the posts array
        newPosts[index].liked = true; // Update the liked status
        newPosts[index].likesCount += 1; // Update the liked status
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
      {/* display blog posts */}
      {(blogData === undefined) ? 
        <Header page="" iconUrl='https://i.pinimg.com/736x/3c/67/75/3c67757cef723535a7484a6c7bfbfc43.jpg'></Header>
        :
        <Header page="" iconUrl={blogData.iconUrl} blogData={blogData}></Header>
        }
      <div className="pageLayout">
        <div className="left">
        </div>
        <div className="middle">
            {(blogData === undefined) ? <p>Loading</p>:
                <div className="coverPhotos">
                    <img className='bannerImg' src="https://t4.ftcdn.net/jpg/03/78/40/11/360_F_378401105_9LAka9cRxk5Ey2wwanxrLTFCN1U51DL0.jpg" alt="" />
                    <button className='addCoverPhoto'>Add Cover Photo</button>
                    <button className='changeProfileIcon' onClick={() => setProfileIconForm(true)}><img src={blogData.iconUrl} alt="" /></button>
                    <div className="svg">
                      <svg fill="#000000" width="30px" height="30px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 12.906a4.47 4.47 0 0 0 0 8.938 4.47 4.47 0 0 0 4.469-4.469A4.47 4.47 0 0 0 16 12.906zm0 7.063a2.577 2.577 0 1 1-.002-5.154A2.577 2.577 0 0 1 16 19.969z"/><path d="M25.625 9.812h-4.812l-2.062-2.75h-5.5l-2.062 2.75H6.375C5.618 9.812 5 10.43 5 11.188v12.375c0 .756.618 1.375 1.375 1.375h19.25c.757 0 1.375-.617 1.375-1.375V11.188c0-.758-.618-1.376-1.375-1.376zM16 23.477a6.103 6.103 0 1 1 .001-12.205A6.103 6.103 0 0 1 16 23.477zm9.625-10.399h-2.75v-1.375h2.75v1.375z"/></svg>
                    </div>
                    <h2>{blogData.firstName + ' ' + blogData.lastName}</h2>
                </div>
            }
          <h2>Posts</h2>
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
      {(profileIconForm === false) ? null : 
        <div className="individualPost">
          <form className='feedPost' method="POST" onSubmit={handleIconSubmit}>
                <h3>Edit Profile Picture</h3>
                <button className='backButton' onClick={() => setProfileIconForm(!profileIconForm)}>X</button>
                <div className="line"></div>
                <input type="text" name='imgUrl' placeholder={`Input an image URL here`} required/> <br />
                <button>Save</button>
            </form>
            <p>{message}</p>
        </div>
      }
    </>
  )
}

export default Profile