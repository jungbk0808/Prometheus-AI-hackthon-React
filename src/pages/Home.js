import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
  return (
    <div className='Home'>
      <img src='logo.png' alt='logo' width="200px"/>
      <div className="button-container">
        <Link to="/FQA" style={{ textDecoration: "none"}}>
          <button className="homeBtn">
            자주 묻는 질문
          </button>
        </Link>
        <Link to="/Chat" style={{ textDecoration: "none"}}>
          <button className="homeBtn">챗봇에게 질문하기</button>
        </Link>
      </div>
    </div>
  )
}

export default Home;