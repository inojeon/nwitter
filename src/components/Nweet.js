import { dbService } from "fbase";
import React, { useState } from "react";

const Nweet = ( {nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you Sure you want to delete this nweet?")
    if(ok) {
      await dbService.doc(`nweets/${nweetObj.uid}`).delete();
    } else {

    }
  }

  return (

    <div>
      <h4>{nweetObj.text}</h4>
      {
        isOwner && (
          <>
            <button onClick={onDeleteClick}>Delete Button</button>
            <button>Edit Button</button>
          </>
        )
      }
    </div>
  )
};

export default Nweet;