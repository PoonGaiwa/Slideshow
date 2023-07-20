/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-07-19 22:57:34
 * @LastEditors: gaiwa gaiwa@163.com
 * @LastEditTime: 2023-07-20 22:00:47
 * @FilePath: \html\work\js\day18\slideshow\js\slideshow.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var oCon = document.querySelector('.container');
var oList = document.querySelector('.slider-items');
var oSlider = document.querySelector('.slider');
var oSliderBtn = document.querySelector('.slider-btn');
var len = oList.children.length + 1, sliderIdx = 0, picWidth = 960, timer;
var autotimer;
var btnTypeMap = {
  prev: function prevIdx(){
    if(sliderIdx === 0){
      sliderIdx = len - 1;
      oList.style.marginLeft = sliderIdx * -picWidth + 'px';
    }
    sliderIdx--;
    sliderIdx = (len + sliderIdx) % len;
  },
  next: function nextIdx(){
    if(sliderIdx === len -1){
      sliderIdx = 0;
      oList.style.marginLeft = sliderIdx * -picWidth + 'px';
    }
    sliderIdx++;
    sliderIdx %= len;
  }
}

function init(){
  var fragment = document.createDocumentFragment();
  var vDom;
  oList.style.width = `${len * 100}%`;
  oList.appendChild(oList.children[0].cloneNode(true));
  for (var i =0; i < len - 1; i++){
    vDom = document.createElement('span');
    fragment.appendChild(vDom);
  }
  oSlider.appendChild(fragment);
}
// Switch the picture
function changeImg(callback){
  oSlider.children[sliderIdx % (len -1)].style.backgroundColor = 'rgba(0,0,0,.1)';
  callback && callback();
  oSlider.children[sliderIdx % (len -1)].style.backgroundColor = 'rgba(0,0,0,.4)';
  animate(oList, {
    marginLeft: sliderIdx * -picWidth + 'px'
  });
}
// Get the index of dom
function getElementIdx (item){
  var elements = item.parentNode.children;
  for(var i=0, len = elements.length; i<len; i++){
    if(item === elements[i]){
      return i;
    }
  }
}
// Changing picture automatically
function autoChange(){
  clearInterval(autotimer);
  autotimer = setInterval(function(){
    changeImg(function(){
      btnTypeMap['next']();
    });
  }, 6000);
}

function animate(ele, json, callback){
  clearInterval(timer);
  var toggle = false;
  timer = setInterval(function(){
    toggle = true;
    for (var key in json){
      var target = parseInt(json[key]);
      curr = parseInt(getStyle(ele,key));
      speed = (target - curr) / 50;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      if (curr === target){
        ele.style[key] = target + 'px';
      }
      ele.style[key] = curr + speed + 'px';
      if (curr != target){
        toggle = false;
      }
    }
    if(toggle){
      clearInterval(timer);
      callback && callback();
    }
  },0);
}
oSliderBtn.addEventListener('click',function(e){
  if(e.target.tagName.toLowerCase() === 'span'){
    var btnType = e.target.className;
    if(btnTypeMap[btnType] && typeof btnTypeMap[btnType] === 'function'){
      changeImg(function(){
        btnTypeMap[btnType]();
      });
    }
  }
},false);

oSlider.addEventListener('mousemove',function(e){
  if(e.target.tagName.toLowerCase() === 'span') {
    changeImg(function(){
      sliderIdx = getElementIdx(e.target);
    });
  }
});

oCon.addEventListener('mouseover',function(){
  clearInterval(autotimer);
});

oCon.addEventListener('mouseout',function(){
  autoChange();
})

init();
autoChange();
