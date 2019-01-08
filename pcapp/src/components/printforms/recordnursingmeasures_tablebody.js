import React from 'react';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';


import moment from 'moment';
import {getpagelist} from '../../util';

const style_nursing_record_td = {
  padding: '2px 5px',
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

const style_trdate = {
  backgroundColor:'#e4f3f1'
};

const stylefont = {
  color:'#0084bf',
  fontSize: '18px',
  fontWeight: '500'
};

const style_input = {
  background: 'inherit',
  border: 'none',
  borderBottom: '1px solid #000',
  height: '16px',
  display: 'inline-block',
  verticalAlign: 'middle',
  marginRight: '10px'
}

const stylewhite = {...style_nursing_record_td,...style_nursing_record_td_white};

class RecordNursingMeasuresTableBody extends React.Component {

      constructor(props) {
        super(props);
        const {isfirst,islast,retlist} = getpagelist(0,props.evaluatenursingmeasureslist,4);
        this.state = {
          current: 0,
          isfirst,
          islast,
          retlist
        };
      }
      PageNext = ()=>{
        const current = this.state.current + 1;
        const {isfirst,islast,retlist} = getpagelist(current,this.props.evaluatenursingmeasureslist,4);
        this.setState({
          current,
          isfirst,
          islast,
          retlist
        });
      }
      PagePrev = ()=>{
        const current = this.state.current - 1;
        const {isfirst,islast,retlist} = getpagelist(current,this.props.evaluatenursingmeasureslist,4);
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
            const {evaluatenursingmeasuress,users} = this.props.db;
            const {isfirst,islast,retlist} = this.state;

            let tabletrlist = [];
            let sample_nursingmeasures = [];
            if(retlist.length > 0){
              sample_nursingmeasures = evaluatenursingmeasuress[retlist[0]].nursingmeasures;
            }
            lodashmap(sample_nursingmeasures,(nursingmeasuretmpl,tmpl_index)=>{
              const rowspancount = nursingmeasuretmpl.options.length;
              lodashmap(nursingmeasuretmpl.options,(tmp_option,tmp_option_index)=>{
                const styletr = tmp_option_index%2 === 1?style_nursing_record_tr2n:{};
                if(tmp_option_index === 0){

                  tabletrlist.push(<tr style={styletr} key={`${tmpl_index}_${tmp_option_index}`}>
                      <td style={stylewhite} rowSpan={`${rowspancount}`}>{nursingmeasuretmpl.groupname}</td>
                      <td style={style_nursing_record_td}>{tmp_option.name}</td>
                      {
                        lodashmap(retlist,(id,index)=>{
                          const nursingmeasurerecordoptions = evaluatenursingmeasuress[id].nursingmeasures[tmpl_index].options;
                          const ischecked = nursingmeasurerecordoptions[tmp_option_index].checked;
                          return (
                            <td style={style_nursing_record_td} align="center" key={id}>
                              {ischecked && <font style={stylefont}>√</font>}
                            </td>
                          )
                        })
                      }
                    </tr>);
                }
                else{
                  tabletrlist.push(<tr style={styletr} key={`${tmpl_index}_${tmp_option_index}`}>
                    <td style={style_nursing_record_td}>{tmp_option.name}</td>
                    {
                      lodashmap(retlist,(id,index)=>{
                        const nursingmeasurerecordoptions = evaluatenursingmeasuress[id].nursingmeasures[tmpl_index].options;
                        const ischecked = nursingmeasurerecordoptions[tmp_option_index].checked;
                        return (
                          <td style={style_nursing_record_td} align="center" key={id}>
                            {ischecked && <font style={stylefont}>√</font>}
                          </td>
                        )
                      })
                    }
                  </tr>);
                }
              })

            });

            tabletrlist.push(<tr key={'000'}>
              <td style={style_nursing_record_td} colSpan="2" >其他</td>
              {
                lodashmap(retlist,(id,index)=>{
                  return (
                    <td style={style_nursing_record_td} key={id} align="center"></td>
                  )
                })
              }
            </tr>);
            const styletrdate = style_trdate;
            return (
              <table className="flex-1" width="100%"  style={{backgroundColor: '#fff'}}>
                <tbody>
                                  <tr >
                                    <td style={style_nursing_record_td} colSpan="2" rowSpan="2">请在采取的护理措施项目内打“<font style={stylefont}>√</font>”</td>
                                    <td style={style_nursing_record_td} colSpan={`${retlist.length}`}><div align="center">护理日期</div></td>
                                  </tr>
                                  <tr style={styletrdate}>
                                    {
                                      lodashmap(retlist,(eid,index)=>{
                                        const info = evaluatenursingmeasuress[eid];
                                        const styletddate = style_nursing_record_td;
                                        const curday = moment(info.updated_at).format('MM月DD日')
                                        if(index === 0){
                                          return (<td style={styletddate} key={index}><div align="center">{ !isfirst && <img src="arrow-left-green.png" alt="" onClick={
                                                  this.PagePrev
                                                }/>}{curday}</div></td>);
                                        }
                                        else if(index === retlist.length - 1){
                                            return (<td style={styletddate} key={index}><div align="center">{curday}
                                              {!islast && <img src="arrow-right-green.png" className="right" alt="" onClick={
                                                this.PageNext
                                              }/>}
                                            </div></td>);
                                        }
                                        else{
                                          return (<td style={styletddate} key={index}><div align="center">{curday}</div></td>);
                                        }

                                      })
                                    }
                                  </tr>


                                  {tabletrlist}

                                  <tr>
                                    <td style={style_nursing_record_td} colSpan="2">护士签名
                                    </td>
                                    {
                                      lodashmap(retlist,(id,index)=>{
                                        const usercreatorid = lodashget(evaluatenursingmeasuress[id],'usercreatorid','');
                                        const Staffname = lodashget(users,`${usercreatorid}.Staffname`,'');
                                        return (
                                          <td style={style_nursing_record_td} key={id} align="center">{Staffname}</td>
                                        )
                                      })
                                    }
                                   </tr>
                                   <tr>
                                     <td style={style_nursing_record_td} colSpan="2">护士长签名
                                     </td>
                                     {
                                       lodashmap(retlist,(id,index)=>{
                                         const evaluatenursingmeasuressignheadnurseid = lodashget(curpaientinfo,'evaluatenursingmeasuressignheadnurseid','');
                                         const Staffname = lodashget(users,`${evaluatenursingmeasuressignheadnurseid}.Staffname`,'');
                                         return (
                                           <td style={style_nursing_record_td} key={id} align="center">{Staffname}</td>
                                         )
                                       })
                                     }
                                    </tr>
                                  </tbody>
                                </table>)
      }

}

export default RecordNursingMeasuresTableBody;
