import React, { useEffect } from "react";
import { string, number, array } from "prop-types";
import { animated, interpolate } from "react-spring";
import Carousel from "nuka-carousel";

const SwipeCard = ({ i, x, y, rot, scale, trans, bind, data }) => {
  const pageid = data !== undefined ? data.pageid : '';
  const title = data !== undefined ? data.title : 'title';

  useEffect(() => {
      console.log(title)
  }, [title])

  return (
    <animated.div
      key={i}
      style={{
        transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
      }}
    >
      <animated.div
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans)
        }}
      >
        <div className="swipe">
            {/* {pics.map((pic, index) => (
              <img src={pic} key={index} alt="profilePicture" />
            ))} */}
            <h2>title</h2>
          
        </div>
      </animated.div>
    </animated.div>
  );
};

SwipeCard.propTypes = {
  name: string,
  age: number,
  distance: string,
  text: string,
  pics: array
};

export default SwipeCard;