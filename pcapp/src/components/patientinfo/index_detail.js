import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import lodashget from 'lodash.get';
import TitleDetail from './patientinfo_content_title_detail';
import './index_details.css';
const { Header } = Layout;
class App extends React.Component {

		componentDidMount(){

		}

		componentWillUnmount() {

		}
		onClickEdit = ()=>{
			const {curpaientinfo} = this.props;
			this.props.history.push(`/indexdetailedit/${curpaientinfo._id}`);
		}
  	render() {
			const {curpaientinfo,db} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			const Patientname = lodashget(curpaientinfo,'Patientname','');
			const Patientno = lodashget(curpaientinfo,'Patientno','');
	    return (
	      	<Layout>
					<Header>
						<span><img src="index.png" className="icon-index" alt=""/>病人详情</span>
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
							<TitleDetail curpaientinfo={curpaientinfo} db={db}/>
							<div>
								<button className="ant-btn-edit" onClick={
									()=>{
										this.onClickEdit();
									}
								}>编辑信息</button>
							</div>
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
