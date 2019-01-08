import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PTable from './table';
import ContentTitleBar from './patientinfo_content_titlebar';
import lodashget from 'lodash.get';
import InfoNorecords from './info_norecords';

class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}
		onClickNew = ()=>{
			const {curpaientinfo} = this.props;
			this.props.history.push(`/newwoundsurface/${curpaientinfo._id}/0`);
		}
		onClickViewPrint = ()=>{
			const {curpaientinfo} = this.props;
			this.props.history.push(`/viewprintrecordwoundsurface/${curpaientinfo._id}`);
		}
		onClickEdit =(record)=>{
			const {curpaientinfo} = this.props;
			this.props.history.push(`/newwoundsurface/${curpaientinfo._id}/${record._id}`);
		}
		renderTableRecord = (record)=>{
			const {users} = this.props;
			if(!!record){
				return [
					<span key={0}>{lodashget(record,'created_at','')}</span>,
					<span key={1}>评估护士:{lodashget(users[record.usercreatorid],'Staffname','')}</span>,
					<span key={2}>创面个数:{lodashget(record,'evaluateWoundsurfaces',[]).length}</span>,
					<span key={3} onClick={()=>{this.onClickEdit(record);}}>详情</span>
				];
			}
			return [];
		}
  	render() {
			const {curpaientinfo,evaluatewoundsurfacelist,evaluatewoundsurfaces,permissionname} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			let allrecords = [];
			for(let i = 0 ;i <  evaluatewoundsurfacelist.length; i ++){
				const record = evaluatewoundsurfaces[evaluatewoundsurfacelist[i]];
				allrecords.push(record);
			}
			const onClickNew = permissionname === '护理部主管'?undefined:this.onClickNew;
			if(allrecords.length === 0){
				return (<InfoNorecords btnTitle="新建评估" onClickNew={onClickNew} />);
			}

	    return (
	      	<div>
						<ContentTitleBar title="创面评估记录" titleNew="新建评估" titleView="查看&打印"
							onClickNew={onClickNew} onClickViewPrint={this.onClickViewPrint} />
						<PTable allrecords={allrecords} renderTableRecord={this.renderTableRecord} pagenumber={5} />
	      	</div>
	    );
  	}
}
const mapStateToProps = ({evaluatewoundsurface,db},props) => {
		const {evaluatewoundsurfacelist} = evaluatewoundsurface;
		const {evaluatewoundsurfaces,users} = db;
    return {evaluatewoundsurfacelist,evaluatewoundsurfaces,users};
}
App = withRouter(App);
export default connect(mapStateToProps)(App);
