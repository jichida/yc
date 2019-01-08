import React from 'react';
import { connect } from 'react-redux';
import { Layout,Button } from 'antd';
import lodashget from 'lodash.get';

const { Header } = Layout;
class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}

  	render() {
			const {curpaientinfo} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
	    return (
	      	<Layout>
					<Header>
						<span><img src="index.png" className="icon-index" alt=""/>病人列表-张三丰详情信息</span>
					</Header>
					<div className="content-box">
						<div className="content assess">
							<h2>自定义翻身
							<span className="return"><Button onClick={
										()=>{
											this.props.history.goBack();
										}
									}><img src="return.png" alt=""/></Button></span>
							<div className="clearfix"></div>
							</h2>
						</div>

						<div>
							<div className="elastic padding">
								<button className="ant-btn-edit gray">单侧角度翻身</button>
								<button className="ant-btn-edit blue">左右循环翻身</button>
							</div>
							<div className="elastic border-bottom">
								<div className="define">方向选择
									<div className="define-btn">
										<button className="ant-btn-edit orange">左翻</button>
										<button className="ant-btn-edit gray">右翻</button>
									</div>
								</div>
								<div className="define second">角度选择
									<div className="define-btn">
										<button className="ant-btn-edit gray">30°</button>
										<button className="ant-btn-edit orange">45°</button>
										<button className="ant-btn-edit gray">60°</button>
									</div>
								</div>
								<div className="define">保持时间
									<div className="input-box">
										<input placeholder=""  type="number" />分钟
									</div>
								</div>
								<div className="define">平躺时间
									<div className="input-box">
										<input placeholder=""  type="number" />分钟
									</div>
								</div>
							</div>

							<div className="define-result">
								<p>
									左翻45°60分钟<img src="arrow-right.png" alt=""/>左翻45°60分钟
								</p>
							</div>
							<div className="define-sum">
								<p className="sum">
									持续时间：<span>72</span>小时
								</p>
								<p>您输入的结果循环6次</p>
							</div>

						</div>
						<div>
							<button  className="ant-btn-edit blue" onClick={
								()=>{
									this.props.history.goBack();
								}
							}>开始执行</button>
						</div>
					</div>
	      	</Layout>
	    );
  	}
}

const mapStateToProps = ({db},props) => {
		const {paientinfos} = db;
		const pid = lodashget(props,'match.params.pid');
		// const bid = lodashget(props,'match.params.bid');
		let curpaientinfo = paientinfos[pid];
    return {curpaientinfo};
}

export default connect(mapStateToProps)(App);
