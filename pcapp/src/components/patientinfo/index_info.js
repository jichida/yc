import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import InfoBarden from './info_barden';
//import InfoNursingmeasures from './info_nursingmeasures';
import InfoNursingmeasures from './info_nursingmeasures_once';
import InfoWoundsurface from './info_woundsurface';
import InfoSmartdevice from '../smartdevice/patientinfo_smartdevice';
import InfoLapsetto from '../evaluate/lapseto';
import TitleDetail from './patientinfo_content_title_detail';
// import styled from 'styled-components';
import {getevaluatebardenlist_request} from '../../actions';
import {getevaluatenursingmeasureslist_request} from '../../actions';
import {getevaluatewoundsurfacelist_request} from '../../actions';
import {subscribedevice_request} from '../../actions';

import { Tabs } from 'antd';
import './index_info.css';

const TabPane = Tabs.TabPane;



const { Header } = Layout;
let defaultbtnkey = 'btnbd';
class App extends React.Component {
		constructor(props) {
				super(props);
				this.state = {
						btnkey : defaultbtnkey
				};
		}
		componentDidMount(){
			const {curpaientinfo,cursmartdevice} = this.props;
			if(!!curpaientinfo){
				this.props.dispatch(getevaluatebardenlist_request({query:{userpatientid:curpaientinfo._id}}));
				this.props.dispatch(getevaluatenursingmeasureslist_request({query:{userpatientid:curpaientinfo._id}}));
				this.props.dispatch(getevaluatewoundsurfacelist_request({query:{userpatientid:curpaientinfo._id}}));
			}

			if(!!cursmartdevice){
				this.props.dispatch(subscribedevice_request({smartdeviceid:cursmartdevice._id,subscribeflag:true}));
			}
		}

		componentWillUnmount() {
			const {cursmartdevice} = this.props;
			if(!!cursmartdevice){
				this.props.dispatch(subscribedevice_request({smartdeviceid:cursmartdevice._id,subscribeflag:false}));
			}
		}

		changePage = (btnkey)=>{
			defaultbtnkey = btnkey;
		}

  	render() {
			const {curpaientinfo,cursmartdevice,db,userlogin,SettingOfflineMinutes} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			const permissionname = lodashget(userlogin,'permission.name','普通护士');
			const Diseaseclassification = lodashget(curpaientinfo,'Diseaseclassification','普通病人');
			if(Diseaseclassification === '普通病人'){
				return <div>普通病人不能显示评估页面</div>
			}
			let btnz = [];

			{
				let btninfoz = [
					{
						btnkey:'btnbd',
						title:'Barden评估',
						visible:true,
						enabled:true,
						Co:<InfoBarden curpaientinfo={curpaientinfo} permissionname={permissionname}/>
					},
					{
						btnkey:'btnws',
						title:'创面评估',
						visible:true,
						enabled:true,
						Co:<InfoWoundsurface curpaientinfo={curpaientinfo} permissionname={permissionname}/>
					},
					{
						btnkey:'btnnm',
						title:'护理措施',
						visible:true,
						enabled:true,
						Co:<InfoNursingmeasures curpaientinfo={curpaientinfo} permissionname={permissionname}/>
					},


				];

				if(Diseaseclassification === '难免转院内'){
					btninfoz.push({
						btnkey:'btnls',
						title:'转归与申报(难免)',
						visible:true,
						enabled:true,
						Co:<InfoLapsetto curpaientinfo={curpaientinfo} db={db} history={this.props.history} Diseaseclassification="难免压疮"/>
					});

					btninfoz.push({
						btnkey:'btnls2',
						title:'转归与申报(院内)',
						visible:true,
						enabled:true,
						Co:<InfoLapsetto curpaientinfo={curpaientinfo} db={db} history={this.props.history} Diseaseclassification="院内压疮"/>
					});
				}
				else{
					btninfoz.push({
						btnkey:'btnls',
						title:'转归与申报',
						visible:true,
						enabled:true,
						Co:<InfoLapsetto curpaientinfo={curpaientinfo} db={db} history={this.props.history} Diseaseclassification={Diseaseclassification}/>
					});
				}

				btninfoz.push({
					btnkey:'btnto',
					title:'翻身治疗',
					visible:true,
					enabled:true,
					Co:<InfoSmartdevice
						SettingOfflineMinutes={SettingOfflineMinutes}
						curpaientinfo={curpaientinfo} cursmartdevice={cursmartdevice} />
				});

				lodashmap(btninfoz,(btninfo)=>{
						btnz.push({
							btnkey:btninfo['btnkey'],
							title:btninfo['title'],
							enabled:btninfo['enabled'],
							visible:btninfo['visible'],
							Co:btninfo['Co']
						});
				});
			}


			if(!curpaientinfo.firstevaluatebardenid){
				//没有首次Barden评估,仅显示第一个按钮 & 翻身按钮
				lodashmap(btnz,(info,index)=>{
					if(index > 0 && index < btnz.length-1){
						info.visible = false;
					}
				})
			}

			if(Diseaseclassification === '难免压疮' ){
				//不显示创面评估页面
				btnz[1].visible = false;
			}
			else{
				if(!curpaientinfo.firstevaluatewoundsurfaceid){
							lodashmap(btnz,(info,index)=>{
							if(index > 1  && index < btnz.length-1){
								info.visible = false;
							}
						});
				}
			}


			if(!curpaientinfo.firstevaluatenursingmeasuresid){
				//没有首次护理措施评估,不显示转归申报
				btnz[3].visible = false;
				if(Diseaseclassification === '难免转院内'){
					btnz[4].visible = false;
				}

			}

			if(!cursmartdevice || permissionname === '护理部主管'){
				btnz[btnz.length - 1].visible = false;
			}


			return (
					<Layout>
						<Header>
							<span onClick={()=>{this.props.history.push('/')}}><img src="index.png" className="icon-index" alt=""/>病人评估</span>
						</Header>
						<div className="content-box">
						<div className="content assess">
							<h2>{lodashget(curpaientinfo,'Patientno','')}<span>{lodashget(curpaientinfo,'Patientname','')}</span>
								<button className="return" onClick={
									()=>{
										defaultbtnkey = 'btnbd';
										this.props.history.goBack();
									}
								}><img src="return.png" alt=""/></button>
								<div className="clearfix"></div>
							</h2>
							<TitleDetail curpaientinfo={curpaientinfo} db={db}/>
							</div>
							<div className="tabcontent">
								<Tabs onChange={this.changePage} type="card" defaultActiveKey={defaultbtnkey}>
								{
									lodashmap(btnz,(btninfo,index)=>{
										if(btninfo.visible){
											return (
												<TabPane tab={btninfo.title} key={btninfo.btnkey}>
														 <div className="record">
															 {btninfo.Co}
														 </div>
												</TabPane>);
										}
									})
								}
								</Tabs>
							</div>

						</div>

					</Layout>

			);
  	}
}

const mapStateToProps = ({db,userlogin,app},props) => {
		const {paientinfos,beds,smartdevices} = db;
		const {SettingOfflineMinutes} = app;
		const id = lodashget(props,'match.params.pid');
		let curpaientinfo = paientinfos[id];
		let cursmartdevice;
		if(!!curpaientinfo){
			const curbed = beds[curpaientinfo.bedid];
			if(!!curbed){
				const smartdeviceid = curbed.smartdeviceid;
				cursmartdevice = smartdevices[smartdeviceid];
			}
		}
    return {curpaientinfo,cursmartdevice,db,userlogin,SettingOfflineMinutes};
}
export default connect(mapStateToProps)(App);
