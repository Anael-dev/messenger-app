import React from "react";
import { Route, Switch } from "react-router";
import ChatRoom from "./ChatRoom/ChatRoom";
import DefaultPage from "./DefaultPage/DefaultPage";

const ChatTab = () => {
  return (
    <Switch>
      <Route exact path='/' component={DefaultPage} />
      <Route path='/chat/:roomId' component={ChatRoom} />
    </Switch>
  );
};
export default ChatTab;
