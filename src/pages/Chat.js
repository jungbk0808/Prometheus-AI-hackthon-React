import React, { useState, useRef, useEffect } from 'react';
import './Chat.css';

function Chat() {
  // useState 변수
  // 사용자 입력
  const [userInput, setUserInput] = useState('');
  // 전체 대화 기록 저장
  const storageChat = localStorage.getItem('chatHistory');
  const initChat = storageChat == null ? [{role: 'bot', message: '어떤 문제가 궁금하신가요? Q&L에게 물어보세요!'}] : JSON.parse(storageChat);
  const [chatHistory, setChatHistory] = useState(initChat);
  // 메시지 기다리는 중 여부 - boolean
  const [watingMessage, setWatingMessage] = useState(false);
  // 챗봇 선택을 위한 옵션
  const [options, setOptions] = useState(['근로기준법', '산업안전보건법', '고용산재보험', '잘 모르겠어요']);
  // 사용자가 선택한 옵션 저장
  const storageOption = localStorage.getItem('option');
  const initOption = storageOption === null || storageOption === 'null' ? null : storageOption;
  const [userOption, setUserOption] = useState(initOption);
  // 사용자 옵션 보여주기 여부
  const initShowOption = initOption === null ? true : false;
  const [showOption, setShowOption] = useState(initShowOption);

  // 기타 변수
  // 도움말
  const helpMessages = ['근로기준법은 근로조건의 기준을 정함으로써 근로자의 기본적 생활을 보장 및 향상시키며 균형 있는 국민경제의 발전을 꾀하는 법입니다. 근로 기준, 근로 계약, 임금, 안전과 보건, 재해 보상 등에 대해 다룹니다.',
    '산업안전보건법은 산업재해를 예방하고 쾌적한 작업 환경을 조성함으로써 안전 및 보건을 유지ㆍ증진하기 위한 법입니다. 안전보건관리체제, 안전보건교육, 유해 및 위험 방지 조치 등에 대해 다룹니다.',
    '고용보험법은 직업능력의 개발과 향상을 꾀하고 근로자 등의 생활안정과 구직 활동을 촉진함으로써 경제ㆍ사회 발전에 이바지하는 법입니다. 피보험자의 관리, 고용안정ㆍ직업능력개발 사업, 구직급여, 취업 촉진 수당 등에 대해 다룹니다.']
  
  // 토큰 수
  const storageToken = localStorage.getItem('token');
  const initToken = storageToken === null ? 10 : Number(storageToken);
  const [token, setToken] = useState(initToken);

  // 채팅 창 자동 스크롤
  const chatHistoryRef = useRef();
  useEffect(() => {
    // 채팅 내용이 업데이트 될 때마다 스크롤을 아래로 이동
    chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    // 대화 내용 storage 저장
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  // 사용자 선택 옵션 storage 저장
  useEffect(() => {
    localStorage.setItem('option', userOption);
  }, [userOption]);

  // 토큰 변경 시 storage 저장
  useEffect(() => {
    window.localStorage.setItem('token', token);
  }, [token])

  // 옵션 클릭 시 발생 함수
  const optionClick = (option) => {
    setChatHistory(chatHistory => [...chatHistory, {role: 'user', message: option}]);
    chatHistory.map(chat => console.log(`${chat.role} - ${chat.message}`))
    
    if (option === options[options.length - 1]) {
      helpMessages.map(help => setChatHistory(chatHistory => [...chatHistory, {role: 'bot', message: help}]));
      setOptions(pre => ['근로기준법', '산업안전보건법', '고용산재보험']);
      return;
    }
    setUserOption(pre => option);
    setChatHistory(chatHistory => [...chatHistory, {role: 'bot', message: `${option}에 관한 어떤 내용이 궁금한가요?`}]);
    setShowOption(pre => false);
  };

  // 새 채팅 버튼 클릭 함수 - 로컬 스토리지 삭제, 리로드
  const newChat = () => {
    localStorage.removeItem('chatHistory');
    localStorage.removeItem('option');
    window.location.reload();
  }

  // 사용자 입력 다루는 함수
  const keyListener = (e) => {
    if (showOption) {
      e.preventDefault();
      return;
    }
    if (e.key !== 'Enter') {
      return;
    }
    if (e.shiftKey) {
      return;
    }
    sendMessage();
  }

  // 서버에 보내고 답변을 받는 함수
  const sendMessage = async () => {
    const userMessage = userInput;

    // 공백 메시지는 입력되지 않음
    if (userMessage.trim() === '') return;

    // 대화 기록에 사용자 메시지 저장
    setChatHistory(chatHistory => [
      ...chatHistory,
      { role: 'user', message: userMessage }
    ]);

    // 사용자 입력 초기화
    setUserInput('');

    // 메시지 기다리는 중으로 변경
    setTimeout(() => setWatingMessage(pre => true), 500)

    // 토큰 차감
    setToken(pre => pre-1);

    // 서버에 post 요청
    const response = await fetch('http://hackathon-flask-vmgcf.run-us-west2.goorm.site:80/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage, option: userOption }),
    });

    // 답변 받아오기
    const data = await response.json();

    // 메시지 기다리는 중 종료
    setWatingMessage(pre => false)

    // 대화 기록에 챗봇 응답을 추가
    setChatHistory(chatHistory => [
      ...chatHistory,
      { role: 'bot', message: data.message }
    ]);
  };

  return (
    <div className="chat-container">
      <div style={{display: 'flex', alignItems: 'center'}}>
        <p style={{display: 'inline-block', flex: '1'}}>Q&L 법률 상담 {userOption && `- ${userOption}`}</p>
        <div style={{float: 'right'}}>
          <img src='coin.png' alt='token' width='15px'/>
          {token}
        </div>
        <button style={{float: 'right'}} className='chatBtn' onClick={newChat}>새 채팅</button>
      </div>
      <div className="chat-history" ref={chatHistoryRef}>
        {chatHistory.map((chat, index) => (
        <div
          key={index}
          className={`${chat.role}-message`}>
          <p>{chat.message}</p>
        </div>
        ))}
        {watingMessage && <div className="bot-message">
          <p>답변을 만들고 있어요</p>
        </div>}
      </div>
      {showOption && <div className="option-container">
        {options.map((option, index) => 
        <div onClick={() => optionClick(option)} 
          className="option" 
          key={index}>
          {option}
        </div>)}
      </div>}
      {!showOption && <div className="user-input">
        <textarea
          type="text"
          value={userInput}
          placeholder='Q&L에게 메시지...'
          onKeyDown={keyListener}
          onChange={(e) => setUserInput(e.target.value)}/>
        <button className='chatBtn' onClick={sendMessage}>
          <img src='submit.png' alt='submit' width='20px' />
        </button>
      </div>}
    </div>
  );
}

export default Chat;
