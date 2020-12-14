import { firestore, auth, database } from '../../firebase';

import React, { useContext, useEffect, useState } from "react";
import "../../App.css";
import Text from "../../components/Text";
import { UserContext } from "../../providers/UserProvider";

import * as colors from '../../data/constants';

import { Logo } from '../../data/images/index';

import { Row, Col, Spinner } from 'react-bootstrap';

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
  const [rankData, setRankData] = useState(null)

  var ref = database.ref('results/');

  useEffect(() => {
    auth.onAuthStateChanged(function(userData){
    if(userData){
      // console.log('userData :' , userData);
      // console.log('user: ', user);
      // console.log('local: ', localStorage.getItem('uid'))
      
    }else{
    // 여기도 로그인이 필요할까?
    //   alert('로그인이 필요합니다.')
    //   history.push({pathname: '/login', state: { go: `board` }})
    }


    var sort = ref.orderByChild('score');
        sort.once('value').then((snapshot) => {
          let newState = [];

          // console.log(results[nowKey])
          
          snapshot.forEach(function(childSnapshot) {
              newState.push({
                  cats: childSnapshot.val().cats,
                  score: childSnapshot.val().score,
                  wikiresults: childSnapshot.val().wikiresults === undefined ? [] : childSnapshot.val().wikiresults,
                  displayName: childSnapshot.val().displayName,
              });
          });

          // 점수 높은 순서대로 100위까지만 보여줌
          setRankData(newState.reverse().slice(0,101))
        })
        .catch((e) => {
          // console.log(e)
        })
  });
  }, [])


  return (
    <div style={{display: 'flex', flex: 1}}>
        <div className="background" style={{marginBottom: 200}}>
            <Logo onClick={() => history.push('/')} />
            <div className="line" style={{marginTop: 12, marginBottom: 8}} />
              <div className="VPink f24">Leaderboard</div>
            <div className="line" style={{marginTop: 12, marginBottom: 24}} />


            {rankData === null?
            <Spinner animation="border" variant="light" />
            :
            <>
            {rankData.map((item, index) => {
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
                                {`${item.wikiresults.length} Results | ${item.cats[0]}`}
                            </div>
                            <div className="LeftSDPink f12">
                                {item.displayName}
                            </div>
                    </Col>
                </Row>
              )
            })}
            </>
            }
        </div>
    </div>
  )
}

export default LeaderBoardPage;