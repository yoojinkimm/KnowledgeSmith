import React, { useEffect, useState } from "react";
import {Text, SwipeCard} from '../../components';
import { useSprings } from "react-spring";
import { useGesture } from "react-with-gesture";

import "./Deck.css";

// 시작할 때 모션 시작하는 위치
const from = i => ({ rot: 0, scale: 1.5, y: 0 });

// 시작할 때 모션 끝나는 위치
const to = i => ({
  x: 0,
  y: i * -10,
  scale: 1,
  rot: 0,
  delay: i * 100
});

// 움직일 때 움직이는 정도?
const trans = (r, s) =>
  `perspective(0px) rotateX(0deg) rotateY(${r /
  10}deg) rotateZ(${r}deg) scale(1)`;


const Deck = (data) => {

    const [gone] = useState(() => new Set());

  const [_props, set] = useSprings(data.length, i => ({
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
        // const rot = 0;

        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });

      if (!down && gone.size === data.length)
        setTimeout(() => gone.clear() || set(i => to(i)), 600);
    }
  );

  return(
    <>
    {_props.map(({ x, y, rot, scale }, i) => (
          <SwipeCard
            key={i}
            i={i}
            x={x}
            y={y}
            rot={rot}
            scale={scale}
            trans={trans}
            data={data}
            bind={bind}
          />
        ))}
    </>
  )
}

export default Deck;
