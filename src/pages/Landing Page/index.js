import React, { useState } from "react";
import "../../App.css";
import Text from "../../components/Text";

import * as colors from '../../data/constants';
import styled from 'styled-components';

const LandingPage = () => {
  const [language, setLanguage] = useState('ko');


  return (
    <div style={{display: 'flex', flex: 1}}>
    <StyledBackground>
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
    </StyledBackground>
    <StyledBtn>
      <Text size={24} bold color={'pink'}>Start Crafting</Text>
    </StyledBtn>
    </div>
  );
};

export default LandingPage;

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
  position: absolute;
  bottom: 24px;
  left: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.green};
  border: 0.5px solid ${colors.pink};
  height: 48px;
`;
