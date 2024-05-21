import { useState } from 'react'
import Header from './Header'
import { useEffect } from 'react';
import { Link } from "react-router-dom";

import '../styles/Blog.css'
import '../App.css'

function Unpublished({setId, setEditInfo}) {

  const [blogData, setBlogData] = useState()
  
  useEffect(() => {
    fetch('http://localhost:3000/blog/unpublished', {
      mode: 'cors',
      headers: {
        'Authorization': `${localStorage.getItem('SavedToken')}`
      }})
      .then((response) => response.json())
      .then((data) => { console.log(data), setBlogData(data)})
  }, [ ]);

  
  function Card({data, setId}) {
  return (<div className='postCardContainer'>
    {data.map((data, index) => (
      <div className='postCard' key={index+`div`}>
        <h3 key={index+`name`}> {data.name}</h3>
        <p className='date' key={index+`date`}> {data.date}</p>
        <p key={index+`title`}> {data.title}</p>
        <p className='text' key={index+`text`}> {data.text}</p>
        <Link to="/IndividualPost" onClick={e => setId(data._id)}>
            Comments
        </Link>
        <Link to="/UpdatePost" onClick={e => setEditInfo({
            'id':`${data._id}`,
            'name':`${data.name}`,
            'title':`${data.title}`,
            'text':`${data.text}`,
            'published':`${data.published}`,
            })}>
            Edit / Post
        </Link>
        
      </div>
    ))}
  </div>)  
  }

  return (
    <>
      {/* display blog posts */}
      <Header></Header>
      {(blogData === undefined) ? <h1>Loading</h1> :
      (blogData === 'Login required') ? <h1>{blogData}</h1> :
      <Card data = {blogData.post} setId={setId} setEditInfo={setEditInfo}/>}
    </>
  )
}

export default Unpublished