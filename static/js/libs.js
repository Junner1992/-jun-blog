function $(obj, child) {
  let tag;

  if (obj.constructor == String) {
    const all = document.querySelectorAll(obj)
    if (all.length > 1) {
      tag = all
    } else {
      tag = document.querySelector(obj)
    }
  } else {
    tag = obj
  }

  if (child) return tag.querySelectorAll(child)
  else return tag
}

function getStyle(ele, name) {
  if (ele.style.styleFloat) {
    return ele.style.styleFloat;   //ie下float处理
  } else if (ele.style.cssFloat) {
    return ele.style.cssFloat;     //火狐等float处理
  }
  if (ele.currentStyle) {
    return ele.currentStyle[name];
  } else {
    return getComputedStyle(ele, false)[name];
  }
}

function animate(ele, attr_json, callback) {
  // 清除定时器，避免动画重合
  clearInterval(ele.timer);

  ele.timer = setInterval(function () {
    var flag = true;    //定时器是否清除的标记值

    for (var attr in attr_json) {
      var current = 0;
      //获取当前样式
      if (attr == "opacity") {          //如果是透明度，那么返回值，如果不兼容就返回0
        current = Math.round(parseInt(getStyle(ele, attr) * 100)) || 0;
      } else {                          //其他
        current = parseInt(getStyle(ele, attr));
      }

      //计算步长,并进行取整来避免除不尽引起的误差
      var stepLength = (attr_json[attr] - current) / 10;
      stepLength = stepLength > 0 ? Math.ceil(stepLength) : Math.floor(stepLength);

      //判断要改变的样式是否是透明度
      if (attr == "opacity") {
        if ("opacity" in ele.style) {
          ele.style.opacity = (current + stepLength) / 100;
        } else {
          ele.style.filter = "alpha(opacity = " + (current + stepLength) * 10 + ")";
        }
      }

      //判断要改变的样式是否是层级
      else if (attr == "zIndex") {
        ele.style.zIndex = current + stepLength;
      }
      //其他属性
      else {
        ele.style[attr] = (current + stepLength) + "px";
      }
      //判断是否清除定时器
      if (current != attr_json[attr]) {
        flag = false;
      }
    }

    if (flag) {
      clearInterval(ele.timer);
      if (callback) {
        callback();
      }
    }
  }, 10)
}
