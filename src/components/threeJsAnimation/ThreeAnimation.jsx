import { useEffect, useRef } from 'react';

const ThreeAnimation = ({ children }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadScripts = async () => {
      // Load Three.js script
      const script1 = document.createElement('script');
      script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script1.async = false;
      document.body.appendChild(script1);

      // Load Vanta Birds script
      const script2 = document.createElement('script');
      script2.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js';
      script2.async = false;
      document.body.appendChild(script2);

      // Wait for scripts to load
      await new Promise((resolve) => {
        script1.onload = script2.onload = resolve;
      });

      // Initialize Vanta Birds effect
      if (window.VANTA) {
        window.VANTA.BIRDS({
          el: canvasRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          backgroundColor: 0x2375dc,
          color1: 0x814adf,
          birdSize: 2.20,
          wingSpan: 21.00,
          speedLimit: 3.00,
          separation: 24.00,
          alignment: 38.00,
          cohesion: 38.00,
          quantity: 4.00,
          backgroundAlpha: 1.00
        });
      }
    };

    loadScripts();

    return () => {
      // Clean up the scripts when the component unmounts
      const script1 = document.querySelector('script[src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"]');
      const script2 = document.querySelector('script[src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js"]');
      script1.parentNode.removeChild(script1);
      script2.parentNode.removeChild(script2);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
    <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />
    {children}
  </div>
  
  );
};

export default ThreeAnimation;
