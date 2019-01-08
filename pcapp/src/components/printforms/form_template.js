/**
 * form_template.js | 转归与申报表格模板
 */

import React      from 'react';
import lodashget  from 'lodash.get';
import lodashmap  from 'lodash.map';
import moment     from 'moment';
import { Icon } from 'antd';
import {getvalueof_preventivesmeasure} from '../../util/index';
import './form_tamplate_style.styl';

const RenderCheckBox = (props)=>{
  const {checked} = props;
  if(checked){
    return  <span>&nbsp;<Icon type="check-square-o" />&nbsp;</span>;
  }
  return  <span>&nbsp;<Icon type="close-square-o" />&nbsp;</span>;
  // return (<Icon type="close-square-o" />);
}

const RenderCheckboxTitle = (props)=>{
  //改样式,否则没法打印,如果选中,则前面打勾
  const {checked,value} = props;//<Icon type="check" />
  return <span className = "check">
    <RenderCheckBox checked={checked} />
    {value}</span>;
}

const RenderCheckboxTableCenterY = (props)=>{
  //改样式,否则没法打印,如果选中,则前面打勾
  const {checked,value} = props;
  return   <div className = "center-y" >
      <RenderCheckBox checked={checked} />
      {value }
    </div>
}

const RenderCheckboxTitleFirst = (props)=>{
  //改样式,否则没法打印,如果选中,则前面打勾
  const {checked,value} = props;
  return <span >
    {value}
    <RenderCheckBox checked={checked} />
  </span>;
}

const FormSign = (props) => {
  //主管部门审核与指导意见：
  const {info,db,Diseaseclassification} = props;
  const {isunavoidablepressureulcer,isinfact,instruction,signed_nursingdepartment,signed_nursingdepartment_time} = info;
  let Staffname = lodashget(db,`users.${signed_nursingdepartment}.Staffname`,'');
  let MYY = '';
  let MMM = '';
  let MDD = '';
  let MHH = '';
  let Mmm = '';

  // debugger;
  const time_input_value = signed_nursingdepartment_time;
  if(!!time_input_value && time_input_value!==''){
    const momenttime = moment(time_input_value);
    MYY = momenttime.format('YYYY');
    MMM = momenttime.format('MM');
    MDD = momenttime.format('DD');
    MHH = momenttime.format('HH');
    Mmm = momenttime.format('mm');

  }

  let Guidecheck;
  if(Diseaseclassification === '难免压疮'){
    Guidecheck = (<div className = "flex-1 center-y">
        <span style={{width: 'auto'}} className = "check">符合难免压疮申报的条件：</span>
        <RenderCheckboxTitle checked={isunavoidablepressureulcer}  value="是" />
        <RenderCheckboxTitle checked={!isunavoidablepressureulcer}  value="否" />
      </div>);
  }
  else{
    Guidecheck = (<div className = "flex-1 center-y">
        <span className = "check">情况属实</span>
        <RenderCheckboxTitle checked={isinfact}  value="是" />
        <RenderCheckboxTitle checked={!isinfact}  value="否" />
      </div>);
  }
  return (
    <div className = "form-sign column flex-1">
      <div className = "opinion column">
        <div>
          <div className = "flex-1 center-y">主管部门审核与指导意见：</div>
          {Guidecheck}
        </div>
        <div>
          <div className = "flex-1">指导意见：</div>
          <div className = "flex-1">
            <span className = "opinion">{instruction}</span>
          </div>
        </div>
        <div>
          <div className = "flex-1">主管部门签字：{Staffname}</div>
          <div className = "flex-1">
            日期：
            <span>{MYY}</span>年
            <span>{MMM}</span>月
            <span>{MDD}</span>日
            <span>{MHH}</span>:
            <span>{Mmm}</span>
          </div>
        </div>
      </div>
    </div>
  )
}


// 护理措施模块
const FormMeasures = props => {
  const {preventivesmeasure,Diseaseclassification} = props;
  const retpreventivesmeasure = getvalueof_preventivesmeasure(preventivesmeasure,Diseaseclassification);
  let elements = [];
  const CRenderItem = (props)=>{
    const {vo,index} = props;
    if(!!vo.options && vo.options.length > 0){
      const CRenderPreventivesmeasureItemOptionsArrayoption = (props)=>{
        const {info:vs} = props;
        if(vs.value !== undefined){
          return  (
          <div className = "center-y" key={ index }>
            {vs.name}<input type="text"  value={vo.value} readOnly/>
          </div>);
        }

        return (<RenderCheckboxTitleFirst checked={vs.checked} value={vs.name} />);

      }

      const CRenderPreventivesmeasureItemOptionsArray = (props)=>{
        const {options} = props;
        let trsz = [];
        for(let i = 0 ;i < options.length ;i++){
          trsz.push(<CRenderPreventivesmeasureItemOptionsArrayoption info={options[i]} key={`pmoption${i}`}/>);
        }
        return trsz;
      }
      return (
        <div className = "center-y" key={ index }>
          <RenderCheckBox checked={true} />{vo.name}
  				<CRenderPreventivesmeasureItemOptionsArray options={vo.options} />
        </div>)
    }
    if(vo.value !== undefined){
      return  (
      <div className = "center-y" key={ index }>
          {vo.name}<input type="text"  value={vo.value} readOnly/>
      </div>);
    }
    return (
      <RenderCheckboxTableCenterY key={ index } checked = { vo.checked } value={ vo.name } />
    );
  }
  lodashmap( retpreventivesmeasure,( element, index ) => {
    elements.push(<CRenderItem vo={element} key={index} index={index}/>);
  });
  let title = '护理措施:';
  if(Diseaseclassification === '难免压疮' || Diseaseclassification === '院内压疮'){
    title = '预防措施:';
  }
  return (
    <div className = "form-measures column">
      <div>{title}</div>
      { elements }
    </div>
  )
}

// 压疮部位观察模块
const FormObservation = props => {
  let count = 0;
  let elements = [];
  lodashmap( props.listObj,( element, index ) => {
    elements.push(
      <div className = "no-content" key={ index }>
        <div className = "flex-1">{ lodashget( element, '部位', '' ) }</div>
        <div className = "flex-1">{ lodashget( element, '分期', '' ) }</div>
        <div className = "flex-2">{ lodashget( element, '大小', '') }</div>
        <div className = "flex-3">{ lodashget( element, '情况', '') }</div>
      </div>
    )
    count = index
  })
  while ( ++count < 4 )
  {
    elements.push(
      <div className = "no-content" key={ count }>
        <div className = "flex-1"></div>
        <div className = "flex-1"></div>
        <div className = "flex-2"></div>
        <div className = "flex-3"></div>
      </div>
    )
  }
  return (
    <div className = "form-observation column">
      <div  className = "no-content">
        <div className = "flex-1">部位</div>
        <div className = "flex-1">分期</div>
        <div className = "flex-2">大小</div>
        <div className = "flex-3">情况</div>
      </div>
      { elements }
    </div>
  )
}

// 难免情况模块====必备条件和选择条件
const UnavoidableOptions = props => {
  const {conditions} = props;
  const prerequisites = lodashget(conditions,'prerequisites',[]);
  const alternative = lodashget(conditions,'alternative',[]);

  let optionsLeft   =  [];    // 左el组
  let optionsRight  = [];   // 右el组

  lodashmap(prerequisites,( element, index ) => {
    optionsLeft.push(
      <RenderCheckboxTableCenterY value={ element.name } key={index} checked={ element.checked } />
    )
  })
  lodashmap(alternative,( element, index ) => {
    optionsRight.push(
      <RenderCheckboxTableCenterY value={ element.name } key={index} checked={ element.checked } />
    )
  })

  let blankcount = alternative.length - prerequisites.length;
  let optionsblank = blankcount > 0?optionsLeft:optionsRight;
  if(blankcount < 0){
    blankcount = -blankcount;
  }
  for(let i = 0;i < blankcount; i++){
    optionsblank.push(<div className = "center-y" key = { `blank${i}` }>
      &nbsp;
      </div>);
  }

  return (
    <div className = "form-unavoidable">
      <div className = "column flex-1">
        { optionsLeft }
      </div>
      <div className = "column flex-1">
        { optionsRight }
      </div>
    </div>
  )
}

// 院内情况模块====必备条件和选择条件
const NosocomialOptions = props => {
  const {conditions} = props;
  const prerequisites = lodashget(conditions,'prerequisites',[]);
  const alternative = lodashget(conditions,'alternative',[]);
  let optionsLeft   =  [];    // 左el组
  let  optionsRight  = [];   // 右el组

  lodashmap(prerequisites,( element, index ) => {
    optionsLeft.push(
    <RenderCheckboxTableCenterY value={ element.name } key={index} checked={ element.checked } />
    )
  })
  lodashmap(alternative,( element, index ) => {
    optionsRight.push(
    <RenderCheckboxTableCenterY value={ element.name } key={index} checked={ element.checked } />
    )
  })

  let blankcount = alternative.length - prerequisites.length;
  let optionsblank = blankcount > 0?optionsLeft:optionsRight;
  if(blankcount < 0){
    blankcount = -blankcount;
  }
  for(let i = 0;i < blankcount; i++){
    optionsblank.push(<div className = "center-y" key = { `blank${i}` }>
      &nbsp;
      </div>);
  }
  return (
    <div className = "form-nosocomial">
      <div className = "column flex-1">
        { optionsLeft }
      </div>
      <div className = "column flex-1">
        { optionsRight }
      </div>
    </div>
  );
}

// 入院情况模块===患者存在以下情况
const PrehospitalOptions = props => {
  const {admissions} = props;
  let options = [];

  let optionsLeft   =  [];    // 左el组
  let optionsRight  = [];   // 右el组
  for(let j = 0 ;j < admissions.length; j++){
    const v = admissions[j];
    options = (j<admissions.length/2)?optionsLeft:optionsRight;
    options.push(
      <RenderCheckboxTableCenterY value={ v.name } key={j} checked={ v.checked } />
    );
  }

  if(options.length % 2 === 1){
    optionsRight.push(<div className = "center-y" key = { options.length }></div>);
  }


  return (
    <div className = "form-prehospital">
      <div className = "column flex-1">
        { optionsLeft }
      </div>
      <div className = "column flex-1">
        { optionsRight }
      </div>
    </div>
  )
}

// 申请表公共头部
const FormHeader = props => {
  const
    { curpaientinfo, db,Diseaseclassification } = props,
    { depats, beds }      = db,
    Bedname               = lodashget( beds, `${curpaientinfo.bedid}.Bedname`, '' ),
    Depatname             = lodashget( depats, `${curpaientinfo.depatid}.Depatname` , '' ),
    momentin              = moment( curpaientinfo.In_date );

  return (
    <div className = "form-header column">
      <div className = "form-title center-x">
        { props.Hospitalname }{ Diseaseclassification }申报表
      </div>
      <div className = "form-abstract column">
        <div>
          <div className = "flex-1"><span>科室：</span><span>{ Depatname }</span></div>
          <div className = "flex-2 in-date">
            <span>入院日期：</span>
            <span>{ momentin.format('YYYY') }</span>年
            <span>{ momentin.format('MM') }</span>月
            <span>{ momentin.format('DD') }</span>日
            <span>{ momentin.format('HH') }</span>:
            <span>{ momentin.format('mm') }</span>
          </div>
          <div className = "flex-1"><span>床号：</span><span>{Bedname}</span></div>
        </div>
        <div>
          <div className = "flex-1"><span>姓名：</span><span>{ lodashget( curpaientinfo, 'Patientname', '' ) }</span></div>
          <div className = "flex-1"><span>性别：</span><span>{ lodashget( curpaientinfo, 'SexString', '男' ) }</span></div>
          <div className = "flex-1"><span>年龄：</span><span>{ lodashget( curpaientinfo, 'Age', '') }</span></div>
          <div className = "flex-1"><span>住院号：</span><span>{ lodashget( curpaientinfo, 'Patientno', '') }</span></div>
        </div>
      </div>
    </div>
  )
}

// ======院前压疮申报表=======
const FormPrehospital = (props) => {
  const {Hospitalname,curpaientinfo,db,info,Diseaseclassification} = props;
  let MYY_signed_nurse_time = '';
  let MMM_signed_nurse_time = '';
  let MDD_signed_nurse_time = '';
  let MHH_signed_nurse_time = '';
  let Mmm_signed_nurse_time = '';

  let MYY_signed_report_time = '';
  let MMM_signed_report_time = '';
  let MDD_signed_report_time = '';
  let MHH_signed_report_time = '';
  let Mmm_signed_report_time = '';


  const signed_nurse_time = lodashget(info,'signed_nurse_time');
  if(!!signed_nurse_time){
    const momenttime = moment(signed_nurse_time);
    MYY_signed_nurse_time = momenttime.format('YYYY');
    MMM_signed_nurse_time = momenttime.format('MM');
    MDD_signed_nurse_time = momenttime.format('DD');
    MHH_signed_nurse_time = momenttime.format('HH');
    Mmm_signed_nurse_time = momenttime.format('mm');
  }

  const signed_report_time = lodashget(info,'signed_report_time');
  if(!!signed_report_time){
    const momenttime = moment(signed_report_time);
    MYY_signed_report_time = momenttime.format('YYYY');
    MMM_signed_report_time = momenttime.format('MM');
    MDD_signed_report_time = momenttime.format('DD');
    MHH_signed_report_time = momenttime.format('HH');
    Mmm_signed_report_time = momenttime.format('mm');
  }

  const lapsetooptions_isok_checked = lodashget(info,'lapseto.lapsetooptions.isok_checked',-1);
  return (
    <div className = "form-page" >
      <div className = "column">
        <FormHeader
          Hospitalname  = { Hospitalname }
          curpaientinfo = { curpaientinfo }
          db            = { db }
          Diseaseclassification = {Diseaseclassification}
        />
        <div className = "form-body column">
          <div>
            <div className = "flex-1 center">诊断：</div>
            <div className = "flex-3 center">{lodashget(info,'diagnosis','')}</div>
            <div className = "flex-1 center">压疮来源：</div>
            <div className = "flex-3 center">{lodashget(info,'wsffrom','')}</div>
          </div>
          <div>
            <div className = "flex-1 center">压疮评分</div>
            <div className = "flex-1 center">{lodashget(info,'evaluatebardenscore','') }分</div>
          </div>
          <div className = "content center-x">入院时存在以下情况</div>
          <PrehospitalOptions admissions = { lodashget(info,'admissions',[]) } />
          <FormObservation listObj = { lodashget(info,'evaluateWoundsurfaces',[]) } />
          <FormMeasures preventivesmeasure = { lodashget(info,'preventivesmeasure',[]) }
            Diseaseclassification={curpaientinfo.Diseaseclassification}/>
        </div>
        <div className = "form-sign column">
          <div>
            <div className = "flex-1 center">申报人</div>
            <div className = "flex-2 center">{ lodashget(db,`users.${info.signed_headnurse}.Staffname`,'') }</div>
            <div className = "flex-1 center">申报日期</div>
            <div className = "flex-2 center">
              <span>{MYY_signed_nurse_time}</span>年
              <span>{MMM_signed_nurse_time}</span>月
              <span>{MDD_signed_nurse_time}</span>日
              <span>{MHH_signed_nurse_time}</span>:
              <span>{Mmm_signed_nurse_time}</span>
            </div>
          </div>
          <div>
            <div className = "flex-1 center">护士长签名</div>
            <div className = "flex-5 center">{ lodashget(db,`users.${info.signed_headnurse}.Staffname`,'') }</div>
          </div>
          <div>
            <div className = "flex-1 center">护士长意见</div>
            <div className = "flex-5 center">{lodashget(info,'signed_headnurse_instruction','')}</div>
          </div>
        </div>
        <FormSign db={db} info={info} Diseaseclassification={curpaientinfo.Diseaseclassification}/>
        <div className="lapse-to">
          <div className="flex-2 center">转归情况：</div>
          <div className="flex-4 center">
            <RenderCheckboxTitle value="愈合"  checked={lapsetooptions_isok_checked === 0}/>
            <RenderCheckboxTitle value="好转"  checked={lapsetooptions_isok_checked === 1}/>
            <RenderCheckboxTitle value="未愈"  checked={lapsetooptions_isok_checked === 2}/>
          </div>
          <div className="flex-2 center">填报人：</div>
          <div className="flex-2 center">{ lodashget(db,`users.${info.signed_report}.Staffname`,'') }</div>
          <div className="flex-5 center">
            日期：
            <span>{MYY_signed_report_time}</span>年
            <span>{MMM_signed_report_time}</span>月
            <span>{MDD_signed_report_time}</span>日
            <span>{MHH_signed_report_time}</span>:
            <span>{Mmm_signed_report_time}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ====院内压疮申报表 ====
const FormNosocomial = props => {
  const {Hospitalname,curpaientinfo,db,info,Diseaseclassification} = props;
  let MYY_signed_nurse_time = '';
  let MMM_signed_nurse_time = '';
  let MDD_signed_nurse_time = '';
  let MHH_signed_nurse_time = '';
  let Mmm_signed_nurse_time = '';
  const signed_nurse_time = lodashget(info,'signed_nurse_time');
  if(!!signed_nurse_time){
    const momenttime = moment(signed_nurse_time);
    MYY_signed_nurse_time = momenttime.format('YYYY');
    MMM_signed_nurse_time = momenttime.format('MM');
    MDD_signed_nurse_time = momenttime.format('DD');
    MHH_signed_nurse_time = momenttime.format('HH');
    Mmm_signed_nurse_time = momenttime.format('mm');
  }

  let MYY_signed_headnurse_time = '';
  let MMM_signed_headnurse_time = '';
  let MDD_signed_headnurse_time = '';
  let MHH_signed_headnurse_time = '';
  let Mmm_signed_headnurse_time = '';
  const signed_headnurse_time = lodashget(info,'signed_headnurse_time');
  if(!!signed_nurse_time){
    const momenttime = moment(signed_headnurse_time);
    MYY_signed_headnurse_time = momenttime.format('YYYY');
    MMM_signed_headnurse_time = momenttime.format('MM');
    MDD_signed_headnurse_time = momenttime.format('DD');
    MHH_signed_headnurse_time = momenttime.format('HH');
    Mmm_signed_headnurse_time = momenttime.format('mm');
  }



  let MYY_signed_report_time = '';
  let MMM_signed_report_time = '';
  let MDD_signed_report_time = '';
  let MHH_signed_report_time = '';
  let Mmm_signed_report_time = '';
  const signed_report_time = lodashget(info,'signed_report_time');
  if(!!signed_report_time){
    const momenttime = moment(signed_report_time);
    MYY_signed_report_time = momenttime.format('YYYY');
    MMM_signed_report_time = momenttime.format('MM');
    MDD_signed_report_time = momenttime.format('DD');
    MHH_signed_report_time = momenttime.format('HH');
    Mmm_signed_report_time = momenttime.format('mm');
  }


  let MYY_istonmtime = '';
  let MMM_istonmtime= '';
  let MDD_istonmtime= '';
  let MHH_istonmtime = '';
  let Mmm_istonmtime = '';
  const istonmtime = lodashget(info,'tonm.istonmtime');
  if(!!istonmtime && istonmtime!== ''){
    const momenttime = moment(istonmtime);
    MYY_istonmtime= momenttime.format('YYYY');
    MMM_istonmtime = momenttime.format('MM');
    MDD_istonmtime = momenttime.format('DD');
    MHH_istonmtime = momenttime.format('HH');
    Mmm_istonmtime = momenttime.format('mm');
  }

  const tonm_istonm = lodashget(info,'tonm.istonm',false);
  const lapsetooptions_isok_checked = lodashget(info,'lapseto.lapsetooptions.isok_checked',-1);
  return (
    <div className = "form-page" >
      <div className = "column">
        <FormHeader
          Diseaseclassification = {Diseaseclassification}
          Hospitalname  = { Hospitalname }
          curpaientinfo = { curpaientinfo }
          db            = { db }
        />
        <div className = "form-body column">
          <div>
            <div className = "flex-1 center">诊断：</div>
            <div className = "flex-3 center">{lodashget(info,'diagnosis','')}</div>
          </div>
          <div>
            <div className = "flex-1 center">压疮评分</div>
            <div className = "flex-1 center">{lodashget(info,'evaluatebardenscore','') }分</div>
            <div className = "flex-1 center">发生日期</div>
            <div className = "flex-1 center"></div>
          </div>

          <div>
            <div className = "flex-1 center">必备条件和选择条件</div>
          </div>
          <div>
            <div className = "flex-1 center">必备条件：强迫体位需要严格限制造成强迫体位的原因</div>
            <div className = "flex-1 center">可选择条件</div>
          </div>
          <NosocomialOptions conditions = { lodashget(info,'conditions',{}) } />
          <div className = "form-sign column">
            <div>
              <div className = "flex-1 center">是否申报难免压疮</div>
              <div className = "flex-2 center">
                <RenderCheckboxTitle value="是"  checked={tonm_istonm}/>
                <RenderCheckboxTitle value="否"  checked={!tonm_istonm}/>
              </div>
              <div className = "flex-1 center">申报时间</div>
              <div className = "flex-2 center">
                <span>{MYY_istonmtime}</span>年
                <span>{MMM_istonmtime}</span>月
                <span>{MDD_istonmtime}</span>日
                <span>{MHH_istonmtime}</span>:
                <span>{Mmm_istonmtime}</span>
              </div>
            </div>
          </div>
          <div className = "center">患者存在以下情况</div>
          <PrehospitalOptions admissions = { lodashget(info,'admissions',[]) } />
          <FormObservation listObj = { lodashget(info,'evaluateWoundsurfaces',[]) }/>
          <FormMeasures preventivesmeasure = { lodashget(info,'preventivesmeasure',[]) }
            Diseaseclassification={curpaientinfo.Diseaseclassification}/>
        </div>
        <div className = "form-sign column">
          <div>
            <div className = "flex-1 center">申报人</div>
            <div className = "flex-2 center">{ lodashget(props.db,`users.${props.info.signed_nurse}.Staffname`,'') }</div>
            <div className = "flex-1 center">申报日期</div>
            <div className = "flex-2 center">
              <span>{MYY_signed_nurse_time}</span>年
              <span>{MMM_signed_nurse_time}</span>月
              <span>{MDD_signed_nurse_time}</span>日
              <span>{MHH_signed_nurse_time}</span>:
              <span>{Mmm_signed_nurse_time}</span>
            </div>
          </div>
          <div>
            <div className = "flex-1 center">护士长签名</div>
            <div className = "flex-2">{ lodashget(props.db,`users.${props.info.signed_headnurse}.Staffname`,'') }</div>
            <div className = "flex-1 center">签名日期</div>
            <div className = "flex-2 center">
              <span>{MYY_signed_headnurse_time}</span>年
              <span>{MMM_signed_headnurse_time}</span>月
              <span>{MDD_signed_headnurse_time}</span>日
              <span>{MHH_signed_headnurse_time}</span>:
              <span>{Mmm_signed_headnurse_time}</span>
            </div>
          </div>
        </div>
        <FormSign db={db} info={info} Diseaseclassification={curpaientinfo.Diseaseclassification}/>
        <div className="lapse-to">
          <div className="flex-2 center">转归情况：</div>
          <div className="flex-4 center">
            <RenderCheckboxTitle value="愈合"  checked={lapsetooptions_isok_checked === 0}/>
            <RenderCheckboxTitle value="好转"  checked={lapsetooptions_isok_checked === 1}/>
            <RenderCheckboxTitle value="未愈"  checked={lapsetooptions_isok_checked === 2}/>
            </div>
          <div className="flex-2 center">填报人：</div>
          <div className="flex-2 center">{ lodashget(db,`users.${info.signed_report}.Staffname`,'') }</div>
          <div className="flex-5 center">
            日期：
            <span>{MYY_signed_report_time}</span>年
            <span>{MMM_signed_report_time}</span>月
            <span>{MDD_signed_report_time}</span>日
            <span>{MHH_signed_report_time}</span>:
            <span>{Mmm_signed_report_time}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 难免压疮申报表
const FormUnavoidable = props => {
  const {db,info,curpaientinfo,Diseaseclassification} = props;
  let MYY_signed_nurse_time = '';
  let MMM_signed_nurse_time = '';
  let MDD_signed_nurse_time = '';
  let MHH_signed_nurse_time = '';
  let Mmm_signed_nurse_time = '';
  const signed_nurse_time = lodashget(info,'signed_nurse_time');
  if(!!signed_nurse_time){
    const momenttime = moment(signed_nurse_time);
    MYY_signed_nurse_time = momenttime.format('YYYY');
    MMM_signed_nurse_time = momenttime.format('MM');
    MDD_signed_nurse_time = momenttime.format('DD');
    MHH_signed_nurse_time = momenttime.format('HH');
    Mmm_signed_nurse_time = momenttime.format('mm');
  }



  let MYY_signed_report_time = '';
  let MMM_signed_report_time = '';
  let MDD_signed_report_time = '';
  let MHH_signed_report_time = '';
  let Mmm_signed_report_time = '';
  const signed_report_time = lodashget(info,'signed_report_time');
  if(!!signed_report_time){
    const momenttime = moment(signed_report_time);
    MYY_signed_report_time = momenttime.format('YYYY');
    MMM_signed_report_time = momenttime.format('MM');
    MDD_signed_report_time = momenttime.format('DD');
    MHH_signed_report_time = momenttime.format('HH');
    Mmm_signed_report_time = momenttime.format('mm');
  }

  const ispressuresores = lodashget(info,'lapseto.ispressuresores',-1);
  const occuredpressuresorestime = lodashget(info,'lapseto.occuredpressuresorestime');
  let MYY_occuredpressuresorestime = '';
  let MMM_occuredpressuresorestime = '';
  let MDD_occuredpressuresorestime = '';
  let MHH_occuredpressuresorestime = '';
  let Mmm_occuredpressuresorestime = '';

  if(!!occuredpressuresorestime && occuredpressuresorestime !== ''){
    const momenttime = moment(occuredpressuresorestime);
    MYY_occuredpressuresorestime = momenttime.format('YYYY');
    MMM_occuredpressuresorestime = momenttime.format('MM');
    MDD_occuredpressuresorestime = momenttime.format('DD');
    MHH_occuredpressuresorestime = momenttime.format('HH');
    Mmm_occuredpressuresorestime = momenttime.format('mm');
  }

  const checkout_checked = lodashget(info,'lapseto.lapsetooptions.checkout_checked',false);
  const death_checked = lodashget(info,'lapseto.lapsetooptions.death_checked',false);

  return (
    <div className = "form-page" >
      <div className = "column">
        <FormHeader
          Hospitalname  = { props.Hospitalname }
          curpaientinfo = { props.curpaientinfo }
          db            = { props.db }
          Diseaseclassification= {Diseaseclassification}
        />
        <div className = "form-body column">
          <div>
            <div className = "flex-1 center">诊断：</div>
            <div className = "flex-3 center">{lodashget(info,'diagnosis','')}</div>
          </div>
          <div>
            <div className = "flex-1 center">压疮评分</div>
            <div className = "flex-1 center">{lodashget(info,'evaluatebardenscore','') }分</div>
          </div>
          <div>
            <div className = "flex-1 center">必备条件和选择条件</div>
          </div>
          <div>
            <div className = "flex-1 center">必备条件：强迫体位需要严格限制造成强迫体位的原因</div>
            <div className = "flex-1 center">可选择条件</div>
          </div>
          <UnavoidableOptions conditions = { lodashget(info,'conditions',{})  } />
          <FormMeasures preventivesmeasure = { lodashget(info,'preventivesmeasure',[]) }
            Diseaseclassification={curpaientinfo.Diseaseclassification}/>
        </div>
        <div className = "form-sign column">
          <div>
            <div className = "flex-1 center">申报人</div>
            <div className = "flex-2 center">{ lodashget(props.db,`users.${props.info.signed_headnurse}.Staffname`,'') }</div>
            <div className = "flex-1 center">申报日期</div>
            <div className = "flex-2 center">
              <span>{MYY_signed_nurse_time}</span>年
              <span>{MMM_signed_nurse_time}</span>月
              <span>{MDD_signed_nurse_time}</span>日
              <span>{MHH_signed_nurse_time}</span>:
              <span>{Mmm_signed_nurse_time}</span>
            </div>
          </div>
          <div>
            <div className = "flex-1 center">护士长签字</div>
            <div className = "flex-5 center">{ lodashget(props.db,`users.${props.info.signed_headnurse}.Staffname`,'') }</div>
          </div>
        </div>
        <FormSign db={db} info={info} Diseaseclassification={curpaientinfo.Diseaseclassification}/>
        <div className="lapse-to column">
          <div>
            <div className="flex-1">转归情况：</div>
          </div>
          <div>
            <div className="flex-1">1.是否发生压疮</div>
            <div className="flex-2">
              <RenderCheckboxTitle value="否"  checked={ispressuresores===0}/>
              <RenderCheckboxTitle value="是"  checked={ispressuresores===1}/>
            </div>
            <div className="flex-1">发生时间</div>
            <div className="flex-2">
              <span>{MYY_occuredpressuresorestime}</span>年
              <span>{MMM_occuredpressuresorestime}</span>月
              <span>{MDD_occuredpressuresorestime}</span>日
              <span>{MHH_occuredpressuresorestime}</span>:
              <span>{Mmm_occuredpressuresorestime}</span>
            </div>
          </div>
          <div>
            <div className="flex-1">2.患者去向</div>
            <div className="flex-2">
              <RenderCheckboxTitle value="出院/转院"  checked={checkout_checked}/>
              <RenderCheckboxTitle value="死亡"  checked={death_checked}/>
            </div>
            <div className="flex-3"></div>
          </div>
          <div>
            <div className="flex-1">上报人</div>
            <div className="flex-2">{ lodashget(db,`users.${info.signed_report}.Staffname`,'') }</div>
            <div className="flex-1">日期</div>
            <div className="flex-2">
              <span>{MYY_signed_report_time}</span>年
              <span>{MMM_signed_report_time}</span>月
              <span>{MDD_signed_report_time}</span>日
              <span>{MHH_signed_report_time}</span>:
              <span>{Mmm_signed_report_time}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// const FormBarden = props => {
//
//   return (
//     <div className = "form-page" >
//       <div className = "column">
//         <FormHeader
//           Hospitalname  = { props.Hospitalname }
//           curpaientinfo = { props.curpaientinfo }
//           db            = { props.db }
//         />
//       </div>
//     </div>
//   )
// }
//


export {
  FormPrehospital,
  FormNosocomial,
  FormUnavoidable,
  // FormBarden
}
