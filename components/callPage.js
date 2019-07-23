import { Component } from 'react'

class CallPage extends Component {
	render() {
		return (
			<div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 50}}>
				<figure className="image is-128x128" style={{margin: 20}}>
					<img src={this.props.imgsrc} />
				</figure>
				<p className="title">
					Coversation Starter about {this.props.title}
				</p>
				<p className="subtitle">
					<div className="box" style={{margin: 20}}>
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
				<p className="subtitle">2:05</p>
        <a onClick={() => this.props.disconnectCall()}>
          <figure className="image is-64x64">
            <img src='/static/asset/icon/call.svg' />
          </figure>
        </a>
			</div>
		);
	}
}

export default CallPage