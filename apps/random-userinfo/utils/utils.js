const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "1234567890";

export function getIdNo() {
  let coefficientArray = [
    "7",
    "9",
    "10",
    "5",
    "8",
    "4",
    "2",
    "1",
    "6",
    "3",
    "7",
    "9",
    "10",
    "5",
    "8",
    "4",
    "2",
  ]; // 加权因子
  let lastNumberArray = [
    "1",
    "0",
    "X",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
  ]; // 校验码
  var address = "420101"; // 住址
  var birthday = "19810101"; // 生日
  var s =
    Math.floor(Math.random() * 10).toString() +
    Math.floor(Math.random() * 10).toString() +
    Math.floor(Math.random() * 10).toString();
  var array = (address + birthday + s).split("");
  var total = 0;
  for (var i = 0; i < array.length; i++) {
    total = total + parseInt(array[i]) * parseInt(coefficientArray[i]);
  }
  var lastNumber = lastNumberArray[parseInt(total % 11)];
  var id_no_String = address + birthday + s + lastNumber;

  return id_no_String;
}
// 计算身份证前六位地址,
export function getAddress(erea) { }
export function isNaN(val) {
  // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，
  //对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
  //所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
  if (val === "" || val == null) {
    return false;
  }
  return !isNaN(val) && typeof val === "number" ? true : false;
}

export function randomNum(minNum, maxNum) {
  //生成从minNum到maxNum的随机数
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}
export function addZero(num) {
  return num < 10 ? `0${num}` : num;
}
export function randomBirthday(min, max) {
  let year = "";
  let month = "";
  let day = "";
  // 获取最小的出生年
  // 获取最大的出生年
  let nowYear = new Date().getFullYear();
  year = randomNum(nowYear - max, nowYear - min);
  month = addZero(randomNum(1, 12));
  // 全部限制每年每月只有28天，避免闰年，大小月
  day = addZero(randomNum(1, 28));
  return `${year}${month}${day}`;
}
export function calcIdCheckCode(str) {
  let arr = str.split("");
  let coefficientArr = [
    "7",
    "9",
    "10",
    "5",
    "8",
    "4",
    "2",
    "1",
    "6",
    "3",
    "7",
    "9",
    "10",
    "5",
    "8",
    "4",
    "2",
  ]; // 加权因子
  let lastNumArr = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"]; // 校验码

  var total = 0;
  for (var i = 0; i < arr.length; i++) {
    total += parseInt(arr[i]) * parseInt(coefficientArr[i]);
  }
  return lastNumArr[parseInt(total % 11)];
}
export function generatorEmail(str) {
  const suffixArr = [
    "@gmail.com",
    "@yahoo.com",
    "@msn.com",
    "@live.com",
    "@qq.com",
    "@126.net",
    "@163.com",
    "@163.net",
    "@sina.com",
  ];
  const user = pinyinPro.pinyin(str, { toneType: 'none' }).replace(/\s*/g, "");
  let suffix = suffixArr[randomNum(0, suffixArr.length - 1)];
  return `${user}${suffix}`;
}

export function numberStr(num = 2) {
  let numberArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let str = "";
  for (let i = 0; i < num; i++) {
    str += numberArr[randomNum(0, numberArr.length - 1)];
  }
  return str;
}
export function getAge(str) {
  let tAge = 0;
  let idYear = str.slice(0, 4);
  let idMonth = str.slice(4, 6);
  let idDay = str.slice(6, 8);

  let nowDate = new Date();
  let nowYear = nowDate.getFullYear();
  let nowMonth = nowDate.getMonth() + 1;
  let nowDay = nowDate.getDate();
  tAge = nowYear - idYear;
  if (nowMonth > idMonth) {
    tAge += 1;
  } else if (nowMonth == idMonth) {
    if (nowDay > idDay) {
      tAge += 1;
    }
  }
  return tAge;
}
export function getCarNumber() {
  // 车牌属地
  // 字母1，2，3 数字4，3，2 共五个
  let char = LETTERS.slice()
}

