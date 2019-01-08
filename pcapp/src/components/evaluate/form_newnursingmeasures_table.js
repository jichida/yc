import React from 'react';
import { Field,FieldArray, reduxForm, Form  } from 'redux-form';
// import lodashget from 'lodash.get';

import './form_tamplate_style.styl';
// import { connect } from 'react-redux';
// import lodashmap from 'lodash.map';
// import lodashget from 'lodash.get';
// import lodashset from 'lodash.set';

const style_nursing_record_td = {
    padding: '2px 5px',
    height: '35px',
    border: '1px solid #000',
    borderLeft: '0px',
    borderBottom: '0px',
  };

  const style_nursing_record_td_white = {
    backgroundColor:'#fff',
    textAlign: 'left'
  };

  // const style_nursing_record_tdlast = {
  //   borderRight:'0px'
  // };

  const style_nursing_record_tr2n = {
    backgroundColor:'#f9f9f9'
  };

  // const style_trdate = {
  //   backgroundColor:'#e4f3f1'
  // };

  const stylefont = {
    color:'#0084bf',
    fontSize: '18px',
    fontWeight: '500'
  };

  // const style_input = {
  //   background: 'inherit',
  //   border: 'none',
  //   borderBottom: '1px solid #000',
  //   height: '16px',
  //   display: 'inline-block',
  //   verticalAlign: 'middle',
  //   marginRight: '10px'
  // }

  const stylewhite = {...style_nursing_record_td,...style_nursing_record_td_white};

/*
nursingmeasures:[
{
  groupname:'全 身 治 疗',
  options:[
  {
    name:'积极治疗原发病',
    checked:false,
  },
  {
    name:'增加营养',
    checked:false,
  },
  ]
}
]
*/

const renderOptionname = (props)=>{
  const {input:{value:vo,onChange}} = props;
  const onChangeOne = (checked)=>{
    onChange({
      name:vo.name,
      checked
    });
  }
  return (
    <React.Fragment>
      <td style={style_nursing_record_td}>{vo.name}</td>
      <td style={style_nursing_record_td} align="center"
        onClick={()=>{
            onChangeOne(!vo.checked);
          }}>
        { vo.checked && <font style={stylefont}>√</font> }
      </td>
    </React.Fragment>
    );
}

const renderGroupname = (props)=>{
  const {input:{value:groupname}} = props;
  return <span>{groupname}</span>
}

/*
const renderSubFields_Options = (vg, indexg, fields) => {
  const styletr = indexg%2 === 1?style_nursing_record_tr2n:{};
  return (
    <tr style={styletr} key={indexg}>
      { indexg===0 && <td style={stylewhite} rowSpan={`${rowspancount}`}>{nursingmeasuretmpl.groupname}</td> }
      <td style={style_nursing_record_td}>{tmp_option.name}</td>
      <td style={style_nursing_record_td} align="center" key={id}>
          {ischecked && <font style={stylefont}>√</font>}
      </td>
    </tr>
  )

  <Field component={renderOptionname} name={vg} key={indexg}/>
}
*/

const renderOptions = (props)=>{
  const {fields, groupname} = props;
  return (
    fields.map((vg, indexg, fields) => {
      const styletr = indexg%2 === 1?style_nursing_record_tr2n:{};
      const rowspancount = fields.length;
      return (
        <tr style={styletr} key={indexg}>
          { indexg===0 && <td style={stylewhite} rowSpan={`${rowspancount}`}><Field name={groupname} component={renderGroupname} /></td> }
          <Field name={vg} component={renderOptionname} />
        </tr>
      );
    })
  );
}

const renderSubFields_Item = (vg, indexg, fields) => {
  return (
      <FieldArray name={`${vg}.options`} component={renderOptions} groupname={`${vg}.groupname`} key={`${vg}${indexg}`} />
    );
}

const renderCZ = (props)=>{
  const {fields} = props;
  return (
    <table className="flex-1" width="100%"  style={{backgroundColor: '#fff'}}>
      <tbody>
          <tr >
              <td style={style_nursing_record_td} colSpan="2" >请在采取的护理措施项目内打“<font style={stylefont}>√</font>”</td>
              <td style={{...style_nursing_record_td, textAlign:'center'}}>护理记录</td>
          </tr>
          {
            fields.map(renderSubFields_Item)
          }
      </tbody>
    </table>
  );
}


class PageForm extends React.Component {
  render() {
    const { handleSubmit,onClickSubmit, } = this.props;

    return (
      <Form
          onSubmit={handleSubmit(onClickSubmit)}
          >
            <div className = "form-page" style={{height:'auto'}} >
                <div className = "column">
                    <div className = "form-header column">
                        <div className = "form-title center-x">
                            护理措施表
                        </div>
                    </div>
                    <FieldArray name="nursingmeasures" component={renderCZ} />
                    <div style={{flex:1, display:'flex', alignItems: 'center', justifyContent:'center'}}>
                      <button className="ant-btn-edit blue white">提交措施</button>
                    </div>
              </div>
            </div>
            <div className="mt40">

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
    //
    // PageForm = reduxForm({
    //     form: 'NewnursingmeasuresForm',
    //     initialValues:getdefaultnursingmeasures()
    // })(PageForm);
    //
    // export default PageForm;
