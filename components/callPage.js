import { Component } from 'react'
import { startersToShow } from '../utils/constants'
import Axios from 'axios'

class CallPage extends Component {
	constructor(props){
		super(props)
		this.handleUnload = this.handleUnload.bind(this)
		this.state = {
			index: 0
		}
		this.getNextStarters = this.getNextStarters.bind(this)
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

	getNextStarters(){
		this.setState({index: this.state.index+startersToShow})
	}

	render() {
		var topic = this.props.title;
		var starters = []
		for(var idx = this.state.index; idx < this.state.index+startersToShow; idx++){
			starters.push(this.props.starters[idx%this.props.starters.length])
		}
		return (
			<div className="call-page" style={{display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center', justifyContent:'center'}}>
				<link type="text/css" rel="stylesheet" href="static/style.css"/>
				<figure className="image is-128x128 is-hidden-mobile" style={{margin: 20}}>
					<img src={this.props.imgsrc} />
				</figure>
				<p className="title">
					Conversation Starters about {topic}
				</p>
				<div className="box" style={{textAlign: 'left', boxShadow: '0 2px 3px rgba(233, 35, 35, 0.1), 0 0 0 1px rgba(182, 0, 0, 0.1)'}}>
					<div className="content">
						<ol type="1" style={{marginTop: 0}}>
							{starters.map((element)=>(<li className="subtitle" >{element}</li>))}
						</ol>
					</div>
				</div>
				<div class="field is-grouped">
					<p class="control">
						<button class="button is-primary" onClick={this.getNextStarters}>
							Show new conversation starters
						</button>
					</p>
				</div>
				<br></br>
				<LiveTranslation></LiveTranslation>
				<br></br>
				<p className="subtitle">Don’t be shy and talk for at least a few minutes!</p>
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

class LiveTranslation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			from: 'id', // Translate from this language
			to: 'en', // Translate to this language
			translated: 'Enter Text'
		}
		this.handleTextChange = this.handleTextChange.bind(this)
		this.translateText = this.translateText.bind(this)
	}

	translateText(textTranslate) {
		this.setState({ error: '' })
		const trFrom = this.state.from
		const trTo = this.state.to
		const encodedText = encodeURI(textTranslate)
		const translateUrl = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + trFrom + '&tl=' + trTo + '&dt=t&q=' + encodedText
        this.setState({ loading: "is-loading" })
        try {

          const response = Axios.get(translateUrl)		  
		  var resolvePromise = Promise.resolve(response)
		  resolvePromise.then(value => {
			var translatedText = value.data[0][0][0]
			this.setState({translated: translatedText})
		  });

        } catch (error) {
          console.error(
            'You have an error in your code or there are Network issues.',
            error
          )
          this.setState({ error: error.message })
        }
        this.setState({ loading: "" })
	}

	handleTextChange (event) {
		this.setState({text: event.target.value})
		if (event.target.value.length > 2) {
			this.translateText(event.target.value)
		} else {
			this.setState({translated: "Please type something..."})
		}
	}

	render() {
		var translation = <p className="subtitle">
							{this.state.translated}
						  </p>
		return (
			<div>
				<p className="title">
						Live Translation
				</p>
				<input class="input" type="text" placeholder="Enter Text" onChange={this.handleTextChange}></input>
				<label className="label" style={{ width: '100px', position: 'relative', top: '6px', 'text-align': 'left' }}>Translation</label>
              	<div className="control" style={{ width: '100%' }}>
					{translation}
             	 </div>
			</div>
		)
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