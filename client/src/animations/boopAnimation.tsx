import { animated} from 'react-spring';
import useBoop from '../hooks/useBoop';
import { useEffect, useState } from 'react';


// components/Boop.jsx

export const Boop = ({ children, ...boopConfig }) => {
    const [style, trigger] = useBoop(boopConfig);
    return (
      <animated.span onMouseEnter={trigger} style={style}>
        {children}
      </animated.span>
    );
  };


  export const BoopSu = ({ rotation = 0, timing = 150, children }) => {
    const [isBooped, setIsBooped] = useState(false);
    const style = {
      display: 'inline-block',
      backfaceVisibility: 'hidden',
      transform: isBooped
        ? `rotate(${rotation}deg)`
        : `rotate(0deg)`,
      transition: `transform ${timing}ms`,
    };
    useEffect(() => {
      if (!isBooped) {
        return;
      }
      const timeoutId = window.setTimeout(() => {
        setIsBooped(false);
      }, timing);
      return () => {
        window.clearTimeout(timeoutId);
      };
    }, [isBooped, timing]);
    const trigger = () => {
      setIsBooped(true);
    };
    return (
      <span onMouseEnter={trigger} style={style}>
        {children}
      </span>
    );
  };