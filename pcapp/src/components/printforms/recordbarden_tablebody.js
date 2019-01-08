import React from 'react';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';

import moment from 'moment';
import {getpagelist,gettablebradengroups} from '../../util';

// const style_nursing_record_td = {
//   padding: '9px 10px',
//   border: '1px solid #ddd',
//   borderLeft: '0px',
//   borderBottom: '0px',
// };

// const style_nursing_record_td_white = {
//   backgroundColor:'#fff',
//   textAlign: 'left'
// };

// const style_input = {
//   background: '#f9f9f9',
//   borderTop: 'none',
//   borderLeft: 'none',
//   borderRight: 'none',
//   borderBottom:'1px solid #646464',
// }

// const style_nursing_record_tdlast = {
//   borderRight:'0px'
// };

// const style_nursing_record_tr2n = {
//   backgroundColor:'#f9f9f9',
// };

// const style_trdate = {
//   backgroundColor:'#e4f3f1'
// };

class RecordbardenTableBody extends React.Component {

      constructor(props) {
        super(props);
        const {isfirst,islast,retlist} = getpagelist(0,props.evaluatebardenlist,4);
        this.state = {
          current: 0,
          isfirst,
          islast,
          retlist
        };
      }
      PageNext = ()=>{
        const current = this.state.current + 1;
        const {isfirst,islast,retlist} = getpagelist(current,this.props.evaluatebardenlist,4);
        this.setState({
          current,
          isfirst,
          islast,
          retlist
        });
      }
      PagePrev = ()=>{
        const current = this.state.current - 1;
        const {isfirst,islast,retlist} = getpagelist(current,this.props.evaluatebardenlist,4);
        this.setState({
          current,
          isfirst,
          islast,
          retlist
        });
      }
  		componentDidMount(){

  		}

  		componentWillUnmount() {

  		}
      render() {
        const {curpaientinfo} = this.props;
        const {evaluatebardens,users,} = this.props.db;
        const {isfirst,islast,retlist} = this.state;
        const tablebradengroups = gettablebradengroups();
        let tabletrlist = [];

        // 少于4格时的补充
        let pushLength = retlist.length;
        for(let i=0; i < (4 - pushLength); i++){
          retlist.push('');
        }

        lodashmap(tablebradengroups,(tablegroup,gindex)=>{
          // const rowspancount = tablegroup.labelsz.length;
          const labelvalue = tablegroup.labelvalue;

          tabletrlist.push(
            <div className="item" key={gindex}>
              <div className="flex-1 center">{tablegroup.labeltitle}</div>
              <div className="flex-5 column">
              {
                lodashmap(tablegroup.labelsz,(vlabel,lindex)=>{
                  return (
                    <div key={lindex}>
                      <div className="flex-4 center">{vlabel.label}</div>
                      <div className="flex-4 center">{vlabel.value}</div>
                      {
                        lodashmap(retlist,(bid,index)=>{
                          const ischecked = lodashget(evaluatebardens[bid],labelvalue,0) === vlabel.value;
                          return (
                            <div className="flex-3 center" key={index}>
                              {ischecked && <span>{vlabel.value}</span>}
                            </div>
                          );
                        })
                      }
                    </div>
                  );
                })
              }
              </div>
            </div>
          )
        })

        // const styletrdate = style_trdate;

          return (
            <div className = "form-body flex-1 column">
              <div className="item-head">
                <div className="flex-1 center">项目</div>
                <div className="flex-1 center">具体指标</div>
                <div className="flex-1 center">评分数值</div>
                <div className="flex-3 column">
                  <div className="flex-1 center">实际得分（按照评估日期填写）</div>
                  <div className="flex-1">
                    {
                      lodashmap(retlist,(bid,index)=>{
                        const info = evaluatebardens[bid];
                        let curday = '';
                        if(!!info){
                          curday = moment(info.updated_at).format('MM月DD日')
                        }
                        console.log(info);

                        if(index === 0)
                        {
                          return (
                            <div className="flex-1 center" key={index}>
                              <div>{ !isfirst && <img src="arrow-left-green.png" alt="" onClick={ this.PagePrev }/>}{curday}</div>
                            </div>
                          );
                        }
                        else if(index === retlist.length - 1)
                        {
                          return (
                            <div className="flex-1 center" key={index}>
                              <div>{curday}{!islast && <img src="arrow-right-green.png" className="right" alt="" onClick={this.PageNext}/>}
                              </div>
                            </div>
                          );
                        }
                        else{
                          return (
                            <div className="flex-1 center" key={index}>
                              <div>{curday}</div>
                            </div>
                          );
                        }
                      })
                    }
                  </div>
                </div>
              </div>

              {tabletrlist}

              <div className="score">
                <div className="flex-1 center">总得分</div>
                <div className="flex-1" style={{'flexFlow': 'row'}}>
                {
                  lodashmap(retlist,(bid,index)=>{
                    const score = lodashget(evaluatebardens[bid],'score','');
                    // const styleborder = index === retlist.length-1?{ 'borderRight': '0px' }:{'borderRight':'1px solid #000'};
                    return (
                      <div className="flex-1 center" key={index}>
                        <font>
                          {score}
                        </font>
                      </div>
                    );
                  })
                }
                </div>
              </div>
              <div className="score">
                <div className="flex-1 center">评估护士签名</div>

                <div className="flex-1" style={{'flexFlow': 'row'}}>
                {
                  lodashmap(retlist,(bid,index)=>{
                    const usercreatorid = lodashget(evaluatebardens[bid],'usercreatorid','');
                    const Staffname = lodashget(users,`${usercreatorid}.Staffname`,'');
                    console.log(evaluatebardens[bid]);
                    // debugger;
                    // const styleborder = index === retlist.length-1?{ 'borderRight': '0px' }:{'borderRight':'1px solid #000'};
                    return (
                      <div className="flex-1 center" key={index}>
                        <font>
                          {Staffname}
                        </font>
                      </div>
                    );
                  })
                }
                </div>
              </div>
              <div className="score" style={{borderBottom: 0, flex: 1}}>
                <div className="flex-1 center">护士长签名</div>
                <div className="flex-1" style={{'flexFlow': 'row'}}>
                {
                  lodashmap(retlist,(bid,index)=>{
                    const evaluatebardensignheadnurseid = lodashget(curpaientinfo,'evaluatebardensignheadnurseid','');
                    const Staffname = lodashget(users,`${evaluatebardensignheadnurseid}.Staffname`,'');
                    // debugger;
                    // debugger;
                    // const styleborder = index === retlist.length-1?{ 'borderRight': '0px' }:{'borderRight':'1px solid #000'};
                    return (
                      <div className="flex-1 center" key={index}>
                        <font>
                          {index === 0 ? Staffname:''}
                        </font>
                      </div>
                    );
                  })
                }
                </div>
              </div>
          </div>
          );
        }

}

export default RecordbardenTableBody;
