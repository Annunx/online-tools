import util from "./utils.js";

// 数据
import letter from "../data/letter.js";
import number from "../data/number.js";

export default {
    id:()=> {
        // 生成身份证号码
    },
    carNum: () => {
        let str = '';
        // 生成1-3随机数
        let num = util.randomNum(0,3)
        // 字母
        // 数字
        // 字母数字随机排序
        // 属地
        return str;
    }
}