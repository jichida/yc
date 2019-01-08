import React from 'react';
// import './index.css';
import {
  callthen,page_getturnoverrecordlist_request,page_getturnoverrecordlist_result
} from '../../sagas/pagination';
import AsyncTable from './asyncreviewtable.js';

let g_querysaved;
class App extends React.Component {

		componentDidMount(){

		}

		componentWillUnmount() {

		}

    onItemConvert(item){
      return item;
    }
  	render() {
      return (
        <AsyncTable
          db={this.props.db}
          onClickDetail = {this.onClickDetail}
          listtypeid = 'antdtablereviewlist'
          usecache = {!!g_querysaved}
          ref='refreviewinfo'
          onItemConvert={this.onItemConvert.bind(this)}
          pagenumber={16}
          query={this.props.query}
          sort={{DataTime: -1}}
          queryfun={(payload)=>{
            return callthen(page_getturnoverrecordlist_request,page_getturnoverrecordlist_result,payload);
          }}
        />);
  	}
}

export default App;
// export default connect(null, null, null, { withRef: true })(App);
