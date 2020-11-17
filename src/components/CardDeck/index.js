import React, { useEffect, useState } from "react";
import { useSprings } from "react-spring/hooks";
import { useGesture } from "react-use-gesture";

import SwipeCard from "../SwipeCard/index.js";

import "./Deck.css";

import axios from 'axios';

/* 이거 안씁니다 */
/* 이거 안씁니다 */
/* 이거 안씁니다 */

const to = i => ({
  x: 0,
  y: i * 0,
  scale: 1,

  // 이거 rot 바꾸면 카드들 일정해짐
  // rot: -10 + Math.random() * 20,
  rot: 0,
  delay: i * 50
});
const from = i => ({ rot: 0, scale: 1.5, y: -1000 });

const trans = (r, s) =>
  `perspective(0px) rotateX(0deg) rotateY(${r /
  10}deg) rotateZ(${r}deg) scale(1)`;

function CardDeck({data, language}) {
  const [selectedCategory, setSelectedCategory] = useState(data)
  const [selectedPage, setSelectedPage] = useState([]);

  const [gone] = useState(() => new Set());

  const [props, set] = useSprings(
    selectedCategory.length, 
    i => ({
    ...to(i),
    from: from(i)
  }));

  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity
    }) => {
      const trigger = velocity > 0.2;

      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) gone.add(index);

      set(i => {
        if (index !== i) return;
        const isGone = gone.has(index);

        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });

      if (!down && gone.size === selectedCategory.length)
        setTimeout(() => gone.clear() || set(i => to(i)), 600);
    }
  );



  

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

    try {
    const result = await axios.get(`${base_url}${subcategory_url}`);
    console.log(result.data.query.categorymembers)
    setSelectedCategory(result.data.query.categorymembers)
    } catch (e) {
        console.log(e)
      }
  }

  useEffect(() => {
    // searchPage('그래프 이론')
    // searchPage('그래프 알고리즘')

    // 개수의 문제도 아니고 렌더링 순서 문제도 아님. 뭐가 문제일까? 
    searchSubCategory('그래프 이론')
    console.log(props)
  }, [])

useEffect(() => {
  console.log(props)
}, [selectedCategory, props])

  return (
    <>
    {selectedCategory.length >= 0 &&
    props.map(({ x, y, rot, scale }, i) => (
    <SwipeCard
      key={i}
      i={i}
      x={x}
      y={y}
      rot={rot}
      scale={scale}
      trans={trans}
      data={selectedCategory}
      bind={bind}
    />
  ))}
    </>
  )
}

export default CardDeck;
