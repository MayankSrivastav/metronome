import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Metronome from './Metronome';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Metronome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bpm: 100,
      count: 0,
      playing: false,
      beatsPerMeasure: 4
    };

    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }
  
  handleBPMChange = (event, newValue) => {
    const bpm = newValue;
    if (this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      this.setState({
        bpm,
        count: 0
      });
    } else {
      this.setState({ bpm });
    }
  };

  startStop = () => {
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({ playing: false });
    } else {
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000);

        this.setState({
        count: 0,
        playing: true,
      }, this.playClick);
    }
  };
  playClick = () => {
    const { count, beatsPerMeasure } = this.state;
    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }
    
    this.setState(state => ({
      count: (state.count + 1) % beatsPerMeasure
    }));
  };
  render() {
    let { bpm, playing } = this.state;

    return (
      <section className="metronome">
        <section className="bpm-slider">
          <p>{bpm} BPM</p>
          <Slider            
            min={60}
            max={240}
            value={bpm}
            step={1}
            onChange={this.handleBPMChange}
          />
          <RaisedButton primary onClick={this.startStop}>
            {playing ? 'Stop' : 'Start'}
          </RaisedButton> 
        </section>
      </section>
      );
    }
}
export default Metronome;
