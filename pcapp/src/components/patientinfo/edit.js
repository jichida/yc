import React from 'react';
import { connect } from 'react-redux';
import { Layout, } from 'antd';
import lodashget from 'lodash.get';
import EditpatientinfoForm from './form_editpatientinfo';
import {editpatientinfo_request,editpatientinfo_result,set_db,set_weui} from '../../actions';
import {callthen} from '../../sagas/pagination';
const { Header } = Layout;


class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}
		onClickSubmit =(values)=>{
			// this.props.history.goBack();
			console.log(values);
			this.props.dispatch(callthen(editpatientinfo_request,editpatientinfo_result,{
				_id:values._id,
				Diseaseclassification:values.Diseaseclassification
			})).then((payload)=>{
				let paientinfos = {};
				paientinfos[payload._id] = payload;
				this.props.dispatch(set_db({paientinfos}));
				this.props.dispatch(set_weui({
					toast:{
						text:'编辑病人成功',
						show: true,
						type:'success'
				}}));
				this.props.history.goBack();
			}).catch((e)=>{
				console.log(e);
			});
		}

  	render() {
			const {curpaientinfo,db} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			const Patientname = lodashget(curpaientinfo,'Patientname','');
			const Patientno = lodashget(curpaientinfo,'Patientno','');
			const formname = 'NewLapsetoForm';
			const formvalues = {
				_id:lodashget(curpaientinfo,'_id',''),
				Diseaseclassification:lodashget(curpaientinfo,'Diseaseclassification','普通病人'),
			};
	    return (
				<Layout>
				<Header>
					<span><img src="index.png" className="icon-index" alt=""/>编辑病人信息</span>
				</Header>
				<div className="content-box">
					<div className="content">
						<h2>{Patientno}<span>{Patientname}</span><button className="return" onClick={
							()=>{
								this.props.history.goBack();
							}
						}><img src="return.png" alt=""/></button>
						<div className="clearfix"></div>
						</h2>

						<EditpatientinfoForm
							curpaientinfo={curpaientinfo}
							formname={formname}
							formvalues={formvalues}
							db={db}
							onClickSubmit={this.onClickSubmit}/>
						</div>
				</div>
				</Layout>
	    );
  	}
}

const mapStateToProps = ({db},props) => {
		const {paientinfos} = db;
		const id = lodashget(props,'match.params.pid');
		let curpaientinfo = paientinfos[id];
    return {curpaientinfo,db};
}
export default connect(mapStateToProps)(App);
