import { firestore, auth } from '../../firebase';

import React, { useContext, useEffect, useState } from "react";
import "../../App.css";
import Text from "../../components/Text";
import { UserContext } from "../../providers/UserProvider";

import * as colors from '../../data/constants';

import { Logo } from '../../data/images/index';

import { Row, Col, Container } from 'react-bootstrap';

import "./board.css";


// dummy data
const RANK_DATA = [
  {
    game_id: '1234',
    user_id: '1234',
    user_name: '김유진',
    results: 54,
    score: 132,
    category_list: ['1900년 태어남', '대한민국의 사람'],
  },
  {
    game_id: '1234',
    user_id: '1234',
    user_name: '김유진',
    results: 54,
    score: 132,
    category_list: ['1900년 태어남', '대한민국의 사람'],
  },
  {
    game_id: '1234',
    user_id: '1234',
    user_name: '김유진',
    results: 54,
    score: 132,
    category_list: ['1900년 태어남', '대한민국의 사람'],
  },
]

const LeaderBoardPage = ({history}) => {
  const { user, setUser, language, setLanguage } = useContext(UserContext);

  useEffect(() => {
    auth.onAuthStateChanged(function(userData){
    if(userData){
      console.log('userData :' , userData);
      console.log('user: ', user);
      console.log('local: ', localStorage.getItem('uid'))
      
    }else{
    // 여기도 로그인이 필요할까?
    //   alert('로그인이 필요합니다.')
    //   history.push({pathname: '/login', state: { go: `board` }})
    }
  });
  }, [])


  return (
    <div style={{display: 'flex', flex: 1}}>
        <div className="background" style={{marginBottom: 200}}>
            <Logo onClick={() => history.push('/')} />
            <div className="line" style={{marginTop: 12, marginBottom: 8}} />
              <div className="VPink f24">Leaderboard</div>
            <div className="line" style={{marginTop: 12, marginBottom: 24}} />


            {RANK_DATA.map((item, index) => {
              return(
                <Row style={{width: '100%', display: 'flex', alignItems: 'center', marginBottom: 16}}>
                    <Col xs={2} xl={2}>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <div className="VPink f24">{index + 1}</div>
                            <div className="LeftSDPink f12 fbold">{item.score}</div>
                        </div>
                    </Col>
                    <Col xs={10} xl={10} className="rank-category-box">
                            <div className="SDPink-lh24 f16 fbold">
                                {`${item.results} Results | ${item.category_list[0]}`}
                            </div>
                            <div className="LeftSDPink f12">
                                {item.user_name}
                            </div>
                    </Col>
                </Row>
              )
            })}
        </div>
    </div>
  )
}

export default LeaderBoardPage;