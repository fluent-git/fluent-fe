import { Component } from 'react'

class Modal extends Component {
    render() {
        return (
            <div>
                <div className="modal-overlay" />
                <div className="modal-content-wrapper">
                    <div className="modal-content">
                        <div className="modal-top">
                            <figure class="image">
                                <img src='/static/asset/icon/warn.svg' />
                            </figure>
                            <p className="subtitle">{this.props.content}</p>
                        </div>
                        <a onClick={() => this.props.onClose()}>
                            <div className="modal-bottom">CLOSE</div>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal
