import React, { useContext, useState } from "react";
import { auth, database } from '../../firebase';
import { useLocation } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";

import "../../App.css";
import * as colors from '../../data/constants';
import './result.css';
import { Name, IconStar } from '../../data/images/index';
import { Row, Col, Spinner } from 'react-bootstrap';
import { set } from "lodash-es";




const ResultPage = ({history}) => {
  const location = useLocation();
  const { user, setUser, language, setLanguage } = useContext(UserContext);

  const [result, setResult] = useState([]);
  const [score, setScore] = useState([])
  const [categoryList, setCategoryList] = useState([]);

  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(true)

  var ref = database.ref('results/');

 
  React.useEffect(() => {
      if (location.state !== undefined){
        let data = location.state;
        console.log('result', data);
        setResult(data.result);
        setScore(data.score);
        setCategoryList(data.category);

        // 게임페이지에서 받아온 게임 데이터 저장
        var res = ref.push({
          cats: data.category,
          score: data.score,
          wikiresults: data.result,
          displayName: user !== null ? user.displayName : 'Stranger'
        })

        // 현재 게임의 키값
        let nowKey = res.key

        // 저장한 이후의 전체 게임 데이터 정렬해서 가져오기
        var sort = ref.orderByChild('score');
        sort.once('value').then((snapshot) => {
          let newState = [];
          let keys = Object.keys(snapshot.val())
          let results = snapshot.val()

          // console.log(results[nowKey])
          
          // snapshot.forEach(function(childSnapshot) {
          //     newState.push({
          //         key: '',
          //         cats: childSnapshot.val().cats,
          //         score: childSnapshot.val().score,
          //         wikiresults: childSnapshot.val().wikiresults,
          //         displayName: childSnapshot.val().displayName,
          //     });
          // });

          for (var i = 0; i<keys.length; i++) {
            var k = keys[i];
            var scoreData = {
              key: k,
              score : results[k].score,
              name : results[k].displayName,
              category : results[k].cats,
              wikiresults: results[k].wikiresults,
            }
            newState.push(scoreData);
          }
          
          //여기서 정렬
          newState.sort(function(a,b){
            return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
          });
          // newState = newState.reverse();
          // console.log(newState);

          for (var i = 0; i<newState.length; i++) {
            if (nowKey === newState[i].key) {
              setRank(i + 1);
              console.log('rank: ', i + 1)
            }
          }
        })
        .catch((e) => console.log(e))
      }
       
    }, [location]);


  React.useEffect(() => {
    auth.onAuthStateChanged(function(userData){
    if(userData){
      if(location.state === undefined) history.push('/')
    } else {
      alert('로그인이 필요합니다.')
      history.push({pathname: '/login', state: { go: `/` }})
    }
  });
  }, [])

  React.useEffect(() => {
    if (rank !== null) setLoading(false)
  }, [rank])


  return (
    <div style={{display: 'flex', flex: 1, height: '100%', width: '100%'}}>
        <div className="background" style={{paddingBottom: 100, boxSizing: 'content-box'}}>

          {loading 
          ?
          <div style={{display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Spinner animation="border" variant="light" />
          </div>
          :
          <>
            <div className="VPink f32">
              {rank <= 100
              ?
                'CONGRATULATIONS!'
              :
                'GAME OVER'
              }
            </div>
            <div className="line" style={{marginTop: 12}} />
            
            {rank <= 100 &&
            <>
            <div className="result-card-back">
                <div className="result-rank">
                    <div className="result-rank-content">
                      <div style={{width: '100%', flexDirection: 'row', display: 'flex', flex: 1}}>
                        <Col xs={6} lg={6}>
                          <div className="VGreen f16">score</div>
                          <div className="VGreen f32">{score}</div>
                        </Col>
                        <div style={{width: 1, height: '100%', backgroundColor: colors.green}} />
                        <Col xs={6} lg={6}>
                          <div className="VGreen f16">ranking</div>
                          <div className="VGreen f32">{rank}</div>
                        </Col>
                      </div>

                      <div className="SDGreen-lh24 s14" style={{marginTop: 24}}>
                          이번 게임의 결과로 TOP100에 들어가게 됐다, 두번째 줄 여기는 선택한 위키 언어로 나오면 되겠다. 
                      </div>
                    </div>

                    <div className="go-leader" onClick={() => history.push('/board')}>
                      <div className="LeftSDGreen f12">리더보드 확인하기</div>
                    </div>
                 </div>
            </div>

            <IconStar style={{marginTop: 24, marginBottom: 8}} />
            </>
            }

            <div className="result-card-back">
                <div className="result-card">
                    <div className="result-card-content">
                      <div className="VGreen f24">total of</div>
                        <div className="VGreen f48">
                          {result.length}
                        </div>
                        <div className="VGreen f24">results</div>
                    </div>
                 </div>
            </div>
            <div style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
              {categoryList.map((item, index) => {
                return(
                  <>
                  {index + 1 === categoryList.length
                  ?
                    <div
                      className="result-category-box"
                      style={{marginRight: 0}}
                    >
                      <div className="LeftSDPink f12">
                        {item.length > 5
                        ?
                          `${item.slice(0, 6)} …`
                        :
                          `${item}`
                        }
                      </div>
                  </div>
                  :
                    <div
                      className="result-category-box"
                    >
                      <div className="LeftSDPink f12">
                        {item.length > 5
                        ?
                          `${item.slice(0, 6)} …`
                        :
                          {item}
                        }
                      </div>
                  </div>
                  }
                  </>
                )
              })}
            </div>

            {rank > 100 &&
              <Row style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0}}>
                <Col xs={3} lg={3} style={{padding: 0}}><div className="line"/></Col>
                <Col xs={6} lg={6} style={{padding: 0}}><div className="VPink f24">score of {score}</div></Col>
                <Col xs={3} lg={3} style={{padding: 0}}><div className="line"/></Col>
              </Row>
            }


            {result.length === 1 &&
              <div className="LeftSDPink f14 fbold" style={{marginTop: 24}}>축하합니다. 해내셨네요!</div>
            }
            {result.length === 0 &&
              <div className="result-page-box" style={{marginTop: 24, justifyContent: 'center', flexDirection: 'column'}}>
                <div className="SDPink-lh24 f16" style={{marginBottom: 8}}>안타깝네요!</div>
                <div className="SDPink-lh24 f14">이번 게임의 결과로 TOP100에 들어가게 됐다, 어쩌구 저쩌구 두번째 줄 여기는 선택한 위키 언어로 나오면 되겠다. </div>
              </div>
            }  

            <div style={{display: 'flex', width: '100%', marginTop: 24, flexDirection: 'column', paddingBottom: 100}}>
                {result.map((item, index) => {
                    return(
                        <div 
                          className="result-page-box" 
                          style={{height: result.length === 1 ? 80 : 'auto'}}
                          onClick={() => window.location.href = `http://${language}.wikipedia.org/wiki/${item.title}`}>
                            <div className="SDPink f16">
                                {item.title}
                            </div>
                            <div className="SDPink f16">ᐳ</div>
                        </div>
                    )
                })}
             </div>
             </>
            }
        </div>

        <div className="result-pc-floating">
            {/* <div className="result-floating up">
                <div className="styled-btn" 
                style={{height: 32}}
                onClick={() => {}}>
                <Text size={12} color={'pink'}>더보기</Text>
                </div>
            </div> */}

             <div className="result-floating" style={{justifyContent: 'space-between'}}>
               <div className="styled-btn"
                onClick={()=>{history.push(`game/${language}`)}}
                style={{backgroundColor: colors.green, marginRight: 8}}>
                  <div className="VPink f24">Replay</div>
                </div>
                <div className="styled-btn" 
                onClick={()=>{history.push('/mypage')}}
                style={{backgroundColor: colors.pink, marginLeft: 8}}>
                  <div className="VGreen f24">MyPage</div>
                </div>
            </div>
        </div>


    </div>
  )
}

export default ResultPage;