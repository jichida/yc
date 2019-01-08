import React 					from 'react';
import { withRouter }	from 'react-router-dom';
import { Layout } 		from 'antd';
// import lodashmap from 'lodash.map';
const { Header } = Layout;
class App extends React.Component {
	
	componentDidMount() {}

	componentWillUnmount() {}

	onClickSearch = () => {
		this.props.history.push( '/search' );
	}

	render() {
		// 导航栏菜单数组
		let btns = [
			<button key = { 'btnsearch' } onClick = { () => {
				this.onClickSearch();
				}}>
				搜索
			</button>,
			];
			
			const title = this.props.title || '病人列表';
	    return (
	      	<Header>
           			<span><img src="index.png" className="icon-index"  alt=""/>{title}</span>
								{this.props.showbtns && btns}
	      	</Header>
	    );
  	}
}

export default withRouter(App);
