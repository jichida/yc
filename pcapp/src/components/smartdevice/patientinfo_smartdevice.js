import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { Button } from 'antd';
import SmartDeviceStatus from './smartdevice_status';
import {sendsmartdevicecmd_request} from '../../actions';
import btninfos from './smartdevicebtns';
import { Tooltip } from 'antd';


class App extends React.Component {
		constructor() {
	    super()
			this.state = {
				index:-1
			}
	  }
	  handleButtonPress (index) {
			const Info = btninfos[index];
			if(!!Info.cmd){
				console.log(`handleButtonPress-->${index}`)
				this.setState({index});
				this.buttonPressTimer = setTimeout(() => {
					this.onClickSendCmd(Info.cmd,Info.title);
					console.log(`有效-->${Info.title}`)
				}, 3000);
			}
	  }

	  handleButtonRelease (index) {
			console.log(`handleButtonRelease-->${index}`)
			this.setState({index:-1});
	    clearTimeout(this.buttonPressTimer);
	  }

		componentDidMount(){

		}

		componentWillUnmount() {

		}

		onClickSendCmd = (cmd,descriptionstring)=>{
			const {curpaientinfo,cursmartdevice} = this.props;
			this.props.dispatch(sendsmartdevicecmd_request({
				userpatientid:curpaientinfo._id,
				smartdeviceid:cursmartdevice._id,
				deviceid:cursmartdevice.deviceid,
				descriptionstring,
				cmd
			}));
		}
		onClickViewTurnoverRecords = ()=>{
			const {curpaientinfo,cursmartdevice} = this.props;
			this.props.history.push(`/viewturnoverrecords/${curpaientinfo._id}/${cursmartdevice._id}`)
		}
		onClickTurnover = ()=>{
			const {curpaientinfo} = this.props;
			this.props.history.push(`/defineturnover/${curpaientinfo._id}/${curpaientinfo.bid}`)
		}
  	render() {
			const {curpaientinfo,cursmartdevice,SettingOfflineMinutes} = this.props;
			if(!curpaientinfo || !cursmartdevice){
				return <div>无病人信息</div>
			}
			let CoLeft = [];
			let CoRight = [];
			for(let i = 0;i < btninfos.length-4 ; i++){
				const Info = btninfos[i];
				const curimage = i === this.state.index?Info.imagesel:Info.image;
				CoLeft.push(
					<Tooltip title={`按钮长按三秒即可发送${Info.title}命令`} key={i}>
						<div
						onTouchStart={()=>this.handleButtonPress(i)}
						onTouchEnd={()=>this.handleButtonRelease(i)}
						onMouseDown={()=>this.handleButtonPress(i)}
						onMouseUp={()=>this.handleButtonRelease(i)}

						// onClick={()=>{
						// 	console.log(`title--->${Info.title}`)
						// 	this.onClickSendCmd(Info.cmd,Info.title);
						// }
					><img src={curimage} alt=""/><p>{Info.title}</p></div>
				</Tooltip>
			);
			}

			for(let i = btninfos.length-4;i < btninfos.length ; i++){
				const Info = btninfos[i];
				const curimage = i === this.state.index?Info.imagesel:Info.image;
				CoRight.push(<Tooltip title={!!Info.cmd?`按钮长按三秒即可发送${Info.title}命令`:''} key={i}>
					<div
					onTouchStart={()=>this.handleButtonPress(i)}
					onTouchEnd={()=>this.handleButtonRelease(i)}
					onMouseDown={()=>this.handleButtonPress(i)}
					onMouseUp={()=>this.handleButtonRelease(i)}
				><img src={curimage} alt=""/><p>{Info.title}</p></div>
				</Tooltip>
				)
			}
	    return (
	      	<div>
					<div className="lapseto">
						<button onClick={
							()=>{
								this.onClickViewTurnoverRecords();
							}
						} className="ant-btn"><img src="viewturnoverrecords.png"  alt=""/>查看翻身记录</button>

					</div>
					<SmartDeviceStatus cursmartdevice={cursmartdevice} SettingOfflineMinutes={SettingOfflineMinutes}/>
					<div className="device-content">
						<div className="device-indicator">
							{CoLeft}
							<div className="clearfix"></div>
						</div>
						<div className="device-button">
								{CoRight}
							<div className="clearfix"></div>
						</div>
						<div className="clearfix"></div>
					</div>
					<div>
					</div>
	      	</div>
	    );
  	}
}

App = withRouter(App);
export default connect()(App);
