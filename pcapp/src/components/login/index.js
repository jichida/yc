import React from 'react';
import { Field, reduxForm, Form  } from 'redux-form';
import { connect } from 'react-redux';
import {
  login_request,
  set_weui
} from '../../actions';
import "./style.css";
import LoginBg from "./index.jpg";
import Img1 from "./login_tit.png";
import config from "../../env/config"
// import Img2 from "../../img/2.png";
// import Img3 from "../../img/23.png";
// import Header from "../header/page.js";

let resizetimecontent;

class PageForm extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
          innerHeight : window.innerHeight,
          innerWidth : window.innerWidth
        };
    }

	componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    onWindowResize=()=> {
        window.clearTimeout(resizetimecontent);
        resizetimecontent = window.setTimeout(()=>{
            this.setState({
                innerHeight: window.innerHeight,
                innerWidth : window.innerWidth
            });
        },10)
    }

  	render() {
      const version = config.appversion
      const { handleSubmit,onClickLogin } = this.props;
    	return (
				<Form
						className="loginFormC"
						onSubmit={handleSubmit(onClickLogin)}
						>
      		<div
      			className="loginPage"
      			>
        		{<img alt="" src={LoginBg} className="loginbg" />}
        		<div className="loginForm">
        			<div className="tit">
        				<p className="t">{<img alt="" src={Img1} className="login_tit" />}</p>
        				<p className="i"></p>
        			</div>
					<div className="li">
						{/* <img alt="" src={Img1}/> */}
						<label>账号</label><Field
								name="username"
								id="username"
                component="input"
								placeholder="请输入您的账号"
								type="text"
						/>
					</div>
					<div className="li">
						{/* <img alt="" src={Img2} /> */}
						<label>密码</label><Field
								name="password"
								id="password"
                component="input"
								placeholder="请输入您的密码"
								type="password"
						/>
					</div>
					<div className="butn">
						<a
            onClick={handleSubmit(onClickLogin)}>登录</a>
                    <div className="version">version:{version}</div>
					</div>
        		</div>
      		</div>
					</Form>
    	);
  	}
}


const RetForm = ({formname,formvalues,...rest})=> {
    const FormWrap = reduxForm({
        form: formname,
        initialValues: formvalues
    })(PageForm);

    return <FormWrap {...rest} />
}

export class Page extends React.Component {
    componentWillReceiveProps (nextProps) {
        console.log(nextProps);
        if(nextProps.loginsuccess && !this.props.loginsuccess){
            console.log("------->" + JSON.stringify(this.props.location));
            //search:?next=/devicelist
            // var fdStart = this.props.location.search.indexOf("?next=");
            // if(fdStart === 0){
            //     const redirectRoute = this.props.location.search.substring(6);
            //     this.props.history.replace(redirectRoute);
            // }
            // else{//强制进入首页
                this.props.history.replace('/');
            // }
            return;
        }
    }
    onClickReturn =()=>{
        this.props.history.goBack();
    }

    componentWillUnmount(){
        // this.props.dispatch(set_weui({
        //     loading : {
        //         show : false
        //     },
        // }));
    }

    onClickLogin = (values)=>{
        let payload = {
            username:values.username,
            password:values.password,
        };
        console.log(payload);
        //<----验证-----
        let texterr;
        if(!payload.username){
          texterr = '用户名不能为空';
        }
        if(!texterr){
          if(!payload.password){
            texterr = '密码不能为空';
          }
        }
        if(!texterr){
          if(payload.password.length !== 4 && payload.password.length !== 6 ){
            texterr = '密码长度为4位或6位';
          }
        }
        if(!!texterr){
          this.props.dispatch(set_weui({
            toast:{
              text:texterr,
              type:'warning'
          }
          }));
          return;
        }
        //<----验证结束-----
        console.log(payload);
        this.props.dispatch(login_request(payload));
        // this.props.history.push("./");
    }
    render(){
        const {username} = this.props;

        return (<div>
		      <div className="pageheader login_head" onClick={()=>{
            this.props.history.goBack();
            }} >
            <span className="leftlnk">
              {/* <img alt="" src={Img3} /> */}
            </span>
          </div>

          <RetForm formname="LoginPageForm" formvalues={{username:username,
            password:'123456'}} onClickLogin={this.onClickLogin}/>
        </div>

        );
    }
}

const data = ({userlogin}) => { return userlogin; }
Page = connect(data)(Page);

export default Page;
