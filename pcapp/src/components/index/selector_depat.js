import React from 'react';
// import { Menu, Dropdown, Button, Icon, } from 'antd';
import Select from 'react-select';
import lodashmap from 'lodash.map';
// import lodashget from 'lodash.get';

const DepatSelect = ( props ) => {

  const { onChangeDepat, db, curdepatid } = props;
  const onChange = ( newvalue ) => {
    if( !!onChangeDepat ) {
      onChangeDepat( newvalue );
    }
  }
  const {depats} = db;
  let options = [];
  options.push({
    label:'所有科室',
    value:'0'
  });
  lodashmap( depats, ( depat ) => {
    options.push({
      label:`${depat.Depatname}`,
      value:`${depat._id}`
    });
  });

  return (<Select
            id="state-select"
            autoFocus
            options={options}
            simpleValue
            name="selected-state"
            value={curdepatid}
            onChange={onChange}
            clearable={false}
            searchable={false}
          />);
  // let menus = [];
  //
  // menus.push( <Menu.Item key = "0">所有科室</Menu.Item> );
  //
  // lodashmap( depats, ( depat ) => {
  //   menus.push(
  //     <Menu.Item key = {`${depat._id}`}>
  //       {`${depat.Depatname}`}
  //     </Menu.Item>
  //   );
  // });
  //
  // const menu = (
  //   <Menu onClick = { handleMenuClick }>
  //     { menus }
  //   </Menu>
  // );
  //
  // let curdepatname = '所有科室';
  //
  // if( curdepatid !== '0' ) {
  //   curdepatname = lodashget( depats, `${curdepatid}.Depatname`, curdepatname );
  // }
  //
  // return (
  //   <Dropdown overlay={menu}>
  //     <Button>
  //         { curdepatname }<Icon type = "down" />
  //     </Button>
  //   </Dropdown>
  // );
}

export default DepatSelect;
