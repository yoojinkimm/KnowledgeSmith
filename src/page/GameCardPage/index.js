import React, { useEffect, useState } from "react";
import "../../App.css";
import {Text, CardDeck} from '../../components';

import * as colors from '../../data/constants';

import axios from 'axios';

import cardData from '../../data/cardData';

import './game.css';

import { Swipeable, direction } from 'react-deck-swiper';


const GameCardPage = (props) => {
  const {language, history} = props;
  const [selectedCategory, setSelectedCategory] = useState([])
  const [selectedPage, setSelectedPage] = useState([]);

  const [showMainCategory, setShowMainCategory] = useState([]);
  const [showSubCategory, setShowSubCategory] = useState([])

  const [cardIndex, setCardIndex] = useState(0);

  // wiki api 요청하는 기본 url
  const base_url = `https://${language}.wikipedia.org/w/api.php?`;


  // 이전에 선택한 카테고리와 겹치는 페이지만 새로 저장하는 함수
  const filterPage = (data) => {
    // 처음엔 비교 안하고 새로 저장함
    if(selectedPage === null || selectedPage.length === 0) {
        console.log('data' , data)
        setSelectedPage(data)
    }
    else {
      const list = []
      for(let i=0; i<data.length; i++){
        for(let j=0; j<selectedPage.length; j++){
          if (data[i].pageid === selectedPage[j].pageid) list.push(data[i])
        }
      }
      console.log('filtered selected page', list);
      setSelectedPage(list);
    }
  }


  // 해당 카테고리의 페이지 정보를 불러오는 함수
  const searchPage = async (categoryQuery) => {

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

    // 200페이지 정도면 괜찮다
    // 500개까지만 옴
    const category_url = `action=query&format=json&list=allcategories&origin=*&acmin=500&aclimit=500`

    try {
    const { data } = await axios.get(`${base_url}${category_url}`);
    let list = data.query.allcategories

    // 객체 형태로 옴
    // console.log('list :', list)
    for (let i=0; i < list.length; i ++) {
        let categoryData = showMainCategory;
        for(let key in list[i]){
            let value = list[i][key];
            categoryData.push(value);
            // 문자열 리스트로 바꿔서 저장
            setShowMainCategory(categoryData)
        }
        var min = Math.ceil(0);
        var max = Math.floor(30);
        var random = Math.floor(Math.random() * (max-min)) + min;
        i += random;
    }
    console.log('showMainCategory : ', showMainCategory)
    } catch (e) {
        console.log(e)
      }

    // ... 랜덤으로 카테고리 선택하는 로직 필요
  }


  // 해당 카테고리의 하위 카테고리를 불러오는 함수
  const searchSubCategory = async (categoryQuery) => {
    const subcategory_url = `action=query&format=json&list=categorymembers&origin=*&cmtitle=Category:${categoryQuery}&cmtype=subcat`

    try {
    const result = await axios.get(`${base_url}${subcategory_url}`);
    console.log('subCategory', result.data.query.categorymembers)

    // subcategory 없는 경우도 있음!!!
    setShowSubCategory(result.data.query.categorymembers)
    } catch (e) {
        console.log(e)
      }
  }

  useEffect(() => {
    // 마운트시 카테고리 불러옴
    searchAllCategory();
  }, [])

  

  const handleOnSwipe = (swipeDirection) => {
    if (swipeDirection === direction.RIGHT) {
      // handle right swipe
      let list = selectedCategory

      // main 이 아니라 sub일 땐 어쩌지? 변수 써야하나?
      list.push(showMainCategory[cardIndex])
      searchSubCategory(showMainCategory[cardIndex])
      searchPage(showMainCategory[cardIndex])

      setSelectedCategory(list)
      
      console.log(list)
      console.log('flip')
    }

    if (swipeDirection === direction.LEFT) {
      // handle left swipe
      console.log('pass')
    }

    // let list = selectedCategory
    // list.pop()
    // console.log(list);
    // setSelectedCategory(list);

    let index = cardIndex + 1;
    setCardIndex(index);
  }

  return (
    <div style={{display: 'flex', flex: 1}}>
        <div className="background">
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Text size={40} bold color={'pink'}>
                    Knowledgesmith
                </Text>
            </div> 
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text size={24} color={'pink'}>
                    {selectedCategory.length} / 5
                </Text>
                <Text size={24} color={'pink'}>
                    results: {selectedPage.length}
                </Text>
            </div>
            <div className="swipe">
                <Swipeable onSwipe={handleOnSwipe}>
                    <div className="card">
                        {showMainCategory[cardIndex] !== undefined && 
                        showMainCategory[cardIndex]
                        }
                    </div>
                </Swipeable>
            </div>
            <div style={{marginBottom: 100}}>
                {selectedCategory.map((item, index) => {
                    return(
                        <div>
                            <Text size={24} color={'pink'}>
                                {item}
                            </Text>
                        </div>
                    )
                })}
            </div>
            
        </div>

         <div className="floating" style={{justifyContent: 'space-between'}}>
            <div className="styled-btn"
            onClick={()=>{handleOnSwipe(direction.LEFT)}}
            style={{height: 32, backgroundColor: colors.green}}>
                <Text size={12} bold color={'pink'}>Pass</Text>
            </div>
            <div className="styled-btn"
            onClick={()=>{handleOnSwipe(direction.RIGHT)}}
            style={{height: 32, backgroundColor: colors.pink}}>
                <Text size={12} bold color={'green'}>Flip</Text>
            </div>
        </div>
    </div>
    );
};

export default GameCardPage;
