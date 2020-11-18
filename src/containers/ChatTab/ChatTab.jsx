import React from "react";
import { Route, Switch } from "react-router";
import ChatRoom from "../../components/ChatRoom/ChatRoom";
import DefaultPage from "../../components/DefaultPage/DefaultPage";

const ChatTab = () => {
  return (
    <Switch>
      <Route exact path='/dashboard/chats' component={DefaultPage} />
      <Route exact path='/dashboard/users' component={DefaultPage} />
      <Route path='/dashboard/chats/room/:roomId' component={ChatRoom} />
      <Route path='/dashboard/users/room/:roomId' component={ChatRoom} />
    </Switch>
  );
};
export default ChatTab;
