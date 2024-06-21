// "use client";
// import { useEffect, useRef } from "react";

// const ThreeAnimation = ({ children }) => {
//   const animationContainerRef = useRef(null);

//   useEffect(() => {
//     let vantaInstance;
//     if (animationContainerRef.current && window.VANTA) {
//       vantaInstance = window.VANTA.WAVES({
//         el: animationContainerRef.current,
//         mouseControls: false,
//         touchControls: false,
//         gyroControls: false,
//         waveSpeed: 0,
//         color: 0x3c0096,
//         zoom: 0.76,
//       });
//     }
//     return () => {
//       if (vantaInstance) {
//         vantaInstance.destroy();
//       }
//     };
//   }, []);

//   return (
//     <div id="animation-container" className="min-h-screen" ref={animationContainerRef}>
//       {children}
//     </div>
//   );
// };

// export default ThreeAnimation;
"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import WAVES from "vanta/dist/vanta.waves.min";
const ThreeAnimation = ({ children }) => {
  const animationContainerRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  useEffect(() => {
    if (!vantaEffect && animationContainerRef.current) {
      setVantaEffect(
        WAVES({
          el: animationContainerRef.current,
          THREE: THREE,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          waveSpeed: 0,
          color: 0x3c0096,
          zoom: 0.76,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <div id="animation-container" className="min-h-screen" ref={animationContainerRef}>
      {children}
    </div>
  );
};
export default ThreeAnimation;