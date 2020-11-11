import React, { useState } from "react";
import "../../App.css";
import Text from "../../components/Text";

import * as colors from '../../data/constants';

import './index'

const LandingPage = ({history}) => {
  const [language, setLanguage] = useState('ko');


  return (
    <div style={{display: 'flex', flex: 1}}>
    {/* <StyledBackground>
      <Text size={40} bold color={'pink'}>
        Knowledgesmith
      </Text>
      <div style={{display: "flex", justifyContent: 'space-between'}} >
        <Text size={12} color={'pink'}>
          지식 세공사:
        </Text>
        <Text size={12} color={'pink'}>
          분류의 기술
        </Text>
      </div>
      <StyledFloating style={{bottom: 84, justifyContent: 'space-between'}}>
        <StyledBtn 
        onClick={()=>setLanguage('ko')}
        style={{height: 32, backgroundColor: language === 'ko' ? colors.pink : colors.green}}>
          <Text size={12} bold color={language === 'ko' ? 'green' : 'pink'}>한국어</Text>
        </StyledBtn>
        <StyledBtn 
        onClick={()=>setLanguage('en')}
        style={{height: 32, backgroundColor: language === 'en' ? colors.pink : colors.green}}>
          <Text size={12} bold color={language === 'en' ? 'green' : 'pink'}>English</Text>
        </StyledBtn>
      </StyledFloating>

      <StyledFloating>
        <StyledBtn onClick={() => {history.push(`/game/${language}`)}}>
          <Text size={24} bold color={'pink'}>Start Crafting</Text>
        </StyledBtn>
      </StyledFloating>
    </StyledBackground> */}
    </div>
  );
};

export default LandingPage;
