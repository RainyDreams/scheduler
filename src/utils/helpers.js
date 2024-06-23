import { ElMessage } from "element-plus";
export const APIVersion = "0.5.3.alpha"
/**
 * @param {*} dater 
 * @returns 
 */
export function dateToStr(dater) {
  let date = new Date(dater);
  let dateDate = date.getDate(),
    dateMonth = date.getMonth() + 1,
    dateYear = date.getFullYear(),
    dateHours = date.getHours(),
    dateMinutes = date.getMinutes(),
    dateSeconds = date.getSeconds();
  return (
    dateYear +
    "-" +
    dateMonth +
    "-" +
    dateDate +
    " " +
    dateHours +
    ":" +
    dateMinutes +
    ":" +
    dateSeconds
  );
}
/**
 * 
 * @param {*} date 
 * @returns 
 */
export function getDayTime(date = new Date()){
  if(typeof date !== "object") date = new Date(date)
  let dateYear = date.getFullYear();
  let dateMonth = date.getMonth() + 1; 
  let dateDay = date.getDate();
  let dateStr = dateYear + '-' + dateMonth + '-' + dateDay;
  return new Date(dateStr).getTime();
}
/**
 * 
 * @param {*} len 
 * @returns 
 */
export function getRandomString(len) {
  return (function () {
    len = len || 32;
    let $chars = "AmSTnpN5Rz2EcdCKMXZabersYDW4xtwPBFGy36fhHJQijk78";
    let maxPos = $chars.length;
    let pwd = "";
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  })();
}
/**
 * 
 * @param {*} property 
 * @param {*} desc 
 * @returns 
 */
export function compare(property, desc) {
  return function (a, b) {
    const value1 = a[property];
    const value2 = b[property];
    if (desc == true) {
      return value1 - value2; //升序
    } else {
      return value2 - value1; //降序
    }
  };
}
/**
 * 
 * @param {*} color 
 * @param {*} opt 
 * @returns 
 */
export function HexToRgb(color, opt) {
  let color1, color2, color3;
  color = "" + color;
  if (typeof color !== "string") return;
  if (color.charAt(0) == "#") {
    color = color.substring(1);
  }
  if (color.length == 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  }
  if (/^[0-9a-fA-F]{6}$/.test(color)) {
    color1 = parseInt(color.substr(0, 2), 16);
    color2 = parseInt(color.substr(2, 2), 16);
    color3 = parseInt(color.substr(4, 2), 16);
    return [color1, color2, color3, (opt==undefined?1:opt)];
  }
}
/**
 * 
 * @param {*} a 
 * @param {*} b 
 * @param {*} c 
 * @returns 
 */
export function RgbToHex(a, b, c) {
  var r = /^\d{1,3}$/;
  if (!r.test(a) || !r.test(b) || !r.test(c))
    debugger;
    // throw ElMessage.error(
    //   "系统警告：参数错误\tHomeMainSection.vue RGBTOHEX"
    // );
  var hexs = [a.toString(16), b.toString(16), c.toString(16)];
  for (var i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = "0" + hexs[i];
  return "#" + hexs.join("");
}
/**
 * 
 * @param {*} color 
 * @param {*} level 
 * @returns 
 */
export function getDarkColor(color, level) {
  var r = /^\#?[0-9A-Fa-f]{6}$/;
  if (!r.test(color))
    return ElMessage.error(
      "系统警告：参数错误\tHomeMainSection.vue getDarkColor"
    );
  var rgbc = HexToRgb(color);
  //floor 向下取整
  for (var i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level));
  return RgbToHex(rgbc[0], rgbc[1], rgbc[2]);
}
/**
 * 
 * @param {*} color 
 * @param {*} level 
 * @returns 
 */
export function getLightColor(color, level) {
  var r = /^\#?[0-9A-Fa-f]{6}$/;
  if (!r.test(color))
    return ElMessage.error(
      "系统警告：参数错误\tHomeMainSection.vue getLightColor"
    );
  var rgbc = HexToRgb(color);
  for (var i = 0; i < 3; i++)
    rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i]);
  return RgbToHex(rgbc[0], rgbc[1], rgbc[2]);
}
/**
 * 
 * @param {*} rgb 
 * @returns 
 */
export function isLight(rgb) {
  rgb = HexToRgb(rgb);
  return 0.213 * rgb[0] + 0.715 * rgb[1] + 0.072 * rgb[2] > 255 / 2;
}
/**
 * 
 * @param {*} fd 
 * @param {*} sd 
 * @returns 
 */
export function dateDiff(fd, sd) {
  let date1 = new Date(fd);
  let date2 = new Date(sd);
  let dateDiff = date2.getTime() - date1.getTime();
  return Math.floor(dateDiff / (24 * 3600 * 1000));
}
/**
 * 
 * @param {*} dt 
 * @returns 
 */
export function getDateDiff(dt) {
  let now = new Date();
  let nowDay = now.getDay();
  let nowDate = now.getDate();
  let nowMonth = now.getMonth() + 1;
  let nowYear = now.getFullYear();
  let nowStr = nowYear + "-" + nowMonth + "-" + nowDate;
  let date = new Date(dt);
  let dateDay = date.getDay();
  let dateDate = date.getDate();
  let dateMonth = date.getMonth() + 1;
  let dateYear = date.getFullYear();
  let dateStr = dateYear + "-" + dateMonth + "-" + dateDate;
  let dateDiffRst = dateDiff(nowStr, dateStr);
  if (dateDiffRst === 0) {
    return { str: '今天', show: true };
  } else if (dateDiffRst === 1) {
    return { str: '明天', show: true };
  } else if (dateDiffRst === 2) {
    return { str: '后天', show: true };
  } else if (dateDiffRst === -1) {
    return { str: '昨天', show: true };
  } else if (dateDiffRst === -2) {
    return { str: '前天', show: true };
  } else {
    return { str: dateStr, show: false };
  }
}

/**
 * 
 * @param {*} Color 
 * @returns 
 */
export function generateGradientColor(Color) {
  if (!Color) return '';
  const anotherColor = HexToRgb(isLight(Color) ? getDarkColor(Color,0.15) : Color);
  Color = HexToRgb(isLight(Color) ?Color:getLightColor(Color,0.25));
  const y = `linear-gradient(180deg, rgba(${Color}) 0%, rgba(${anotherColor}) 100%)`;
  return y;
}

/**
 * 创建一个防抖动函数。
 * @param {Function} func 需要防抖的函数。
 * @param {number} wait 等待时间，单位毫秒。
 * @param {boolean} immediate 是否立即执行。
 * @return {Function} 返回一个新的防抖函数。
 */
export function debounce(func, wait, immediate) {
  let timeout;

  return function() {
    const context = this;
    const args = arguments;

    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}
/**
 * 
 * @param {*} today 
 * @returns 
 */
export function getFirstWeekDay(today = new Date()){
  const dayOfWeek = today.getDay(); // 获取今天是星期几，0表示周日，1表示周一，以此类推
  const diff = today.getDate() - dayOfWeek; // 计算今天和本周第一天的日期差值
  const firstDay = new Date(today.setDate(diff)); // 设置本周第一天的日期对象
  return firstDay;
}
/**
 * 
 * @param {*} today 
 * @returns 
 */
export function getFirstMonthDay(today = new Date()){
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1); // 月份从0开始计数
  return firstDay;
}
/**
 * 
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * 
 * @returns 
 */
export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


/**
 * 
 * @param {*} obj 
 * @returns 
 */
export function getPropertyKeyCount(obj) {
  const keys = Object.keys(obj);
  return keys.length;
}