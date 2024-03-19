"use client"
import { useEffect, useRef } from 'react';

const ThreeAnimation = ({children}) => {
  const animationContainerRef = useRef(null);

  useEffect(() => {
    let vantaInstance;
    // Initialize Vanta Birds animation
    if (animationContainerRef.current) {
      window.VANTA.WAVES({
        el: animationContainerRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        // scale: 1.00,
        // scaleMobile: 1.00,
        waveSpeed: 0.3,
        color:0x3c0096,
        zoom: 0.76
      });
    }
    return () => {
      if (vantaInstance) {
        vantaInstance.destroy();
      }
    };
  }, []);

  return (
    <div id="animation-container" ref={animationContainerRef}>
      {children}
    </div>
  );
};

export default ThreeAnimation;
