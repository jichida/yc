import React, { Component } from 'react'
import _map from 'lodash.map'
import PropTypes from 'prop-types'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

import CancelButton from '../cancel-button'
import DeleteButton from '../delete-button'
import Dropzone from '../dropzone'
import FileInput from '../file-input'
import Filename from '../filename'
import Filesize from '../filesize'
import RetryButton from '../retry-button'
import PauseResumeButton from '../pause-resume-button'
import ProgressBar from '../progress-bar'
import Status from '../status'
import Thumbnail from '../thumbnail'

import PauseIcon from './pause-icon'
import PlayIcon from './play-icon'
import UploadIcon from './upload-icon'
import UploadFailedIcon from './upload-failed-icon'
import UploadSuccessIcon from './upload-success-icon'
import XIcon from './x-icon'

// const visibleFiles = [];

const getInitFiles = (files) => {
    const initFiles = [];
    _map(files, (v, i)=>{
        initFiles.push(
            {
                id: i, 
                thumbnailUrl: v,
                fromServer: true,
            })
    })
    return initFiles;
}

class Gallery extends Component {
    static propTypes = {
        className: PropTypes.string,
        uploader: PropTypes.object.isRequired
    };   

    static defaultProps = {
        className: '',
        'cancelButton-children': <XIcon />,
        'deleteButton-children': <XIcon />,
        'dropzone-disabled': true,
        'dropzone-dropActiveClassName': 'react-fine-uploader-gallery-dropzone-active',
        'dropzone-multiple': false,
        'fileInput-multiple': true,
        'pauseResumeButton-pauseChildren': <PauseIcon />,
        'pauseResumeButton-resumeChildren': <PlayIcon />,
        'retryButton-children': <PlayIcon />,
        'thumbnail-maxSize': 74
    }

    constructor(props) {
        super(props)

        this.state = {
            visibleFiles: [],
        }

        
        this.state.visibleFiles = getInitFiles(this.props.files)
        this.props.uploader.methods.addInitialFiles(this.state.visibleFiles);
        
        // for( const file of this.props.files){
        //     this.state.visibleFiles.push({id: file.id, fromServer: true})
        // }

        // const statusEnum = props.uploader.qq.status

        // this._onStatusChange = (id, oldStatus, status) => {
        //     const visibleFiles = this.state.visibleFiles

        //     if (status === statusEnum.SUBMITTED) {
        //         visibleFiles.push({ id })
        //         this.setState({ visibleFiles })
        //     }
        //     else if (isFileGone(status, statusEnum)) {
        //         this._removeVisibleFile(id)
        //     }
        //     else if (status === statusEnum.UPLOAD_SUCCESSFUL|| status === statusEnum.UPLOAD_FAILED) {
        //         if (status === statusEnum.UPLOAD_SUCCESSFUL) {
        //             const visibleFileIndex = this._findFileIndex(id)
        //             if (visibleFileIndex < 0) {
        //                 visibleFiles.push({ id, fromServer: true })
        //             } 
        //         }
        //         this._updateVisibleFileStatus(id, status)
        //     }

        // }

        this._onComplete = (id, name, res) => {
            const visibleFiles = this.state.visibleFiles;
            const fromServer = false;
            const thumbnailUrl = this.props.baseUrl + name;
            visibleFiles.push({id, thumbnailUrl, fromServer});

            const files = this.props.files;
            files.push(thumbnailUrl)
            this.props.onChange(files);
        }

        this.handleDelete = (id) => {
            const fileIndex = this._findFileIndex(id);
            if (fileIndex >= 0) {
                const visibleFiles = this.state.visibleFiles;

                const files = this.props.files.filter((v)=>{return v !== visibleFiles[fileIndex].thumbnailUrl});

                visibleFiles.splice(fileIndex, 1)
                this.setState({visibleFiles})
                console.log(id)
                
                
                this.props.onChange(files);
            }
        }

    }


    componentDidMount() {
        // this.props.uploader.on('statusChange', this._onStatusChange)
        this.props.uploader.on('complete', this._onComplete)
    }

    componentWillUnmount() {
        // this.props.uploader.off('statusChange', this._onStatusChange)
        this.props.uploader.off('complete', this._onComplete)
    }

    // componentWillUpdate(nextProps, nextState) {
    //     //this.props.uploader.methods.addInitialFiles(nextProps.files);

    //     if(nextProps.files){
    //         const visibleFiles = [];
    //         nextProps.files.map((item)=>{
    //             visibleFiles.push({id: item.id, fromServer: true})
    //         })
    //         this.setState({visibleFiles})
    //     }
    //     console.log(this.state.visibleFiles);
    // }

    // _removeVisibleFile(id) {
    //     const visibleFileIndex = this._findFileIndex(id)

    //     if (visibleFileIndex >= 0) {
    //         const visibleFiles = visibleFiles

    //         visibleFiles.splice(visibleFileIndex, 1)
    //         this.setState({ visibleFiles })
    //     }
    // }

    // _updateVisibleFileStatus(id, status) {
    //     visibleFiles.some(file => {
    //         if (file.id === id) {
    //             file.status = status
    //             this.setState({ visibleFiles: visibleFiles })
    //             return true
    //         }
    //     })
    // }

    _findFileIndex(id) {
        let visibleFileIndex = -1

        this.state.visibleFiles.some((file, index) => {
            if (file.id === id) {
                visibleFileIndex = index
                return true
            }
        })

        // this.props.files.some((file, index) => {
        //     if (file.id === id) {
        //         visibleFileIndex = index
        //         return true
        //     }
        // })


        return visibleFileIndex
    }

    render() {
        // const cancelButtonProps = getComponentProps('cancelButton', this.props)
        const dropzoneProps = getComponentProps('dropzone', this.props)
        const fileInputProps = getComponentProps('fileInput', this.props)
        // const filenameProps = getComponentProps('filename', this.props)
        // const filesizeProps = getComponentProps('filesize', this.props)
        const progressBarProps = getComponentProps('progressBar', this.props)
        // const retryButtonProps = getComponentProps('retryButton', this.props)
        // const statusProps = getComponentProps('status', this.props)
        const thumbnailProps = getComponentProps('thumbnail', this.props)
        const uploader = this.props.uploader
        const xviewUploadImage = this.props.xviewUploadImage

        // const chunkingEnabled = uploader.options.chunking && uploader.options.chunking.enabled
        const deleteEnabled = uploader.options.deleteFile && uploader.options.deleteFile.enabled
        const deleteButtonProps = deleteEnabled && getComponentProps('deleteButton', this.props)
        // const pauseResumeButtonProps = chunkingEnabled && getComponentProps('pauseResumeButton', this.props)

        const visibleFiles = this.state.visibleFiles;
        
        // for( const file of this.props.files){
        //     visibleFiles.push({id: file.id, fromServer: file.fromServer})
        // }

        // _map(this.props.files, (v, i)=>{
        //     visibleFiles.push({id: i, fromServer: true})
        // })


        return (
            <MaybeDropzone content={ this.props.children }
                hasVisibleFiles={ visibleFiles.length > 0 }
                uploader={ uploader }
                { ...dropzoneProps }
            >
                {/* {
                    !fileInputProps.disabled &&
                        <FileInputComponent uploader={ uploader } { ...fileInputProps }/>
                }
                <ProgressBar className='react-fine-uploader-gallery-total-progress-bar'
                             uploader={ uploader }
                             { ...progressBarProps }
                /> */}
                <TransitionGroup 
                    component="ul" 
                    className='react-fine-uploader-gallery-files'
                    enter={!this.props.animationsDisabled}
                    exit={!this.props.animationsDisabled}
                >
                    {
                        visibleFiles.map(({ id, status, fromServer }) => (
                            <CSSTransition
                                key={id}
                                classNames="react-fine-uploader-gallery-files"
                                timeout={{ enter: 500, exit: 300 }}
                            >
                                <li key={ id }
                                    className='react-fine-uploader-gallery-file'
                                >
                                    <ProgressBar className='react-fine-uploader-gallery-progress-bar'
                                        id={ id }
                                        uploader={ uploader }
                                        { ...progressBarProps }
                                    />
                                    <Thumbnail className='react-fine-uploader-gallery-thumbnail'
                                        id={ id }
                                        fromServer={ fromServer }
                                        uploader={ uploader }
                                        { ...thumbnailProps }
                                    />
                                    {/* {
                                        status === 'upload successful' &&
                                            <span>
                                                <UploadSuccessIcon className='react-fine-uploader-gallery-upload-success-icon' />
                                                <div className='react-fine-uploader-gallery-thumbnail-icon-backdrop' />
                                            </span>
                                    }
                                    {
                                        status === 'upload failed' &&
                                            <span>
                                                <UploadFailedIcon className='react-fine-uploader-gallery-upload-failed-icon' />
                                                <div className='react-fine-uploader-gallery-thumbnail-icon-backdrop' />
                                            </span>
                                    } */}
                                    {/* <div className='react-fine-uploader-gallery-file-footer'>
                                        <Filename className='react-fine-uploader-gallery-filename'
                                                id={ id }
                                                uploader={ uploader }
                                                { ...filenameProps }
                                        />
                                        <Status className='react-fine-uploader-gallery-status'
                                                id={ id }
                                                uploader={ uploader }
                                                { ...statusProps }
                                        />
                                        <Filesize className='react-fine-uploader-gallery-filesize'
                                                id={ id }
                                                uploader={ uploader }
                                                { ...filesizeProps }
                                        />
                                    </div> */}
                                    {/* <CancelButton className='react-fine-uploader-gallery-cancel-button'
                                                id={ id }
                                                uploader={ uploader }
                                                { ...cancelButtonProps }
                                    />
                                    <RetryButton className='react-fine-uploader-gallery-retry-button'
                                                id={ id }
                                                uploader={ uploader }
                                                { ...retryButtonProps }
                                    /> */}
                                    {
                                        deleteEnabled &&
                                            <DeleteButton className='react-fine-uploader-gallery-delete-button'
                                                id={ id }
                                                uploader={ uploader }
                                                delete={ this.handleDelete}
                                                { ...deleteButtonProps }
                                            />
                                    }
                                    {/* {
                                        chunkingEnabled &&
                                            <PauseResumeButton className='react-fine-uploader-gallery-pause-resume-button'
                                                            id={ id }
                                                            uploader={ uploader }
                                                            { ...pauseResumeButtonProps }
                                            />
                                    } */}
                                </li>
                            </CSSTransition>
                        ))
                    }
                    <CSSTransition
                        key={'input'}
                        classNames="react-fine-uploader-gallery-files"
                        timeout={{ enter: 500, exit: 300 }}
                    >
                        <li key={'input'} className='react-fine-uploader-gallery-file'>
                            <FileInputComponent uploader={ uploader } xviewUploadImage={ xviewUploadImage }  { ...fileInputProps }/>
                        </li>
                    </CSSTransition>
                </TransitionGroup>
                
            </MaybeDropzone>
        )
    }
}

const MaybeDropzone = ({ children, content, hasVisibleFiles, uploader, ...props }) => {
    const { disabled, ...dropzoneProps } = props

    let dropzoneDisabled = disabled
    if (!dropzoneDisabled) {
        dropzoneDisabled = !uploader.qq.supportedFeatures.fileDrop
    }

    if (hasVisibleFiles) {
        content = <span/>
    }
    else {
        content = content || getDefaultMaybeDropzoneContent({ content, disabled: dropzoneDisabled })
    }

    if (dropzoneDisabled) {
        return (
            <div className='react-fine-uploader-gallery-nodrop-container'>
                { content }
                { children }
            </div>
        )
    }

    return (
        <Dropzone className='react-fine-uploader-gallery-dropzone'
                  uploader={ uploader }
                  { ...dropzoneProps }
        >
            { content }
            { children }
        </Dropzone>
    )
}

const FileInputComponent = ({ uploader, xviewUploadImage, ...props }) => {
    const { children, ...fileInputProps } = props
    const content = children || (
        <span>
            <UploadIcon className='react-fine-uploader-gallery-file-input-upload-icon' />
            <span style={{display: 'inline-block', fontSize:'12px'}}>上传图片</span> 
        </span>
    )

    return (
        <FileInput className='react-fine-uploader-gallery-file-input-container'
                   uploader={ uploader }
                   xviewUploadImage= { xviewUploadImage }
                   { ...fileInputProps }
        >
            <span className='react-fine-uploader-gallery-file-input-content'>
                { content }
            </span>
        </FileInput>
    )
}

const getComponentProps = (componentName, allProps) => {
    const componentProps = {}

    Object.keys(allProps).forEach(propName => {
        if (propName.indexOf(componentName + '-') === 0) {
            const componentPropName = propName.substr(componentName.length + 1)
            componentProps[componentPropName] = allProps[propName]
        }
    })

    return componentProps
}

const getDefaultMaybeDropzoneContent = ({ content, disabled }) => {
    const className = disabled
        ? 'react-fine-uploader-gallery-nodrop-content'
        : 'react-fine-uploader-gallery-dropzone-content'

    if (disabled && !content) {
        return (
            <span className={ className } />
        )
    }
    else if (content) {
        return <span className={ className }>{ content }</span>
    }
    else if (!disabled) {
        return (
            <span className={ className }>
                <UploadIcon className='react-fine-uploader-gallery-dropzone-upload-icon' />
                Drop files here
            </span>
        )
    }
}

const isFileGone = (statusToCheck, statusEnum) => {
    return [
        statusEnum.CANCELED,
        statusEnum.DELETED,
    ].indexOf(statusToCheck) >= 0
}

export default Gallery
