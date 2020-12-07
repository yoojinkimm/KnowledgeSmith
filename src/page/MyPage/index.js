import { firestore, auth } from '../../firebase';

import React, { useContext, useEffect, useState } from "react";
import "../../App.css";
import Text from "../../components/Text";
import { UserContext } from "../../providers/UserProvider";

import * as colors from '../../data/constants';

import { Name, GoogleIcon } from '../../data/images/index';

import "./mypage.css";

const MyPage = ({history}) => {
  const { user, setUser, language, setLanguage } = useContext(UserContext);

  useEffect(() => {
    auth.onAuthStateChanged(function(userData){
    if(userData){
      console.log('userData :' , userData);
      console.log('user: ', user);
      console.log('local: ', localStorage.getItem('uid'))
      
    }else{
      alert('로그인이 필요합니다.')
      history.push('/login')
    }
  });
  }, [])

  const logOut = () => {
    auth.signOut();
  }

  return (
    <div style={{display: 'flex', flex: 1}}>
        <div className="background" style={{marginBottom: 200}}>
            <Name onClick={() => history.push('/')} />
            <div className="line" style={{marginTop: 12}} />

            <div className="mypage-back">
                <div className="styled-btn" 
                style={{height: 40, marginTop: 150}}
                onClick={() => logOut()}>
                    <Text size={20} color={'pink'}>Logout</Text>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default MyPage;