import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import lodashget from 'lodash.get';
import TitleDetail from '../patientinfo/patientinfo_content_title_detail';
import NewwoundsurfaceForm from './form_newwoundsurface';
import {createevaluatewoundsurface_request,editevaluatewoundsurface_request} from '../../actions';
import {set_weui} from '../../actions';
const { Header } = Layout;
class App extends React.Component {

		componentDidMount(){

		}

		componentWillUnmount() {

		}
		onClickSubmit =(values)=>{
			if(values.evaluateWoundsurfaces.length === 0){
				this.props.dispatch(set_weui({
					toast:{
					text:'请至少添加一个创面',
					show: true,
					type:'warning'
				}}));
				return;
			}
			const {curpaientinfo,isnew,curevaluatewoundsurface} = this.props;
			if(isnew){
				values.userpatientid = curpaientinfo._id;
				this.props.dispatch(createevaluatewoundsurface_request(values));
			}
			else{
				let newcurevaluatewoundsurface = {...curevaluatewoundsurface,...values};
				this.props.dispatch(editevaluatewoundsurface_request(newcurevaluatewoundsurface));
			}
		}
  	render() {
			const {curpaientinfo,isnew,curevaluatewoundsurface,db} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			let formname = 'NewWoundsurfaceForm';
			let formvalues = {evaluateWoundsurfaces:[]};
			if(!isnew){
				formvalues = curevaluatewoundsurface;
			}
			const title = isnew?'新建':'编辑';
	    return (
				<Layout>
					<Header>
						<span><img src="index.png" className="icon-index" alt=""/>{title}创面评估表单</span>
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
							<NewwoundsurfaceForm onClickSubmit={this.onClickSubmit}
								formname={formname}
								formvalues={formvalues}/>
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
		const {evaluatewoundsurfaces} = db;
		const curevaluatewoundsurface = evaluatewoundsurfaces[bardenid];
		if(!curevaluatewoundsurface){
			isnew = true;
		}
		return {curpaientinfo,isnew,curevaluatewoundsurface,db};
}

export default connect(mapStateToProps)(App);
