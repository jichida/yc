import React from 'react';
import { connect } from 'react-redux';

import {
	logout_request,
	set_uiapp,
} from '../../actions';


class App extends React.Component {

	constructor(props) {  
        super(props);  
        this.state = {};
    }
		onClickCloseUser = ()=>{
			this.props.dispatch(set_uiapp({ispopuserinfo:false}));
		}
		onClickPwd = ()=>{
			this.props.dispatch(set_uiapp({ispopuserinfo:false,ispoppwd:true}));
		}
		onClickLogout = ()=>{
			this.props.dispatch(set_uiapp({ispopuserinfo:false}));
			this.props.dispatch(logout_request({}));
		}
  	render() {
	    return (
					<div className="modify-password">
						<h1>用户中心<img src="close-white.png" onClick={this.onClickCloseUser} alt=""/>
						<div className="clearfix">
						</div>
						</h1>
						<p onClick={this.onClickPwd}><span className="bbm">修改密码</span></p>
						<p onClick={this.onClickLogout}><span className="bbm">退出账号</span></p>
					</div>
	    );
  	}
}

export default connect()(App);
