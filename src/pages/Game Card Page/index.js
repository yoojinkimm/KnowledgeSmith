import React, { useState } from "react";
import "../../App.css";
import Text from "../../components/Text";

import * as colors from '../../data/constants';
import styled from 'styled-components';

import SwipeableViews from 'react-swipeable-views';

const styles = {
  slide: {
    padding: 15,
    height: 520,
    backgroundColor: colors.pink,
    color: colors.green,
  }
};

const GameCardPage = () => {
  const [language, setLanguage] = useState('en');


  return (
    <div style={{display: 'flex', flex: 1}}>
    <StyledBackground>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Text size={40} bold color={'pink'}>
                Knowledgesmith
            </Text>
        </div>
        <SwipeableViews
        enableMouseEvents
        springConfig={{duration: '0.3s', easeFunction: '...', delay: '0s'}}
        >
            <div style={Object.assign({}, styles.slide)}>
            1번이다
            </div>
            <div style={Object.assign({}, styles.slide)}>
            2번이다
            </div>
            <div style={Object.assign({}, styles.slide)}>
            3번이다
            </div>
        </SwipeableViews>
    </StyledBackground>

     <StyledFloating style={{justifyContent: 'space-between'}}>
      <StyledBtn 
      onClick={()=>setLanguage('ko')}
      style={{height: 32, backgroundColor: language === 'ko' ? colors.pink : colors.green}}>
        <Text size={12} bold color={language === 'ko' ? 'green' : 'pink'}>Pass</Text>
      </StyledBtn>
      <StyledBtn 
      onClick={()=>setLanguage('en')}
      style={{height: 32, backgroundColor: language === 'en' ? colors.pink : colors.green}}>
        <Text size={12} bold color={language === 'en' ? 'green' : 'pink'}>Flip</Text>
      </StyledBtn>
    </StyledFloating>
    </div>
  );
};

export default GameCardPage;

const StyledBackground = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: ${colors.green};
`;

const StyledBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.green};
  border: 0.5px solid ${colors.pink};
  height: 48px;
  width: 100%;
`;

const StyledFloating = styled.div`
  position: fixed;
  bottom: 24px;
  left: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
