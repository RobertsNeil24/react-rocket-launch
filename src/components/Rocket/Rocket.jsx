import React, { Component } from 'react';

class Rocket extends Component {

    componentDidMount () {
        this.drawStars();
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

    drawStars() {
        const star = document.querySelector('.star');
        const stars = document.querySelector('.stars');
        
        for(let i = 0; i <= 20; i++) {
          const newStar = star.cloneNode();
          const top = this.getRandomInt(100);
          const left = this.getRandomInt(100);
          const size = this.getRandomInt(20) / 200;
          newStar.setAttribute('style', `top: ${top}%; left: ${left}%; width: ${size}em; height: ${size}em`);
          stars.appendChild(newStar);
        }
    }
      

    render() {
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
                    {/* <div className="countdown"></div> */}

                    <div className="stars">
                        <div className="star"></div>
                        <div className="falling-star"></div>
                    </div>

                    <div className="smoke">
                        <div className="smoke__bubble"></div>
                        <div className="smoke__bubble"></div>
                        <div className="smoke__bubble"></div>
                        <div className="smoke__bubble"></div>
                        <div className="smoke__bubble"></div>
                        <div className="smoke__bubble"></div>
                        <div className="smoke__bubble"></div>
                        <div className="smoke__bubble"></div>
                        <div className="smoke__bubble"></div>
                        <div className="smoke__bubble"></div>
                        <div className="smoke__bubble"></div>
                        <div className="smoke__bubble"></div>
                        <div className="smoke__bubble"></div>
                        <div className="smoke__bubble"></div>
                        <div className="smoke__bubble"></div>
                    </div>

                    <div className="scene__secondary">

                
                        <div className={`planet ${this.props.planet.name.toLowerCase()}`} />
                     

                        <div className={`astronaut ${this.props.astronaut.boy? 'boy' : 'girl'}`}>
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
                            <div className="kidname">Mission accomplished Astronaut {this.props.astronaut.name}. You have landed on {this.props.planet.name === 'Moon' ? 'the' : ''} {this.props.planet.name} !</div>
                            <div className="distance">Distance travelled {this.props.planet.distance} <br /> Time taken: {this.props.planet.days} </div>

                            
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default Rocket;