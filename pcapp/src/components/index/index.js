import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import HeadTitle from './index_title';
import Patientinfolist from './index_patientinfolist';
import Changepwd from "../popdialog/pwd.js";
import Usercenter from "../popdialog/usercenter.js";
import {getcount_reviewlapseto_request} from '../../actions';

import './index.styl';

class App extends React.Component {

		constructor(props) {
			super(props);
			this.state = {
				curdepatid:'0',
				query:{}
			}
		}

		onChangeDepat =(id)=>{
			let query = {};
			if(id !== '0'){
				query = {depatid:id};
			}
			this.setState({
				curdepatid:id,
				query
			});
			window.setTimeout(()=>{
				const h1 = this.refs.plistpaientinfo;
				console.log(h1);
				if(!!h1){
					const h2 = h1.refs.refpaientinfo.getWrappedInstance();
					if(!!h2){
						h2.onRefresh();
					}
				}
			},0);
		}
		componentDidMount(){
			this.props.dispatch(getcount_reviewlapseto_request({}));
		}

		componentWillUnmount() {

		}

  	render() {
			const {ispopuserinfo,ispoppwd} = this.props;
	    return (
	      	<Layout>
						<HeadTitle showbtns={true} curdepatid={this.state.curdepatid} onChangeDepat={this.onChangeDepat}/>
						<Patientinfolist
							query={this.state.query}
							db={this.props.db}
							history={this.props.history}
							ref='plistpaientinfo'
						/>
						{ispopuserinfo  && <Usercenter /> }
						{ispoppwd && <Changepwd />}
	      	</Layout>
	    );
  	}
}

const mapStateToProps = ({app:{ispopuserinfo,ispoppwd},db}) => {
    return {ispopuserinfo,ispoppwd,db};
}
export default connect(mapStateToProps)(App);
