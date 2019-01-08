import React from 'react';
import { Field,FieldArray, reduxForm, Form  } from 'redux-form';
// import { connect } from 'react-redux';
// import lodashmap from 'lodash.map';
// import lodashget from 'lodash.get';
// import lodashset from 'lodash.set';


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
  if(vo.checked){
    return (<td className="blue" onClick={
      ()=>{
        onChangeOne(false);
      }
    }>{vo.name}</td>);
  }
  return (<td onClick={
    ()=>{
      onChangeOne(true);
    }
  }>{vo.name}</td>);
}

const renderGroupname = (props)=>{
  const {input:{value:groupname}} = props;
  return <span>{groupname}</span>
}


const renderSubFields_Options = (vg, indexg, fields) => {
  return <Field component={renderOptionname} name={vg} key={indexg}/>
}

const renderOptions = (props)=>{
  const {fields} = props;
  return fields.map(renderSubFields_Options);
}

const renderSubFields_Item = (vg, indexg, fields) => {
  return (
    <tr key={indexg}>
    <td className="black font-weight"> <Field name={`${vg}.groupname`} component={renderGroupname} /></td>
       <FieldArray name={`${vg}.options`} component={renderOptions}/>
    </tr>);

}

const renderCZ = (props)=>{
  const {fields} = props;
  return (
    <table>
      <tbody>
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
            <div className="wound-surface">
              <div className="wound-surface-form">
                <FieldArray
                    name="nursingmeasures"
                    component={renderCZ} />
              </div>
            </div>
            <div className="mt40">
              <button className="ant-btn-edit blue white">提交措施</button>
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
