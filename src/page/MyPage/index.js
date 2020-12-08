import { firestore, auth } from '../../firebase';

import React, { useContext, useEffect, useState } from "react";
import "../../App.css";
import Text from "../../components/Text";
import { UserContext } from "../../providers/UserProvider";

import * as colors from '../../data/constants';

import { Logo } from '../../data/images/index';

import "./mypage.css";


// dummy data
const GAME_DATA = [
  {
    game_id: '1234',
    results: 54,
    score: 132,
    category_list: ['1900년 태어남', '대한민국의 사람'],
    date: '2020-11-23'
  },
  {
    game_id: '1234',
    results: 2,
    score: null,
    category_list: ['대한민국의 사람', '대한민국의 사람'],
    date: '2020-11-23'
  },
  {
    game_id: '1234',
    results: 101,
    score: 67,
    category_list: ['1800년 설치', '대한민국의 사람'],
    date: '2020-11-23'
  },
]

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
      history.push({pathname: '/login', state: { go: `mypage` }})
    }
  });
  }, [])

  const logOut = () => {
    auth.signOut();
  }

  return (
    <div style={{display: 'flex', flex: 1}}>
        <div className="background" style={{marginBottom: 200}}>
            <Logo onClick={() => history.push('/')} />
            <div className="line" style={{marginTop: 12, marginBottom: 8}} />
              <div className="VPink f24">MyPage</div>
            <div className="line" style={{marginTop: 12}} />

            <div className="mypage-profile-card">
                <div className="mypage-profile-content">
                  <div style={{flexDirection: 'row', display: 'flex'}}>
                    <div className="LeftSDGreen f16">Hello, {` `}</div>
                    <div className="LeftSDGreen f16 fbold">
                      {user !== null ? user.displayName : 'Stranger'}
                    </div>
                  </div>
                    <div className="LeftSDGreen f14">
                        You are currently logged in with
                    </div>
                    <div className="LeftSDGreen f14 fbold" style={{fontWeight: "bold"}}>
                        {user !== null ? user.email : 'no current email'}
                    </div>
                </div>
                <div className="logout-btn" onClick={() => logOut()}>
                  <div className="LeftSDGreen f12">logout</div>
                </div>
            </div>

            <div className="VPink f24" style={{marginTop: 24, marginBottom: 16}}>My Game</div>


            {GAME_DATA.map((item, index) => {
              return(
                <div className="mypage-category-box">
                    <div className="SDPink-lh24 f16 fbold">
                        {item.results} Results | {item.score!==null && `${item.score} | `}{item.category_list[0]}
                    </div>
                    <div className="LeftSDPink f12">
                        {item.date.slice(5,7)} {item.date.slice(8,10)}. {item.date.slice(0,4)}
                    </div>
                </div>
              )
            })}
        </div>
    </div>
  )
}

export default MyPage;