import React from 'react';
// import { notification, Icon, Button } from 'antd';
// import { Menu, Dropdown, Button, Icon, } from 'antd';
import Select from 'react-select';
// import moment from 'moment';
import { DatePicker } from 'antd';
import cnLocale from 'antd/lib/date-picker/locale/zh_CN.js';

//https://github.com/fkhadra/react-toastify
import { Modal } from 'antd';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';

const confirm = Modal.confirm;


const popConfirmSign = (initmoment,callback)=>{

    confirm({
        title: '确定需要签名吗,请选择签名日期?',
        content: <div>
            <DatePicker
                allowClear={false}
                locale={cnLocale}
                defaultValue={initmoment}
                format="YYYY-MM-DD HH:mm:ss"
                showTime
                onChange={(date, dateString)=>{
                    initmoment = date;
                }}
            />
        </div>,
        okText:'确认',
        cancelText:'取消',
        okType:'Default',
        onOk() {
            console.log(`curdate-->${initmoment.format('YYYY-MM-DD HH:mm:ss')}--->OK`)
            callback(initmoment);
        },
        onCancel() {
            console.log(`curdate-->${initmoment.format('YYYY-MM-DD HH:mm:ss')}--->cancel`)
		    },
    });
};

const popConfirmSign2 = (callback)=>{
  confirm({
      title: '确定需要签名吗?',
      content: <div>
        签名后,可以查看打印
      </div>,
      okText:'确认',
      cancelText:'取消',
      okType:'Default',
      onOk() {
          callback();
      },
      onCancel() {
      },
  });
}

const popConfirmBack = (callback)=>{
  confirm({
      title: '确定是否需要回退?',
      content: <div>
        回退后,当前签名失效,会将状态回复到签名前的状态
      </div>,
      okText:'确认',
      cancelText:'取消',
      okType:'Default',
      onOk() {
          callback();
      },
      onCancel() {
      },
  });
}


const popConfirmTonm = (initmoment,callback)=>{

    confirm({
        title: '确定需要申报难免压疮吗?请选择申报日期',
        content: <div>
            <DatePicker
                allowClear={false}
                locale={cnLocale}
                defaultValue={initmoment}
                format="YYYY-MM-DD HH:mm:ss"
                showTime
                onChange={(date, dateString)=>{
                    initmoment = date;
                }}
            />
        </div>,
        okText:'确认',
        cancelText:'取消',
        okType:'Default',
        onOk() {
            console.log(`curdate-->${initmoment.format('YYYY-MM-DD HH:mm:ss')}--->OK`)
            callback(initmoment);
        },
        onCancel() {
            console.log(`curdate-->${initmoment.format('YYYY-MM-DD HH:mm:ss')}--->cancel`)
		    },
    });
};

const popConfirmTonmBack = (callback)=>{
  confirm({
      title: '确定取消申报?',
      content: <div>
        取消后,会将状态回复到未申报状态
      </div>,
      okText:'确认',
      cancelText:'取消',
      okType:'Default',
      onOk() {
          callback();
      },
      onCancel() {
      },
  });
}


let wsvalue;
class SelectWs extends React.Component {

		constructor(props) {
				super(props);
				this.state = {
					selvalue:'0'
				}
		}
    onChange = (newvalue)=>{
      const {db} = this.props;
      const evaluateWoundsurfaces =  lodashget(db,`evaluatewoundsurfaces.${newvalue}.evaluateWoundsurfaces`,[]);
      // const title =`${lodashget(db,`evaluatewoundsurfaces.${key}.created_at`)}-创面个数:${evaluateWoundsurfaces.length}`;
      this.setState({selvalue:newvalue});
      wsvalue = evaluateWoundsurfaces;
    }

    render(){
      const {evaluatewoundsurfacelist,db} = this.props;


      let options = [];
      lodashmap(evaluatewoundsurfacelist,(wid)=>{
        const evaluateWoundsurfaces =  lodashget(db,`evaluatewoundsurfaces.${wid}.evaluateWoundsurfaces`,[]);
        options.push(
          {
            value:`${wid}`,
            label:lodashget(db,`evaluatewoundsurfaces.${wid}.created_at`)+`创面个数:${evaluateWoundsurfaces.length}`
          }
        );
      });

      return (<Select
      					id="state-select"
      					autoFocus
      					options={options}
      					simpleValue
      					name="selected-state"
      					value={this.state.selvalue}
      					onChange={this.onChange.bind(this)}
                clearable={false}
                searchable={false}
      				/>);
      // const menu = (
      //   <Menu onClick={this.handleMenuClick.bind(this)}>
      //     {menus}
      //   </Menu>
      // );
      // return (<Dropdown overlay={menu}>
      //     <Button style={{ marginLeft: 8 }}>
      //        {this.state.title}<Icon type="down" />
      //     </Button>
      //   </Dropdown>);
    }

}

const popConfirmSelectWs = ({evaluatewoundsurfacelist,db},callback)=>{

  confirm({
      title: '确定需要重新选择创面吗?',
      content: <div>
        <SelectWs evaluatewoundsurfacelist={evaluatewoundsurfacelist} db={db} />
      </div>,
      okText:'确认',
      cancelText:'取消',
      okType:'Default',
      onOk() {
          callback(wsvalue);
      },
      onCancel() {

      },
  });
}


export {popConfirmSign,popConfirmBack,popConfirmTonm,popConfirmTonmBack,popConfirmSelectWs,popConfirmSign2};
//
// class PopconfirmSign extends React.Component {
// 		constructor(props) {
// 				super(props);
// 				this.state = {
// 					singedtime:moment()
// 				}
// 		}
//
// 		componentDidMount(){
//
// 		}
//
// 		componentWillUnmount() {
//
// 		}
//
// 		showModal = () => {
// 			let curdate = moment();
// 			notification.open({
// 				placement: 'topLeft',
// 				duration:null,
// 		    message: '确定需要签名吗',
// 		    description: <div>
// 					<DatePicker
// 		        mode='time'
// 		        showTime
// 		        onChange={(date, dateString)=>{
// 							curdate = date;
// 						}}
// 		        onPanelChange={this.handlePanelChange}
// 		      />
// 				</div>,
// 		    icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
// 				onClose:()=>{
// 					console.log(`curdate-->${curdate.format('YYYY-MM-DD HH:mm:ss')}`)
// 					this.props.onConfirm(curdate);
// 				}
// 		  });
// 	  }
//
// 		render() {
// 			let MYY = '';
// 			let MMM = '';
// 			let MDD = '';
// 			let MHH = '';
// 			let Mmm = '';
// 			const Staffname = `张三`;
//
// 			const momenttime = moment();
// 			MYY = momenttime.format('YYYY');
// 			MMM = momenttime.format('MM');
// 			MDD = momenttime.format('DD');
// 			MHH = momenttime.format('HH');
// 			Mmm = momenttime.format('mm');
// 			return (
// 				<tr onClick={this.showModal}>
// 			      <td>主管部门签字：<input type="text" readOnly value={Staffname}/>
// 					  </td>
// 			      <td className="w-50">日期：
// 			          <input type="text" readOnly value={MYY}/>年
// 			          <input type="text" readOnly value={MMM}/>月
// 			          <input type="text" readOnly value={MDD}/>日
// 			          <input type="text" readOnly value={MHH}/>:
// 			          <input type="text" readOnly value={Mmm}/>
// 			      </td>
// 			    </tr>
// 						);
// 		}
//
// }
//
//
// export default PopconfirmSign;
