import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, Form } from 'redux-form';
// import { withRouter } from 'react-router-dom';

import {
    changepwd_request,
    set_weui,
    set_uiapp
} from '../../actions';


export class PageForm extends React.Component {
    render() {
        const { handleSubmit, onClickchange } = this.props;

        return ( <Form className = "changepwdForm" onSubmit = { handleSubmit(onClickchange) } >
          <p>
            <span>旧&nbsp;&nbsp;&nbsp;密&nbsp;&nbsp;&nbsp;码：</span>
            <Field name = "password"
              id = "password"
              placeholder = "请输入原始密码"
              type = "password"
              component = "input"
              />
          </p>
          <p>
            <span>新&nbsp;&nbsp;&nbsp;密&nbsp;&nbsp;&nbsp;码：</span>
            <Field name = "passwordA"
            id = "passwordA"
            placeholder = "请输入您的新密码"
            type = "password"
            component = "input"/>
          </p>
          <p>
            <span>新密码确认：</span>
            <Field name = "passwordB"
            id = "passwordB"
            placeholder = "请输入您的新密码"
            type = "password"
            component = "input"/>
          </p>
          <div className="modify">
            <button className="ant-btn-edit">确认修改</button>
          </div>
         </Form>
        )
    }
}

PageForm = reduxForm({
    form: 'changepwdPageForm'
})(PageForm);

// PageForm = withRouter(PageForm);

class App extends React.Component {

    constructor(props)  {          
        super(props);          
        this.state  =   {};
    }
    onClickClosePwd = () => {
        this.props.dispatch(set_uiapp({ ispoppwd: false }));
    }
    onClickchange = (values) => {
        let payload = {
            password: values.password,
            passwordA: values.passwordA,
        };
        //<----验证-----
        let texterr;
        if(!payload.password){
          texterr = '旧密码不能为空';
        }
        if(!texterr){
          if(!payload.passwordA){
            texterr = '新密码不能为空';
          }
        }
        if(!texterr){
          if(!values.passwordB){
            texterr = '请再输入新密码';
          }
        }
        if(!texterr){
          if(payload.passwordA !== values.passwordB){
            texterr = '两次密码输入不一致';
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
        // this.props.dispatch(set_uiapp({ ispoppwd: false }));
        this.props.dispatch(changepwd_request(payload));
    }
    render() {
        return (
          <div className="modify-password" >
           <h1>修改密码<img src="close-white.png" alt="" onClick = {this.onClickClosePwd}/><div className="clearfix"></div></h1>
           <p><span>旧&nbsp;&nbsp;&nbsp;密&nbsp;&nbsp;&nbsp;码：</span><input type="text" /></p>
           <p><span>新&nbsp;&nbsp;&nbsp;密&nbsp;&nbsp;&nbsp;码：</span><input type="text" /></p>
           <p><span>新密码确认：</span><input type="text" /></p>
           <div className="modify">
             <button className="ant-btn-edit">确认修改</button>
           </div>
         </div>
        );
    }
}

export default connect()(App);
