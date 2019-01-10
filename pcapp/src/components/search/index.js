import React from 'react';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Card } from 'antd';

import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import IndexHead from '../index/index_title';
import ReviewDetaillist from './review_detaillist';
import SearchForm from './searchForm';

import './index.css';


class App extends React.Component {

		constructor(props) {
				super(props);
				this.state = {
						curdepatid:'0',
						query : []
				};
		}
		componentDidMount(){

		}

		componentWillUnmount() {

		}

		handleSearch = (values) => {
			let query = [];			
			lodashmap(values, (value,key)=>{
				if(value) {
					query.push(values[key])
				}
			})

			console.log(query);
			// this.setState({
			// 	query
			// });

			// this.refreshSearchlist();
			
			
		}


		refreshSearchlist = ()=>{
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

		render() {
			// const {db,userlogin} = this.props;
			// const PermissionName = lodashget(userlogin,'permission.name','');
	    return (
	      	<Layout>
						<IndexHead title="病人搜索"/>
						<div className="content-box">
							<div className="index-content" style={{width: '75%', margin: '0 auto'}}>
								<Card style={{margin: '20px auto'}}><SearchForm onSubmit={this.handleSearch} /></Card>
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

const mapStateToProps = ({db,userlogin}) => {
    return {db,userlogin};
}
// App = withRouter(App);
export default connect(mapStateToProps)(App);
