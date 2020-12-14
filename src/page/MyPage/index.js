import { auth, database } from '../../firebase';

import React, { useContext, useEffect, useState } from "react";
import "../../App.css";
import Text from "../../components/Text";
import { UserContext } from "../../providers/UserProvider";

import * as colors from '../../data/constants';

import { Logo } from '../../data/images/index';
import { Spinner } from 'react-bootstrap'

import "./mypage.css";


const MyPage = ({history}) => {
  const { user, setUser, language, setLanguage } = useContext(UserContext);

  const [myData, setMyData] = useState(null);
  var ref = database.ref('results/');


  useEffect(() => {
    auth.onAuthStateChanged(function(userData){
    if(userData){
      // console.log('userData :' , userData);
      // console.log('user: ', user);
      // console.log('local: ', localStorage.getItem('uid'))
      
    }else{
      alert('로그인이 필요합니다.')
      history.push({pathname: '/login', state: { go: `mypage` }})
    }
  });

  }, [])

  useEffect(() => {
    ref.once('value').then((snapshot) => {
          let newState = [];
           let keys = Object.keys(snapshot.val())
          let results = snapshot.val()

          for (var i = 0; i<keys.length; i++) {
            var k = keys[i];

            if (user !== null && results[k].displayName === user.displayName){
              var scoreData = {
                key: k,
                score : results[k].score,
                name : results[k].displayName,
                category : results[k].cats,
                wikiresults: results[k].wikiresults === undefined ? [] : results[k].wikiresults,
              }
              newState.push(scoreData);
              // console.log(results[k].wikiresults)
            }
          }
          
          setMyData(newState);
          // console.log(newState);
        })
        .catch((e) => {
          // console.log(e)
        })
  }, [user])

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


            { myData === null
            ?
            <Spinner animation="border" variant="light" />
            :
            <>
              { myData !== null && myData.map((item, index) => {
                return(
                  <div className="mypage-category-box">
                      <div className="SDPink-lh24 f16 fbold">
                          {item.wikiresults.length} Results | {item.score!==null && `${item.score} | `}{item.category[0]}
                      </div>
                      <div className="LeftSDPink f12">
                          {/* {item.date.slice(5,7)} {item.date.slice(8,10)}. {item.date.slice(0,4)} */}
                      </div>
                  </div>
                )
              })}
            </>
            }
        </div>
    </div>
  )
}

export default MyPage;