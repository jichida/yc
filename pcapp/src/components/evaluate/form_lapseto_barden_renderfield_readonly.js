import React from 'react';
import lodashget from 'lodash.get';
import moment from 'moment';


const style_choose_info_td = {
  padding:'10px 15px',
  fontSize: '14px',
  width:'50%',
  borderRight:'1px solid #ddd'
}

const style_choose_info_td_w50 = {
  ...style_choose_info_td,
  width:'10%'
};

const style_choose_info_td_w25 = {
  ...style_choose_info_td,
  width:'25%'
};


// const style_choose_info_td_w50_input = {
//   background: 'transparent!important',
//   border: 'transparent!important',
//   borderBottom: '1px solid #646464!important',
//   textAlign: 'center',
//   height: '16px',
//   display: 'inline-block',
//   verticalAlign: 'middle',
//   marginRight: '10px',
//   width:'10%',
// };

const style_input = {
  background: 'inherit',
  border: 'none',
  borderBottom: '1px solid #000',
  height: '16px',
  display: 'inline-block',
  verticalAlign: 'middle',
  marginRight: '10px'
}

const style_w50_input = {
  ...style_input,
  textAlign: 'center',
  width: '10%',
}

const style_choose_info_tr = {
  borderTop:'1px solid #ddd',
  lineHeight: '20px',
  borderRight:'1px solid #ddd'
};

const style_choose_info_tr_whitebg = {
  borderTop:'1px solid #ddd',
  lineHeight: '20px',
  borderRight:'1px solid #ddd',
  backgroundColor: '#FFFFFF',
};

const style_choose_info_tr_odd = {...style_choose_info_tr,
background:'#fff'};


const style_choose_info_tr_gray = {...style_choose_info_tr,
   color:'#888',
   fontSize: '13px',
   borderRight: '0px'
};

const style_choose_info_td_vatop = {
    ...style_choose_info_td,
    verticalAlign: 'top',
    padding:'0px !important'
};

const style_choose_info_tr_graytitle = {
  ...style_choose_info_tr_gray,
   borderRight: '0px'
};

const style_choose_info_tr_bluetitle = {
  ...style_choose_info_tr_gray,
   color:'#0084bf!important',
};

const CRenderConditionsprerequisitesoptions = (props)=>{
  const {info} = props;
  const v = info;
  return (<tr style={style_choose_info_tr}><td style={style_choose_info_td}>
    <input type="checkbox" name="check[]" checked={v.checked} readOnly/>{v.name}</td></tr>);
}


const CRenderConditionsalternativeoptions = (props)=>{
  const {info} = props;

  const v = info;
  return (<tr style={style_choose_info_tr}><td style={style_choose_info_td}>
    <input type="checkbox" name="check[]" checked={v.checked} readOnly/>{v.name}</td></tr>);
}

const CRenderConditionsprerequisites = (props) => {
  const {info} = props;
	let trsz = [];
	for(let i = 0 ;i < info.length ;i++){
		trsz.push(<CRenderConditionsprerequisitesoptions info={info[i]} key={`p${i}`}/>);
	}
  return trsz;
}

const CRenderConditionsalternative = (props) => {
	const {info} = props;
	let trsz = [];
	for(let i = 0 ;i < info.length ;i++){
		trsz.push(<CRenderConditionsalternativeoptions info={info[i]} key={`a${i}`} />);
	}
	return trsz;
}


const CRenderConditions = (props)=>{
    const {prerequisites,alternative} = props.conditions;
    if(!prerequisites || !alternative){
      return [];
    }

    const retc = [
      <tr style={style_choose_info_tr_odd} key='canda'>
        <td style={style_choose_info_td}>必备条件和选择条件</td>
        <td style={style_choose_info_td}></td>
      </tr>,
      <tr style={style_choose_info_tr_gray} key='canda2'>
        <td style={style_choose_info_td}>必备条件：强迫体位需要严格限制造成强迫体位的原因</td>
        <td style={style_choose_info_td}>
          可选择条件
        </td>
      </tr>,
      <tr style={style_choose_info_tr_gray} key='canda3'>
        <td style={style_choose_info_td_vatop}>
          <table style={{textAlign:'left'}}>
            <tbody>
							<CRenderConditionsprerequisites info={prerequisites} />
            </tbody>
          </table>
        </td>
        <td style={style_choose_info_td_vatop}>
          <table style={{textAlign:'left'}}>
            <tbody>
							<CRenderConditionsalternative info={alternative} />
            </tbody>
          </table>
        </td>
      </tr>
    ];
    return retc;
}

const CRenderPreventivesmeasureItemOptionsArrayoption = (props)=>{
  const {info:vs} = props;

  if(vs.value !== undefined){
    return (<span >{vs.name}
      <input type="text" style={style_input} className=""  value={vs.value}  readOnly/></span>);
  }
  return (<span>{vs.name}<input type="checkbox" name="check[]" checked={vs.checked}
  readOnly/></span>);
}


const CRenderPreventivesmeasureItemOptionsArray = (props)=>{
  const {options} = props;
	let trsz = [];
	for(let i = 0 ;i < options.length ;i++){
		trsz.push(<CRenderPreventivesmeasureItemOptionsArrayoption info={options[i]} key={`pmoption${i}`}/>);
	}
  return trsz;
};

const CRenderPreventivesmeasureItem = (props)=>{
  const {info:vo, index} = props;
  if(!!vo.options && vo.options.length>0){
    return (
    <tr style={style_choose_info_tr}>
      <td style={style_choose_info_td} colSpan="2">
        <input type="checkbox" name="check[]" readOnly/>{vo.name}
				<CRenderPreventivesmeasureItemOptionsArray options={vo.options} />
      </td>
    </tr>)
  }
  if(vo.value !== undefined){
    return  (
    <tr style={style_choose_info_tr}><td style={style_choose_info_td} colSpan="2">
      <input type="checkbox" name="check[]" checked={vo.checked} readOnly />
        {vo.name}<input type="text" style={style_input} value={vo.value} readOnly/>
      </td>
    </tr>);
  }

  return (
  <tr style={index%2===0?style_choose_info_tr:style_choose_info_tr_whitebg}>
    <td style={style_choose_info_td} colSpan="2"><input type="checkbox" name="check[]" checked={vo.checked} readOnly/>
      {vo.name}
    </td>
  </tr>);
}



const CRenderPreventivesmeasure = (props)=>{
  const {preventivesmeasure} = props;
	let trsz = [];
	for(let i = 0 ;i < preventivesmeasure.length ;i ++){
		trsz.push(<CRenderPreventivesmeasureItem key={`pm${i}`} index={i} info={preventivesmeasure[i]}/>);
	}
  return trsz;
}

const CRenderScore = (props)=>{
  const {evaluatebardenscore} = props;
  return (<div>{evaluatebardenscore}分</div>);
}

const CRenderLapseto= (props)=>{
  const {lapseto} = props;
  const {ispressuresores,//是否发生压疮
    // occuredpressuresorestime,//压疮发生时间
    lapsetooptions} = lapseto;

  let trsz = [];
  trsz.push(<tr style={style_choose_info_tr_bluetitle} key="title">
      <td  style={style_choose_info_td}  colSpan="2">转归情况：</td>
    </tr>);

  trsz.push(
  <tr  style={style_choose_info_tr} key="title2">
    <td style={style_choose_info_td}>
      <span>1、是否发生压疮：</span>
      <span>是<input type="checkbox" name="check[]" checked={ispressuresores===1} readOnly/></span>
      <span>否<input type="checkbox" name="check[]" checked={ispressuresores===0} readOnly/></span>
    </td>
    <td style={style_choose_info_td_w50}>压疮发生时间：
      <input style={{...style_w50_input, width: '7%'}} type="text" readOnly/>年
      <input style={{...style_w50_input, width: '7%'}} type="text" readOnly/>月
      <input style={{...style_w50_input, width: '7%'}} type="text" readOnly/>日
      <input style={{...style_w50_input, width: '7%'}} type="text" readOnly/>:
      <input  style={{...style_w50_input, width: '7%'}} type="text" readOnly/>
    </td>
  </tr>);

  trsz.push(
  <tr  style={style_choose_info_tr} key="title3">
    <td style={style_choose_info_td} colSpan="2">
      <span>2、患者去向：</span>
      <span>出院/转院<input type="checkbox" name="check[]" checked={lapsetooptions.checkout_checked} readOnly/></span>
      <span>死亡<input type="checkbox" name="check[]" checked={lapsetooptions.death_checked} readOnly/></span>
    </td>
  </tr>);
  return trsz;
}

const CRenderInstruction= (props)=>{
  const {isunavoidablepressureulcer,instruction} = props;

  let trsz = [];
  trsz.push(<tr style={style_choose_info_tr_graytitle} key="title">
    <td style={style_choose_info_td} colSpan="2">主管部门审核与指导意见</td>
  </tr>);

  trsz.push(<tr style={style_choose_info_tr} key="in">
      <td style={style_choose_info_td} colSpan="2">
        <span>符合难免压疮申报的条件：</span>
        <span>是<input type="checkbox" name="check[]" checked={isunavoidablepressureulcer} readOnly/></span>
        <span>否<input type="checkbox" name="check[]" checked={!isunavoidablepressureulcer} readOnly/></span>
      </td>
    </tr>);

    trsz.push(<tr style={style_choose_info_tr} key="guide">
        <td style={style_choose_info_td} colSpan="2">指导意见：<input type="text" style={style_input} value={instruction} readOnly/></td>
      </tr>);

  return trsz;
}


//--------


const CRenderAdmissions = (props)=>{
  const {admissions} = props;

  let options = [];
  let retc = [];
  for(let j = 0 ;j < admissions.length; j++){
    const v = admissions[j];
    options.push(<td style={style_choose_info_td}><input type="checkbox" name="check[]" checked={v.checked} readOnly/> {v.name}</td>);
  }

  if(options.length % 2 === 1){
    options.push(<td style={style_choose_info_td} key='ad'></td>);
  }

  const halflength = options.length/2;
  for(let i = 0 ;i < halflength; i++){
    retc.push(<tr style={style_choose_info_tr} key={`options${i}`}>
      {options[i]}
      {options[halflength+i]}
    </tr>)
  }

  return retc;
}


const CRenderEvaluateWoundsurfaces =  (props)=>{
  const {evaluateWoundsurfaces} = props;
  let trsz = [];
  for(let i = 0 ;i < evaluateWoundsurfaces.length ; i++){
    const value = evaluateWoundsurfaces[i];
    trsz.push(
      <tr style={i%2===0?style_choose_info_tr:style_choose_info_tr_whitebg} key={`trewfs${i}`}>
        <td style={style_choose_info_td_w25} key="tdwf0">{lodashget(value,'部位','')}</td>
        <td style={style_choose_info_td_w25} key="tdwf1">{lodashget(value,'分期','')}</td>
        <td style={style_choose_info_td_w25} key="tdwf2">{lodashget(value,'大小','')}</td>
        <td style={style_choose_info_td_w25} key="tdwf3">{lodashget(value,'情况','')}</td>
      </tr>
    );
  }
  return trsz;
}


const CRenderUserSignedNurse= (props)=>{
  const {signed_nurse,signed_nurse_time,db} = props;
  let Staffname = lodashget(db,`users.${signed_nurse}.Staffname`,'');
  let MYY = '';
  let MMM = '';
  let MDD = '';
  let MHH = '';
  let Mmm = '';

  const time_input_value = signed_nurse_time;
  if(!!time_input_value && time_input_value!==''){
    const momenttime = moment(time_input_value);
    MYY = momenttime.format('YYYY');
    MMM = momenttime.format('MM');
    MDD = momenttime.format('DD');
    MHH = momenttime.format('HH');
    Mmm = momenttime.format('mm');

  }
  let Co = (<tr style={style_choose_info_tr}>
      <td style={style_choose_info_td}>申报人签字：<input type="text" style={style_input} readOnly value={Staffname}/></td>
      <td style={style_choose_info_td_w50}>申报时间：
          <input style={style_w50_input} type="text" readOnly value={MYY}/>年
          <input style={style_w50_input} type="text" readOnly value={MMM}/>月
          <input style={style_w50_input} type="text" readOnly value={MDD}/>日
          <input style={style_w50_input} type="text" readOnly value={MHH}/>:
          <input style={style_w50_input} type="text" readOnly value={Mmm}/>
      </td>
    </tr>);

  return Co;
}


const CRenderUserSignedHeadNurse= (props)=>{

  const {signed_headnurse,signed_headnurse_time,db} = props;
  let Staffname = lodashget(db,`users.${signed_headnurse}.Staffname`,'');
  let MYY = '';
  let MMM = '';
  let MDD = '';
  let MHH = '';
  let Mmm = '';

  const time_input_value = signed_headnurse_time;
  if(!!time_input_value && time_input_value!== ''){
    const momenttime = moment(time_input_value);
    MYY = momenttime.format('YYYY');
    MMM = momenttime.format('MM');
    MDD = momenttime.format('DD');
    MHH = momenttime.format('HH');
    Mmm = momenttime.format('mm');

  }
  let Co = (<tr style={style_choose_info_tr}>
      <td style={style_choose_info_td}>护士长签字：<input type="text" style={style_input} readOnly value={Staffname}/></td>
      <td style={style_choose_info_td_w50}>日期：
          <input style={style_w50_input} type="text" readOnly value={MYY}/>年
          <input style={style_w50_input} type="text" readOnly value={MMM}/>月
          <input style={style_w50_input} type="text" readOnly value={MDD}/>日
          <input style={style_w50_input} type="text" readOnly value={MHH}/>:
          <input style={style_w50_input} type="text" readOnly value={Mmm}/>
      </td>
    </tr>);

  return Co;
}


const CRenderUserSignedNursingDepartment= (fields)=>{
  const {signed_nursingdepartment,signed_nursingdepartment_time,db} = fields;

  let Staffname = lodashget(db,`users.${signed_nursingdepartment}.Staffname`,'');
  let MYY = '';
  let MMM = '';
  let MDD = '';
  let MHH = '';
  let Mmm = '';

  const time_input_value = signed_nursingdepartment_time;
  if(!!time_input_value && time_input_value!== ''){
    const momenttime = moment(time_input_value);
    MYY = momenttime.format('YYYY');
    MMM = momenttime.format('MM');
    MDD = momenttime.format('DD');
    MHH = momenttime.format('HH');
    Mmm = momenttime.format('mm');

  }
  let Co = (<tr style={style_choose_info_tr}>
      <td style={style_choose_info_td}>主管部门签字：<input type="text" style={style_input} readOnly value={Staffname}/></td>
      <td style={style_choose_info_td_w50}>日期：
          <input style={style_w50_input} type="text" readOnly value={MYY}/>年
          <input style={style_w50_input} type="text" readOnly value={MMM}/>月
          <input style={style_w50_input} type="text" readOnly value={MDD}/>日
          <input style={style_w50_input} type="text" readOnly value={MHH}/>:
          <input style={style_w50_input} type="text" readOnly value={Mmm}/>
      </td>
    </tr>);

  return Co;
}


const CRenderUserReport= (props)=>{
  const {signed_report,signed_report_time,db} = props;

  let Staffname = lodashget(db,`users.${signed_report}.Staffname`,'');
  let MYY = '';
  let MMM = '';
  let MDD = '';
  let MHH = '';
  let Mmm = '';

  const time_input_value = signed_report_time;
  if(!!time_input_value && time_input_value!== ''){
    const momenttime = moment(time_input_value);
    MYY = momenttime.format('YYYY');
    MMM = momenttime.format('MM');
    MDD = momenttime.format('DD');
    MHH = momenttime.format('HH');
    Mmm = momenttime.format('mm');

  }
  let Co = (<tr style={style_choose_info_tr}>
      <td style={style_choose_info_td}>上报人签字:<input type="text" style={style_input} readOnly value={Staffname}/></td>
      <td style={style_choose_info_td_w50}>日期：
          <input style={style_w50_input} type="text" readOnly value={MYY}/>年
          <input style={style_w50_input} type="text" readOnly value={MMM}/>月
          <input style={style_w50_input} type="text" readOnly value={MDD}/>日
          <input style={style_w50_input} type="text" readOnly value={MHH}/>:
          <input style={style_w50_input} type="text" readOnly value={Mmm}/>
      </td>
    </tr>);

  return Co;
}


export {
  CRenderConditionsprerequisitesoptions,
  CRenderConditionsalternativeoptions,
  CRenderConditionsprerequisites,
  CRenderConditionsalternative,
  CRenderConditions,
  CRenderPreventivesmeasureItemOptionsArrayoption,
  CRenderPreventivesmeasureItemOptionsArray,
  CRenderPreventivesmeasureItem,
  CRenderPreventivesmeasure,
  CRenderScore,
  CRenderLapseto,
  CRenderInstruction,
  CRenderAdmissions,
  CRenderEvaluateWoundsurfaces,
  CRenderUserSignedNurse,
  CRenderUserSignedHeadNurse,
  CRenderUserSignedNursingDepartment,
  CRenderUserReport
};
