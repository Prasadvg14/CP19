// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isRunning: false, mins: 25, sec: 0, limit: 25}

  onClickStartBtn = () => {
    const {isRunning} = this.state
    this.setState(prevState => ({isRunning: !prevState.isRunning}))
    if (isRunning === false) {
      this.timerId = setInterval(this.tick, 1000)
    } else {
      clearInterval(this.timerId)
    }
  }

  tick = () => {
    const {sec} = this.state
    if (sec > 0) {
      this.setState(prevState => ({sec: prevState.sec - 1}))
    } else {
      this.setState(prevState => ({mins: prevState.mins - 1, sec: 59}))
    }
  }

  onClickReset = () => {
    this.setState({isRunning: false, mins: 25, sec: 0})
    clearInterval(this.timerId)
  }

  onClickPlus = () => {
    this.setState(prevState => ({
      mins: prevState.mins + 1,
      limit: prevState.limit + 1,
    }))
  }

  onClickMinus = () => {
    const {isRunning} = this.state
    if (isRunning === false) {
      this.setState(prevState => ({
        mins: prevState.mins - 1,
        limit: prevState.limit - 1,
      }))
    }
  }

  render() {
    const {isRunning, mins, sec, limit} = this.state
    const btnText = isRunning ? 'Pause' : 'Start'
    const btnIcon = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altText = isRunning ? 'pause icon' : 'play icon'
    const status = isRunning ? 'Running' : 'Paused'

    const seconds = String(sec).length === 1 ? '0'.concat(sec) : sec
    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="bottom">
          <div className="timerCard">
            <div className="timer">
              <h1 className="time">
                {mins}:{seconds}
              </h1>
              <p>{status}</p>
            </div>
          </div>
          <div className="controls">
            <div className="buttons">
              <button
                onClick={this.onClickStartBtn}
                type="button"
                className="btn"
              >
                <img className="icon" src={btnIcon} alt={altText} />
                <p> {btnText}</p>
              </button>
              <button onClick={this.onClickReset} type="button" className="btn">
                <img
                  className="icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                Reset
              </button>
            </div>
            <p>Set Timer Limit</p>
            <div className="limit-controls">
              <button onClick={this.onClickMinus} type="button" className="btn">
                -
              </button>
              <p className="limit">{limit}</p>
              <button onClick={this.onClickPlus} type="button" className="btn">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
