import { firestore, auth, signInWithGoogle } from '../../firebase';

import React, { useContext, useEffect, useState } from "react";
import "../../App.css";
import Text from "../../components/Text";
import { UserContext } from "../../providers/UserProvider";

import * as colors from '../../data/constants';

import { Name, GoogleIcon } from '../../data/images/index';

import './login.css';

import { useLocation } from "react-router-dom";

const LoginPage = ({history}) => {
  const location = useLocation();
  const {user, setUser, language} = useContext(UserContext);

  
  const googleLogin = async () => {
    try {
        signInWithGoogle()
    } catch (e) {
        // console.log(e)
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged(function(userData){
    if(userData){
      setUser(userData)
      
      // console.log('userData :' , userData);
      // console.log('user: ', user);
      // console.log('local: ', localStorage.getItem('uid'))

      if(location.state !== undefined) {
        history.push(`/${location.state.go}`)
      }
      else history.push('/')
    }else{
      // alert('로그인이 필요합니다.')
    }
  });
  })

  return (
    <div style={{display: 'flex', flex: 1, height: '100%'}}>
        <div className="background" style={{marginBottom: 200}}>
            <Name onClick={() => history.push('/')} />
           <div className="line" style={{marginTop: 12, marginBottom: 8}} />
              <div className="VPink f24">Sign In</div>
            <div className="line" style={{marginTop: 12}} />

            <div className="login-back">
                <div className="google-btn" 
                onClick={() => googleLogin()}>
                    <GoogleIcon />
                    <div className="SDGreen f16" style={{marginLeft: 24}}>Sign in with Google</div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default LoginPage;