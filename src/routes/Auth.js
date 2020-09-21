import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail ] =  useState("");
  const [password, setPassword ] = useState("");
  const [newAccount, setNewAccount ] = useState(true);
  const [error, setError ] = useState("") 
  const onChange = (event) => {
    const {target : {name, value} } =event;
    if(name ==="email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const { target : { name }} = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if(name ==="github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  
  }
  const onSubmit = async (event) => {
    event.preventDefault(); // 기본적으로 실행되는 이벤트를 막음
    try {
      let data;
      if(newAccount) {
        // create account
        data = await authService.createUserWithEmailAndPassword(
          email, password
        )
      } else {
        // Log in
        data = await authService.signInWithEmailAndPassword(
          email, password
        )
      }
      console.log(data);
    } catch (error) {
      setError(error.message)
    }
  }
  return (
  <div>
    <form onSubmit={onSubmit}>
      <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}></input>
      <input name="password" type="password" placeholder="Password" required valie={password} onChange={onChange}></input>
      <input type="submit" value={newAccount ? "Create Account":"Sign In"} />
    {error}
    </form>
    <span onClick={toggleAccount}>
      {newAccount ? "Sign In" : "Create Account"}
    </span>
    <div>
      <button onClick={onSocialClick} name="google">Continue with Google</button>
      <button onClick={onSocialClick} name="github">Continue with Github</button>
    </div>
    {error}
  </div>
  )
}
export default Auth;