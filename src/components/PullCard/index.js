import React, { useEffect } from 'react'
import clamp from 'lodash-es/clamp'
import { useSpring, animated } from 'react-spring/hooks'
import { useGesture } from 'react-with-gesture'
import { Text } from '../index'

import '../../App.css'
import './card.css'


const PullCard = ({ category, index, handlePick, setTempCategory, width }) => {
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))
  var touchControl = 0;
  
  const [yPos, setYPos] = React.useState(0)

  const bind = useGesture(({ down, delta, velocity, previous }) => {
    velocity = clamp(velocity, 1, 8)
    setYPos(down ? previous[1] : 0)
    set({ xy: down ? delta : [0, 0], config: { mass: velocity, tension: 500 * velocity, friction: 50 } })
  })

  const handleDrag = () => {
    if (yPos > 300) {
         // 드래그해서 그냥 움직이면 예비 보여줌
        setTempCategory(category)
        touchControl = 1;
    } else if (touchControl === 1) {
      handlePick();
      touchControl = 0;
    } else {
      setTempCategory(null)
    }
       
  }

  useEffect(() => {
    handleDrag()
  }, [yPos])


  return (
    <animated.div {...bind()}
      className="card"
      style={{ transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`) }}>
            <div className="card-content">
                <Text size={32} color="green">{category}</Text>
            </div>
    </animated.div>
  );
};


export default PullCard;
