import { Component } from 'react'

class QueuePage extends Component {
	render() {
		return (
			<div className="container" style={{display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 50}}>
				<img src='/static/asset/image/queue.svg' style={{width: 600}} />
				<img src='/static/asset/icon/load.svg' style={{width: 64, margin: 20}} />
				<p className="title">Please wait till match...</p>
				<p className="subtitle">Estimated wait: 5 minutes</p>
				<a onClick={() => this.props.cancelQueue()}>
					<figure className="image is-64x64">
						<img src='/static/asset/icon/cancel.svg' />
					</figure>
				</a>
			</div>
		);
	}
}

export default QueuePage