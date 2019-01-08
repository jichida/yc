import React from 'react';
import ReactToPrint from "react-to-print";
import config from '../../env/config';

const ViewPrintTitltToPrint = (props)=>{
  const {title,refnode,history} = props;
  return (<h1 className="printing-title">
    <span>{title}</span>
    {
      !config.isandroid() &&
      <ReactToPrint  trigger={() => <span className="ant-btn"><img src="printing.png" alt="" />打印报表</span>}
          content={refnode}
        />
    }
    <button className="return" onClick={
      ()=>{
        history.goBack();
      }
    }><img src="return.png" alt=""/></button>
    <div className="clearfix"></div>
  </h1>);

}

export default ViewPrintTitltToPrint;
