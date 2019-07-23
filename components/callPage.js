import { Component } from 'react'

class CallPage extends Component {
	render() {
		return (
			<div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 50, textAlign: 'center'}}>
				<figure className="image is-128x128 is-hidden-mobile" style={{margin: 20}}>
					<img src={this.props.imgsrc} />
				</figure>
				<p className="title">
					Coversation Starter about {this.props.title}
				</p>
				<p className="subtitle">
					<div className="box" style={{margin: 20, textAlign: 'left', boxShadow: '0 2px 3px rgba(233, 35, 35, 0.1), 0 0 0 1px rgba(182, 0, 0, 0.1)'}}>
						<div className="content">
							<ol type="1" style={{marginTop: 0}}>
								<li>What are you most passionate about?</li>
								<li>What makes you laugh out loud?</li>
								<li>What was your favorite thing to do as a kid?</li>
								<li>Who do you text the most?</li>
								<li>What's your favorite TV show?</li>
							</ol>
						</div>
					</div>
				</p>
				<p className="subtitle">Don’t be shy and talk at least 10 minutes! Then score her speaking skills.</p>
				<TimerCountUp />
        <a onClick={() => this.props.disconnectCall()} style={{margin: 20}}>
          <figure className="image is-64x64">
            <img src='/static/asset/icon/call.svg' />
          </figure>
        </a>
			</div>
		);
	}
}

class TimerCountUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			seconds: '00',
			minutes: '00'
		}
		this.secondsElapsed;
		this.intervalHandle;
		this.startCountUp = this.startCountUp.bind(this);
		this.tick = this.tick.bind(this);
	}

	tick() {

		var min = Math.floor(this.secondsElapsed / 60);
		var sec = this.secondsElapsed - (min*60);

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

		this.secondsElapsed++;
	}
	
	startCountUp(){
		this.intervalHandle = setInterval(this.tick, 1000);
		this.secondsElapsed = 0;
	}

	componentDidMount(){
		this.startCountUp();
	}

	render() {
		return(
			<div>
				<p className="subtitle">
					{this.state.minutes}:{this.state.seconds}
				</p>
			</div>
		);
	}
}

export default CallPage