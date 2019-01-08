import React from 'react';
// import lodashget from 'lodash.get';
// import moment from 'moment';

const InfoNorecords = (props)=>{
  const {btntitle,onClickNew} = props;
  const title = !!onClickNew?'暂无记录,点击这里新建':'请等待护士新建记录';
  return (<div className="lapseto center">
    <p>{title}</p>
    {
      !!onClickNew &&  (<button  onClick={
            ()=>{
              onClickNew();
            }
          } className="ant-btn"><img src="add.png" alt=""/>新建
          {btntitle}</button>)
    }
  </div>);

}

export default InfoNorecords;
