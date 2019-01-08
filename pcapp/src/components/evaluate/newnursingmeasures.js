import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import lodashget from 'lodash.get';
import TitleDetail from '../patientinfo/patientinfo_content_title_detail';
//import NewnursingmeasuresForm from './form_newnursingmeasures';
import NewnursingmeasuresForm from './form_newnursingmeasures_table';
import {createevaluatenursingmeasures_request,editevaluatenursingmeasures_request} from '../../actions';
import {getdefaultnursingmeasures} from '../../util';
const { Header } = Layout;


class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}
		onClickSubmit =(values)=>{
			const {curpaientinfo,isnew,curevaluatenursingmeasures} = this.props;
			if(isnew){
				values.userpatientid = curpaientinfo._id;
				this.props.dispatch(createevaluatenursingmeasures_request(values));
			}
			else{
				let newcurevaluatenursingmeasures = {...curevaluatenursingmeasures,...values};
				this.props.dispatch(editevaluatenursingmeasures_request(newcurevaluatenursingmeasures));
			}


			console.log(values);
			// this.props.history.goBack();
		}
  	render() {
			const {curpaientinfo,isnew,curevaluatenursingmeasures,db} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			let formname = 'NewNursingmeasuresForm';
			let formvalues = getdefaultnursingmeasures();
			if(!isnew){
				formvalues = curevaluatenursingmeasures;
			}
			const title = isnew?'新建':'编辑';
	    return (
				<Layout>
					<Header>
						<span><img src="index.png" className="icon-index" alt=""/>{title}护理措施表单</span>
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
						<NewnursingmeasuresForm onClickSubmit={this.onClickSubmit}
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
		const {evaluatenursingmeasuress} = db;
		const curevaluatenursingmeasures = evaluatenursingmeasuress[bardenid];
		if(!curevaluatenursingmeasures){
			isnew = true;
		}
		return {curpaientinfo,isnew,curevaluatenursingmeasures,db};
}

export default connect(mapStateToProps)(App);
