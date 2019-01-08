import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import Patientinfolist from '../index/index_patientinfolist';
import IndexHead from '../index/index_title';
import lodashget from 'lodash.get';

class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}


  	render() {
			const title = "数据统计";
			let query = {};
			const {stat} = this.props.userlogin;
			const {count_total,count_occur1,count_occur2,count_cure} = stat;
			const flag = lodashget(this.props,'match.params.flag');
			let percent1 = 0;
			let count = 0;
			let percenttitle = '';
			if(count_total > 0){
				if(flag === '0'){
					percent1 = (count_occur1*100/count_total).toFixed(1);
					count = count_occur1;
					percenttitle = '压疮发生率';
					query[`Diseaseclassification`] = `院前压疮`;
				}
				else if(flag === '1'){
					percent1 = (count_occur2*100/count_total).toFixed(1);
					count = count_occur2;
					percenttitle = '高危压疮发生率';
					query[`Diseaseclassification`] = `难免压疮`;
				}
				else if(flag === '2'){
					percent1 = (count_cure*100/count_total).toFixed(1);
					count = count_cure;
					percenttitle = '治愈率';
					query[`stage`] = '已治愈';
				}
			}
			const showtext = `${percenttitle} ${percent1}% ${count}人`;
	    return (
	      	<Layout>
						<IndexHead title={title}/>
						<div className="index-box">
							<div className="index-content assess">
								<h2 className="bbm-green">
									{showtext}
									<button className="return" onClick={
									()=>{
										this.props.history.goBack();
									}
								}><img src="return.png" alt="" /></button>
									{/* 数据统计返回按钮的异常修改，如果缺失该div在今后未发现什么异常可以将这两行整体删除 */}
									{/* <div className="clearfix"></div> */}
								</h2>
								<Patientinfolist query={query}
									history={this.props.history}
									db={this.props.db}
									pagenumber={12}
									ref='plistsearch'/>
							</div>
						</div>
	      	</Layout>
	    );
  	}
}

const mapStateToProps = ({db,userlogin},props) => {
    return {db,userlogin};
}

export default connect(mapStateToProps)(App);
