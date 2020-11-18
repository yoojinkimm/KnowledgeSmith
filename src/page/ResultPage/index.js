import React, { useState } from "react";
import "../../App.css";
import Text from "../../components/Text";
import { useLocation } from "react-router-dom";

import * as colors from '../../data/constants';

import './result.css';

const ResultPage = ({history}) => {
  const location = useLocation();
  const [result, setResult] = useState([]);
  const [language, setLanguage] = useState([]);

  React.useEffect(() => {
      if (location.state !== undefined){
        let data = location.state.result;
        let lan = location.state.language;
        console.log('result', data);
        console.log('lan', lan);
        setResult(data);
        setLanguage(lan);
      }
       
    }, [location]);


  return (
    <div style={{display: 'flex', flex: 1}}>
        <div className="background" style={{marginBottom: 200}}>
            <Text size={40} bold color={'pink'}>
                Knowledgesmith
            </Text>
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
                        <div className="result-category-box">
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
                <Text size={12} bold color={'pink'}>더보기</Text>
                </div>
            </div>

             <div className="result-floating" style={{justifyContent: 'space-between'}}>
                <div className="styled-btn" 
                onClick={()=>{history.push('/')}}
                style={{backgroundColor: colors.green, marginRight: 8}}>
                <Text size={24} bold color={'pink'}>Home</Text>
                </div>
                <div className="styled-btn"
                onClick={()=>{history.push(`game/${language}`)}}
                style={{backgroundColor: colors.pink, marginLeft: 8}}>
                <Text size={24} bold color={'green'}>Start Crafting</Text>
                </div>
            </div>
        </div>


    </div>
  )
}

export default ResultPage;