import React, { useEffect, useContext } from "react";
import ChatTab from "../ChatTab/ChatTab";
import RoomsTab from "../RoomsTab/RoomsTab";
import { auth, db } from "../../../firebase/base";
import { AuthContext } from "../../../firebase/auth";
import "./DashBoard.css";

function Dashboard() {
  const { currentUser } = useContext(AuthContext);

  const updateActiveStatus = async () => {
    await db.collection("users").doc(currentUser.uid).update({
      active: false,
      lastSeen: new Date(),
    });
  };

  const signOut = async () => {
    auth.signOut();
    updateActiveStatus();
  };

  //changing active status on window close
  useEffect(() => {
    window.addEventListener("beforeunload", async () => {
      // await signOut();
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className='dashboard'>
      {/* <button onClick={() => signOut()}>Sign out</button> */}
      <div className='dashboard__body'>
        <RoomsTab signOut={signOut} />
        <ChatTab />
      </div>
    </div>
  );
}

export default Dashboard;
