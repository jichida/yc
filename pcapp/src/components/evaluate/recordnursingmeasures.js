import React from 'react';
import { connect } from 'react-redux';
// import ViewPrintHeader from './viewprint_header';

import PrintFormNM from '../printforms/printform_recordnursingmeasures';
import lodashget from 'lodash.get';
import { Layout } from 'antd';
import ViewPrintTitltToPrint from './viewprint_title_toprint';

import moment     from 'moment'

const { Header } = Layout;

class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}

  	render() {
			const
				{curpaientinfo,db,evaluatenursingmeasureslist,app} = this.props,
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
						<span><img src="index.png" className="icon-index" alt=""/>护理措施</span>
					</Header>
					<ViewPrintTitltToPrint title="护理措施打印" refnode={() => this.componentRef} history={this.props.history}/>
					<form ref={el => (this.componentRef = el)}>
						<PrintFormNM Hospitalname={Hospitalname}
							Depatname={Depatname}
							momentin={momentin}
							Bedname={Bedname}
							curpaientinfo={curpaientinfo}
							db={db}
							evaluatenursingmeasureslist={evaluatenursingmeasureslist} />
					</form>
				</Layout>
	    );
  	}
}


const mapStateToProps = ({db,evaluatenursingmeasures,app},props) => {
		const {paientinfos} = db;
		const {evaluatenursingmeasureslist} = evaluatenursingmeasures;
		const id = lodashget(props,'match.params.pid');
		let curpaientinfo = paientinfos[id];
    return {curpaientinfo,db,evaluatenursingmeasureslist,app};
}
export default connect(mapStateToProps)(App);
