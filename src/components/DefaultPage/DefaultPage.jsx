import React from "react";
import "./DefaultPage.scss";
import bgDefault from "../../images/illustrations/undraw_work_chat_erdt.svg";
const DefaultPage = () => {
  return (
    <div className='default-page__container'>
      <div className='default-page__content'>
        <img src={bgDefault} alt='default logo' />
        <h3>It's nice to chat with someone</h3>
        <p>Pick a person from the users tab and start a conversation</p>
      </div>
    </div>
  );
};

export default DefaultPage;
