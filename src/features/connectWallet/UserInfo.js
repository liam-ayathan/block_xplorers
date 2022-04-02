import React from "react";
import { useSelector } from "react-redux";

function UserInfo() {
  const account = useSelector((state) => state.appSlice.account)

  function renderUserInfo() {
    if (account !== null) {
      return (
        <div>
          <p className="desc">Your account: {account}</p>
        </div>
      );
    } else {
      return (
        <div>
          <p className="desc"> 
            Please connect your Metamask account.
          </p>
        </div>
      );
    }
  }

  return (
    <div>
      {renderUserInfo()}
    </div>
  )
        
}


export default UserInfo;