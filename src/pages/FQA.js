import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FQA.css'

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`} onClick={toggleOpen}>
      <div className={`question ${isOpen ? 'open' : ''}`}>{question}</div>
      {isOpen && <div className="answer">{answer}</div>}
    </div>
  );
};

const FQA = () => {
  const faqData = [
    { question: '1주일 최대 근로 시간', answer: '1주 간의 근로시간은 휴게시간을 제외하고 40시간을 초과할 수 없습니다. (근로기준법 제 4장 제50조 1)' },
    { question: '1일 최대 근로 시간', answer: '1일의 근로시간은 휴게시간을 제외하고 8시간을 초과할 수 없습니다. (근로기준법 제 4장 제50조 2항)' },
    { question: '근로기준법 적용 인원', answer: '근로기준법은 상시 5명 이상의 근로자를 사용하는 모든 사업 또는 사업장에 적용합니다. (근로기준법 제11조(적용 범위))' },
    { question: '휴게 시간', answer: '근로자는 8시간 연속 근로 후에는 적어도 1시간의 휴게시간을 가져야 합니다. (근로기준법 제16조(휴게시간))' },
    { question: '야간 근로 추가 수당', answer: '근로자가 야간(22시부터 익일 06시까지)이나 휴일에 근로하는 경우 추가 수당을 지급해야 합니다. (근로기준법 제18조(야간 및 휴일 근로))' },
    { question: '해고 통지', answer: '사용자는 근로자를 해고하려면 해고사유와 해고시기를 서면으로 통지하여야 합니다. (근로기준법 제27조(해고사유 등의 서면통지))' },
    { question: '해고 예고', answer: '사용자는 근로자를 해고(경영상 이유에 의한 해고를 포함한다)하려면 적어도 30일 전에 예고를 하여야 하고, 30일 전에 예고를 하지 아니하였을 때에는 30일분 이상의 통상임금을 지급하여야 합니다. 다만, 다음 각 호의 어느 하나에 해당하는 경우에는 그러하지 아니합니다. (근로기준법 제26조(해고의 예고))' },
    { question: '근로자 차별', answer: '사용자는 근로자에 대하여 남녀의 성(性)을 이유로 차별적 대우를 하지 못하고, 국적ㆍ신앙 또는 사회적 신분을 이유로 근로조건에 대한 차별적 처우를 하지 못합니다. (근로기준법 제6조(균등한 처우))' }
  ];

  return (
    <div className='FQA'>
      <h1>자주 묻는 질문</h1>
      {faqData.map((item, index) => (
        <FAQItem key={index} question={`Q. ${item.question}`} answer={`A. ${item.answer}`} />
      ))}
      <Link to="/Chat" style={{ textDecoration: "none" }}>
        <button className='homeBtn'>
          챗봇에게 질문하기
        </button>
      </Link>
    </div>
  );
}

export default FQA;