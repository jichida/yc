import React from 'react';
import RecordbardenTableBody from './recordbarden_tablebody';
import lodashget from 'lodash.get';
import './form_tamplate_style.styl'

const PrintForm_Barden = (props)=>{
  const {Hospitalname,Depatname,Bedname,evaluatebardenlist,curpaientinfo,db,momentin} = props;
  return (<div className = "form-page" >
      <div className = "column">
        <div className = "form-header column">
          <div className = "form-title center-x">
            { Hospitalname }压疮危险因素评估表
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
        <RecordbardenTableBody evaluatebardenlist={evaluatebardenlist} db={db} curpaientinfo={curpaientinfo}/>
      </div>
    </div>);
};

export default PrintForm_Barden;
