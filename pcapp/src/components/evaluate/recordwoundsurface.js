import React from 'react';
import { connect } from 'react-redux';
// import ViewPrintHeader from './viewprint_header';
import lodashget from 'lodash.get';
// import RecordbardenTableBody from './recordbarden_tablebody';
import PrintFormWS from '../printforms/printform_recordwoundsurface';

import ViewPrintTitltToPrint from './viewprint_title_toprint';

import moment     from 'moment'

import { Layout } from 'antd';
const { Header } = Layout;
class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}

  	render() {
			const
				{curpaientinfo,db,evaluatewoundsurfacelist,app} = this.props,
				{ depats, beds }      = db,
				Bedname               = lodashget( beds, `${curpaientinfo.bedid}.Bedname`, '' ),
				Depatname             = lodashget( depats, `${curpaientinfo.depatid}.Depatname` , '' ),
				momentin              = moment( curpaientinfo.In_date );
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			const {Hospitalname} = app;
	    return (
				<Layout>
					<Header>
						<span onClick={()=>{this.props.history.push('/')}}><img src="index.png" className="icon-index" alt=""/>查看创面评估</span>
					</Header>
					<ViewPrintTitltToPrint title="创面评估打印" refnode={() => this.componentRef} history={this.props.history}/>
					<form ref={el => (this.componentRef = el)}>
						<PrintFormWS Hospitalname={Hospitalname}
							Depatname={Depatname}
							momentin={momentin}
							Bedname={Bedname}
							curpaientinfo={curpaientinfo}
							db={db}
							evaluatewoundsurfacelist={evaluatewoundsurfacelist} />
					</form>
				</Layout>
	    );
  	}
}


const mapStateToProps = ({db,evaluatewoundsurface,app},props) => {
		const {paientinfos} = db;
		const id = lodashget(props,'match.params.pid');
		const {evaluatewoundsurfacelist} = evaluatewoundsurface;
		let curpaientinfo = paientinfos[id];
    return {curpaientinfo,db,evaluatewoundsurfacelist,app};
}
export default connect(mapStateToProps)(App);
