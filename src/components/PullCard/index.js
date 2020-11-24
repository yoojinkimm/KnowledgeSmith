import React, { useEffect } from 'react'
import clamp from 'lodash-es/clamp'
import { useSpring, animated } from 'react-spring/hooks'
import { useGesture } from 'react-with-gesture'
import { Text } from '../index'

import '../../App.css'
import './card.css'


const PullCard = ({ category, index, handlePick, setTempCategory, width }) => {
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))
  var isMouseDown = false;
  var isMouseUp = false;
  var mouseControl = 0;
  var yPos = 0;

  const bind = useGesture(({ down, delta, velocity, previous }) => {
    velocity = clamp(velocity, 1, 8)
    if (down) {
      yPos = previous[1];

      if (yPos > 300) {
        console.log('big')
         // 드래그해서 그냥 움직이면 예비 보여줌
        setTempCategory(category)
      }
    } else {
      setTempCategory(null)
    }
    set({ xy: down ? delta : [0, 0], config: { mass: velocity, tension: 500 * velocity, friction: 50 } })
  })

  // const drag = useDrag(({xy , down}) => console.log( down ? 'down' : xy))

  const coordinate = (event) => {
    yPos = event.clientY;

    // document.onmousedown = () => { 
    //     isMouseDown = true;
    //     isMouseUp = false; 
    // }
    // document.onmouseup = () => {
    //     isMouseDown = false;
    //     isMouseUp = true;
    // }

    if (yPos > 300) {
        if (isMouseDown) {
            // 드래그해서 그냥 움직이면 예비 보여줌
            setTempCategory(category)
            console.log('isMouseDown && mouseControl === 0', 'mouseDown: ', isMouseDown, 'mouseUp: ', isMouseUp)
        }
        if (isMouseUp) {
            // 픽은 마우스 놓으면
            setTempCategory(null)
            console.log('pick')
            handlePick()
            isMouseUp = false;
        } 
    } else if (!isMouseUp && !isMouseDown) {
        // setTempCategory(null)
        // console.log('!isMouseUp && !isMouseDown', 'mouseDown: ', isMouseDown, 'mouseUp: ', isMouseUp)
    } else {
        // setTempCategory(null)
        // mouseControl = 0
        // console.log('else', 'mouseDown: ', isMouseDown, 'mouseUp: ', isMouseUp)
    } 
  }


  return (
    <animated.div {...bind()}
      className="card"
      onMouseMove={e => coordinate(e)}
      style={{ transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`) }}>
            <div className="card-content">
                <Text size={32} color="green">{category}</Text>
            </div>
    </animated.div>
  );
};


export default PullCard;
