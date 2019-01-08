let islocalhost = true;
const serverurl = islocalhost?'http://localhost:6012':'http://192.168.1.51:6012';

const serverurlrestful = islocalhost?`${serverurl}/api`:`${serverurl}/api`;
const wspath = islocalhost?'/socket.io':'/socket.io';

let config = {
    ispopalarm:false,
    serverurlrestful,
    serverurl:`${serverurl}`,
    wspath:`${wspath}`,
    requesttimeout:5000,
    appversion:'1.2.7(build0107)',
    sendlocationinterval:20000,
    softmode:'pcapp',
    isandroid:()=>{
      return !!window.xview;
    }
};


export default config;
