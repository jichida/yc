import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import PTable from './table';
import ContentTitleBar from './patientinfo_content_titlebar_once';
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
			this.props.history.push(`/newnursingmeasures/${curpaientinfo._id}/0`);
		}
		onClickViewPrint = ()=>{
			const {curpaientinfo} = this.props;
			this.props.history.push(`/viewprintrecordnursingmeasures/${curpaientinfo._id}`);
		}
		onClickEdit =(record)=>{
			const {curpaientinfo} = this.props;
			this.props.history.push(`/newnursingmeasures/${curpaientinfo._id}/${record._id}`);
		}
		onClickSign =()=>{
			//护士长签字后才能点击viewprint
			const {userlogin,curpaientinfo} = this.props;
			popConfirmSign2(()=>{

				const userid = userlogin._id;
				console.log(`病人:${curpaientinfo._id},签名:${userid}`);

				this.props.dispatch(callthen(editpatientinfo_request,editpatientinfo_result,{
					_id:curpaientinfo._id,
					evaluatenursingmeasuressignheadnurseid:userlogin._id
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
					<span key={0}>{lodashget(record,'created_at','')}</span>,
					<span key={1}>评估护士:{lodashget(users[record.usercreatorid],'Staffname','')}</span>,
					<span key={3} onClick={()=>{this.onClickEdit(record);}}>详情</span>
				];
			};
			return [];
		}
  	render() {
			const {curpaientinfo,evaluatenursingmeasureslist,evaluatenursingmeasuress,permissionname} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
            }
            let isHaveMeasure = false;
            let curMeasureInfo;
			let allrecords = [];
			for(let i = 0 ;i <  evaluatenursingmeasureslist.length; i ++){
                const record = evaluatenursingmeasuress[evaluatenursingmeasureslist[i]];
                if(moment(record.created_at).isSame(moment(),'day')){
                    isHaveMeasure = true;
                    curMeasureInfo = record;
                }
				allrecords.push(record);
			}

			const onClickNew = permissionname === '护理部主管'?undefined:this.onClickNew;
			if(allrecords.length === 0){
				return (<InfoNorecords btnTitle="新建护理" onClickNew={onClickNew} />);
			}
			//如果是护士长并且
			const isClickSignEnable = !curpaientinfo.evaluatenursingmeasuressignheadnurseid && permissionname === '护士长';
			const isClickViewPrintEnable = !!curpaientinfo.evaluatenursingmeasuressignheadnurseid;

	    return (
	      	<div>
						<ContentTitleBar title="护理措施记录" titleNew="新建护理" titleView="查看&打印"  titleSign="护士长签字"
                            onClickNew={onClickNew}
														onClickViewPrint={isClickViewPrintEnable && this.onClickViewPrint}
														onClickSign={isClickSignEnable && this.onClickSign}
                            isHaveMeasure={isHaveMeasure} curMeasureInfo={curMeasureInfo} onClickEdit={this.onClickEdit} />
						<PTable allrecords={allrecords} renderTableRecord={this.renderTableRecord} pagenumber={5} />
	      	</div>
	    );
  	}
}
const mapStateToProps = ({evaluatenursingmeasures,db,userlogin},props) => {
		const {evaluatenursingmeasureslist} = evaluatenursingmeasures;
		const {evaluatenursingmeasuress,users} = db;
    return {evaluatenursingmeasureslist,evaluatenursingmeasuress,users,userlogin};
}
App = withRouter(App);
export default connect(mapStateToProps)(App);
