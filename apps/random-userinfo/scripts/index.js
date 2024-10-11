// 主要功能
import {
  randomNum,
  randomBirthday,
  calcIdCheckCode,
  getAge,
  numberStr,
  generatorEmail,
} from "../utils/utils.js";
import area from "../data/area.js";
import name from "../data/name.js";
import nation from "../data/nation.js";
import mobile from "../data/mobile.js";
import bank from "../data/bank.js";
import company from "../data/company.js";
import work from "../data/work.js";

const App = new Vue({
  data() {
    return {
      source: {
        areaCodeArr: [],
        columns: [
          { key: "index", dataIndex: "index", title: "序号", width: 50 },
          { key: "name", dataIndex: "name", title: "姓名", width: 100 },
          { key: "sex", dataIndex: "sex", title: "性别", width: 50 },
          { key: "birthday", dataIndex: "birthday", title: "生日", width: 120 },
          { key: "age", dataIndex: "age", title: "年龄", width: 50 },
          { key: "nation", dataIndex: "nation", title: "民族", width: 150 },
          { key: "work", dataIndex: "work", title: "工作", width: 50 },
          { key: "id", dataIndex: "id", title: "身份证号", width: 200 },
          { key: "mobile", dataIndex: "mobile", title: "手机号码", width: 150 },
          { key: "email", dataIndex: "email", title: "邮箱", width: 200 },
          { key: "area", dataIndex: "area", title: "区域", width: 300 },
          { key: "company", dataIndex: "company", title: "公司", width: 300 },
          { key: "bank", dataIndex: "bank", title: "所属银行", width: 300 },
          { key: "debit", dataIndex: "debit", title: "银行卡号", width: 300 },
        ],
      },
      table: [],
      model: {
        num: 0,
        maxAge: 80,
        minAge: 20,
      },
      form: {
        id: true,
        name: true,
        age: true,
        birthday: true,
        area: true,
        sex: true,
        mobile: true,
        email: true,
        company: true,
        nation: true,
        bank: true,
        debit: true,
        work: true,
      },
    };
  },
  mounted() {
    // 生成中国区域 Code Array
    this.source.areaCodeArr = [];
    area.forEach((item) => {
      if (item.mallCityList && item.mallCityList.length > 0) {
        item.mallCityList.forEach((iitem) => {
          if (iitem.mallAreaList && iitem.mallAreaList.length > 0) {
            iitem.mallAreaList.forEach((iiitem) => {
              let objArea = {
                code: iiitem.areaCode,
                area: `${item.provinceName}${iitem.cityName}${iiitem.areaName}`,
              };
              this.source.areaCodeArr.push(objArea);
            });
          } else {
            let objCity = {
              code: iitem.cityCode,
              area: `${item.provinceName}${iitem.cityName}`,
            };
            this.source.areaCodeArr.push(objCity);
          }
        });
      } else {
        let objProvince = {
          code: item.provinceCode,
          area: item.provinceName,
        };
        this.source.areaCodeArr.push(objProvince);
      }
    });
  },
  methods: {
    handleCreatePersonList(val) {
      let tempNum = val;
      if (val === 0 && this.model.num === 0) {
        this.$message.warning("请输入生成数量！！！");
        return;
      } else if (val === 0) {
        tempNum = this.model.num;
      }
      this.table = [];
      for (let i = 0; i < tempNum; i++) {
        const person = this.createPerson();
        person.index = this.table.length + 1;
        this.table.push(person);
      }
    },
    createPerson() {
      // 个人信息包含的项目
      let person = {
        id: "身份证号",
        name: "姓名",
        age: "年龄",
        birthday: "生日",
        area: "未知地址",
        sex: "性别",
        mobile: "手机号码",
        email: "邮箱",
        company: "公司",
        nation: "民族",
        bank: "银行",
        debit: "借记卡卡号",
        carnumber: "车牌号",
        work: "工作",
      };

      const areaCodeArrRandom = randomNum(
        0,
        this.source.areaCodeArr.length - 1
      );

      /**身份证号码 */
      // 地址码
      const areaCode = this.source.areaCodeArr[areaCodeArrRandom].code;
      // 生日期码
      let birthdayCode = randomBirthday(this.model.minAge, this.model.maxAge);
      person.birthday = `${birthdayCode.slice(0, 4)}-${birthdayCode.slice(
        4,
        6
      )}-${birthdayCode.slice(6, 8)}`;
      // 顺序码
      let c1 = randomNum(1, 9);
      let c2 = randomNum(1, 9);
      let c3 = randomNum(1, 9);
      let orderCode = `${c1}${c2}${c3}`;
      // 校验码
      let checkCode = calcIdCheckCode(`${areaCode}${birthdayCode}${orderCode}`);
      person.id = `${areaCode}${birthdayCode}${orderCode}${checkCode}`;
      /**姓名 */
      let firstName = name.surname[randomNum(0, name.surname.length - 1)];
      let lastName = "";
      if (c3 % 2 == 0) {
        lastName = name.femaleName[randomNum(0, name.femaleName.length - 1)];
      } else {
        lastName = name.maleName[randomNum(0, name.maleName.length - 1)];
      }
      person.name = `${firstName}${lastName}`;
      person.age = getAge(birthdayCode);
      /**地区 */
      person.area = this.source.areaCodeArr[areaCodeArrRandom].area;
      /**性别 */
      person.sex = c3 % 2 == 0 ? "女" : "男";
      /**公司 */
      person.company = company[randomNum(0, company.length - 1)];
      let bankObj = bank[randomNum(0, bank.length - 1)];
      /**银行 */
      person.bank = bankObj.name;
      /**卡号 */
      person.debit = `${bankObj.code}${numberStr(bankObj.len - 6)}`;
      /**邮箱 */
      person.email = generatorEmail(person.name);
      /**手机号 */
      let mobileFixArr = [];
      mobile.forEach((item) => {
        item.no.forEach((iitem) => {
          mobileFixArr.push(iitem);
        });
      });
      let mobileFix = mobileFixArr[randomNum(0, mobileFixArr.length - 1)];
      person.mobile = `${mobileFix}${numberStr(8)}`;
      /**民族 */
      person.nation = `${nation[randomNum(0, nation.length - 1)]}族`;
      /**车牌号 */
      person.carnumber = `${nation[randomNum(0, nation.length - 1)]}族`;
      /**工作 */
      person.work = `${work[randomNum(0, work.length - 1)]}`;
      return person;
    },
    handleDownloadPersonList() {
      const ExcelJSWorkbook = new ExcelJS.Workbook();
      const worksheet = ExcelJSWorkbook.addWorksheet("ExcelJS sheet");
      const columnsData = this.source.columns.map((column) => {
        const width = column.width;
        return {
          header: column.title,
          key: column.dataIndex,
          width: isNaN(width) ? 20 : width / 10,
        };
      });
      worksheet.columns = columnsData;
      worksheet.addRows(this.table);
      let fileName = `${new Date().valueOf()}`;
      ExcelJSWorkbook.xlsx.writeBuffer().then(function (buffer) {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          `${fileName}.xlsx`
        );
      });
    },
    handleCopyPassword(obj, col) {
      const classSelector = "." + col + "-" + obj.id;
      let clipboard = new ClipboardJS(classSelector);
      clipboard.on("success", (e) => {
        this.$message.success("复制成功");
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        this.$message.warning("该浏览器不支持自动复制");
        clipboard.destroy();
      });
    },
  },
});
App.$mount("#root");
