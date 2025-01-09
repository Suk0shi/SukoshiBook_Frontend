// create posts here with a form 
import Header from './Header'
import { Link, redirect } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';


import '../styles/Friends.css'

function Friends() {
    //fetch iconUrl followrequests and following and followers
    //display add friends form and let the user input a name
    //add that name to the other users follow requests
    const [friendData, setFriendData] = useState();
    const [message, setMessage] = useState();
    const [page, setPage] = useState('addFriends');


    useEffect(() => {
      fetch(`${import.meta.env.VITE_API_URL}/blog/friends`, {
        mode: 'cors', 
        headers: {
          'Authorization': `${localStorage.getItem('SavedToken')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      })
        .then((response) => response.json())
        .then((data) => { console.log(data), setFriendData(data)})
    }, [ page ]);

    const handleSubmit = (e) => {
      e.preventDefault();
  
      const formData = new FormData(e.target);
      const payload = Object.fromEntries(formData);
      fetch(`${import.meta.env.VITE_API_URL}/blog/addFriend`, {
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
    }

    function acceptRequest(data) {
      //data is username 
      //remove username from pending requests
      //add username to followers
      //add users username to their following list ?
      fetch(`${import.meta.env.VITE_API_URL}/blog/acceptFriend`, {
        method: 'Post', 
        headers: {
          'Authorization': `${localStorage.getItem('SavedToken')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: data}),
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
    }

    function declineRequest(data) {
      //data is username 
      //remove username from pending requests
    }

    return (
      <>
        {(friendData === undefined) ? 
        <Header page="friends" iconUrl='https://i.pinimg.com/736x/3c/67/75/3c67757cef723535a7484a6c7bfbfc43.jpg'></Header>
        :
        <Header page="friends" iconUrl={friendData.iconUrl} blogData={friendData}></Header>
      }
        {/* if user is logged in */}
        <div className="friendsPage">
          <div className="friendsNav">
            <h2>Friends</h2>
            <button onClick={() => setPage('addFriends')}>
              Add Friends
            </button>
            <button onClick={() => setPage('friendRequests')}>
              Friend Requests
            </button>
            <button onClick={() => setPage('allFriends')}>
              All Friends
            </button>
          </div>
          <div>
            {page==='addFriends'? 
              //add friends form
              <div className="addFriends">
                <h2>Add Friends</h2>
                <form className='feedPost' method="POST" onSubmit={handleSubmit}>
                  <label htmlFor="username">Username (Firstname Surname)</label>
                  <input type="text" name='username' placeholder={`e.g. John Taylor`} required/> <br />
                  <button>Post</button>
                </form>
            <p>{message}</p>
              </div>
              : undefined}
            {page==='friendRequests'?
              //display all friend requests with delete or accept
              <div className="friendRequests">
                <h2>Follow Requests</h2>
                <div className="cardContainer">
                {friendData.followRequestsNames.map((data, index) => (
                  <div key={data+index+'card'} className='friendRequestCard'>
                    <p key={data+index}>{data}</p>
                    <button key={data+index+'accept'} onClick={() => acceptRequest(data)}>Accept</button>
                    <button key={data+index+'decline'} onClick={() => declineRequest(data)}>Decline</button>
                  </div>
                ))}
                </div>
                <h2>Pending Requests</h2>
                <div className="cardContainer">
                  {friendData.pendingRequestsNames.map((data, index) => (<p key={data+index}>{data}</p>))}
                </div>
              </div>
              : undefined}
            {page==='allFriends'? 
              //display all friends
              <div className="allFriends">
                <h2>Following</h2>
                <div className="cardContainer">
                  {friendData.followingNames.map((data, index) => (
                    <div key={data+index+'card'} className="friendRequestCard">
                      <img src={data.iconUrl} alt="Proifle picture" />
                      <p key={data+index}>{data.username}</p>
                    </div>
                  ))}
                </div>
                <h2>Followers</h2>
                <div className="cardContainer">
                  {friendData.followerNames.map((data, index) => (
                    <div key={data+index+'card'} className="friendRequestCard">
                      <img src={data.iconUrl} alt="Proifle picture" />
                      <p key={data+index}>{data.username}</p>
                    </div>
                  ))}
                </div>
              </div>
              : undefined}
          </div>
        </div>
      </>
    )
  }
  
  export default Friends