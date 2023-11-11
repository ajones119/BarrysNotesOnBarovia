import React, { PropsWithChildren } from 'react';
import { animated } from '@react-spring/web';
import useBoop, { BoopProps } from '@hooks/AnimationHooks/useBoop';

const Boop = (props: PropsWithChildren<BoopProps>) => {
  const {style, trigger} = useBoop(props);
  return (
    <animated.div onMouseEnter={trigger as any} style={{...style}}>
      {props.children}
    </animated.div>
  );
};

export default Boop;
