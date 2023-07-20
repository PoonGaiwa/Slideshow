/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-07-18 22:54:47
 * @LastEditors: gaiwa gaiwa@163.com
 * @LastEditTime: 2023-07-20 20:42:17
 * @FilePath: \html\work\js\common.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function setStyle(dom,css){
  for (var key in css){
    dom['style'][key] = css[key];
  }
}
function getStyle (obj, attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}