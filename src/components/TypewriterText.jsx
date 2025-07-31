import Typewriter from 'typewriter-effect';

export default function TypewriterText({ 
  strings, 
  autoStart = true, 
  loop = false, 
  delay = 75,
  deleteSpeed = 50,
  pauseFor = 500,
  className = '',
  onComplete = null
}) {
  return (
    <div className={`typewriter-container ${className}`}>
      <Typewriter
        options={{
          strings: strings,
          autoStart: autoStart,
          loop: loop,
          delay: delay,
          deleteSpeed: deleteSpeed,
          pauseFor: pauseFor,
          cursor: '|',
          cursorClassName: 'typewriter-cursor',
          wrapperClassName: 'typewriter-wrapper',
        }}
        onInit={(typewriter) => {
          if (onComplete) {
            typewriter.callFunction(() => {
              onComplete();
            });
          }
        }}
      />
    </div>
  );
}
