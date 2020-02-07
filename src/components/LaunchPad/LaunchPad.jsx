import React, { Component } from 'react';
import Rocket from '../Rocket/Rocket';
import badge from '../../assets/badge.svg';
import STUDENT_DATA from '../../data/student.data';
import PLANET_DATA from '../../data/planets.data';
//import FAMILY_DATA from '../../data/family.data';

class LaunchPad extends Component {

  constructor(props) {
    super(props);

    this.state = {
      randomised: false,
      initiated: false,
      selected: false,
      classList: [],
      astronaut: {},
      countdown: 0,
      randomName: '',
      completed: false,
      planets: [],
      selectedplanet: {}
    }
  }

  componentDidMount() {
    localStorage.clear();
    this.setState({ classList: STUDENT_DATA });
    this.setState({ planets: PLANET_DATA });
  }

  SelectAstronaut = () => {

    let astronauts = [];
    if (localStorage.getItem("astronauts")) {
      astronauts = JSON.parse(localStorage.getItem("astronauts"));
    } else {
      astronauts = this.state.classList;
    }

    let filteredList = astronauts.filter((item) => item.picked === false);
    if (filteredList.length >= 1) {
      let random = Math.floor(Math.random() * filteredList.length);

      let selectedAstronaut = filteredList[random];
      selectedAstronaut.picked = true;
      this.setState({ selected: true });
      this.setState({ astronaut: selectedAstronaut });
      this.updateItem(random, { picked: true });

      localStorage.setItem('astronauts', JSON.stringify(filteredList));
    } else {
      localStorage.clear();
      this.setState({ completed: true });

    }

    this.SelectPlanet();
  }


  SelectPlanet() {
    let randomplanet = Math.floor(Math.random() * this.state.planets.length);
    let selectedPlanet = this.state.planets[randomplanet];
    this.setState({ selectedplanet: selectedPlanet })
  }

  updateItem(index, itemAttributes) {
    this.setState({
      classList: [
        ...this.state.classList.slice(0, index),
        Object.assign({}, this.state.classList[index], itemAttributes),
        ...this.state.classList.slice(index + 1)
      ]
    });

  }

  RandomiseNames() {
    if (this.state.completed) {
      this.setState({ randomName: 'Well done class - Everyone completed their mission!' });
      return;
    }

    this.setState({ randomised: true });
    let nameArr = this.state.classList.map(c => c.name);


    let nameInterval = setInterval(() => {
      this.setState({ randomName: (nameArr[Math.floor(Math.random() * nameArr.length)]) });


      if (this.state.selected) {
        clearInterval(nameInterval);
      }

    }, 100);



  }


  StartCountdown = (seconds) => {
    this.setState({ countdown: seconds });
    this.setState({ initiated: true });

    let interval = setInterval(() => {

      this.setState({ countdown: seconds });
      seconds--;


      if (seconds < 0) {
        // The code here will run when
        // the timer has reached zero.
        this.setState({ countdown: 'Blast Off!' });

        clearInterval(interval);
      };

      if (!this.state.initiated) {
        clearInterval(interval);
      }

    }, 1000);

  };

  RestartMission = () => {
    this.setState({ initiated: false });
    this.setState({ selected: false });
    this.setState({ randomised: false });
  }


  render() {
    const pStyle = {
      color: this.state.selectedplanet.color
    };

    const { initiated, selected, randomised, completed, countdown, astronaut,  selectedplanet } = this.state;
    const timeToLaunch = 5;

    return (
      <div className="launchpad">
        <div className="launch-sequence">
          <div className="button-group">
            {!initiated && !selected && !completed &&
              <button className="launch" onClick={() => this.RandomiseNames()} >Start</button>
            }
            {randomised && !selected && !completed &&
              <button className="launch" onClick={() => this.SelectAstronaut()} >Select an astronaut</button>
            }
            {selected && !initiated &&
              <button className="launch green" onClick={() => this.StartCountdown(timeToLaunch)}>Start countdown</button>
            }
            {initiated && <button className="launch" onClick={() => this.RestartMission()} >Restart Mission</button>}
          </div>
          {!selected && randomised && !completed &&
            <p className="astronautName"> {this.state.randomName}</p>
          }
          {completed &&
            <div><p className="astronautName completed">Well done class!
            <br />Everyone completed their mission </p>
              <img src={badge} className="badge" alt="badge" />
            </div>}
          { selected &&
            <div>
              <p>Astronaut</p>
              <div className="chosen-astronaut">
                <div className="head"></div>
                <p className={`astronautName ${astronaut.boy ? 'boy' : 'girl'}`}>{astronaut.name}</p>
              </div>
              <p>You have been selected for a very important space mission to:</p>
              <p className="planetName" style={pStyle}>{selectedplanet.name === 'Moon' ? 'The' : ''} {selectedplanet.name}</p>


            </div>
          }
          {initiated && <div className={`timer ${countdown.length > 1 ? 'complete' : 'none'}`}>{countdown}</div>}
        </div>
        <div>{
          initiated && <Rocket astronaut={astronaut} planet={selectedplanet} />}
        </div>
      </div>
    );
  }
}

export default LaunchPad;