import { Component } from 'react'

class QueuePage extends Component {
	render() {
		return (
			<div className="container" style={{display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 50}}>
				<img src='/static/asset/image/queue.svg' style={{width: 600}} />
				<img src='/static/asset/icon/load.svg' style={{width: 64, margin: 20}} />
				<p className="title">Please wait till match...</p>
				<TimerCountDown />
				<a onClick={() => this.props.cancelQueue()}>
					<figure className="image is-64x64" style={{margin: 20}}>
						<img src='/static/asset/icon/cancel.svg' />
					</figure>
				</a>
			</div>
		);
	}
}

class TimerCountDown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			seconds: '00',
			minutes: '05'
		}
		this.secondsRemaining;
		this.intervalHandle;
		this.startCountDown = this.startCountDown.bind(this);
		this.tick = this.tick.bind(this);
	}

	tick() {
		if (this.secondsRemaining == 0) {
			clearInterval(this.intervalHandle);
			this.setState({
				seconds: "00",
				minutes: "00"
			})
			return 
		}

		var min = Math.floor(this.secondsRemaining / 60);
		var sec = this.secondsRemaining - (min*60);

		if(sec < 10) {
			this.setState({
				seconds: "0" + sec,
			})
		} else {
			this.setState({
				seconds: sec,
			})
		}

		if(min<10) {
			this.setState({
				minutes: "0" + min,
			})
		} else {
			this.setState({
				minutes: min,
			})
		}

		this.secondsRemaining--
	}
	
	startCountDown(){
		this.intervalHandle = setInterval(this.tick, 1000);
		let time = this.state.minutes;
		this.secondsRemaining = time*60;
	}

	componentDidMount(){
		this.startCountDown();
	}

	render() {
		return(
			<div>
				<p className="subtitle">
					Estimated wait {this.state.minutes}:{this.state.seconds}
				</p>
			</div>
		);
	}
}

export default QueuePage