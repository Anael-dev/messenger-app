import React, { useContext } from "react";
import ChatTab from "../ChatTab/ChatTab";
import RoomsTab from "../RoomsTab/RoomsTab";
import { auth, db } from "../../../firebase/base";
import { AuthContext } from "../../../firebase/auth";
import "./DashBoard.css";

function Dashboard() {
  const { currentUser } = useContext(AuthContext);

  const signOut = async () => {
    auth.signOut();
    await db.collection("users").doc(currentUser.uid).update({
      active: false,
    });
  };

  return (
    <div className='dashboard'>
      <button onClick={() => signOut()}>Sign out</button>
      <div className='dashboard__body'>
        <RoomsTab />
        <ChatTab id={"P1OMZ2sOKVHjXy7UL2XF"} />
      </div>
    </div>
  );
}

export default Dashboard;
