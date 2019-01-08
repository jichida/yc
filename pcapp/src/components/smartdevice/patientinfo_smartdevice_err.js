import React from 'react';
import { connect } from 'react-redux';
import { Layout,Button } from 'antd';
import lodashget from 'lodash.get';


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
						<div>头部标题栏</div>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<div>
							<Button>编辑</Button>
						</div>
	      	</Layout>
	    );
  	}
}

const mapStateToProps = ({db},props) => {
		const {paientinfos} = db;
		const id = lodashget(props,'match.params.pid');
		let curpaientinfo = paientinfos[id];
    return {curpaientinfo};
}
export default connect(mapStateToProps)(App);
