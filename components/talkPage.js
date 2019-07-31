import { Component } from 'react'

class TalkPage extends Component {
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className="columns talk-page" style={{margin: 0}}>
				<link type="text/css" rel="stylesheet" href="static/style.css"/>
				<div className="column has-background-grey-light is-narrow is-hidden-mobile">
					<div className="columns header-wrapper" style={{flexDirection: 'column'}}>         
						<TileHeader tryToQueue={this.props.tryToQueue} imgsrc='/static/asset/topic/free-purple.svg' title="Free Talk"/>
						<div className="column">
							<p className="title" style={{color: '#3C3C72'}}>Talk</p>
							<p className="subtitle">
								Talk with community members and practice your speaking skill!  
							</p>
						</div>
					</div> 
				</div>
				<div className="column content-wrapper has-background-grey-lighter">
					<div className="columns is-mobile is-multiline"> 
							<div className="is-hidden-tablet" style={{width: '100%'}}><TileTalk tryToQueue={this.props.tryToQueue} imgsrc='/static/asset/topic/free.svg' title="Free Talk"/></div>
							<Tile tryToQueue={this.props.tryToQueue} imgsrc='/static/asset/topic/place.svg' title="Travel"/>
							<Tile tryToQueue={this.props.tryToQueue} imgsrc='/static/asset/topic/game.svg' title="Game"/>
							<Tile tryToQueue={this.props.tryToQueue} imgsrc='/static/asset/topic/trend.svg' title="Opinion Sharing"/>
							<Tile tryToQueue={this.props.tryToQueue} imgsrc='/static/asset/topic/culture.svg' title="Culture"/>
							<Tile tryToQueue={this.props.tryToQueue} imgsrc='/static/asset/topic/food.svg' title="Food"/>
							<Tile tryToQueue={this.props.tryToQueue} imgsrc='/static/asset/topic/health.svg' title="Health"/>
							<Tile tryToQueue={this.props.tryToQueue} imgsrc='/static/asset/topic/job.svg' title="Job"/>
							<Tile tryToQueue={this.props.tryToQueue} imgsrc='/static/asset/topic/movie.svg' title="Movie"/>
							<Tile tryToQueue={this.props.tryToQueue} imgsrc='/static/asset/topic/politic.svg' title="Politic"/>
							<Tile tryToQueue={this.props.tryToQueue} imgsrc='/static/asset/topic/tech.svg' title="Tech"/>
					</div>
				</div>
			</div>
		);
	}
}


class Tile extends Component {
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div className="tile-wrapper column container">
				<Box tryToQueue={this.props.tryToQueue}  title={this.props.title} imgsrc={this.props.imgsrc}/>
			</div>
		);
	}
}

class TileTalk extends Component {
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div className="column container">
				<BoxTalk tryToQueue={this.props.tryToQueue}  title={this.props.title} imgsrc={this.props.imgsrc}/>
			</div>
		);
	}
}

class TileHeader extends Component {
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div className="column container">
				<Box tryToQueue={this.props.tryToQueue} title={this.props.title} imgsrc={this.props.imgsrc}/>
			</div>
		);
	}
}

class Box extends Component {
	constructor(props){
		super(props)
	}
	render() {
		return (
			<a onClick={() => this.props.tryToQueue(this.props.title, this.props.imgsrc)}>
				<div 
					className="box tile-box" 
					style={{
						display: 'flex', 
						flexDirection:'column', 
						alignItems: 'center',
						justifyContent:'space-around'}}>
					<figure className="image is-128x128">
						<img src={this.props.imgsrc} />
					</figure>
					<p className="title">
						{this.props.title}
					</p>
				</div>
			</a>
		);
	}
}

class BoxTalk extends Component {
	constructor(props){
		super(props)
	}
	render() {
		return (
			<a onClick={() => this.props.tryToQueue(this.props.title, this.props.imgsrc)}>
				<div 
					className="box tile-box-talk" 
					style={{
						display: 'flex', 
						flexDirection:'row', 
						alignItems: 'center',
						justifyContent:'space-around'}}>
					<figure className="image is-128x128">
						<img src={this.props.imgsrc} />
					</figure>
					<p className="title">
						{this.props.title}
					</p>
				</div>
			</a>
		);
	}
}


export default TalkPage