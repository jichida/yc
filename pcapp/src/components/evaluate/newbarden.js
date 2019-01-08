import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import lodashget from 'lodash.get';
import TitleDetail from '../patientinfo/patientinfo_content_title_detail';
// import NewbardenForm from './form_newbarden';
import NewbardenFormTable from './form_newbarden_table';
import {createevaluatebarden_request,editevaluatebarden_request} from '../../actions';
import '../printforms/form_tamplate_style.styl'

const { Header } = Layout;

class App extends React.Component {

		componentDidMount(){

		}

		componentWillUnmount() {

		}
		onClickSubmit =(values)=>{
			const {curpaientinfo,isnew,curevaluatebarden} = this.props;
			if(isnew){
				values.userpatientid = curpaientinfo._id;
				this.props.dispatch(createevaluatebarden_request(values));
			}
			else{
				let newcurevaluatebarden = {...curevaluatebarden,...values};
				this.props.dispatch(editevaluatebarden_request(newcurevaluatebarden));
			}

			// this.props.history.goBack();//后面放到saga中
		}
  	render() {
			const {curpaientinfo,isnew,curevaluatebarden,db} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			let formname = 'NewbardenForm';
			let formvalues = {
				score_sensoryperception:0,//感知
				score_moisture:0,//潮湿
				score_activity:0,//活动能力
				score_mobility:0,//移动能力
				score_nutrition:0,//营养
				score_friction:0,//摩擦力/剪切力
				score:0,
			};
			if(!isnew){
				formvalues = curevaluatebarden;
			}
			const title = isnew?'新建':'编辑';
	    return (
				<Layout>
					<Header>
						<span><img src="index.png" className="icon-index" alt=""/>{title}Barden表单</span>
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

							<TitleDetail curpaientinfo={curpaientinfo} db={db}/>
							<NewbardenFormTable onClickSubmit={this.onClickSubmit}
								formname={formname}
								formvalues={formvalues}
							/>

							{/*
							<NewbardenForm onClickSubmit={this.onClickSubmit}
						        formname={formname}
						        formvalues={formvalues}
							/>
							*/}
								</div>
							</div>
	      	</Layout>
	    );
  	}
}


const mapStateToProps = ({db},props) => {
		const {paientinfos} = db;
		const id = lodashget(props,'match.params.pid');
		const bardenid = lodashget(props,'match.params.id');
		let isnew = bardenid === '0';
		let curpaientinfo = paientinfos[id];
		if(isnew){
			return {curpaientinfo,isnew,db};
		}
		const {evaluatebardens} = db;
		const curevaluatebarden = evaluatebardens[bardenid];
		if(!curevaluatebarden){
			isnew = true;
		}
		return {curpaientinfo,isnew,curevaluatebarden,db};
}
export default connect(mapStateToProps)(App);
