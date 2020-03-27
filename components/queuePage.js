import { Component } from 'react'

class QueuePage extends Component {
	constructor(props) {
		super(props)
		this.handleUnload = this.handleUnload.bind(this)
	}

	componentDidMount(){
		window.addEventListener("beforeunload", this.handleUnload);
	}

	componentWillUnmount(){
		console.log('ok kill')
		window.removeEventListener("beforeunload", this.handleUnload);
	}

	handleUnload = function(ev){  
		ev.preventDefault();
		this.props.cancelQueue();
		return ev.returnValue = 'Are you sure you want to close?';
	}

	render() {
		return (
			<div className="container queue-page" style={{display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 50, textAlign: 'center', justifyContent:'center'}}>
				<link type="text/css" rel="stylesheet" href="static/style.css"/>
				<img src='/static/asset/image/queue.svg' style={{width: 450}} />
				<div className="lds-ellipsis">
					<div className="one" style={{background: 'rgba(106, 104, 250, 0.9)'}}></div>
					<div className="two" style={{background: 'rgba(106, 104, 250, 0.5)'}}></div>
					<div className="three" style={{background: 'rgba(106, 104, 250, 0.25)'}}></div>
					<div className="four" style={{background: 'rgba(106, 104, 250, 0.5)'}}></div>
				</div>
				<p className="title">This may take a few minutes...</p>
				<p>What do you think of Fluent? <a href="bit.ly/fluent-feedback" target="_blank">bit.ly/fluent-feedback</a>.</p>
				<TipsDisplay tips={this.props.tips}/>
				<br/>
				<TimerCountDown topic={this.props.topic} />
				<a onClick={() => this.props.cancelQueue()}>
					<figure className="image is-64x64" style={{margin: 20}}>
						<img src='/static/asset/icon/cancel.svg' />
					</figure>
				</a>
			</div>
		);
	}
}

class TipsDisplay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentIndex: 0,
		}
		this.seconds = 0;
		this.tick = this.tick.bind(this)
	}

	tick(){
		if(this.props.tips.length){
			if(2*this.seconds >= this.props.tips[this.state.currentIndex].split(' ').length){
				this.seconds = 0
				if(this.state.currentIndex+1 == this.props.tips.length){
					this.setState({currentIndex: 0})
				} else this.setState({currentIndex: this.state.currentIndex+1})
			}
			this.seconds++;
		}
	}

	componentWillMount(){
		this.intervalHandle = setInterval(this.tick, 1000);
	}

	componentWillUnmount(){
		clearInterval(this.intervalHandle)
	}

	render(){
		if (this.props.tips.length){
			return <p>{this.props.tips[this.state.currentIndex]}</p>
		} else {
			return <p>What do you think of Fluent?<a href="bit.ly/fluent-feedback" target="_blank"> Please kindly fill this form.</a></p>
		}
	}
}

class TimerCountDown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			seconds: '--',
			minutes: '--'
		}
		this.secondsRemaining;
		this.intervalHandle;
		this.startCountDown = this.startCountDown.bind(this);
		this.tick = this.tick.bind(this);
		this.topic = this.props.topic.charAt(0).toUpperCase() + this.props.topic.slice(1);
	}

	tick() {
		/* Counting down system -----
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
		----- End of Counting down system */

		/* Counting up system */
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

		this.secondsRemaining++
		/* ----- End of Counting up system */
	}
	
	startCountDown(){
		this.intervalHandle = setInterval(this.tick, 1000);
	}

	componentWillUnmount(){
		clearInterval(this.intervalHandle)
	}

	componentWillMount(){
		/* Counting down system -----
		let time = Math.floor(Math.random() * 180) + 150; 
		var min = Math.floor(time / 60);
		var sec = time - (min*60);
		----- End of Counting down system */

		/* Counting up system */
		let time = 0; 
		var min = 0;
		var sec = 0;
		/* ----- End of Counting up system */

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
		this.secondsRemaining = time;
		this.startCountDown();
	}

	render() {
		return(
			<div>
				<p className="subtitle">
					{/* Estimated queue time: {this.state.minutes}:{this.state.seconds} */}
					{this.topic} - {this.state.minutes}:{this.state.seconds} 
				</p>
			</div>
		);
	}
}

export default QueuePage