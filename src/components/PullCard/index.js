import React, { useEffect } from 'react'
import clamp from 'lodash-es/clamp'
import { useSpring, animated } from 'react-spring/hooks'
import { useGesture } from 'react-with-gesture'

import '../../App.css'
import './card.css'

import { Row, Col, Spinner } from 'react-bootstrap';

import axios from 'axios';


var TOUCH_STYLE = {}

const PULL_LINE = 400


const PullCard = ({ category, index, handlePick, setTempCategory, width, handlePass, language }) => {
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))
  const [touchControl, setTouchControl] = React.useState(0)
  
  const [yPos, setYPos] = React.useState(0)
  const [touch, setTouch] = React.useState(false)

  const [cardOpacity, setCardOpacity] = React.useState(1)

  const [pass, setPass] = React.useState(false);


  const bind = useGesture(({ down, delta, velocity, previous }) => {
    if (velocity >= 0.4 && delta[1] < -50 && delta[1] < 0) {
      setPass(true)
    }
    // else setPass(false)

    velocity = clamp(velocity, 1, 8)
    setYPos(previous[1])

    if (down) setTouch(true);
    if (!down) setTouch(false);
    set({ xy: down ? delta : [0, 0], config: { mass: velocity, tension: 500 * velocity, friction: 50 } })
  })

  const handleDrag = () => {
    if (yPos > PULL_LINE && touch) {
      // 드래그해서 그냥 움직이면 예비 보여줌
      setTempCategory(category)
      setTouchControl(1)

    } if ( !touch && touchControl === 1) {
      // 드롭하면 pick
      // console.log('drop')
      handlePick();
      setTouchControl(0)
      setTempCategory(null)
      

    } else if ( yPos <= PULL_LINE ) {
      // 다시 리셋
      setTempCategory(null);
      setTouchControl(0);
    }
  }

  useEffect(() => {
    // category 안 들어오면 작동 안함
    if (category !== undefined) {
      handleDrag();
    }
    if (touch) {
      // 잡으면 작아지고 불투명해짐
      TOUCH_STYLE = {
        width: '50%',
        height: '50%',
      }
      setCardOpacity(0.5)
    } else {
      // 놓으면 카드 원래 사이즈로
      TOUCH_STYLE = {};
      setCardOpacity(1);
      set({ xy: [0, 0] })
    }

    if (pass) {
      // console.log('pass');
      if(!touch){
        handlePass();
        setPass(false);
        // console.log('do pass');
      }
      
    }
  }, [yPos, touch, pass])




  useEffect(() => {
    return () => {
        clearTimeout();
        setCardOpacity(0);
        setPass(false);
        setTouchControl(0);
        setTempCategory(null);
      }
  }, [])




  const [categoryNum, setCategoryNum] = React.useState();
  const [pageNum, setPageNum] = React.useState();


  // wiki api 요청하는 기본 url
  const base_url = `https://${language}.wikipedia.org/w/api.php?`;

  // 해당 카테고리의 페이지 정보를 불러오는 함수
  const searchPage = async (categoryQuery) => {

      const categoryPage_url = `action=query&format=json&list=categorymembers&origin=*&cmtitle=Category:${categoryQuery}&cmlimit=1000`
      try {
        const { data } = await axios.get(`${base_url}${categoryPage_url}`);
        let pages = data.query.categorymembers
        setPageNum(pages.length)

        // console.log(pages);

      } catch (e) {
        // console.log(e)
      }
  }

  // 해당 카테고리의 하위 카테고리를 불러오는 함수
  const searchSubCategory = async (categoryQuery) => {
    const subcategory_url = `action=query&format=json&list=categorymembers&origin=*&cmtitle=Category:${categoryQuery}&cmtype=subcat`

    try {
    const result = await axios.get(`${base_url}${subcategory_url}`);
    // console.log('subCategory', result.data.query.categorymembers)

    // subcategory 없는 경우도 있음!!!
    setCategoryNum(result.data.query.categorymembers.length)

    } catch (e) {
        // console.log(e)
      }
  }

  useEffect(() => {
    // console.log('category changed')
    set({ xy: [0, 0] })
    
    if (category === undefined) {
      // console.log('category undefined')
      // 카테고리 로드되기 전에는 안 보임 (원래 자리로 돌아가는 모션)
      // setCardOpacity(0);

      setPass(true);

    } // 카테고리 로드되고 나면 나타남
    else {
      setCardOpacity(1);

      searchPage(category);
      searchSubCategory(category);
    }
  }, [category])


  return (
      <animated.div {...bind()}
        className="pull-card"
        style={{ 
          transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`),
          ...TOUCH_STYLE,
          opacity: cardOpacity
        }}>
          {category === undefined
          ?
          <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Spinner animation="border" variant="light" />
          </div>
          :
          <>
              <div className="card-content">
                  <div className="fbold SDGreen" 
                  style={{fontSize : touch ? 16 : 32, userSelect: 'none'}}
                  >
                    {category}
                  </div>
              </div>
          {!touch &&
            <div className="card-info">
              <Row>
                <Col>
                  <div className="LeftSDGreen f12" style={{textAlign: 'center', userSelect: 'none'}}>하위 카테고리 숫자</div>
                  <div className="SDGreen f24" style={{userSelect: 'none'}}>{categoryNum}</div>
                </Col>
                <Col>
                  <div className="LeftSDGreen f12" style={{textAlign: 'center', userSelect: 'none'}}>하위 문서 숫자</div>
                  <div className="SDGreen f24" style={{userSelect: 'none'}}>{pageNum}</div>
                </Col>
              </Row>
            </div>
          }
        </>
        }
      </animated.div>
  );
};


export default PullCard;
