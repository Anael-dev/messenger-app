import React from "react";
import { Route, Switch } from "react-router";
import ChatRoom from "./ChatRoom/ChatRoom";
import DefaultPage from "./DefaultPage/DefaultPage";

const ChatTab = () => {
  return (
    <Switch>
      <Route exact path='/chats' component={DefaultPage} />
      <Route path='/people' component={DefaultPage} />
      <Route path='/chats/room/:roomId' component={ChatRoom} />
      <Route path='/people/room/:roomId' component={ChatRoom} />
    </Switch>
  );
};
export default ChatTab;
