// 识别apps目录下的metadata.json生成html

const fs = require('fs')
const path = require('path')
const apps = 'apps'
const list = []


function getMetadata(apps) {
  const files = [];
  function listFolder(folderPath) {
    const items = fs.readdirSync(folderPath);
    items.forEach(item => {
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
  return files
};

console.log('更新data.json');

// 获取apps目录下的metadata.json
const metadata = getMetadata(apps).filter(item => {
  return item.includes('metadata.json')
});

// 读取metadata.json文件内容
metadata.forEach(item => {
  const data = fs.readFileSync(item, 'utf8');
  console.log(typeof data);
  console.log(data);
  const dataObject = JSON.parse(data);
  console.log(dataObject);
  const obj = {
    name: dataObject.name,
    desc: dataObject.desc,
    icon: dataObject.icon ? item.replace('metadata.json', dataObject.icon) : 'icon.png',
    index: dataObject.index ? item.replace('metadata.json', dataObject.index) : ''
  }
  console.log(obj);
  list.push(obj)
});

// 写入文件
fs.writeFileSync('data.json', JSON.stringify(list), 'utf8');
console.log('更新完成');