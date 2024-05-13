import { useState, useEffect } from "react";
import flightData from "./data/flight_data.json";
import airplaneIcon from "./images/airplane.png";

import "./App.css";

const App = () => {
  const [isFlying, setIsFlying] = useState(false);
  const [planePosition, setPlanePosition] = useState({
    x: 500,
    y: 300,
  });
  const [direction, setDirection] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let animationInterval;

    if (isFlying) {
      let currentIndex = 0;

      animationInterval = setInterval(() => {
        const currentFlightData = flightData[currentIndex];

        const speedX =
          currentFlightData.speed *
          Math.cos(((currentFlightData.direction - 90) * Math.PI) / 180);
        const speedY =
          currentFlightData.speed *
          Math.sin(((currentFlightData.direction - 90) * Math.PI) / 180);

        setPlanePosition((prevPosition) => ({
          x: prevPosition.x + (speedX * 20) / 360,
          y: prevPosition.y + (speedY * 20) / 360,
        }));

        setDirection(currentFlightData.direction);

        currentIndex++;

        if (currentIndex === flightData.length || elapsedTime >= 20) {
          setIsFlying(false);
        }
      }, 1000);
    }

    return () => clearInterval(animationInterval);
  }, [elapsedTime, isFlying]);

  const startFlight = () => {
    setIsFlying((prevIsFlying) => !prevIsFlying);
  };

  const stopFlight = () => {
    setIsFlying(false);
    setDirection(0);
    setElapsedTime(0);
    setPlanePosition({ x: 500, y: 300 });
  };

  return (
    <div className="container">
      <p
        className="coordinates"
        style={{ left: "50%", transform: "translateX(-50%)" }}
      >
        N 360°
      </p>
      <p
        className="coordinates"
        style={{
          left: "0",
          top: "50%",
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
        }}
      >
        W 270°
      </p>
      <p
        className="coordinates"
        style={{
          right: "0",
          top: "50%",

          writingMode: "vertical-rl",
          transform: "rotate(180deg) ",
        }}
      >
        E 90°
      </p>
      <p
        className="coordinates"
        style={{ left: "50%", bottom: "0", transform: "translateX(-50%)" }}
      >
        N 180°
      </p>
      <img
        src={airplaneIcon}
        alt="Airplane"
        style={{
          position: "absolute",
          left: planePosition.x,
          top: planePosition.y,
          transform: `translate(-50%, -50%) rotate(${direction}deg)`,
        }}
      />

      <button className="button" onClick={isFlying ? stopFlight : startFlight}>
        {isFlying ? "Стоп" : "Почати"}
      </button>
    </div>
  );
};

export default App;
