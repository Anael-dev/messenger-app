import React from "react";
import "./Rooms.css";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

const Rooms = ({ rooms }) => {
  return (
    <div className='rooms-container'>
      {rooms.length > 0 &&
        rooms.map((room) => {
          return (
            <Link key={room.id} to={`/chat/${room.id}`}>
              <div className='room'>
                <Avatar />
                <div className='room__info'>
                  <h2>{room.name}</h2>
                  <div className='room__details'>
                    <p>Last message</p>
                    <p>time</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

/* <Link to={`/chat/1`}>
        <div className='room'>
          <Avatar />
          <div className='room__info'>
            <h2>Room Name</h2>
            <div className='room__details'>
              <p>Last message</p>
              <p>time</p>
            </div>
          </div>
        </div>
      </Link>
      <Link to={`/chat/2`}>
        <div className='room'>
          <Avatar />
          <div className='room__info'>
            <h2>Room Name</h2>
            <div className='room__details'>
              <p>Last message</p>
              <p>time</p>
            </div>
          </div>
        </div>
      </Link>{" "}
      <Link to={`/chat/3`}>
        <div className='room'>
          <Avatar />
          <div className='room__info'>
            <h2>Room Name</h2>
            <div className='room__details'>
              <p>Last message</p>
              <p>time</p>
            </div>
          </div>
        </div>
      </Link>{" "}
      <Link to={`/chat/4`}>
        <div className='room'>
          <Avatar />
          <div className='room__info'>
            <h2>Room Name</h2>
            <div className='room__details'>
              <p>Last message</p>
              <p>time</p>
            </div>
          </div>
        </div>
      </Link> */

/* {users.length > 1 && (
        <div>
          {users.map((x, i) => {
            if (x.id !== userId)
              return (
                <div className='sidebar-chat' key={i}>
                  <Avatar />
                  <div className='sidebar-chat-info'>
                    <Link to={`/chat/${x.id}`}>
                      <h2>{x.name}</h2>
                    </Link>
                    <p>Last message</p>
                  </div>
                </div>
              );
          })}
        </div>
      )} */

export default Rooms;
