import React from 'react';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import lodashget from 'lodash.get';
import IndexHead from '../index/index_title';
import ReviewDetaillist from './viewturnoverrecords_detaillist';

import './reviewlist.css';


class App extends React.Component {

		constructor(props) {
				super(props);
				const pid = lodashget(props,'match.params.pid');
				this.state = {
						query : {
							userpatientid:pid
						}
				};
		}
		componentDidMount(){

		}

		componentWillUnmount() {

		}


		refreshReviewlist = ()=>{
			window.setTimeout(()=>{
				const h1 = this.refs.rlistsearch;
				console.log(h1);
				if(!!h1){
					const h2 = h1.refs.refreviewinfo.getWrappedInstance();
					if(!!h2){
						h2.onRefresh();
					}
				}
			},0);
		}
		onChangeDepat =(id)=>{
			let query = this.state.query;
			if(id !== '0'){
				query['depatid'] = id;
			}
			else{
				const {depatid,...rest} = query;
				query = rest;
			}
			this.setState({
				curdepatid:id,
				query
			});
			this.refreshReviewlist();
		}
  	render() {
	    return (
	      	<Layout>
						<IndexHead title="查看翻身记录"/>
						<div className="content-box">
								<div className="index-content">
										<h2>
										<button className="return" onClick={
											()=>{
												this.props.history.goBack();
											}
										}><img src="return.png" alt=""/></button>
										<div className="clearfix"></div>
									</h2>
								</div>
								<ReviewDetaillist
									query={this.state.query}
									db={this.props.db}
									history={this.props.history}
									ref='rlistsearch'/>
						</div>
	      	</Layout>
	    );
  	}
}

const mapStateToProps = ({db}) => {
    return {db};
}
// App = withRouter(App);
export default connect(mapStateToProps)(App);
