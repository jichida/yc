import React from 'react';
import { FieldArray,Field, reduxForm, Form  } from 'redux-form';
// import { connect } from 'react-redux';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import {ImageInputUploadArray} from './imageuploadarray';
const default_woundsurfaces = {
    '分期':{
      label:'',
      value:0,
    },
    '部位':{
      label:'',
      value:0,
      lr:'',
    },
    '创面大小':{
      '长':0,
      '宽':0,
      '深':0,
      '潜行':'',
      '窦道':'',
      '颜色':'',
      '渗液量':''
    },
    'urlpics':[]//照片列表
};
// evaluateWoundsurfaces:[
//   {
//     '分期':{
//       label:String,
//       value:Number,
//     },
//     '部位':{
//       label:String,
//       value:Number,
//       lr:String,
//     },
//     '创面大小':{
//       '长':Number,
//       '宽':Number,
//       '深':Number,
//       '潜行':String,
//       '窦道':String,
//       '颜色':String,
//       '渗液量':String
//     }
//   }
// ],
/*
labelsz=[{
  label:'一期',
  value:1
},
{
label:'二期',
value:2
},
{
label:'三期',
value:3
},
{
label:'四期',
value:4
},
{
label:'可疑深部组织损伤',
value:5
},
{
label:'不能分期',
value:6,
colspan:2
},
]
*/
const renderFQ = (props)=>{
  const {input:{value,onChange},labelsz,labeltitle} = props;
  const onChangeSel = ({label,value})=>{
    // const fieldname = `${wf}['分期']`;
    // let v = {};
    //   v[fieldname] = {
    //     label,
    //     value
    // };
    onChange({
        label,
        value
    });
  }
  let tdc = [];
  lodashmap(labelsz,(v,index)=>{
    if(!!v.colspan){
      if(v.value === value.value){
        tdc.push(<td className="blue" colSpan="2" key={index}>{v.label}</td>)
      }
      else{
        tdc.push(<td key={index} colSpan="2" onClick={()=>{
          onChangeSel(v)
        }}>{v.label}</td>);
      }
      return;
    }
    if(v.value === value.value){
      tdc.push(<td className="blue" key={index}>{v.label}</td>)
    }
    else{
      tdc.push(<td key={index} onClick={()=>{
        onChangeSel(v)
      }}>{v.label}</td>);
    }
  });
  return (
    <tr>
      <td className="black font-weight">{labeltitle}</td>
      {tdc}
    </tr>
  )
}

const renderBW = (props)=>{
  const {input:{value,onChange}} = props;
  const onChangeSel = ({label,value,lr})=>{
    // const fieldname = `${wf}['部位']`;
    // let v = {};
    //   v[fieldname] = {
    //     label,
    //     value,
    //     lr
    // };
    onChange({
      label,
      value,
      lr
    });
  }
  const td0data = [
    {
      label:'枕部',
      value:1,
    },
    {
      label:'耳廓',
      lr:true,
      value:2,
    },
    {
      label:'鼻梁',
      value:3,
    },
    {
      label:'棘突',
      value:4,
    },
    {
      label:'肩峰',
      lr:true,
      value:5,
    },
    {
      label:'肩胛部',
      lr:true,
      colspan:2,
      value:6,
    },
  ];

  const td1data = [
    {
      label:'手肘部',
      value:7,
      lr:true,
    },
    {
      label:'髂嵴',
      lr:true,
      value:8,
    },
    {
      label:'髋部',
      value:9,
      lr:true,
    },
    {
      label:'骶尾部',
      value:10,
    },
    {
      label:'坐骨结节',
      lr:true,
      value:11,
      colspan:2,
    },
  ];
  const td2data = [
    {
      label:'膝部',
      value:12,
      lr:true,
    },
    {
      label:'踝部',
      lr:true,
      value:13,
    },
    {
      label:'足跟',
      value:14,
    },
    {
      label:'足趾',
      value:15,
    },
    {
      label:'',
      value:16,
    }
  ];

  const getoC = (td0data)=>{
    let td0C = [];
    lodashmap(td0data,(v)=>{
      const colspan = lodashget(v,'colspan',1);
      if(v.value === value.value){
        //选中状态
        if(v.lr){
          //含有左右的
          let cell0;
          if(value.lr === '左'){
            cell0 = <span className='blue'>（左）{v.label}</span>;
          }
          else{
            cell0 = <span onClick={()=>{
              onChangeSel({label:v.vlabel,value:v.value,lr:'左'})
            }}>（左）</span>;

          }

          let cell1;
          if(value.lr === '右'){
            cell1 = <span className='blue'>{v.label}（右）</span>;
          }
          else{
            cell1 = <span onClick={()=>{
              onChangeSel({label:v.vlabel,value:v.value,lr:'右'})
            }}>（右）</span>;
          }
          td0C.push(<td key={v.value} colSpan={colspan}>{cell0}{cell1}</td>)
        }
        else{
          if(v.value === 16){
            td0C.push(<td key={v.value} className='blue' colSpan={2}>
               <span>其他：</span><input type='text' value={value.label}
                onChange={(e)=>{
                 onChangeSel({label:e.target.value,value:v.value})
               }} />
            </td>);
          }
          else{
            td0C.push(<td key={v.value} className='blue'>
              {v.label}
            </td>);
          }
        }
      }
      else{
        //未选中
        if(v.lr){
          //含有左右的
          const cell0 = <span onClick={()=>{
            onChangeSel({label:v.label,value:v.value,lr:'左'})
          }}>（左）</span>;

          const cell1 = <span onClick={()=>{
            onChangeSel({label:v.label,value:v.value,lr:'右'})
          }}>（右）</span>;

          td0C.push(<td key={v.value} colSpan={colspan}>
            {cell0}{v.label}{cell1}
          </td>)
        }
        else{
          if(v.value === 16){
            td0C.push(<td key={v.value}  colSpan={2}>
               <span>其他：</span><input type='text' onChange={(e)=>{
                 onChangeSel({label:e.target.value,value:v.value})
               }} />
            </td>);
          }
          else{
            td0C.push(<td key={v.value} colSpan={colspan} onClick={()=>{
              onChangeSel({label:v.label,value:v.value})
            }}>
              {v.label}
            </td>);
          }
        }
      }
    });
    return td0C;
  }

  const td0C = getoC(td0data);
  const td1C = getoC(td1data);
  const td2C = getoC(td2data);
  return [
    <tr key={0}>
      <td className="black font-weight">部位</td>
      {td0C}
    </tr>,
    <tr key={1}>
      <td className="black font-weight"></td>
      {td1C}
    </tr>,
    <tr key={2}>
      <td className="black font-weight"></td>
      {td2C}
    </tr>
  ];
}

const Woundsurfaces = (props)=>{
  const {wf,index,onClickRemove} = props;
  return (
      <div className="wound-surface">
        <h4><span>创面{index+1}</span>
          <button type="button" className="return" onClick={
            ()=>{
              onClickRemove(index);
            }
          }><img src="close-blue.png" alt="" />
        </button>
          <div className="clearfix"></div>
        </h4>
        <div className="wound-surface-form">
          <table>
            <tbody>
              <Field
                  name={`${wf}.分期`}
                  id="fq"
                  component={renderFQ}
                  labeltitle="项目"
                  labelsz={[{
                    label:'一期',
                    value:1
                  },{
                    label:'二期',
                    value:2
                  },{
                    label:'三期',
                    value:3
                  },{
                    label:'四期',
                    value:4
                  },
                  {
                  label:'可疑深部组织损伤',
                  value:5
                  },
                  {
                  label:'不能分期',
                  value:6,
                  colspan:2
                  }]}
              />
              <Field
                  name={`${wf}.部位`}
                  id="fq"
                  component={renderBW}
                />
            <tr>
              <td className="black font-weight">大小</td>
              <td>长：<Field name={`${wf}.创面大小.长`} component="input" type="number"/>cm</td>
              <td>宽：<Field name={`${wf}.创面大小.宽`} component="input" type="number"/>cm</td>
              <td>深：<Field name={`${wf}.创面大小.深`} component="input" type="number"/>cm</td>
              <td>潜行：<Field name={`${wf}.创面大小.潜行`} component="input"  type="text"/></td>
              <td>窦道：<Field name={`${wf}.创面大小.窦道`} component="input"  type="text"/></td>
              <td>颜色：<Field name={`${wf}.创面大小.颜色`} component="input"   type="text"/></td>
              <td>渗液量：<Field name={`${wf}.创面大小.渗液量`} component="input"  type="text"/></td>
            </tr>
            </tbody>
          </table>

          {/* 为解决表格中上传多张图导致的表格布局异常，这里将图片上传组件移动至表格外 */}
          <div className="upload-pic">
            <div className="black font-weight">照片</div>
            <div><ImageInputUploadArray source={`${wf}.urlpics`} label="照片"/></div>
          </div>
        </div>
      </div>
    );

}

const renderWoundsurfaces = ({ fields, meta: { touched, error, submitFailed } }) => {

  const onClickRemove =(index)=>{
    fields.remove(index);
  }

  return (
    <div>
      {
        fields.map((wf,index)=>{
          return <Woundsurfaces key={index} wf={wf} index={index} onClickRemove={onClickRemove}/>
        })
      }
      <div className="lapseto mt20">
        <button type="button" onClick={() => fields.push(default_woundsurfaces)}>
          <img src="add-blue.png" alt="" />添加新创面</button>
      </div>
    </div>
  );

}


class PageForm extends React.Component {
  render() {
    const { handleSubmit,onClickSubmit} = this.props;
    return (
      <Form
          onSubmit={handleSubmit(onClickSubmit)}
          >
            <FieldArray name="evaluateWoundsurfaces" component={renderWoundsurfaces} />
            <div className="mt40">
              <button className="ant-btn-edit blue white">提交评估</button>
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
    //     form: 'NewwoundsurfaceForm',
    //     initialValues:{
    //       evaluateWoundsurfaces:[]
    //     }
    // })(PageForm);
    //
    // export default PageForm;
