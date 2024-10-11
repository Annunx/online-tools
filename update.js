// 识别apps目录下的metadata.json生成html

const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");
const apps = "apps";
const list = [];

function getMetadata(apps) {
  const files = [];
  function listFolder(folderPath) {
    const items = fs.readdirSync(folderPath);
    items.forEach((item) => {
      const itemPath = path.join(folderPath, item);
      const stats = fs.statSync(itemPath);
      if (stats.isDirectory()) {
        listFolder(itemPath);
      } else if (stats.isFile()) {
        files.push(itemPath);
      }
    });
  }
  listFolder(apps);
  return files;
}

const main = () => {
  console.log("开始更新data.json");
  
  // 获取apps目录下的metadata.json
  const metadata = getMetadata(apps).filter((item) => {
    return item.includes("metadata.json");
  });

  // 读取metadata.json文件内容
  metadata.forEach((item) => {
    try {
      const data = JSON.parse(fs.readFileSync(item, "utf8"));
      const obj = {
        name: data.name,
        desc: data.desc,
        icon: data.icon
          ? item.replace("metadata.json", data.icon).replaceAll(path.sep, "/")
          : "/images/icon.png",
        index: data.index
          ? item.replace("metadata.json", data.index).replaceAll(path.sep, "/")
          : "",
        taget: data.taget ?? "_blank",
      };
      list.push(obj);
    } catch (error) {
      console.error(error);
    }
  });

  try {
    // 写入文件
    fs.writeFileSync("data.json", JSON.stringify(list), "utf8");
    // 更新时间
    const site = JSON.parse(fs.readFileSync("site.json", "utf8"));
    site.version = dayjs().format("YYYY-MM-DD");
    fs.writeFileSync("site.json", JSON.stringify(site), "utf8");
    console.log("更新完成");
  } catch (error) {
    console.error(error);
  }
};


main();
