import React from 'react';
import { connect } from 'react-redux';
// import { Button } from 'antd';
import lodashget from 'lodash.get';
import { Layout } from 'antd';
import ViewPrintTitltToPrint from './viewprint_title_toprint';
import PrintFormBarden from '../printforms/printform_barden';
// import ViewPrintHeader from './viewprint_header';

import moment     from 'moment'

const { Header } = Layout;
class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}
		onClickSubmit =(values)=>{
			console.log(values);
			this.props.history.goBack();
		}
  	render() {
			const
			{curpaientinfo,db,evaluatebardenlist,app} = this.props,
    	{ depats, beds }      = db,
			Bedname               = lodashget( beds, `${curpaientinfo.bedid}.Bedname`, '' ),
    	Depatname             = lodashget( depats, `${curpaientinfo.depatid}.Depatname` , '' ),
    	momentin              = moment( curpaientinfo.In_date );
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			const {Hospitalname} = app;
			console.log(this.props)

	    return (
			<Layout>
				<Header>
				 	<span><img src="index.png" className="icon-index" alt=""/>查看Bardenp评估</span>
				</Header>
				<ViewPrintTitltToPrint title="Barden评估打印" refnode={() => this.componentRef} history={this.props.history}/>
					<form ref={el => (this.componentRef = el)}>
						<PrintFormBarden
							Hospitalname={Hospitalname}
							Depatname={Depatname}
							Bedname={Bedname}
							evaluatebardenlist={evaluatebardenlist}
							curpaientinfo={curpaientinfo}
							db={db}
							momentin={momentin}  />
					</form>
			</Layout>
	    );
  	}
}


const mapStateToProps = ({db,evaluatebarden,app},props) => {
		const {paientinfos} = db;
		const {evaluatebardenlist} = evaluatebarden;
		const id = lodashget(props,'match.params.pid');
		let curpaientinfo = paientinfos[id];
    return {curpaientinfo,db,evaluatebardenlist,app};
}
export default connect(mapStateToProps)(App);
