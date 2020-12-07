import React, { useContext, useState } from "react";
import { firestore, auth } from '../../firebase';
import "../../App.css";
import Text from "../../components/Text";
import { useLocation } from "react-router-dom";

import * as colors from '../../data/constants';

import './result.css';

import { Name } from '../../data/images/index';

import { UserContext } from "../../providers/UserProvider";

const ResultPage = ({history}) => {
  const location = useLocation();
  const [result, setResult] = useState([]);

  const { user, setUser, language, setLanguage } = useContext(UserContext);

  React.useEffect(() => {
      if (location.state !== undefined){
        let data = location.state.result;
        console.log('result', data);
        setResult(data);
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


  return (
    <div style={{display: 'flex', flex: 1}}>
        <div className="background" style={{marginBottom: 200}}>
            <Name onClick={() => history.push('/')} />
            <div className="line" style={{marginTop: 12}} />

            <div className="result-card-back">
                <div className="result-card">
                    <div className="result-card-content">
                        <Text size={32} color="green">
                            {result.length} Results
                        </Text>
                    </div>
                 </div>
            </div>
            

            <div style={{display: 'flex', width: '100%', marginTop: 24, flexDirection: 'column'}}>
                {result.map((item, index) => {
                    return(
                        <div className="result-category-box" onClick={() => window.location.href = `http://${language}.wikipedia.org/wiki/${item.title}`}>
                            <Text size={16} bold color={'pink'}>
                                {item.title}
                            </Text>
                        </div>
                    )
                })}
             </div>
            
        </div>

        <div className="result-pc-floating">
            <div className="result-floating up">
                <div className="styled-btn" 
                style={{height: 32}}
                onClick={() => {}}>
                <Text size={12} color={'pink'}>더보기</Text>
                </div>
            </div>

             <div className="result-floating" style={{justifyContent: 'space-between'}}>
                <div className="styled-btn" 
                onClick={()=>{history.push('/mypage')}}
                style={{backgroundColor: colors.green, marginRight: 8}}>
                <Text size={24} color={'pink'}>MyPage</Text>
                </div>
                <div className="styled-btn"
                onClick={()=>{history.push(`game/${language}`)}}
                style={{backgroundColor: colors.pink, marginLeft: 8}}>
                <Text size={24} color={'green'}>Start Crafting</Text>
                </div>
            </div>
        </div>


    </div>
  )
}

export default ResultPage;