import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ContentTitleBar from './patientinfo_content_titlebar';
import PTable from './table';
import lodashget from 'lodash.get';
import InfoNorecords from './info_norecords';
import {popConfirmSign2} from '../evaluate/popconfirmsign';
import {editpatientinfo_request,editpatientinfo_result,set_db,set_weui} from '../../actions';
import {callthen} from '../../sagas/pagination';

class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}
		onClickNew = ()=>{
			const {curpaientinfo} = this.props;
			this.props.history.push(`/newbarden/${curpaientinfo._id}/0`);
		}
		onClickViewPrint = ()=>{
			const {curpaientinfo} = this.props;
			this.props.history.push(`/viewprintrecordbarden/${curpaientinfo._id}`);
		}
		onClickEdit =(record)=>{
			const {curpaientinfo} = this.props;
			this.props.history.push(`/newbarden/${curpaientinfo._id}/${record._id}`);
		}
		onClickSign =()=>{
			//护士长签字后才能点击viewprint
			const {userlogin,curpaientinfo} = this.props;
			popConfirmSign2(()=>{

				const userid = userlogin._id;
				console.log(`病人:${curpaientinfo._id},签名:${userid}`);

				this.props.dispatch(callthen(editpatientinfo_request,editpatientinfo_result,{
					_id:curpaientinfo._id,
					evaluatebardensignheadnurseid:userlogin._id
				})).then((payload)=>{
					let paientinfos = {};
					paientinfos[payload._id] = payload;
					this.props.dispatch(set_db({paientinfos}));
					this.props.dispatch(set_weui({
						toast:{
							text:'签名成功',
							show: true,
							type:'success'
					}}));
				}).catch((e)=>{
					console.log(e);
				});
			});
		}

		renderTableRecord = (record)=>{
			const {users} = this.props;
			if(!!record){
				return [
					<span key={0}>{lodashget(record,'evaluate_at','')}</span>,
					<span key={1}>评估护士:{lodashget(users[record.usercreatorid],'Staffname','')}</span>,
					<span key={2}>评估分数:{lodashget(record,'score','')}</span>,
					<span key={3} onClick={()=>{this.onClickEdit(record);}}>详情</span>
				];
			}
			return [];
		}
  	render() {
			const {curpaientinfo,evaluatebardenlist,evaluatebardens,permissionname} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			let allrecords = [];
			for(let i = 0 ;i <  evaluatebardenlist.length; i ++){
				const record = evaluatebardens[evaluatebardenlist[i]];
				allrecords.push(record);
			}

			const onClickNew = permissionname === '护理部主管'?undefined:this.onClickNew;
			if(allrecords.length === 0){
				return (<InfoNorecords btnTitle="新建评估" onClickNew={onClickNew} />);
			}
			//如果是护士长并且
			const isClickSignEnable = !curpaientinfo.evaluatebardensignheadnurseid && permissionname === '护士长';
			const isClickViewPrintEnable = !!curpaientinfo.evaluatebardensignheadnurseid;
	    return (
	      	<div>
						<ContentTitleBar title="Barden评估记录" titleNew="新建评估" titleView="查看&打印" titleSign="护士长签字"
							onClickNew={onClickNew}
							 onClickViewPrint={isClickViewPrintEnable && this.onClickViewPrint}
							 onClickSign={isClickSignEnable && this.onClickSign}/>
						<PTable allrecords={allrecords} renderTableRecord={this.renderTableRecord} pagenumber={5}/>
	      	</div>
	    );
  	}
}

const mapStateToProps = ({evaluatebarden,db,userlogin},props) => {
		const {evaluatebardenlist} = evaluatebarden;
		const {evaluatebardens,users} = db;
    return {evaluatebardenlist,evaluatebardens,users,userlogin};
}
App = withRouter(App);
export default connect(mapStateToProps)(App);
