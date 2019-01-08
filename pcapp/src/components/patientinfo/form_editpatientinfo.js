import React from 'react';
import {  reduxForm, Form ,Field,  } from 'redux-form';
import lodashget from 'lodash.get';
import DiseaseclassificationSelect from './selector_diseaseclassification.js';

class PageForm extends React.Component {
  render() {
    const { handleSubmit,onClickSubmit } = this.props;
    const {curpaientinfo,db} = this.props;
    const {depats,beds} = db;
    const Diseaseclassification = lodashget(curpaientinfo,'Diseaseclassification','普通病人');
    return (
      <Form
          onSubmit={handleSubmit(onClickSubmit)}
          >
            <div>
							<ul>
                <li>病人分类：<span className="on">
                  <Field name="Diseaseclassification"
                          id="Diseaseclassification"
                          Diseaseclassification={Diseaseclassification}
                          component={DiseaseclassificationSelect}
                                />
                </span></li>
                <li>病人姓名：{lodashget(curpaientinfo,'Patientname','')}</li>
                <li>性别：{lodashget(curpaientinfo,'SexString','男')}</li>
                <li>住院时间：{lodashget(curpaientinfo,'In_date','')}</li>
                <li>床号：{lodashget(beds,`${curpaientinfo.bedid}.Bedno`,'')}</li>
                <li>所在科室：{lodashget(depats,`${curpaientinfo.depatid}.Depatname`,'')}</li>
              <div className="clearfix">
              </div>
            </ul>
						</div>
						<div>
							<button className="ant-btn-edit">保存修改</button>
						</div>
          </Form>);
        }
    }

    const RetForm = ({formname,formvalues,...rest})=> {
        const FormWrap = reduxForm({
            form: formname,
            initialValues: formvalues
        })(PageForm);

        return <FormWrap {...rest} />
    }
    export default RetForm;

    // PageForm = reduxForm({
    //     form: 'EditpatientinfoForm'
    // })(PageForm);
    //
    // export default PageForm;
