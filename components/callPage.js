import { Component } from 'react'

class CallPage extends Component {
	constructor(props){
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
		this.props.disconnectCall();
		return ev.returnValue = 'Are you sure you want to close?';
	}

	render() {
		var topic = this.props.title;
		/*
		let renderTopic
		if(topic == "travel") {
			renderTopic = 	<ol type="1" style={{marginTop: 0}}>
							<li>When and where was the last time you went travelling?</li>
							<li>Share about the activities that you did while travelling.</li>
							<li>Was there something different from your home? Describe the difference</li>
							<li>Where would be your next travel destination? Why?</li>
							<li>What kinds of food did you try? Or what kinds of food do you want to try?</li> </ol>;
		} else if (topic == "hobbies") {
			renderTopic = 	<ol type="1" style={{marginTop: 0}}>
							<li>Talk about movies/music/sports/games you like. Find something in common</li>
							<li>What are the latest news about your hobbies?</li>
							<li>How do you enjoy your hobby? Who do you usually spend it with?</li>
							<li>Do you have a community who share the same hobby? What kinds of events do you guys do?</li>
							<li>What do you like most about your hobby?</li> </ol>;
		} else if (topic == "free talk") {
			renderTopic = 	<ol type="1" style={{marginTop: 0}}>
							<li>What is your dream, what do you wish to achieve? (Talk freely because no one would judge you about it since its anonymous)</li>
							<li>Talk about an interesting story that happened in your high school.</li>
							<li>What is the most epic thing you’ve ever done? (Brag about it, its anonymous)</li>
							<li>What is something that you are obsessed with?</li>
							<li>How should success be measured? By that measurement, who is the most successful person you know?</li> </ol>;
		} else if (topic == "opinion") {
			renderTopic = 	<ol type="1" style={{marginTop: 0}}>
							<li>What do you think about our education system? How could it be improved?</li>
							<li>What is a possible solution to traffic jam? Why is it not implemented yet?</li>
							<li>What do you think about plastic usage? Is it good? Is it bad? Why?</li>
							<li>What needs to change right now in our country? What is the impact?</li>
							<li>Without the internet, people lack access to information. With the internet, people are misinformed by hoax and fake news. How can we solve this?</li> </ol>;
		} else {
			renderTopic = 	<ol type="1" style={{marginTop: 0}}>
							<li>What are you most passionate about?</li>
							<li>What makes you laugh out loud?</li>
							<li>What was your favorite thing to do as a kid?</li>
							<li>Who do you text the most?</li>
							<li>What's your favorite TV show?</li> </ol>;
		}
		*/
		return (
			<div className="call-page" style={{display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center', justifyContent:'center'}}>
				<link type="text/css" rel="stylesheet" href="static/style.css"/>
				<figure className="image is-128x128 is-hidden-mobile" style={{margin: 20}}>
					<img src={this.props.imgsrc} />
				</figure>
				<p className="title">
					Coversation Starter about {topic}
				</p>
				<div className="box" style={{textAlign: 'left', boxShadow: '0 2px 3px rgba(233, 35, 35, 0.1), 0 0 0 1px rgba(182, 0, 0, 0.1)'}}>
					<div className="content">
						<ol type="1" style={{marginTop: 0}}>
							{this.props.starters.map((element)=>(<li className="subtitle" >{element}</li>))}
						</ol>
					</div>
				</div>
				<p className="subtitle">Don’t be shy and talk at least 10 minutes! Then score her speaking skills.</p>
				<TimerCountUp cfun={this.props.cfun}/>
				<a onClick={() => this.props.disconnectCall()}>
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
		var noOp = (x)=>{}
		(this.props.cfun||noOp)(this.secondsElapsed)
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
			<div className="timer-wrapper">
				<p className="subtitle" style={{fontWeight: 'bold'}}>
					{this.state.minutes}:{this.state.seconds}
				</p>
			</div>
		);
	}
}

export default CallPage