import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Nweet = ( {nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const [attachmentUrl, setAttachmentUrl] = useState(nweetObj.attachmentUrl)

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you Sure you want to delete this nweet?")
    if(ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    } 
  }
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  }
  const onChange = (event) => {
    const { target : { value }} = event;
    setNewNweet(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text:newNweet
    });
    setNewNweet("");
    setEditing(false);
  };

  return (
    <div>
      { editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input value={newNweet} onChange={onChange} type="text" placeholder={nweetObj.text} maxLength={120} />
            <input type="submit" value="Update" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {
            attachmentUrl && (
              <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
            )
          }
          {
            isOwner && (
              <>
                <button onClick={onDeleteClick}>Delete Button</button>
                <button onClick={toggleEditing}>Edit Button</button>
              </>
            )
          }
        </>
      )}
    </div>
  )
};

export default Nweet;