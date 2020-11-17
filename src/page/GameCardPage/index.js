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
  const [showPageCategory, setShowPageCategory] = useState([])

  const [cardIndex, setCardIndex] = useState(0);

  // wiki api 요청하는 기본 url
  const base_url = `https://${language}.wikipedia.org/w/api.php?`;


  // 이전에 선택한 카테고리와 겹치는 페이지만 새로 저장하는 함수
  const filterPage = (data) => {
    // 처음엔 비교 안하고 새로 저장함
    if(selectedPage === null || selectedPage.length === 0) {
        console.log('data' , data)
        setSelectedPage(data)
        data.map((item, index) => {
          searchPageCategory(item.title)
        })
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
      list.map((item, index) => {
          searchPageCategory(item)
        })
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

  // 해당 페이지의 카테고리를 불러오는 함수
  const searchPageCategory = async (pageQuery) => {
    const pageCategory_url = `action=query&format=json&origin=*&titles=${pageQuery}&prop=categories`

    try {
    const result = await axios.get(`${base_url}${pageCategory_url}`);
    const data = result.data.query.pages
    let item = []
    console.log('pageCategory', data)
    
    for(let key in data){
            item = data[key].categories
            console.log('pageCategory', item)
        }
    let list = showPageCategory

    item.map((d, index) => {
      list.push(d.title)
    })

    console.log('list: ', list)
    setShowPageCategory(list)
    setShowMainCategory(list)
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
      // searchSubCategory(showMainCategory[cardIndex])
      searchPage(showMainCategory[cardIndex])

      setSelectedCategory(list)
      
      console.log('selectd category: ', list)
      // console.log('flip')
    }

    if (swipeDirection === direction.LEFT) {
      // handle left swipe
      // console.log('pass')
    }

    // let list = selectedCategory
    // list.pop()
    // console.log(list);
    // setSelectedCategory(list);

    let index = cardIndex + 1;
    setCardIndex(index);
  }

  return (
    <div style={{display: 'flex', flex: 1, justifyContent: 'center'}}>
        <div className="background" style={{marginBottom: 200}}>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Text size={40} bold color={'pink'}>
                    Knowledgesmith
                </Text>
            </div> 
            <div className="line" style={{marginTop: 7}} />

            <div className="swipe">
              <div className="card-back">
                  <Swipeable onSwipe={handleOnSwipe}>
                      <div className="card">
                        <div className="card-content">
                          <Text size={32} color="green">
                            {showMainCategory[cardIndex] !== undefined && 
                            showMainCategory[cardIndex]
                            }
                          </Text>
                        </div>
                      </div>
                  </Swipeable>
                </div>
            </div>

             <div className="game-result">
               <div className="result-column">
                 <Text size={12} color={'pink'}>
                    cards so far
                 </Text>
                 <Text size={24} color={'pink'}>
                    {selectedCategory.length}/5
                 </Text>
               </div>

                <div style={{width: 1, height: 43, backgroundColor: colors.pink}} />
                
                <div className="result-column">
                 <Text size={12} color={'pink'}>
                    results now
                 </Text>
                 <Text size={24} color={'pink'}>
                    {selectedPage.length}
                 </Text>
               </div>
            </div>

            <div style={{display: 'flex', width: '100%', marginTop: 24}}>
                {selectedCategory.map((item, index) => {
                    return(
                        <div className="category-box">
                            <Text size={16} bold color={'pink'}>
                                {item}
                            </Text>
                        </div>
                    )
                })}
            </div>
            
        </div>

          <div className="game-pc-floating">
            <div className="game-floating" style={{justifyContent: 'space-between'}}>
                <div className="styled-btn"
                onClick={()=>{handleOnSwipe(direction.LEFT)}}
                style={{backgroundColor: colors.green, marginRight: 8}}>
                    <Text size={24} bold color={'pink'}>Pass</Text>
                </div>
                <div className="styled-btn"
                onClick={()=>{handleOnSwipe(direction.RIGHT)}}
                style={{backgroundColor: colors.pink, marginLeft: 8}}>
                    <Text size={24} bold color={'green'}>Flip</Text>
                </div>
            </div>
          </div>

    </div>
    );
};

export default GameCardPage;
