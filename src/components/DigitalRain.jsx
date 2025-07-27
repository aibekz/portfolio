import { useEffect, useRef } from 'react';

const DigitalRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match its container
    const container = canvas.parentElement;
    let width = canvas.width = container.clientWidth;
    let height = canvas.height = container.clientHeight;

    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(0).map(() => Math.floor(Math.random() * -100));
    const characters = 'アァイィウヴエエオカガキギクグケゲコゴサザシジスズセゼソゾタダチッヂヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#0F0'; // green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    let animationId = null;
    let lastTime = 0;
    const targetFPS = 15; // Slower speed - adjust this value (lower = slower)
    const frameDelay = 1000 / targetFPS;
    
    const loop = (currentTime) => {
      if (currentTime - lastTime >= frameDelay) {
        draw();
        lastTime = currentTime;
      }
      animationId = requestAnimationFrame(loop);
    };

    loop(0);

    const handleResize = () => {
      const container = canvas.parentElement;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        background: 'black',
        borderRadius: '8px',
      }}
    />
  );
};

export default DigitalRain;
