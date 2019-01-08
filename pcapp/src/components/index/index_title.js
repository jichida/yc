import React 					from 'react';
import { connect } 		from 'react-redux';
import { withRouter }	from 'react-router-dom';
import { Layout } 		from 'antd';
import { set_uiapp }	from '../../actions';
import { Badge } 			from 'antd';
import lodashget 			from 'lodash.get';

import DepatSelect from './selector_depat';	// 载入分选模块
// import lodashmap from 'lodash.map';
const { Header } = Layout;
class App extends React.Component {
	
	componentDidMount() {}

	componentWillUnmount() {}

	onClickSearch = () => {
		this.props.history.push( '/searchpaientinfo' );
	}

	onClickDatastat = () => {
		this.props.history.replace( '/datastat' );
	}

	onClickReview = () => {
		this.props.history.replace( '/review' );
	}

	onClickUser = () => {
		this.props.dispatch( set_uiapp( { ispopuserinfo:true } ) );
	}

	render() {
		const Depatname 			= lodashget( this, 'props.userlogin.depatid.Depatname', '');
		const PermissionName	= lodashget( this, 'props.userlogin.permission.name', '' );
		const Staffname				= lodashget( this, 'props.userlogin.Staffname', '' );
		const reviewnumber 		= lodashget( this, 'props.userlogin.reviewnumber', '');

		// 导航栏菜单数组
		let btns = [
			<button key = { 'btnsearch' } onClick = { () => {
				this.onClickSearch();
				}}>
				搜索
			</button>,

			<button key = { 'btndata' } onClick={ () => {
					this.onClickDatastat();
				}}>
				数据统计
			</button>,
				
			<button key = { 'btnreview' } onClick = { () => {
					this.onClickReview();
				}}>
				申报审阅
				<Badge count = { reviewnumber } overflowCount = { 99 }></Badge>
			</button>
			];

			if( PermissionName === '护理部主管') {
				
				// 推送所有科室的代码块
				btns.push(
					<DepatSelect
						key						= { 'btnuser2' }
						onChangeDepat	= { this.props.onChangeDepat }
						db 						= { this.props.db }
						curdepatid		= { this.props.curdepatid }
					/>);

				// 向数组推送当前用户的代码块
				btns.push(
					<button
						key = {'btnuser'}
						onClick = { () => {
								this.onClickUser()
							}}>
						<span>
							{ Staffname }({ PermissionName })
						</span>
					</button>);
			}

			else{
				btns.push(<button  key={'btnuser'} onClick={
					()=>{
					this.onClickUser()
					}}>
					<span>【{Depatname}】</span>
					<span>{Staffname}({PermissionName})</span>
				</button>);
			}
			
			const title = this.props.title || '病人列表';
	    return (
	      	<Header>
           			<span><img src="index.png" className="icon-index"  alt=""/>{title}</span>
								{this.props.showbtns && btns}
	      	</Header>
	    );
  	}
}

const mapStateToProps = ({userlogin,db}) => {
    return {userlogin,db};
}
App = withRouter(App);
export default connect(mapStateToProps)(App);
