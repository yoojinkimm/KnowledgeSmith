import React, { useContext, useState, useEffect } from "react";
import { auth, database } from '../../firebase';
import { useLocation } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";

import clamp from 'lodash-es/clamp'
import { useSpring, animated } from 'react-spring/hooks'
import { useGesture } from 'react-with-gesture'

import "../../App.css";
import * as colors from '../../data/constants';
import './tutorial.css';
import { Name, IconStar } from '../../data/images/index';
import { Row, Col, Carousel } from 'react-bootstrap';
import { set } from "lodash-es";


var TOUCH_STYLE = {}

const PULL_LINE = 450


const TutorialPage = ({history}) => {
  const location = useLocation();
  const { user, setUser, language, setLanguage } = useContext(UserContext);

  const [carouselIndex, setCarouselIndex] = useState(0);
  

  const handleSelect = (selectedIndex, e) => {
    setCarouselIndex(selectedIndex);
  };

  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));
  const [touchControl, setTouchControl] = useState(0);
  
  const [yPos, setYPos] = useState(0);
  const [touch, setTouch] = useState(false);

  const [cardOpacity, setCardOpacity] = useState(1);

  const [start, setStart] = useState(false);


  const bind = useGesture(({ down, delta, velocity, previous }) => {
    velocity = clamp(velocity, 1, 8)
     if (previous[1] > PULL_LINE) setStart(true);

    if (down) setTouch(true)
    if (!down) setTouch(false)
    set({ xy: down ? delta : [0, 0], config: { mass: velocity, tension: 500 * velocity, friction: 50 } })
  })


  useEffect(() => {
    if (touch) {
      // 잡으면 작아지고 불투명해짐
      TOUCH_STYLE = {
      }
      setCardOpacity(0.5);
    } else {
      // 놓으면 카드 원래 사이즈로
      TOUCH_STYLE = {};
      setCardOpacity(1);
    }
    if (start) history.push(`game/${language}`)
  }, [start, touch])

  useEffect(() => {
      localStorage.setItem('tutorial', true);
  })


  return (
    <div className="tutorial-back">
        <div className="background">
            <div className="VPink f32">
              'HOW TO PLAY'
            </div>
            <div className="line" style={{marginTop: 12}} />
            <div style={{padding: 16, width: '100%', height: '100%'}}>
                <Carousel 
                activeIndex={carouselIndex}
                onSelect={handleSelect}
                indicators={false}
                interval={10000000}
                style={{width: '100%', height: '100%', marginTop: 8}}
                >
                    <Carousel.Item>
                        <div className="tutorial-card">
                            <div className="SDGreen-lh24 f24 fbold" style={{textAlign: 'center', marginBottom: 16}}>당신은</div>
                            <div className="LeftSDGreen f14">당신은 카드에 표시된 총 5장의 카테고리 제목을 확인하게 됩니다. 카드를 밀어내어 선택하지 않거나, 끌어와서 선택을 완료할 수 있습니다. </div>
                            <div className="LeftSDGreen f14" style={{marginTop: 24}}>You will check the total of 5 categories written on the card. You can push the card away to discard it, or draw the card to pick it up as your  selection.</div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="tutorial-card">

                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="tutorial-card">

                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <animated.div {...bind()}
                            className="tutorial-card final"
                            style={{ 
                                ...TOUCH_STYLE,
                                opacity: cardOpacity,
                                transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`)
                            }}>
                            <div className="SDGreen-lh24 f24 fbold" style={{textAlign: 'center', marginBottom: 16}}>좋습니다!</div>
                            <div className="LeftSDGreen f14">이제 이 카드를 끌어와서 게임을 시작해보세요!</div>
                            <div className="LeftSDGreen f14" style={{marginTop: 24}}>You are good to go! Now grab this card and start the game.</div>
                        </animated.div>
                    </Carousel.Item>
                </Carousel>

                <div className="car-indi">
                {carouselIndex !== 3
                ?
                <>
                    <div className="car-icons" style={{backgroundColor: carouselIndex === 0 && colors.pink}} />
                    <div className="car-icons" style={{backgroundColor: carouselIndex === 1 && colors.pink}} />
                    <div className="car-icons" style={{backgroundColor: carouselIndex === 2 && colors.pink}} />
                    <div className="car-icons" />
                </>
                :
                <div className="tut-start-btn" style={{opacity: cardOpacity}}>
                </div>
                }
                </div>
            </div>
        </div>
    </div>
  )
}

export default TutorialPage;