"use client";
import { useEffect, useRef } from "react";

const ThreeAnimation = ({ children }) => {
  const animationContainerRef = useRef(null);

  useEffect(() => {
    let vantaInstance;
  
    const container = animationContainerRef.current;
  
    const onMouseEnter = () => {
      vantaInstance = window.VANTA.WAVES({
        el: container,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        waveSpeed: 0,
        color: 0x3c0096,
        zoom: 0.76,
      });
    };
  
    const onMouseLeave = () => {
      vantaInstance = window.VANTA.WAVES({
        el: container,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        waveSpeed: 0.3,
        color: 0x3c0096,
        zoom: 0.76,
      });
    };
  
    if (container && window.VANTA) {
      vantaInstance = window.VANTA.WAVES({
        el: container,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        waveSpeed: 0.3,
        color: 0x3c0096,
        zoom: 0.76,
      });
  
      container.addEventListener("mouseenter", onMouseEnter);
      container.addEventListener("mouseleave", onMouseLeave);
    }
  
    return () => {
      if (vantaInstance) {
        vantaInstance.destroy();
        container.removeEventListener("mouseenter", onMouseEnter);
        container.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, []);
  

  return (
    <div id="animation-container" className="min-h-screen" ref={animationContainerRef}>
      {children}
    </div>
  );
};

export default ThreeAnimation;
