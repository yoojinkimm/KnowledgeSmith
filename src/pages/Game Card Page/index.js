import React, { useEffect, useState } from "react";
import "../../App.css";
import Text from "../../components/Text";

import * as colors from '../../data/constants';
import styled from 'styled-components';

import SwipeableViews from 'react-swipeable-views';

import axios from 'axios';

const styles = {
  slide: {
    padding: 15,
    height: 520,
    backgroundColor: colors.pink,
    color: colors.green,
  }
};

const GameCardPage = () => {
  const [language, setLanguage] = useState('ko');
  const [data, setData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState([])

  const searchWiki = async () => {
      /* 중간에 &origin=* 이거 반드시 넣어야 cors 안 막힘 */
      const base_url = `https://${language}.wikipedia.org/w/api.php?`;
      const searchQuery = '김연아';
      const search_url = `format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts|pageimages&pithumbsize=400&origin=*&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${searchQuery}`

      const category_url = `action=query&format=json&list=allcategories&origin=*&aclimit=200`

      const categoryQuery = '그래프 이론'
      const categorySecond = '그래프 알고리즘'
      const subcategory_url = `action=query&format=json&list=categorymembers&origin=*&cmtitle=Category:${categoryQuery}&cmtype=subcat`
      const categoryPage_url = `action=query&format=json&list=categorymembers&origin=*&cmtitle=Category:${categoryQuery}&Category:${categorySecond}&cmlimit=100`

      const result = await axios.get(`${base_url}${categoryPage_url}`);
      setData(result.data.query)
      console.log(result.data.query);
  }

  useEffect(() => {
    searchWiki();
  }, [])

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
