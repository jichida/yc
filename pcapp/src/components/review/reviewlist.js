import React from 'react';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { Radio } from 'antd';

import lodashget from 'lodash.get';
import IndexHead from '../index/index_title';
import ReviewDetaillist from './review_detaillist';

import DepatSelect from '../index/selector_depat';

import './reviewlist.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;




class App extends React.Component {

		constructor(props) {
				super(props);
				this.state = {
						curdepatid:'0',
						query : {}
				};
		}
		componentDidMount(){

		}

		componentWillUnmount() {

		}

		onChange = (e)=>{
			const selectedstring = e.target.value;
			let query = this.state.query;
			if(selectedstring === 'all'){
				const {usercreatorid,signed_headnurse,signed_nursingdepartment,stagestatus,...rest} = query;
				query = rest;
				this.setState({query});
			}
			if(selectedstring === 'mine'){
				const {userlogin} = this.props;
				const userid = lodashget(userlogin,'_id');
				const permissionname = lodashget(userlogin,'permission.name','普通护士');
				if(permissionname === '普通护士'){
					query[`usercreatorid`] = userid;
					this.setState({query});
				}
				else if(permissionname === '护士长'){
					query[`signed_headnurse`] = userid;
					this.setState({query});
				}
				else  if(permissionname === '护理部主管'){
					query[`signed_nursingdepartment`] = userid;
					this.setState({query});
				}

			}
			if(selectedstring === 'reviewing'){
				query[`stagestatus`] = {$in:['护士长审核中','护理部审核中']};
				this.setState({query});
			}
			if(selectedstring === 'reviewed'){
				query[`stagestatus`] = {$in:['已审核','已上报']};
				this.setState({query});
			}
			if(selectedstring === 'notreviewed'){
				query[`stagestatus`] = {$in:['未审核']};
				this.setState({query});
			}
			this.refreshReviewlist();
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
			const {db,userlogin} = this.props;
			const PermissionName = lodashget(userlogin,'permission.name','');
	    return (
	      	<Layout>
						<IndexHead title="申报审阅"/>
						<div className="content-box">
								<div className="index-content">
										<h2>
										<span>
											<RadioGroup defaultValue="all" onChange={this.onChange}>
												<RadioButton value="all">全部</RadioButton>
												<RadioButton value="mine">我的递交</RadioButton>
												<RadioButton value="reviewing">审核中</RadioButton>
								        <RadioButton value="reviewed">已审</RadioButton>
								        <RadioButton value="notreviewed">未审</RadioButton>
								      </RadioGroup>
										</span>

										<button className="return" onClick={
											()=>{
												this.props.history.replace('/');
											}
										}><img src="return.png" alt=""/></button>
										{
											PermissionName === '护理部主管' && (
																						<DepatSelect
																							onChangeDepat={this.onChangeDepat}
																							db={db}
																							curdepatid={this.state.curdepatid}
																						/>
																					)
										}

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

const mapStateToProps = ({db,userlogin}) => {
    return {db,userlogin};
}
// App = withRouter(App);
export default connect(mapStateToProps)(App);
