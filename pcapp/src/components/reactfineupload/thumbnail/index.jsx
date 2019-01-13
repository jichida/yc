import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Placeholder from './placeholder'

import NotAvailablePlaceholder from './not-available-placeholder'
import WaitingPlaceholder from './waiting-placeholder'

export const defaultMaxSize = 74 
export const notAvailableStatus = 'not-available'
export const waitingStatus = 'waiting'

class Thumbnail extends Component {
    static propTypes = {
        customResizer: PropTypes.func,
        fromServer: PropTypes.bool,
        id: PropTypes.number.isRequired,
        maxSize: PropTypes.number,
        notAvailablePlaceholder: PropTypes.element,
        uploader: PropTypes.object.isRequired,
        waitingPlaceholder: PropTypes.element
    };

    static defaultProps = {
        maxSize: defaultMaxSize
    };

    constructor() {
        super()

        this.state = {
            drawComplete: false
        }
    }

    componentDidMount() {
        // this.props.uploader.methods.drawThumbnail(
        //     this.props.id,
        //     this._canvas,
        //     this.props.maxSize,
        //     this.props.fromServer,
        //     this.props.customResizer
        // )
        //     .then(
        //         () => {
        //             this.setState({
        //                 drawComplete: true,
        //                 success: true
        //             })
        //         },

        //         () => {
        //             this.setState({
        //                 drawComplete: true,
        //                 success: false
        //             })
        //         }
        //     )
    }

    handlePreview = ()=>{
        this.props.onPreview(this.props.id)
    }


    render() {
        const customContainerClassName = this.props.className && this.props.className + '-container'

        return (
            <span className={ `react-fine-uploader-thumbnail-container ${customContainerClassName || ''}` } onClick={this.handlePreview}>
                {/* <canvas className={ `react-fine-uploader-thumbnail ${this.props.className || ''}` }
                    hidden={ !this.state.drawComplete || this._failure }
                    ref={ component => this._canvas = component }
                /> */}
                <img src={this.props.thumbnailUrl} 
                    style={{maxHeight: this.props.maxSize, maxWidth: this.props.maxSize, objectFit: 'cover', margin: '0 auto'}}
                    alt=''
                />
                {/* { this._maybePlaceholder } */}
            </span>
        )
    }

    get _failure() {
        return this.state.drawComplete && !this.state.success
    }

    get _maybePlaceholder() {
        if (this._failure) {
            const notAvailableImage = (
                <NotAvailablePlaceholder maxSize={ this.props.maxSize } />
            )
            
            return (
                <Placeholder className={ `react-fine-uploader-thumbnail ${this.props.className || ''}` }
                    image={ this.props.notAvailablePlaceholder || notAvailableImage }
                    size={ this.props.maxSize }
                    status={ notAvailableStatus }
                />
            )
        }
        else if (!this.state.drawComplete) {
            const waitingImage = (
                <WaitingPlaceholder maxSize={ this.props.maxSize } />
            )

            return (
                <Placeholder className={ `react-fine-uploader-thumbnail ${this.props.className || ''}` }
                    image={ this.props.waitingPlaceholder || waitingImage }
                    size={ this.props.maxSize }
                    status={ waitingStatus }
                />
            )
        }

        return <span />
    }
}

export default Thumbnail
