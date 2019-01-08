import React from 'react';
import { connect } from 'react-redux';
import lodashget from 'lodash.get';
import { Layout } from 'antd';
// import TitleDetail from '../patientinfo/patientinfo_content_title_detail';
// import ContentTitleBar from '../patientinfo/patientinfo_content_titlebar';
import PageForm from './form_lapseto_barden';
import {getdefaultlapseto_barden} from '../../util';
import {createformreviewlapseto_request,editformreviewlapseto_request} from '../../actions';

import {getvalueof_preventivesmeasure} from '../../util/index';
const { Header } = Layout;

class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}

		onClickSubmit = (values)=>{
			const {curpaientinfo,isnew,curformreviewlapseto,isid2} = this.props;
			const Diseaseclassification = curpaientinfo.Diseaseclassification;
			//
			values.preventivesmeasure = getvalueof_preventivesmeasure(values.preventivesmeasure,Diseaseclassification);

			if(isnew){
				values.userpatientid = curpaientinfo._id;
				this.props.dispatch(createformreviewlapseto_request({
					isid2,
					data:values
				}));
			}
			else{
				let newcurformreviewlapseto = {...curformreviewlapseto,...values};
				this.props.dispatch(editformreviewlapseto_request({
					isid2,
					data:newcurformreviewlapseto
				}));
			}
		}
  	render() {
			const {curpaientinfo,db,curformreviewlapseto,isnew,app,userlogin,evaluatewoundsurfacelist,isid2} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			let formname = 'NewLapsetoForm';
			let formvalues;
			if(!isnew){
				formvalues = curformreviewlapseto;
			}
			else{
				const {evaluatebardens,evaluatewoundsurfaces} = db;
				const score = lodashget(evaluatebardens,`${curpaientinfo.firstevaluatebardenid}.score`,0);
				const cmlist = lodashget(evaluatewoundsurfaces,`${curpaientinfo.firstevaluatewoundsurfaceid}.evaluateWoundsurfaces`,[]);
				formvalues = getdefaultlapseto_barden(score,curpaientinfo.Diseaseclassification,cmlist);
			}
			const title = isnew?'新建':'编辑';
	    return (
				<Layout>
					<Header>
						<span><img src="index.png" className="icon-index" alt=""/>{title}审阅转归申请表</span>
					</Header>
					<div className="content-box">
					<div className="content assess">
						<h2>{lodashget(curpaientinfo,'Patientno','')}<span>{lodashget(curpaientinfo,'Patientname','')}</span>
							<button className="return" onClick={
								()=>{
									this.props.history.goBack();
								}
							}><img src="return.png" alt=""/></button>
							<div className="clearfix"></div>
						</h2>

						{/* <TitleDetail curpaientinfo={curpaientinfo} db={db}/> */}

						<PageForm
							onClickSubmit={this.onClickSubmit}
							isid2={isid2}
							curpaientinfo={curpaientinfo}
							app={app}
							db={db}
							evaluatewoundsurfacelist={evaluatewoundsurfacelist}
							userlogin={userlogin}
							formname={formname}
							formvalues={formvalues}/>
						</div>
					</div>
					</Layout>
	    );
  	}
}


// const mapStateToProps = ({db},props) => {
// 		let curpaientinfo = props.curpaientinfo;
// 		const {formreviewlapsetos} = db;
// 		let isnew = true;
// 		let curformreviewlapseto;
// 		if(!!curpaientinfo.formreviewlapsetoid){
// 			curformreviewlapseto = formreviewlapsetos[curpaientinfo.formreviewlapsetoid];
// 			if(!!curformreviewlapseto){
// 				isnew = false;
// 			}
// 		}
// 		return {curpaientinfo,isnew,curformreviewlapseto,db};
// }

const mapStateToProps = ({db,app,userlogin,evaluatewoundsurface},props) => {
		const {paientinfos,formreviewlapsetos} = db;
		const {evaluatewoundsurfacelist} = evaluatewoundsurface;
		const id = lodashget(props,'match.params.pid');
		const formreviewlapsetoid = lodashget(props,'match.params.id');
		const isid2 = lodashget(props,'match.params.isid2') === '1';
		let isnew = formreviewlapsetoid === '0';
		const curpaientinfo = paientinfos[id];
		let curformreviewlapseto;
		if(isid2){
			if(!!curpaientinfo){
				if(!!curpaientinfo.formreviewlapsetoid2){
					curformreviewlapseto = formreviewlapsetos[curpaientinfo.formreviewlapsetoid2];
					if(!!curformreviewlapseto){
						isnew = false;
					}
				}
			}
		}
		else{
			if(!!curpaientinfo){
				if(!!curpaientinfo.formreviewlapsetoid){
					curformreviewlapseto = formreviewlapsetos[curpaientinfo.formreviewlapsetoid];
					if(!!curformreviewlapseto){
						isnew = false;
					}
				}
			}
		}

		if(isnew){
			return {curpaientinfo,isnew,db,app,userlogin,evaluatewoundsurfacelist,isid2};
		}
		return {curpaientinfo,isnew,curformreviewlapseto,db,app,userlogin,evaluatewoundsurfacelist,isid2};
}

export default connect(mapStateToProps)(App);
