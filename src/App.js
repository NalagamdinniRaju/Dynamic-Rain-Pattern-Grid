
import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import "./App.css";

const RainPatternGrid = () => {
  const [speed, setSpeed] = useState(1000);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [grid, setGrid] = useState(Array(15).fill().map(() => Array(20).fill(null)));
  const audioRef = useRef(null);

  const colors = ["bg-blue", "bg-purple", "bg-pink", "bg-green", "bg-yellow"];

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setGrid((prevGrid) => {
          const newGrid = prevGrid.map((row) => [...row]);

          // Move existing drops down
          for (let i = newGrid.length - 1; i > 0; i--) {
            for (let j = 0; j < newGrid[i].length; j++) {
              newGrid[i][j] = newGrid[i - 1][j];
            }
          }

          // Generate new drops in the first row
          for (let j = 0; j < newGrid[0].length; j++) {
            newGrid[0][j] = Math.random() < 0.3 ? colors[Math.floor(Math.random() * colors.length)] : null;
          }

          return newGrid;
        });
      }, speed);

      return () => clearInterval(interval);
    }
  }, [isPaused, speed]);

  const handleSpeedChange = (e) => {
    setSpeed(2000 - e.target.value);
  };

  const toggleSound = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  const resetGrid = () => {
    setGrid(Array(15).fill().map(() => Array(20).fill(null)));
  };

  return (
    <div className="container">
      <div>
        <h1 className="heading">Dynamic Rain Pattern Grid</h1>
        <div className="card">
          <div className="controls">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`button ${isPaused ? "button-play" : "button-pause"}`}
            >
              {isPaused ? <FaPlay /> : <FaPause />}
              {isPaused ? "Play" : "Pause"}
            </button>

            <button onClick={toggleSound} className="button button-sound">
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              {isMuted ? "Unmute" : "Mute"}
            </button>

            <button onClick={resetGrid} className="button button-reset">
              <MdRefresh />
              Reset
            </button>

            <div className="speed-control">
              <span className="speed-control-label">Speed:</span>
              <input
                type="range"
                min="0"
                max="1900"
                value={2000 - speed}
                onChange={handleSpeedChange}
                className="speed-control-slider"
              />
            </div>
          </div>

          <div className="grid">
            {grid.map((row, i) =>
              row.map((cell, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`grid-cell ${cell || ""}`}
                  role="presentation"
                />
              ))
            )}
          </div>
        </div>
        <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" loop />
      </div>
    </div>
  );
};

export default RainPatternGrid;
