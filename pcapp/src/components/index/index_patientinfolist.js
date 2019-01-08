import React from 'react';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import lodashmap from 'lodash.map';
// import { Layout } from 'antd';
// import { Pagination } from 'antd';
import './index.css';
// import Paientinfo from './index_patientinfo';
import {
  callthen,page_getpatientinfolist_request,page_getpatientinfolist_result
} from '../../sagas/pagination';
import AsyncTable from './asyncpatientinfotable.js';

// const { Content } = Layout;

let g_querysaved;
class App extends React.Component {

		componentDidMount(){

		}

		componentWillUnmount() {

		}

		onClickDetail = (pid)=>{
			this.props.history.push(`/indexdetail/${pid}`);
		}
		onClickEvalute = (pid)=>{
			this.props.history.push(`/indexinfo/${pid}`);
		}
    onItemConvert(item){
      return item;
    }
  	render() {
      return (
        <AsyncTable
          db={this.props.db}
          onClickDetail = {this.onClickDetail}
          onClickEvalute = {this.onClickEvalute}
          listtypeid = 'antdtablepaientinfo'
          usecache = {!!g_querysaved}
          ref='refpaientinfo'
          onItemConvert={this.onItemConvert.bind(this)}
          pagenumber={this.props.pagenumber || 16}
          query={this.props.query}
          sort={{Bedno: 1}}
          queryfun={(payload)=>{
            return callthen(page_getpatientinfolist_request,page_getpatientinfolist_result,payload);
          }}
        />);
  	}
}

export default App;
// export default connect(null, null, null, { withRef: true })(App);
