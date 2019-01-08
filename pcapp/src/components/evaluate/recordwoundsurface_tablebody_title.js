import React from 'react';

const RecordwoundsurfaceTablebodyTitle = (props)=>{
  return (
    <table width="100%" border="0" className="wound-surface-record">
      <tr>
        <td className="black font-weight">分期</td>
        <td>Ⅰ期</td>
        <td>Ⅱ期</td>
        <td>Ⅲ期</td>
        <td>Ⅳ期</td>
        <td>可疑深部组织损伤</td>
        <td>不能分期</td>
        <td>&nbsp;</td>
      </tr>
      <tr className="no-bbm">
        <td rowSpan="3" className="black font-weight">部位</td>
        <td colSpan="2">1、枕部</td>
        <td colSpan="2">2、耳廓（左/右）</td>
        <td>3、鼻梁</td>
        <td>4、棘突</td>
        <td>5、肩缝（左/右）</td>
      </tr>
      <tr className="no-bbm">
        <td colSpan="2">6、枕部（左/右）</td>
        <td colSpan="2">7、枕部（左/右）</td>
        <td>8、枕部（左/右）</td>
        <td>9、枕部（左/右）</td>
        <td>10、枕部</td>
      </tr>
      <tr className="no-bbm">
        <td colSpan="2">11、枕部（左/右）</td>
        <td colSpan="2">12、枕部（左/右）</td>
        <td>13、枕部（左/右）</td>
        <td>14、枕部（左/右）</td>
        <td>15、枕部（左/右）</td>
      </tr>
      <tr>
        <td className="black font-weight">大小</td>
        <td>长(cm)</td>
        <td>宽(cm)</td>
        <td>深(cm)</td>
        <td>潜行</td>
        <td>窦道</td>
        <td>颜色</td>
        <td>渗液量</td>
      </tr>
    </table>
  );
}

export default RecordwoundsurfaceTablebodyTitle;
