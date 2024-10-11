import util from "./utils/utils.js";
import area from "./data/area.js";
import name from "./data/name.js";
import nation from "./data/nation.js";
import mobile from "./data/mobile.js";
import bank from "./data/bank.js";
import company from "./data/company.js";

window.onload = function () {
  // 初始化后不会变化的东西
  // 生成的列表
  let list = [];
  // 需要生成的数量
  let count = 20;
  // 定义需要展示的数据
  let option = {
    id: {
      name: "身份证号码",
      active: true, // 不能关闭此项，姓名、性别、区域都依赖此项
    },
    name: {
      name: "姓名",
      active: true,
    },
    age: {
      name: "年龄",
      active: true,
    },
    area: {
      name: "区域",
      active: true,
    },
    sex: {
      name: "性别",
      active: true,
    },
    mobile: {
      name: "手机号码",
      active: true,
    },
    email: {
      name: "邮箱",
      active: true,
    },
    company: {
      name: "公司",
      active: true,
    },
    nation: {
      name: "民族",
      active: true,
    },
    bank: {
      name: "发卡银行",
      active: true,
    },
    debit: {
      name: "借记卡卡号",
      active: true,
    },
  };
  // 生成中国区域 Code Array
  const areaCodeArr = [];
  area.forEach((item) => {
    if (item.mallCityList && item.mallCityList.length > 0) {
      item.mallCityList.forEach((iitem) => {
        if (iitem.mallAreaList && iitem.mallAreaList.length > 0) {
          iitem.mallAreaList.forEach((iiitem) => {
            let objArea = {
              code: iiitem.areaCode,
              area: `${item.provinceName}${iitem.cityName}${iiitem.areaName}`,
            };
            areaCodeArr.push(objArea);
          });
        } else {
          let objCity = {
            code: iitem.cityCode,
            area: `${item.provinceName}${iitem.cityName}`,
          };
          areaCodeArr.push(objCity);
        }
      });
    } else {
      let objProvince = {
        code: item.provinceCode,
        area: item.provinceName,
      };
      areaCodeArr.push(objProvince);
    }
  });
  // 个人信息生成函数
  function generator() {
    // 个人信息包含的项目
    let person = {
      id: "身份证号",
      name: "姓名",
      age: "年龄",
      area: "未知地址",
      sex: "性别",
      mobile: "手机号码",
      email: "邮箱",
      company: "公司",
      nation: "民族",
      bank: "银行",
      debit: "借记卡卡号",
      carnumber: "车牌号",
    };

    const areaCodeArrRandom = util.randomNum(0, areaCodeArr.length - 1);

    /**身份证号码 */
    // 地址码
    const areaCode = areaCodeArr[areaCodeArrRandom].code;
    // 生日期码
    let birthdayCode = util.randomBirthday();
    // 顺序码
    let c1 = util.randomNum(1, 9);
    let c2 = util.randomNum(1, 9);
    let c3 = util.randomNum(1, 9);
    let orderCode = `${c1}${c2}${c3}`;
    // 校验码
    let checkCode = util.calcIdCheckCode(
      `${areaCode}${birthdayCode}${orderCode}`
    );
    person.id = `${areaCode}${birthdayCode}${orderCode}${checkCode}`;
    /**姓名 */
    let firstName = name.surname[util.randomNum(0, name.surname.length - 1)];
    let lastName = "";
    if (c3 % 2 == 0) {
      lastName = name.femaleName[util.randomNum(0, name.femaleName.length - 1)];
    } else {
      lastName = name.maleName[util.randomNum(0, name.maleName.length - 1)];
    }
    person.name = `${firstName}${lastName}`;
    person.age = util.getAge(birthdayCode);
    /**地区 */
    person.area = areaCodeArr[areaCodeArrRandom].area;
    /**性别 */
    person.sex = c3 % 2 == 0 ? "女" : "男";
    /**公司 */
    person.company = company[util.randomNum(0, company.length - 1)];
    let bankObj = bank[util.randomNum(0, bank.length - 1)];
    /**银行 */
    person.bank = bankObj.name;
    /**卡号 */
    person.debit = `${bankObj.code}${util.numberStr(bankObj.len - 6)}`;
    /**邮箱 */
    person.email = util.generatorEmail();
    /**手机号 */
    let mobileFixArr = [];
    mobile.forEach((item) => {
      item.no.forEach((iitem) => {
        mobileFixArr.push(iitem);
      });
    });
    let mobileFix = mobileFixArr[util.randomNum(0, mobileFixArr.length - 1)];
    person.mobile = `${mobileFix}${util.numberStr(8)}`;
    /**民族 */
    person.nation = `${nation[util.randomNum(0, nation.length - 1)]}族`;
    /**车牌号 */
    
    person.carnumber = `${nation[util.randomNum(0, nation.length - 1)]}族`;
    return person;
  }
  // 批量生成人员数据
  function createList(num = 1) {
    list = [];
    for (let i = 0; i < num; i++) {
      let item = generator();
      list.push(item);
    }
  }
  // createList();
  // 选项开关：只是不展示, 实际还是生成 //优化为实际不生成
  let optionName = document.querySelector("#option-name");
  optionName.onclick = () => {
    option.name.active = optionName.checked ? true : false;
  };
  let optionSex = document.querySelector("#option-sex");
  optionSex.onclick = () => {
    option.sex.active = optionSex.checked ? true : false;
  };
  let optionAge = document.querySelector("#option-age");
  optionAge.onclick = () => {
    option.age.active = optionAge.checked ? true : false;
  };
  let optionNation = document.querySelector("#option-nation");
  optionNation.onclick = () => {
    option.nation.active = optionNation.checked ? true : false;
  };
  let optionId = document.querySelector("#option-id");
  optionId.onclick = () => {
    option.id.active = optionId.checked ? true : false;
  };
  let optionMobile = document.querySelector("#option-mobile");
  optionMobile.onclick = () => {
    option.mobile.active = optionMobile.checked ? true : false;
  };
  let optionEmail = document.querySelector("#option-email");
  optionEmail.onclick = () => {
    option.email.active = optionEmail.checked ? true : false;
  };
  let optionArea = document.querySelector("#option-area");
  optionArea.onclick = () => {
    option.area.active = optionArea.checked ? true : false;
  };
  let optionCompany = document.querySelector("#option-company");
  optionCompany.onclick = () => {
    option.company.active = optionCompany.checked ? true : false;
  };
  let optionBank = document.querySelector("#option-bank");
  optionBank.onclick = () => {
    option.bank.active = optionBank.checked ? true : false;
  };
  let optionDebit = document.querySelector("#option-debit");
  optionDebit.onclick = () => {
    option.debit.active = optionDebit.checked ? true : false;
  };
  // 自定义生成数量
  let createCustom = document.querySelector("#create-btn-custom");
  let countEl = document.querySelector("#create-number");
  countEl.onfocus = () => {
    if (countEl.value == 1) {
      countEl.value = "";
    }
  };
  createCustom.onclick = () => {
    let countNum = countEl.value;
    if (!countNum) {
      countNum = 1;
    }
    createList(countNum);
    innerView();
  };
  // 生成一次
  let createOnceBtn = document.querySelector("#create-btn-once");
  createOnceBtn.onclick = function () {
    createList();
    innerView();
  };
  // 生成10次
  let createTenBtn = document.querySelector("#create-btn-ten");
  createTenBtn.onclick = function () {
    createList(10);
    innerView();
  };
  // 生成100次
  let createHundredBtn = document.querySelector("#create-btn-hundred");
  createHundredBtn.onclick = function () {
    createList(100);
    innerView();
  };

  // 显示
  function innerView() {
    let Html = `<table>
  <tr>
    <th>序号</th>
    ${option.name.active ? "<th>姓名</th>" : ""}
    ${option.sex.active ? "<th>性别</th>" : ""}
    ${option.age.active ? "<th>年龄</th>" : ""}
    ${option.nation.active ? "<th>民族</th>" : ""}
    ${option.id.active ? "<th>身份证号</th>" : ""}
    ${option.area.active ? "<th>地址</th>" : ""}
    ${option.mobile.active ? "<th>手机号码</th>" : ""}
    ${option.email.active ? "<th>邮箱</th>" : ""}
    ${option.company.active ? "<th>公司</th>" : ""}
    ${option.bank.active ? "<th>银行</th>" : ""}
    ${option.debit.active ? "<th>借记卡卡号</th>" : ""}
  </tr>`;
    list.forEach((item, index) => {
      Html += `<tr>`;
      Html += `<td>${index + 1}\t</td>`;
      Html += option.name.active ? `<td>${item.name}\t</td>` : "";
      Html += option.sex.active ? `<td>${item.sex}\t</td>` : "";
      Html += option.age.active ? `<td>${item.age}\t</td>` : "";
      Html += option.nation.active ? `<td>${item.nation}\t</td>` : "";
      Html += option.id.active ? `<td>${item.id}\t</td>` : "";
      Html += option.area.active ? `<td>${item.area}\t</td>` : "";
      Html += option.mobile.active ? `<td>${item.mobile}\t</td>` : "";
      Html += option.email.active ? `<td>${item.email}\t</td>` : "";
      Html += option.company.active ? `<td>${item.company}\t</td>` : "";
      Html += option.bank.active ? `<td>${item.bank}\t</td>` : "";
      Html += option.debit.active ? `<td>${item.debit}\t</td>` : "";
      Html += `</tr>`;
    });
    Html += "</table>";
    const root = document.querySelector("#list");
    if (list.length != 0) {
      root.innerHTML = Html;
    }
  }
};
