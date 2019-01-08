import React from 'react';
import {FieldArray,Fields, Field, reduxForm, Form  } from 'redux-form';
// import { connect } from 'react-redux';
import ViewPrintHeader from './viewtitleheader';

import {
  renderWsffrom,
  renderDiagnosis,
  renderTonm,
  renderConditions,
  renderPreventivesmeasure,
  renderScore,
  renderLapseto,
  renderInstruction,
  renderAdmissions,
  renderEvaluateWoundsurfaces,
  renderUserSignedNurse,
  renderUserSignedHeadNurse,
  renderUserSignedNursingDepartment,
  renderUserReport,
}from './form_lapseto_barden_renderfield';


// const style_choose_info_td = {
//   padding:'10px 15px',
//   fontSize: '14px',
//   width:'50%',
//   borderRight:'1px solid #ddd'
// }

// const style_choose_info_td_w25 = {
//   ...style_choose_info_td,
//   width:'25%'
// };

const style_choose_info_tr = {
  borderTop:'1px solid #ddd',
  lineHeight: '20px',
  borderRight:'1px solid #ddd'
};

const style_choose_info_tr_gray = {...style_choose_info_tr,
   color:'#888',
   fontSize: '13px',
   borderRight: '0px'
};

const style_choose_info_tr_graytitle = {
  ...style_choose_info_tr_gray,
   borderRight: '0px',
};

const no_padding = {
  padding: '0px',
}
//--------

class PageForm extends React.Component {
  render() {
    const { handleSubmit,onClickSubmit,curpaientinfo,db,app,userlogin,evaluatewoundsurfacelist,isid2 } = this.props;
    const {Hospitalname} = app;

    let trlist = [];
    let Diseaseclassification = curpaientinfo.Diseaseclassification;
    if(Diseaseclassification === '难免转院内'){
      Diseaseclassification = isid2?'院内压疮':'难免压疮';
    }
    if(Diseaseclassification === '院前压疮'){
      trlist.push(<tr className="gray title" key='admissions'>
          <td>入院时存在以下情况</td>
          <td></td>
        </tr>);
      trlist.push(
        <FieldArray
          key="admissionsarray"
          name="admissions"
          id="admissions"
          component={renderAdmissions}
        />
      );
      trlist.push(<tr style={style_choose_info_tr_graytitle} key='evaluateWoundsurfaces'>
        <td colSpan="2" style={no_padding}>
          <FieldArray
            key="evaluateWoundsurfacesarray"
            name="evaluateWoundsurfaces"
            id="evaluateWoundsurfaces"
            component={renderEvaluateWoundsurfaces}
            evaluatewoundsurfacelist={evaluatewoundsurfacelist}
            db={db}
          />
        </td>
        </tr>);

        return (
          <Form
              onSubmit={handleSubmit(onClickSubmit)}
              >
                <div className="form-box">

        						<h1>{Hospitalname}{Diseaseclassification}申报表</h1>
                    <ViewPrintHeader curpaientinfo={curpaientinfo} db={db} />

        						<table className="choose-info">
        							<tbody>
        							<tr>
                        <td >
                          <span>诊断：</span>
                          <Field component={renderDiagnosis} name="diagnosis"/>
                        </td>
                        <td>
                          <span>压疮来源：</span>
                          <Field component={renderWsffrom} name="wsffrom"/>
                        </td>
                      </tr>
        							<tr>
        								<td>压疮评分：</td>
        								<Field component={renderScore} name="evaluatebardenscore"/>
        							</tr>

                      {trlist}

                      <tr className="gray title">
                        <td>预防措施：</td>
                         <td></td>
                     </tr>
                      <FieldArray
                          name="preventivesmeasure"
                          component={renderPreventivesmeasure} />

                      <Fields names={[ 'signed_nurse', 'signed_nurse_time','stagestatus' ]} component={renderUserSignedNurse}
                        db={db} userlogin={userlogin}/>

                      <Fields names={[ 'signed_headnurse', 'signed_headnurse_time','stagestatus' ]} component={renderUserSignedHeadNurse}
                        db={db}  userlogin={userlogin}/>


                      <Fields names={[ 'instruction','isinfact', 'isunavoidablepressureulcer','stagestatus' ]} component={renderInstruction}
                      db={db} userlogin={userlogin}   Diseaseclassification={Diseaseclassification}/>

                      <Fields names={[ 'signed_nursingdepartment', 'signed_nursingdepartment_time','stagestatus' ]} component={renderUserSignedNursingDepartment}
                          db={db} userlogin={userlogin}/>


                      <Fields
                          names={["lapseto",'stagestatus' ]}
                          id="lapseto"
                          Diseaseclassification={Diseaseclassification}
                          component={renderLapseto}
                          db={db} userlogin={userlogin}
                      />

                      <Fields names={[ 'signed_report', 'signed_report_time','stagestatus' ]}
                          component={renderUserReport}
                          db={db} userlogin={userlogin}/>

        							</tbody>
        						</table>

        				</div>

                <div><button className="ant-btn-edit blue m30-0">提交数据</button></div>
          </Form>);
    }
    else if(Diseaseclassification === '难免压疮'){
      trlist.push(<Field key="conditions"
                        name="conditions"
                        id="conditions"
                        component={renderConditions}
                    />);
                    return (
                      <Form
                          onSubmit={handleSubmit(onClickSubmit)}
                          >
                            <div className="form-box">

                    						<h1>{Hospitalname}{Diseaseclassification}申报表</h1>
                                <ViewPrintHeader curpaientinfo={curpaientinfo} db={db} />

                    						<table className="choose-info">
                    							<tbody>
                    							<tr>
                    								<td>诊断：</td>
                    								<td><Field component={renderDiagnosis} name="diagnosis"/></td>
                    							</tr>

                    							<tr>
                    								<td>压疮评分：</td>
                    								<Field component={renderScore} name="evaluatebardenscore"/>
                    							</tr>

                                  {trlist}

                                  <tr className="gray title">
                                    <td>预防措施：</td>
                                     <td></td>
                                 </tr>
                                  <FieldArray
                                      name="preventivesmeasure"
                                      component={renderPreventivesmeasure} />

                                  <Fields names={[ 'signed_nurse', 'signed_nurse_time','stagestatus' ]} component={renderUserSignedNurse}
                                    db={db} userlogin={userlogin}/>

                                  <Fields names={[ 'signed_headnurse', 'signed_headnurse_time','stagestatus' ]} component={renderUserSignedHeadNurse}
                                    db={db}  userlogin={userlogin}/>


                                  <Fields names={[ 'instruction','isinfact',  'isunavoidablepressureulcer','stagestatus' ]} component={renderInstruction}
                                  db={db} userlogin={userlogin}   Diseaseclassification={Diseaseclassification}/>

                                  <Fields names={[ 'signed_nursingdepartment', 'signed_nursingdepartment_time','stagestatus' ]} component={renderUserSignedNursingDepartment}
                                      db={db} userlogin={userlogin}/>


                                  <Fields
                                      names={["lapseto",'stagestatus' ]}
                                      id="lapseto"
                                      Diseaseclassification={Diseaseclassification}
                                      component={renderLapseto}
                                      db={db} userlogin={userlogin}
                                  />

                                  <Fields names={[ 'signed_report', 'signed_report_time','stagestatus' ]}
                                      component={renderUserReport}
                                      db={db} userlogin={userlogin}/>

                    							</tbody>
                    						</table>

                    				</div>

                            <div><button className="ant-btn-edit blue m30-0">提交数据</button></div>
                      </Form>);
    }
    else if(Diseaseclassification === '院内压疮'){
      trlist.push(<Field key="conditions"
                        name="conditions"
                        id="conditions"
                        component={renderConditions}
                    />);

      trlist.push(<Fields
            key="tonm"
            names={["tonm",'stagestatus' ]}
            id="tonm"
            component={renderTonm} />);

      trlist.push(<tr className="gray title" key='admissions'>
          <td>患者存在以下情况</td>
          <td></td>
        </tr>);

      trlist.push(<FieldArray key="admissionsarray"
                        name="admissions"
                        id="admissions"
                        component={renderAdmissions}
                    />);

      trlist.push(<tr style={style_choose_info_tr_graytitle} key='evaluateWoundsurfaces'>
        <td colSpan="2">
          <FieldArray key="evaluateWoundsurfacesarray"
                              name="evaluateWoundsurfaces"
                              id="evaluateWoundsurfaces"
                              component={renderEvaluateWoundsurfaces}
                              evaluatewoundsurfacelist={evaluatewoundsurfacelist}
                              db={db}
                          />

        </td>
        </tr>);
      return (
        <Form
            onSubmit={handleSubmit(onClickSubmit)}
            >
              <div className="form-box">

      						<h1>{Hospitalname}{Diseaseclassification}申报表</h1>
                  <ViewPrintHeader curpaientinfo={curpaientinfo} db={db} />

      						<table className="choose-info">
      							<tbody>
      							<tr>
      								<td>诊断：</td>
                      <td><Field component={renderDiagnosis} name="diagnosis"/></td>
      							</tr>
      							<tr>
      								<td>压疮评分：</td>
      								<Field component={renderScore} name="evaluatebardenscore"/>
      							</tr>

                    {trlist}

                    <tr className="gray title">
                      <td>预防措施：</td>
                       <td></td>
                   </tr>
                    <FieldArray
                        name="preventivesmeasure"
                        component={renderPreventivesmeasure} />

                    <Fields names={[ 'signed_nurse', 'signed_nurse_time','stagestatus' ]} component={renderUserSignedNurse}
                      db={db} userlogin={userlogin}/>

                    <Fields names={[ 'signed_headnurse', 'signed_headnurse_time','stagestatus' ]} component={renderUserSignedHeadNurse}
                      db={db}  userlogin={userlogin}/>


                    <Fields names={[ 'instruction', 'isinfact', 'isunavoidablepressureulcer','stagestatus' ]} component={renderInstruction}
                    db={db} userlogin={userlogin}   Diseaseclassification={Diseaseclassification}/>

                    <Fields names={[ 'signed_nursingdepartment', 'signed_nursingdepartment_time','stagestatus' ]} component={renderUserSignedNursingDepartment}
                        db={db} userlogin={userlogin}/>


                    <Fields
                        names={["lapseto",'stagestatus' ]}
                        id="lapseto"
                        Diseaseclassification={Diseaseclassification}
                        component={renderLapseto}
                        db={db} userlogin={userlogin}
                    />

                    <Fields names={[ 'signed_report', 'signed_report_time','stagestatus' ]}
                        component={renderUserReport}
                        db={db} userlogin={userlogin}/>

      							</tbody>
      						</table>

      				</div>

              <div><button className="ant-btn-edit blue m30-0">提交数据</button></div>
        </Form>);
    }
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
