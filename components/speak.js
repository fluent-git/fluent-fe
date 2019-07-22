import { Component, Fragment } from 'react'
import Layout from './layout'

class Speak extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="columns">
                <div className="column has-background-link is-narrow">
                    <div className="columns" style={{width: 300, padding: 30, flexDirection: 'column'}}>         
                        <TileHeader imgsrc='/static/asset/topic/free-purple.svg' title="Free"/>
                        <p className="title" style={{color: '#3C3C72'}}>Talk</p>
                        <p className="subtitle">
                            Talking with stranger and polish your speaking skill. 
                            What do you waiting for? Choose your topic!   
                        </p>
                    </div> 
                </div>
                <div className="column has-background-primary" style={{padding: 50}}>
                    <div className="columns is-mobile is-multiline"> 
                        <Tile imgsrc='/static/asset/topic/culture.svg' title="Culture"/>
                        <Tile imgsrc='/static/asset/topic/food.svg' title="Food"/>
                        <Tile imgsrc='/static/asset/topic/game.svg' title="Game"/>
                        <Tile imgsrc='/static/asset/topic/health.svg' title="Health"/>
                        <Tile imgsrc='/static/asset/topic/job.svg' title="Job"/>
                        <Tile imgsrc='/static/asset/topic/movie.svg' title="Movie"/>
                        <Tile imgsrc='/static/asset/topic/place.svg' title="Place"/>
                        <Tile imgsrc='/static/asset/topic/politic.svg' title="Politic"/>
                        <Tile imgsrc='/static/asset/topic/tech.svg' title="Tech"/>
                        <Tile imgsrc='/static/asset/topic/trend.svg' title="Trend"/>
                    </div>
                </div>
            </div>
        );
    }
}

class Tile extends Component {
    render(){
        return (
            <div className="column container">
                <Box title={this.props.title} imgsrc={this.props.imgsrc}/>
            </div>
        );
    }
}

class TileHeader extends Component {
    render(){
        return (
            <div className="column container">
                <Box title={this.props.title} imgsrc={this.props.imgsrc}/>
            </div>
        );
    }
}

class Box extends Component {
    render(){
        return (
            <a href="/talk">
                <div 
                    className="box" 
                    style={{
                        display: 'flex', 
                        flexDirection:'column', 
                        alignItems: 'center',
                        justifyContent:'space-around',
                        height: 300}}>
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

export default Speak
