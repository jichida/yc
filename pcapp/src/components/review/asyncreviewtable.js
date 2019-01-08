import React from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
// import { Layout } from 'antd';
import { Pagination } from 'antd';
// import './index.css';
import ReviewDetailinfo from './review_detailinfo';
import {set_weui} from '../../actions';


// const { Content } = Layout;
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
				<div className="record">
					<table width="100%" border="0" className="declare-review-list">
						<tbody>
						<tr className="top">
							<td><div align="center">姓名</div></td>
							<td><div align="center">住院号</div></td>
							<td><div align="center">科室</div></td>
							<td><div align="center">入院时间</div></td>
							<td><div align="center">床号</div></td>
							<td><div align="center">申请护士</div></td>
							<td><div align="center">审核状态</div></td>
							<td><div align="center">操作</div></td>
						</tr>

						{
							lodashmap(this.state.dataSource,(info)=>{
								return (<ReviewDetailinfo key={info._id}
									info={info}
									db={this.props.db}
									onClickDetail={this.props.onClickDetail} />)
							})
						}
						</tbody>
					</table>
					{
						this.state.pagination.total > this.state.pagination.pageSize && (<Pagination key={'div1'} defaultCurrent={1}
							total={this.state.pagination.total}
							current={this.state.pagination.current}
							pageSize={this.state.pagination.pageSize}
							onChange={this.onChangePagination}
						/>)
					}
		</div>

	    );
  	}
}


export default connect(null, null, null, { withRef: true })(App);
