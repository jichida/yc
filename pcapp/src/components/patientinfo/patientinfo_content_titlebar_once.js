import React from 'react';

const ContentTitleBar = (props)=>{
  const {title,titleSign,titleNew,titleView,onClickNew,onClickViewPrint,
     isHaveMeasure,onClickSign, curMeasureInfo, onClickEdit} = props;
  return (<div className="lapseto">
    <span>{title}</span>
    {
      !isHaveMeasure && !!onClickNew &&  (<button  onClick={
            ()=>{
              onClickNew();
            }
          } className="ant-btn"><img src="add.png" alt=""/>
          {titleNew}</button>)
    }
    {
        isHaveMeasure && !!onClickEdit && (<button onClick={
            ()=>{
                onClickEdit(curMeasureInfo);
            }
        } className="ant-btn"><img src="edit.png" alt=""/>编辑今日护理措施</button>)
    }
    {
      !!onClickSign &&  (<button  onClick={
            ()=>{
              onClickSign();
            }
          } className="ant-btn"><img src="edit.png" alt=""/>
          {titleSign}</button>)
    }
    {
      !!onClickViewPrint && (
        <button onClick={
          ()=>{
            onClickViewPrint();
          }
        } className="ant-btn"><img src="printing.png"  alt=""/>{titleView}</button>
      )
    }

  </div>);
}

export default ContentTitleBar;
