import React, { useEffect, useState } from "react";
import "../../App.css";
import {Text, CardDeck} from '../../components';

import * as colors from '../../data/constants';

import axios from 'axios';

import cardData from '../../data/cardData';

import './game.css';


const GameCardPage = (props) => {
  const {language, history} = props;

  const [selectedCategory, setSelectedCategory] = useState([])
  const [selectedPage, setSelectedPage] = useState([]);

  // wiki api 요청하는 기본 url
  const base_url = `https://${language}.wikipedia.org/w/api.php?`;


  // 이전에 선택한 카테고리와 겹치는 페이지만 새로 저장하는 함수
  const filterPage = (data) => {
    // 처음엔 비교 안하고 새로 저장함
    if(selectedPage === null) setSelectedPage(data)
    else {
      const list = []
      for(let i=0; i<data.length; i++){
        for(let j=0; j<selectedPage.length; j++){
          if (data[i].pageid === selectedPage[j].pageid) list.push(data[i])
        }
      }
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

      try {
        const result = await axios.get(`${base_url}${categoryPage_url}`);
        filterPage(result.data.query.categorymembers)
        // console.log(result.data.query.categorymembers);
      } catch (e) {
        console.log(e)
      }
  }


  // 위키피디아의 모든 카테고리를 불러오는 함수
  const searchAllCategory = async () => {
    /* 중간에 &origin=* 이거 반드시 넣어야 cors 안 막힘 */
    const category_url = `action=query&format=json&list=allcategories&origin=*&aclimit=1000`

    try {
    const result = await axios.get(`${base_url}${category_url}`);
    } catch (e) {
        console.log(e)
      }

    // ... 랜덤으로 카테고리 선택하는 로직 필요
  }


  // 해당 카테고리의 하위 카테고리를 불러오는 함수
  const searchSubCategory = async (categoryQuery) => {
    const subcategory_url = `action=query&format=json&list=categorymembers&origin=*&cmtitle=Category:${categoryQuery}&cmtype=subcat`

    try{
    const result = await axios.get(`${base_url}${subcategory_url}`);
    console.log(result.data.query)
    setSelectedCategory(result.data.query)
    } catch (e) {
        console.log(e)
      }
  }

  useEffect(() => {
    // searchPage('그래프 이론')
    // searchPage('그래프 알고리즘')
    searchSubCategory('사람')
  }, [])


  return (
    <div style={{display: 'flex', flex: 1}}>
        <div className="background">
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Text size={40} bold color={'pink'}>
                    Knowledgesmith
                </Text>
            </div> 

            <CardDeck data={cardData} />
        </div>

         <div className="floating" style={{justifyContent: 'space-between'}}>
            <div className="styled-btn"
            onClick={()=>{}}
            style={{height: 32, backgroundColor: colors.green}}>
                <Text size={12} bold color={'pink'}>Pass</Text>
            </div>
            <div className="styled-btn"
            onClick={()=>{}}
            style={{height: 32, backgroundColor: colors.pink}}>
                <Text size={12} bold color={'green'}>Flip</Text>
            </div>
        </div>
    </div>
    );
};

export default GameCardPage;
