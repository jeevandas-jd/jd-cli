import React, { useState, useEffect } from 'react';
import './App.css';

// Configuration data
const funnyImages = [
  'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1617450365226-8e1b5a4c5d6f?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1500259571355-332da5cb07aa?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1475518845976-0fd87b7e4e5d?w=800&h=800&fit=crop'
];

const STATES = {
  WELCOME: 'welcome',
  CAMERA: 'camera',
  LOADING: 'loading',
  RESULT: 'result',
};

const getRandomImage = () => funnyImages[Math.floor(Math.random() * funnyImages.length)];

// Hacker-themed custom styles with dark mode
const customStyles = `
:root {
  --color-primary: #00ff00;
  --color-secondary: #ff0066;
  --color-background: #0a0a0a;
  --color-surface: #111111;
  --color-text: #00ff00;
  --color-text-secondary: #cccccc;
}

[data-theme="light"] {
  --color-primary: #21808d;
  --color-secondary: #ff5459;
  --color-background: #f0f8ff;
  --color-surface: #ffffff;
  --color-text: #1a1a1a;
  --color-text-secondary: #666666;
}

/* Hacker theme animations */
@keyframes slideInFromTop {
  0% { opacity: 0; transform: translateY(-100px) scale(0.9); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes slideOutToTop {
  0% { opacity: 1; transform: translateY(0) scale(1); }
  100% { opacity: 0; transform: translateY(-100px) scale(0.9); }
}

@keyframes slideInFromBottom {
  0% { opacity: 0; transform: translateY(100px) scale(0.9); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes slideOutToBottom {
  0% { opacity: 1; transform: translateY(0) scale(1); }
  100% { opacity: 0; transform: translateY(100px) scale(0.9); }
}

@keyframes dropFromSky{ 
  0%{ opacity:0; transform: translateY(-600px) rotate(-20deg) scale(0.85);} 
  60%{ opacity:1; transform: translateY(24px) rotate(6deg) scale(1.03);} 
  80%{ transform: translateY(-8px) rotate(-3deg) scale(0.98);} 
  100%{ opacity:1; transform: translateY(0) rotate(0) scale(1);} 
}

@keyframes flashBang{ 
  0%{ opacity:0; } 
  10%{ opacity:1;} 
  30%{ opacity:0.85;} 
  100%{ opacity:0; } 
}

@keyframes bounceText{ 
  0%,100%{ transform: scale(1);} 
  50%{ transform: scale(1.08);} 
}

@keyframes spin{ 
  to{ transform: rotate(360deg);} 
}

@keyframes typewriter{ 
  from{ width:0; } 
  to{ width: 100%; } 
}

@keyframes blink{ 
  0%,100%{ opacity:1;} 
  50%{ opacity:0;} 
}

@keyframes matrixRain {
  0% { transform: translateY(-100px); opacity: 0; }
  5% { opacity: 1; }
  95% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}

@keyframes scanLine {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}

@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

/* Utility classes */
.slide-in-top { animation: slideInFromTop 600ms ease-out both; }
.slide-out-top { animation: slideOutToTop 600ms ease-in both; }
.slide-in-bottom { animation: slideInFromBottom 600ms ease-out both; }
.slide-out-bottom { animation: slideOutToBottom 600ms ease-in both; }

.camera-drop{ animation: dropFromSky 900ms cubic-bezier(.34,1.56,.64,1) both; }
.flash-bang{ animation: flashBang 800ms ease-out both; background: white; }
.bounce-text-animated{ animation: bounceText 600ms ease-in-out 2; }
.spinner-animated{ border: 4px solid rgba(0, 255, 0, 0.2); border-top: 4px solid var(--color-primary); animation: spin 900ms linear infinite; }
.photo-reveal{ animation: slideInFromBottom 700ms ease-out both; }
.typewriter-animated{ overflow:hidden; white-space:nowrap; border-right:3px solid var(--color-primary); display:inline-block; max-width: min(28ch, 90%); animation: typewriter 1.6s steps(28,end) 0.4s forwards, blink 800ms step-end 1.4s infinite; }

/* Main container */
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem 1rem;
  position: relative;
}

.state-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Hacker theme specific */
.matrix-rain { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; }
.matrix-char { position: absolute; color: var(--color-primary); font-family: 'Courier New', monospace; font-size: 14px; animation: matrixRain 3s linear infinite; }
.scan-line { position: fixed; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(to right, transparent, var(--color-primary), transparent); animation: scanLine 2s linear infinite; z-index: 2; pointer-events: none; }
.glitch-effect { animation: glitch 0.3s linear infinite; }

/* Theme styles */
.hacker-bg { background: var(--color-background); color: var(--color-text); }
.hacker-surface { background: var(--color-surface); border: 1px solid var(--color-primary); box-shadow: 0 0 20px rgba(0, 255, 0, 0.1); }
.hacker-text { color: var(--color-text); text-shadow: 0 0 10px currentColor; }
.hacker-text-secondary { color: var(--color-text-secondary); }

/* Responsive */
@media (min-width: 768px){ 
  .camera-icon-size{ width: 10rem; height: 10rem; }
}
@media (max-width: 767px){ 
  .camera-icon-size{ width: 6.5rem; height: 6.5rem; }
}

/* Dark mode toggle */
.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: var(--color-surface);
  border: 1px solid var(--color-primary);
  color: var(--color-text);
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  transition: all 0.3s ease;
}
.theme-toggle:hover {
  box-shadow: 0 0 15px var(--color-primary);
}

/* Image styling */
.result-image-container {
  width: 100%;
  max-width: 400px;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0,0,0,0.25);
}

@media (max-width: 640px) {
  .result-image-container {
    max-width: 300px;
  }
}

.hidden {
  display: none;
}
`;

// Matrix Rain Background Component
const MatrixRain = () => {
  const [chars, setChars] = useState([]);

  useEffect(() => {
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const newChars = [];
    
    for (let i = 0; i < 50; i++) {
      newChars.push({
        id: i,
        char: characters[Math.floor(Math.random() * characters.length)],
        left: Math.random() * 100,
        delay: Math.random() * 5,
        speed: 3 + Math.random() * 5
      });
    }
    
    setChars(newChars);
  }, []);

  return (
    <div className="matrix-rain">
      {chars.map((char) => (
        <div
          key={char.id}
          className="matrix-char"
          style={{
            left: `${char.left}%`,
            animationDelay: `${char.delay}s`,
            animationDuration: `${char.speed}s`
          }}
        >
          {char.char}
        </div>
      ))}
    </div>
  );
};

// Camera Icon component with hacker theme
const CameraIcon = ({ className = '' }) => (
  <svg
    className={`camera-icon-size drop-shadow-2xl ${className}`}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="camera icon"
  >
    <defs>
      <linearGradient id="cameraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00cc00" stopOpacity="1" />
        <stop offset="100%" stopColor="#00ff00" stopOpacity="1" />
      </linearGradient>
      <filter id="shadow">
        <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#00ff00" floodOpacity="0.3" />
      </filter>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect x="30" y="60" width="140" height="100" rx="15" fill="url(#cameraGrad)" stroke="#00cc00" strokeWidth="3" filter="url(#shadow)" />
    <rect x="70" y="40" width="60" height="25" rx="8" fill="url(#cameraGrad)" stroke="#00cc00" strokeWidth="2" />
    <circle cx="100" cy="110" r="35" fill="#003300" stroke="#00cc00" strokeWidth="3" />
    <circle cx="100" cy="110" r="25" fill="#006600" stroke="#00cc00" strokeWidth="2" />
    <circle cx="100" cy="110" r="8" fill="#00ff00" opacity="0.8" filter="url(#glow)" />
    <circle cx="150" cy="75" r="8" fill="#ff0066" opacity="0.95" filter="url(#glow)" />
    <rect x="35" y="145" width="25" height="10" rx="3" fill="#00cc00" />
  </svg>
);

const App = () => {
  const [appState, setAppState] = useState(STATES.WELCOME);
  const [flashActive, setFlashActive] = useState(false);
  const [resultImage, setResultImage] = useState('');
  const [theme, setTheme] = useState('dark');
  const [showScanLine, setShowScanLine] = useState(true);
  const [animationClass, setAnimationClass] = useState('slide-in-top');

  useEffect(() => {
    const timers = [];

    // Initial state
    setAnimationClass('slide-in-top');

    // Sequence: welcome -> camera -> flash -> loading -> result
    timers.push(setTimeout(() => {
      setAnimationClass('slide-out-top');
      
      setTimeout(() => {
        setAppState(STATES.CAMERA);
        setAnimationClass('slide-in-bottom');
      }, 600);
    }, 2000)); // Show welcome for 2 seconds

    timers.push(setTimeout(() => setFlashActive(true), 3700)); // Flash after camera appears
    timers.push(setTimeout(() => setFlashActive(false), 4500)); // Hide flash

    timers.push(setTimeout(() => {
      setAnimationClass('slide-out-bottom');
      
      setTimeout(() => {
        setAppState(STATES.LOADING);
        setAnimationClass('slide-in-top');
      }, 600);
    }, 4800)); // Show camera for a bit then transition to loading

    timers.push(setTimeout(() => {
      setAnimationClass('slide-out-top');
      
      setTimeout(() => {
        setResultImage(getRandomImage());
        setAppState(STATES.RESULT);
        setAnimationClass('slide-in-bottom');
      }, 600);
    }, 7800)); // Show loading for 3 seconds then transition to result

    // Scan line animation
    const scanInterval = setInterval(() => {
      setShowScanLine(prev => !prev);
    }, 2000);
    timers.push(() => clearInterval(scanInterval));

    return () => timers.forEach(timer => typeof timer === 'function' ? timer() : clearTimeout(timer));
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const renderContent = () => {
    const isDark = theme === 'dark';
    
    switch (appState) {
      case STATES.WELCOME:
        return (
          <div className={`state-container ${animationClass}`}>
            <div className={`screen-card flex flex-col items-center justify-center space-y-4 p-6 rounded-xl shadow-2xl transition-all duration-500 max-w-md w-full hacker-surface ${isDark ? 'glitch-effect' : ''}`}>
              <div className="spinner-animated w-12 h-12 rounded-full" aria-hidden="true"></div>
              <p className="text-lg font-medium hacker-text">[INITIALIZING SYSTEM]...</p>
              <p className="text-sm hacker-text-secondary">Accessing camera feed...</p>
            </div>
          </div>
        );

      case STATES.CAMERA:
        return (
          <div className={`state-container ${animationClass}`}>
            <div className="flex flex-col items-center justify-center space-y-8 px-4 w-full">
              <div className="camera-drop">
                <CameraIcon />
              </div>

              <div className="text-center space-y-2">
                <h1 className="text-6xl leading-none font-extrabold hacker-text bounce-text-animated" aria-hidden>
                  {isDark ? '💻' : '📸'}
                </h1>
                <p className="text-lg font-semibold hacker-text">[SYSTEM READY] Target acquired...</p>
              </div>
            </div>
          </div>
        );

      case STATES.LOADING:
        return (
          <div className={`state-container ${animationClass}`}>
            <div className={`screen-card flex flex-col items-center justify-center space-y-4 p-6 rounded-xl shadow-2xl transition-all duration-500 max-w-lg w-full hacker-surface ${isDark ? 'glitch-effect' : ''}`}>
              <div className="spinner-animated w-16 h-16 rounded-full" aria-hidden></div>
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold hacker-text">[PROCESSING DATA]</h2>
                <p className="mt-2 text-base md:text-lg hacker-text-secondary">
                  <span className="typewriter-animated">Decrypting image payload...</span>
                </p>
                <p className="mt-2 text-sm hacker-text-secondary">[ENCRYPTION: AES-256]</p>
              </div>
            </div>
          </div>
        );

      case STATES.RESULT:
        return (
          <div className={`state-container ${animationClass}`}>
            <div className="flex flex-col items-center justify-center space-y-8 px-4 w-full">
              <div className="photo-reveal result-image-container">
                <img
                  src={resultImage}
                  alt="Funny portrait"
                  className="w-full h-auto object-cover block"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://placehold.co/800x800/ff0066/ffffff?text=DATA_CORRUPTED'; }}
                />
              </div>
              
              <div className={`text-center p-6 rounded-lg shadow-xl w-full max-w-md hacker-surface ${isDark ? '' : 'bg-white/85'}`}>
                <h2 className={`text-3xl md:text-4xl font-extrabold bounce-text-animated ${isDark ? 'text-[#ff0066]' : 'text-[#ff5459]'}`}>
                  {isDark ? '[TARGET CAPTURED]' : 'I got you haha!'} 😂
                </h2>
                <p className="mt-2 text-lg hacker-text">Data extraction complete!</p>

                <div className="mt-6 flex items-center justify-center">
                  <button
                    onClick={() => window.location.reload()}
                    className={`px-6 py-3 font-bold rounded-full shadow hover:scale-105 active:scale-95 transition-transform ${
                      isDark 
                        ? 'bg-[#00ff00] text-black hover:bg-[#00cc00]' 
                        : 'bg-[#21808d] text-white hover:bg-[#1a6873]'
                    }`}
                  >
                    {isDark ? 'REINITIATE SCAN' : 'Prank Again!'} {isDark ? '🚀' : '😈'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <style>{customStyles}</style>
      <div data-theme={theme} className={`min-h-screen w-full overflow-hidden relative ${
        theme === 'dark' ? 'hacker-bg' : 'bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100'
      }`}>
        {/* Matrix rain for dark mode */}
        {theme === 'dark' && <MatrixRain />}
        
        {/* Scan line for dark mode */}
        {theme === 'dark' && showScanLine && <div className="scan-line" />}
        
        {/* Theme toggle */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '🌙 HACKER MODE' : '☀️ LIGHT MODE'}
        </button>

        <div className="main-container">
          {renderContent()}
        </div>

        {/* Flash overlay */}
        <div className={`fixed inset-0 z-50 pointer-events-none ${flashActive ? 'flash-bang' : 'opacity-0'}`} aria-hidden></div>
      </div>
    </>
  );
};

export default App;