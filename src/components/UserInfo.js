import React from "react";
import { chainIdList } from "./chainList";

function UserInfo({account, currentNetworkId}) {

  function getNetworkName(currentNetworkId) {
    if (currentNetworkId in chainIdList) {
      return chainIdList[currentNetworkId]
    } else {
      return "Invalid network, please select a network from the list below."
    }
  }

  function renderUserInfo() {
    if (account !== null) {
      return (
        <div>
          <p>Your account: {account}</p>
          <p> Current Network: {getNetworkName(currentNetworkId)} </p>
        </div>
      );
    } else {
      return (
        <div>
          <p> 
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