function getIdNo() {
    var coefficientArray = ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"]; // 加权因子
    var lastNumberArray = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"]; // 校验码
    var address = "420101"; // 住址
    var birthday = "19810101"; // 生日
    var s = Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
    var array = (address + birthday + s).split("");
    var total = 0;
    for (var i = 0; i < array.length; i++) {
        total = total + parseInt(array[i]) * parseInt(coefficientArray[i]);
    }
    var lastNumber = lastNumberArray[parseInt(total % 11)];
    var id_no_String = address + birthday + s + lastNumber;

    return id_no_String;
}

// 生成随机姓名
var k=0;
var nameArray = new Array();
window.onload =function(){
var familyNames = new Array("赵");
var givenNames = new Array("一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十","二一","二二","二三","二四","二五","二六","二七","二八","二九","三十","三一","三二","三三","三四","三五","三六","三七","三八","三九","四十","四一","四二","四三","四四","四五","四六","四七","四八","四九","五十","五一","五二","五三","五四","五五","五六","五七","五八","五九","六十","六一","六二","六三","六四","六五","六六","六七","六八","六九","七十","七一","七二","七三","七四","七五","七六","七七","七八","七九","八十","八一","八二","八三","八四","八五","八六","八七","八八","八九","九十","九一","九二","九三","九四","九五","九六","九七","九八","九九","一百");
var fLength = familyNames.length;
var gLength = givenNames.length;
for(var i = 0;i<fLength;i++){
	var fName=familyNames[i];
	for(var j =0;j<gLength;j++){
		var gName=givenNames[j];
     var name =fName+gName;
	nameArray.push(name);
	}
}
genrate();

};
function getName() {  
	var reName = nameArray[k++];
    return reName;
}

//生成随机银行卡号
function getBankAccount() {
    var bank_no = '0102';
    var prefix = "";
    switch (bank_no) {
    case "0102":
        prefix = "622202";
        break;
    case "0103":
        prefix = "622848";
        break;
    case "0105":
        prefix = "622700";
        break;
    case "0301":
        prefix = "622262";
        break;
    case "104":
        prefix = "621661";
        break;
    case "0303":
        prefix = "622666";
        break;
    case "305":
        prefix = "622622";
        break;
    case "0306":
        prefix = "622556";
        break;
    case "0308":
        prefix = "622588";
        break;
    case "0410":
        prefix = "622155";
        break;
    case "302":
        prefix = "622689";
        break;
    case "304":
        prefix = "622630";
        break;
    case "309":
        prefix = "622908";
        break;
    case "310":
        prefix = "621717";
        break;
    case "315":
        prefix = "622323";
        break;
    case "316":
        prefix = "622309";
        break;
    default:
    }

    for (var j = 0; j < 13; j++) {
        prefix = prefix + Math.floor(Math.random() * 10);
    }
    return prefix;
}
//随机生成手机号码
//Math.floor(Math.random()*1000+2000)
//200中的2代表手机号倒数第4位，000代表最后3位随机生成，其他的不需要修改
function getMobile(){
  var secondNums = new Array('0000')
  var newMobile = '130' + secondNums[Math.floor(Math.random()*secondNums.length)] +Math.floor(Math.random()*1000+1000); return newMobile
}

//展示
function genrate() {
    trs = '';
//手机号
  for (var i = 1; i <= 10; i++) {
  trs = trs + '<tr><td>'+getMobile()+'</td></tr>';
    }
    for (var i = 1; i <= 10; i++) {
//姓名
 trs = trs + '<tr><td>' + getName()+'</td></tr>';
      arguments
    }
   for (var i = 1; i <= 10; i++) {
//身份证号码
trs = trs + '<tr><td>' +getIdNo()+'<br/></tr>';
      arguments
    }
  for (var i = 1; i <= 10; i++) {
//银行卡号码
trs = trs + '<tr><td>' + getBankAccount()+'</td></tr>';
      arguments
    }
    trs = '<table>' + trs + '</table>';
    $("list").innerHTML = trs;
}
