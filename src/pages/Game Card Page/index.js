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

const GameCardPage = (props) => {
  const {language, history} = props;
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedPage, setSelectedPage] = useState(null)

  // wiki api 요청하는 기본 url
  const base_url = `https://${language}.wikipedia.org/w/api.php?`;


  // 이전에 선택한 카테고리와 겹치는 페이지만 새로 저장하는 함수
  const filterPage = (data) => {
    // 처음엔 비교 안하고 새로 저장함
    if(selectedPage === null) setSelectedPage(data)
    else {
      const list = []
      data.map((dataItem)=>{
        selectedPage.map((selectedItem)=>{
          if (dataItem.pageid === selectedItem.pageId){
            list.push(dataItem)
          }
        })
      })
      console.log(list);
      setSelectedPage(list);
    }
  }


  // 해당 카테고리의 페이지 정보를 불러오는 함수
  const searchPage = async (categoryQuery) => {
      // 그냥 검색 url
      const searchQuery = '김연아';
      const search_url = `format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts|pageimages&pithumbsize=400&origin=*&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${searchQuery}`
      
      // const categoryQuery = '그래프 이론'
      const categoryPage_url = `action=query&format=json&list=categorymembers&origin=*&cmtitle=Category:${categoryQuery}&cmlimit=1000`

      const result = await axios.get(`${base_url}${categoryPage_url}`);
      filterPage(result.data.query)
      console.log(result.data.query);
  }


  // 위키피디아의 모든 카테고리를 불러오는 함수
  const searchAllCategory = async () => {
    /* 중간에 &origin=* 이거 반드시 넣어야 cors 안 막힘 */
    const category_url = `action=query&format=json&list=allcategories&origin=*&aclimit=1000`

    const result = await axios.get(`${base_url}${category_url}`);

    // ... 랜덤으로 카테고리 선택하는 로직 필요
  }


  // 해당 카테고리의 하위 카테고리를 불러오는 함수
  const searchSubCategory = async (categoryQuery) => {
    const subcategory_url = `action=query&format=json&list=categorymembers&origin=*&cmtitle=Category:${categoryQuery}&cmtype=subcat`

    const result = await axios.get(`${base_url}${subcategory_url}`);
  }

  useEffect(() => {
    searchAllCategory()
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
      onClick={()=>{}}
      style={{height: 32, backgroundColor: colors.green}}>
        <Text size={12} bold color={'pink'}>Pass</Text>
      </StyledBtn>
      <StyledBtn
      onClick={()=>{}}
      style={{height: 32, backgroundColor: colors.pink}}>
        <Text size={12} bold color={'green'}>Flip</Text>
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
