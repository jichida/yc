import React from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import { Layout } from 'antd';
import { Pagination } from 'antd';
import './index.css';
import Paientinfo from './index_patientinfo';
import {set_weui} from '../../actions';


const { Content } = Layout;
// const pagenumber = 5;
const listtypeiddata = {

};

class App extends React.Component {
		constructor(props) {
				super(props);
				this.state = {
					dataSource: [],
					pagination: {
						current:1,
						pageSize:props.pagenumber,
						total:1
					},
					refreshing: false,
					pos:0
				}
		}

		onChangePagination =(page, pageSize)=>{
			this.setState({
				current:page,
				pageSize
			});
			this.onAjax(this.props.query,this.props.sort,this.props.pagenumber,page);
		}
		// handleTableChange = (pagination, filters, sorter) => {
    //   const pager = { ...this.state.pagination };
    //   pager.current = pagination.current;
    //   this.setState({
    //     pagination: pager,
    //   });
    //   this.onAjax(this.props.query,this.props.sort,this.props.pagenumber,pager.current);
    // }

    onAjax(query,sort,pagenumber,page){
      let that = this;
      this.props.dispatch(this.props.queryfun({
          query: query,
          options: {
              select:this.props.select || {},
              sort: sort,
              page: page,
              limit: pagenumber,
          }
      })).then(({result})=> {
        if (that.mounted){
          let initData = [];
          if(!!result){
            lodashmap(result.docs,(item)=>{
              item = that.props.onItemConvert(item);
              initData.push(item);
            });
          }
          that.setState({
            dataSource:[...initData],
            refreshing: false,
            pagination:{
              pageSize:pagenumber,
              current:result.page,
              total:result.total,
            }
          });
        }
      }).catch((e)=>{
        this.setState({ refreshing: false });
        console.log(e);
        this.props.dispatch(set_weui({
          toast:{
          text:e,
          show: true,
          type:'warning'
        }}));
      });
    }

    // componentWillMount() {
    //
    // }
    componentWillUnmount() {
      this.mounted = false;
      let pos = lodashget(this,'refs.antdtable.scrollProperties.offset',0);
      listtypeiddata[this.props.listtypeid] = {
        dataSource:this.state.dataSource,
        pagination:this.state.pagination,
        pos:pos//document.body.scrollTop||document.documentElement.scrollTop
      };

    }

    componentDidMount() {
      this.mounted = true;
      let saveddata = listtypeiddata[this.props.listtypeid];
      if(!!saveddata && this.props.usecache){//first time
        this.setState({
          dataSource:saveddata.dataSource,
          refreshing:false,
          pagination:saveddata.pagination
        });
      }
      else{
        if(!!saveddata){
          delete listtypeiddata[this.props.listtypeid];
        }
        this.onRefresh();
      }
      // this.refs.antdtable.scrollTo(0,this.state.pos);
      // this.setState({ refreshing: true });
      // this.onAjax(this.props.query,this.props.sort,this.props.pagenumber,1);
     }
     onRefresh() {
       if(!!this.props.query){
         this.setState({ refreshing: true });
         this.onAjax(this.props.query,this.props.sort,this.props.pagenumber,1);
       }
     }

		// onClickDetail = (pid)=>{
		// 	this.props.history.push(`/indexdetail/${pid}`);
		// }
		// onClickEvalute = (pid)=>{
		// 	this.props.history.push(`/indexinfo/${pid}`);
		// }
  	render() {
			// const {paientinfolist,paientinfos} = this.props;
	    return (
	      	<Content>
          	{
							lodashmap(this.state.dataSource,(curpaientinfo)=>{
								return (
									<Paientinfo 
										db={this.props.db}
										key={curpaientinfo._id}
										curpaientinfo={curpaientinfo}
										onClickDetail={()=>{this.props.onClickDetail(curpaientinfo._id)}}
										onClickEvalute={()=>{this.props.onClickEvalute(curpaientinfo._id)}}/>);
								})
						}
						<div className="clearfix"></div>
						{
							this.state.pagination.total > this.state.pagination.pageSize &&
								(<Pagination key={'div1'} defaultCurrent={1}
														total={this.state.pagination.total}
														current={this.state.pagination.current}
														pageSize={this.state.pagination.pageSize}
														onChange={this.onChangePagination}
													/>)
						}
	      	</Content>
	    );
  	}
}


export default connect(null, null, null, { withRef: true })(App);
