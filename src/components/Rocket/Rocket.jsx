import React, { useEffect } from 'react';


const Rocket = ( { planet , astronaut }) => {
  useEffect(() => {
    drawStars();
  })

  const smokeBubbles = []

  for (let i = 0; i < 15; i++) {
    smokeBubbles.push(<div className="smoke__bubble"></div>)
  }

  return (
    <div className="frame">
      <div className="scene">
        <div className="scene__main">
          <div className="rocket">
            <div className="rocket__body"></div>
            <div className="rocket__fin rocket__fin--left"></div>
            <div className="rocket__fin rocket__fin--right"></div>
            <div className="rocket__fin rocket__fin--center"></div>
            <div className="rocket__stream"></div>
          </div>
        </div>
        <div className="sky"></div>
        <div className="shadow"></div>
        <div className="surface"></div>
        <div className="launch-pad"></div>
        <div className="vertical-lines"></div>
        <div className="stars">
          <div className="star"></div>
          <div className="falling-star"></div>
        </div>

        <div className="smoke">
          {smokeBubbles}
        </div>

        <div className="scene__secondary">
          <div className={`planet ${ planet.name.toLowerCase()}`} />
          <div className={`astronaut ${ astronaut.boy ? 'boy' : 'girl'}`}>
            <div className="head"></div>
            <div className="body">
              <div className="arms">
                <div className="arm"></div>
                <div className="arm"></div>
              </div>
              <div className="legs">
                <div className="leg"></div>
                <div className="leg"></div>
              </div>
            </div>
            <div className="flag"></div>
            <div className="kidname">Mission accomplished Astronaut { astronaut.name }. You have landed on { planet.name === 'Moon' ? 'the' : ''} { planet.name } !</div>
            <div className="distance">Distance travelled { planet.distance } <br /> Time taken: { planet.days } </div>


          </div>
        </div>
      </div>
    </div>
  );
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const drawStars = () => {
  const star = document.querySelector('.star');
  const stars = document.querySelector('.stars');

  for (let i = 0; i <= 20; i++) {
    const newStar = star.cloneNode();
    const top = getRandomInt(100);
    const left = getRandomInt(100);
    const size = getRandomInt(20) / 200;
    newStar.setAttribute('style', `top: ${top}%; left: ${left}%; width: ${size}em; height: ${size}em`);
    stars.appendChild(newStar);
  }
}

export default Rocket;