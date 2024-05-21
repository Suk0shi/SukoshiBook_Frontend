import { Link, redirect } from "react-router-dom";
import '../styles/Head.css'
import { useState } from 'react'
import facebookIcon from '../assets/facebook.png'

function Header( {page, iconUrl, blogData} ) {

  const [dropdown, setDropdown] = useState(false)

  const logout = () => {
    localStorage.removeItem('SavedToken');
  }

  return (
    <>
      <header>
        <div className="title">
          <img src={facebookIcon} alt="fsd" width="40px"/>
        </div>
        <div className="pageLinks">
          <Link to="/feed">
            {page === 'feed' ?
              <svg fill="#0866ff" style={{ borderBottom: '3px solid #0866ff' }} width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4,8.931V20a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V8.931a1,1,0,0,0-.441-.828L12,3,4.441,8.1A1,1,0,0,0,4,8.931ZM10,14a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1v5H10Z"/></svg>
              :
              <svg fill="#000000" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4,8.931V20a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V8.931a1,1,0,0,0-.441-.828L12,3,4.441,8.1A1,1,0,0,0,4,8.931ZM10,14a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1v5H10Z"/></svg>
            }
          </Link>
          {localStorage.getItem('SavedToken') ? 
          <Link to="/Friends">
            {page === 'friends'?
              <svg fill="#0866ff" style={{ borderBottom: '3px solid #0866ff' }} width="30px" height="30px" viewBox="0 -64 640 640" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"></path></g></svg>
              :
              <svg fill="#000000" width="30px" height="30px" viewBox="0 -64 640 640" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"></path></g></svg>
            }
          </Link> : undefined
          } 
        </div>
        <div className="settings">        
          {localStorage.getItem('SavedToken') ? 
          <button onClick={() => setDropdown(!dropdown)}><img className="userIcon" src={iconUrl} alt="" /></button>
          :
          <Link to="/">
            Sign in
          </Link>
          }
          {dropdown ? 
            <div className="settingsDropdown">
              <Link to="/Profile">
              <img className="userIcon" src={iconUrl} alt="" />{blogData?<p>{blogData.firstName + ' ' + blogData.lastName}</p>:<p>Profile</p>}
              </Link>
              <Link to='/'>
                <a href="" onClick={logout}>Logout</a>
              </Link>
            </div>
            :undefined} 
        </div>
      </header>
    </>
  )
}

export default Header