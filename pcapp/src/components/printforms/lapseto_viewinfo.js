import React            from 'react';
// import ViewPrintHeader  from './viewprint_header';
import {
  FormPrehospital,
  FormNosocomial,
  FormUnavoidable
} from './form_template.js';
// -------------------------------------------------
const ReviewDetailInfo = props => {

  const
    { Hospitalname, db, info,isformreviewlapsetoid2 } = props,
    curpaientinfo = db.paientinfos[ info.userpatientid ];
  let Diseaseclassification = curpaientinfo.Diseaseclassification;
  if(Diseaseclassification === '难免转院内'){
    Diseaseclassification = isformreviewlapsetoid2==='0'?'难免压疮':'院内压疮';
  }
  switch( Diseaseclassification )
  {
    case '院前压疮':
      return (
        <FormPrehospital
          Diseaseclassification = {Diseaseclassification}
          Hospitalname  = { Hospitalname }
          curpaientinfo = { curpaientinfo }
          db            = { db }
          info          = { info }
        />
      )
    case '院内压疮':
      return (
        <FormNosocomial
          Diseaseclassification = {Diseaseclassification}
          Hospitalname  = { Hospitalname }
          curpaientinfo = { curpaientinfo }
          db            = { db }
          info          = { info }
        />
      )
    case '难免压疮':
      return (
        <FormUnavoidable
          Diseaseclassification = {Diseaseclassification}
          Hospitalname  = { Hospitalname }
          curpaientinfo = { curpaientinfo }
          db            = { db }
          info          = { info }
        />
        )
    default:
      return (<div></div>);
  }
}

export default ReviewDetailInfo;
