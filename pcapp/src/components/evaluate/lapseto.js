import React from 'react';
import { connect } from 'react-redux';
import lodashget from 'lodash.get';
import ReviewDetailInfo from '../printforms/lapseto_viewinfo';
import InfoNorecords from '../patientinfo/info_norecords';
import ReactToPrint from "react-to-print";
import './lapseto.css';
import './lapseto.styl';
import config from '../../env/config';


class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}

		onClickNew = ()=>{
			const {curpaientinfo,isformreviewlapsetoid2} = this.props;
			this.props.history.push(`/newlapseto/${curpaientinfo._id}/0/${isformreviewlapsetoid2}`);
		}

  	render() {
			const {curpaientinfo,curformreviewlapseto,isnew,db,Hospitalname,userlogin,isformreviewlapsetoid2} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			if(isnew){
				return (<InfoNorecords btnTitle="转归填写" onClickNew={this.onClickNew} />);
			}
	    return (
	      	<div className="printing-title">
						<div className="lapseto">
					    <span>转归与申报记录</span>
					    <button
								onClick={ () => {
					              this.onClickNew();
					            }
					          } className="ant-btn"> <img src="add.png" alt=""/>
					          编辑审阅转归单</button>
							{
								!config.isandroid() && <ReactToPrint
									trigger={ () =>
										<span className="ant-btn"><img src="printing.png" alt="" />打印报表</span>
									}
									content={ () => this.componentRef }
								/>
							}

							</div>
							<div className="table-frame" ref={el => (this.componentRef = el)}>
								<ReviewDetailInfo info={curformreviewlapseto} Hospitalname={Hospitalname} db={db}
									 userlogin={userlogin} isformreviewlapsetoid2={isformreviewlapsetoid2}/>
							</div>


	      	</div>
	    );
  	}
}


const mapStateToProps = ({db,app,userlogin},props) => {
		let curpaientinfo = props.curpaientinfo;
		let Diseaseclassification = props.Diseaseclassification;
		const {formreviewlapsetos} = db;
		const {Hospitalname} = app;
		let isnew = true;
		let isformreviewlapsetoid2 = '0';
		let curformreviewlapseto;
		if(Diseaseclassification === '院内压疮' && lodashget(curpaientinfo,'Diseaseclassification') === '难免转院内'){
			//第二张表
			isformreviewlapsetoid2 = '1';
			if(!!curpaientinfo.formreviewlapsetoid2){
				curformreviewlapseto = formreviewlapsetos[curpaientinfo.formreviewlapsetoid2];
				if(!!curformreviewlapseto){
					isnew = false;
				}
			}
		}
		else{
			if(!!curpaientinfo.formreviewlapsetoid){
				curformreviewlapseto = formreviewlapsetos[curpaientinfo.formreviewlapsetoid];
				if(!!curformreviewlapseto){
					isnew = false;
				}
			}
		}

		return {curpaientinfo,isnew,curformreviewlapseto,db,userlogin,Hospitalname,isformreviewlapsetoid2};
}
export default connect(mapStateToProps)(App);
