import React from 'react';
// import { Menu, Dropdown, Button, Icon, } from 'antd';
import Select from 'react-select';
// import lodashmap from 'lodash.map';
// import lodashget from 'lodash.get';

const DiseaseclassificationSelector = (props)=>{
  const {input,Diseaseclassification} = props;
  const  onChange = (newvalue)=>{
    if(!!input.onChange){
      input.onChange(newvalue);
    }
  }

  let options = [];
  if(Diseaseclassification === '普通病人'){
    options.push({
      value:'普通病人',
      label:'普通病人'
    });
    options.push({
      value:'院前压疮',
      label:'院前压疮'
    });
    options.push({
      value:'院内压疮',
      label:'院内压疮'
    });
    options.push({
      value:'难免压疮',
      label:'难免压疮'
    });
  }
  else if(Diseaseclassification === '院前压疮'){
    options.push({
      value:'普通病人',
      label:'普通病人'
    });
    options.push({
      value:'院前压疮',
      label:'院前压疮'
    });
    // options.push(<Menu.Item key="普通病人">普通病人</Menu.Item>);
    // options.push(<Menu.Item key="院前压疮">院前压疮</Menu.Item>);
  }
  else if(Diseaseclassification === '院内压疮'){
    options.push({
      value:'普通病人',
      label:'普通病人'
    });
    options.push({
      value:'院内压疮',
      label:'院内压疮'
    });
    // options.push(<Menu.Item key="普通病人">普通病人</Menu.Item>);
    // options.push(<Menu.Item key="院内压疮">院内压疮</Menu.Item>);
  }
  else if(Diseaseclassification === '难免压疮'){
    options.push({
      value:'普通病人',
      label:'普通病人'
    });
    options.push({
      value:'难免压疮',
      label:'难免压疮'
    });
    options.push({
      value:'难免转院内',
      label:'难免转院内'
    });
    // options.push(<Menu.Item key="普通病人">普通病人</Menu.Item>);
    // options.push(<Menu.Item key="难免压疮">难免压疮</Menu.Item>);
    // options.push(<Menu.Item key="难免转院内">难免转院内</Menu.Item>);
  }
  else if(Diseaseclassification === '难免转院内'){
    options.push({
      value:'普通病人',
      label:'普通病人'
    });
    options.push({
      value:'难免压疮',
      label:'难免压疮'
    });
    options.push({
      value:'难免转院内',
      label:'难免转院内'
    });
    // options.push(<Menu.Item key="普通病人">普通病人</Menu.Item>);
    // options.push(<Menu.Item key="难免压疮">难免压疮</Menu.Item>);
    // options.push(<Menu.Item key="难免转院内">难免转院内</Menu.Item>);
  }
  return (<Select
  					id="state-select"
  					autoFocus
  					options={options}
  					simpleValue
  					name="selected-state"
  					value={input.value}
  					onChange={onChange}
            clearable={false}
            searchable={false}
  				/>);
  // const menu = (
  //   <Menu onClick={handleMenuClick}>
  //     {menus}
  //   </Menu>
  // );
  // let curname = input.value;
  // return (<Dropdown overlay={menu}>
  //   <Button style={{ marginLeft: 8 }}>
  //      {curname}<Icon type="down" />
  //   </Button>
  // </Dropdown>);
}


export default DiseaseclassificationSelector;
