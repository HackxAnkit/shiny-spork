import React, { useEffect } from 'react';

function BackgroundSection() {
  useEffect(() => {
    const section = document.getElementById('background-section');
    if (section) {
      // Create grid of animated spans
      const squareCount = Math.floor(window.innerWidth / 100) * Math.floor(window.innerHeight / 100);
      for (let i = 0; i < Math.min(squareCount, 150); i++) {
        const span = document.createElement('span');
        section.appendChild(span);
      }
    }
  }, []);

  return <section id="background-section"></section>;
}

export default BackgroundSection;
