import React from 'react';
import { Field,Fields, reduxForm, Form  } from 'redux-form';
// import { connect } from 'react-redux';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import {getbardenstring} from '../../util/index';



/*
score_sensoryperception:{ type: Number, default: -1 },//感知
score_moisture:{ type: Number, default: -1 },//潮湿
score_activity:{ type: Number, default: -1 },//活动能力
score_mobility:{ type: Number, default: -1 },//移动能力
score_nutrition:{ type: Number, default: -1 },//营养
score_friction:{ type: Number, default: -1 },//摩擦力/剪切力
score:{type:Number},
*/

const renderSelCom = (props)=>{
  const {input:{value,onChange},labeltitle,labelsz} = props;
  const onChangeSel = (id)=>{
    onChange(id);
  }

  let tdc = [];
  lodashmap(labelsz,(v,index)=>{
    if(!!v.colspan){
      if(v.value === value){
        tdc.push(<td className="blue" colSpan="2" key={index}>-{v.label}-</td>)
      }
      else{
        tdc.push(<td key={index} colSpan="2" onClick={()=>{
          onChangeSel(v.value)
        }}>{v.label}</td>);
      }
      return;
    }
    if(v.value === value){
      tdc.push(<td className="blue" key={index}>-{v.label}-</td>)
    }
    else{
      tdc.push(<td key={index} onClick={()=>{
        onChangeSel(v.value)
      }}>{v.label}</td>);
    }
  });

  return (
    <tr>
      <td className="black font-weight">{labeltitle}</td>
      {tdc}
    </tr>
  );
}

const renderScore = (props)=>{
  const {score_sensoryperception,score_moisture,score_activity,score_mobility,score_nutrition,score_friction} = props;

  const sensoryperception  = lodashget(score_sensoryperception,'input.value',0);
  const moisture  = lodashget(score_moisture,'input.value',0);
  const activity  = lodashget(score_activity,'input.value',0);
  const mobility  = lodashget(score_mobility,'input.value',0);
  const nutrition  = lodashget(score_nutrition,'input.value',0);
  const friction  = lodashget(score_friction,'input.value',0);
  const score = sensoryperception + moisture + activity + mobility + nutrition + friction;
  let isfinished = true;
  let resultstring = '尚未评估';
  if(sensoryperception === 0 || moisture === 0 || activity === 0 || mobility === 0 || nutrition === 0 || friction === 0){
    if(score > 0){
      resultstring = '尚未评估完成';
    }
    isfinished = false;
  }
  else{
    resultstring = getbardenstring(score);
  }
  let BtnCo =   <button className="ant-btn-edit blue white">递交评估</button>;
  if(!isfinished){
    BtnCo =  <div className="ant-btn-edit gray white">递交评估</div>;
  }
  return (<div>
            <div className="mt40 text-center">
              {(score > 0) && <p className="fontSize18">得分：<span className="blue">{score}分</span></p>}
              <p className="blue fontSize14">{resultstring}</p>
            </div>
            <div className="mt40">
              {BtnCo}
            </div>
          </div>);
}

class PageForm extends React.Component {
  onClickSubmit = (values)=>{
    const { onClickSubmit } = this.props;
    let score = 0;
    score += lodashget(values,'score_sensoryperception',0);
    score += lodashget(values,'score_moisture',0);
    score += lodashget(values,'score_activity',0);
    score += lodashget(values,'score_mobility',0);
    score += lodashget(values,'score_nutrition',0);
    score += lodashget(values,'score_friction',0);
    values.score = score;
    onClickSubmit(values);
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <Form
          onSubmit={handleSubmit(this.onClickSubmit)}
          >
            <div className="wound-surface">
							<h3>压疮风险评估表</h3>
							<div className="wound-surface-form">
								<table>
                  <tbody>
									<tr>
										<td className="black font-weight">项目</td>
										<td>1分</td>
										<td>2分</td>
										<td>3分</td>
										<td>4分</td>
									</tr>
                  <Field
      								name="score_sensoryperception"
      								id="score_sensoryperception"
                      component={renderSelCom}
                      labeltitle="感觉"
      								labelsz={[{
                        label:'完全限制',
                        value:1
                      },{
                        label:'非常限制',
                        value:2
                      },{
                        label:'轻度受限',
                        value:3
                      },{
                        label:'未受伤害',
                        value:4
                      }]}
      						/>
                  <Field
                      name="score_moisture"
                      id="score_moisture"
                      component={renderSelCom}
                      labeltitle="潮湿"
                      labelsz={[{
                        label:'持久潮湿',
                        value:1
                      },{
                        label:'非常潮湿',
                        value:2
                      },{
                        label:'偶尔潮湿',
                        value:3
                      },{
                        label:'很少潮湿',
                        value:4
                      }]}
                  />
                  <Field
                      name="score_activity"
                      id="score_activity"
                      component={renderSelCom}
                      labeltitle="活动力"
                      labelsz={[{
                        label:'卧床不起',
                        value:1
                      },{
                        label:'局限于椅',
                        value:2
                      },{
                        label:'偶尔步行',
                        value:3
                      },{
                        label:'经常步行',
                        value:4
                      }]}
                  />
                  <Field
                      name="score_mobility"
                      id="score_mobility"
                      component={renderSelCom}
                      labeltitle="移动力"
                      labelsz={[{
                        label:'完全不能',
                        value:1
                      },{
                        label:'严重受限',
                        value:2
                      },{
                        label:'轻度受限',
                        value:3
                      },{
                        label:'不受限',
                        value:4
                      }]}
                  />
                  <Field
                      name="score_nutrition"
                      id="score_nutrition"
                      component={renderSelCom}
                      labeltitle="营养"
                      labelsz={[{
                        label:'非常差',
                        value:1
                      },{
                        label:'可能不足',
                        value:2
                      },{
                        label:'适当',
                        value:3
                      },{
                        label:'良好',
                        value:4
                      }]}
                  />
                  <Field
                      name="score_friction"
                      id="score_friction"
                      component={renderSelCom}
                      labeltitle="摩擦力和剪切力"
                      labelsz={[{
                        label:'有问题',
                        value:1
                      },{
                        label:'有潜在问题',
                        value:2
                      },{
                        label:'无明显问题',
                        value:3,
                        colspan:2
                      }]}
                  />
                </tbody>
								</table>
							</div>
						</div>
            <Fields names={['score_sensoryperception', 'score_moisture', 'score_activity',
              'score_mobility','score_nutrition','score_friction']}
                    component={renderScore}/>

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
