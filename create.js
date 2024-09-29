const fs = require('fs');
const path = require('path')
const dayjs = require('dayjs');
const { v4:uuidv4 } = require('uuid');


const apps = 'apps'
const main = () => {
  const args = process.argv.slice(2);
  // 检查文件夹是否存在
  const appPath = path.join(apps, args[0]);
  console.log(appPath);

  try {
    fs.accessSync(appPath, fs.constants.R_OK);
    console.error('文件夹：' + appPath + '存在');
  } catch (err) {
    // 创建文件夹
    fs.mkdirSync(appPath, { recursive: true }, (err) => {
      if (err) throw err;
    });
    console.log('文件夹：' + appPath + '创建成功');
    // 创建metadata.json文件内容
    const metadata = fs.readFileSync('template/metadata.json', 'utf8');
    // 获取data.jsonw文件， 避免uuid重复
    const data = fs.readFileSync('data.json', 'utf8');
    const dataArray = JSON.parse(data);
    const dataSet = new Set();
    dataArray.forEach(item => {
      dataSet.add(item.id);
    });
    let id = uuidv4();
    while (dataSet.has(id)) {
      id = uuidv4();
    }

    const metadataObj = JSON.parse(metadata);
    metadataObj.id = id;
    metadataObj.name = args[1] || "";
    metadataObj.createTime = dayjs().format('YYYY-MM-DD');
    fs.writeFileSync(path.join(appPath, 'metadata.json'), JSON.stringify(metadataObj), (err) => {
      if (err) throw err;
    });
    console.log('文件：' + path.join(appPath, 'metadata.json') + '创建成功');
    // 创建index.html文件内容
    let html = fs.readFileSync('template/index.html', 'utf8');
    html = html.replace('{{name}}', args[1] || "");
    fs.writeFileSync(path.join(appPath, 'index.html'), html, (err) => {
      if (err) throw err;
    });
    console.log('文件：' + path.join(appPath, 'index.html') + '创建成功');
    // 创建默认图标文件
    fs.writeFileSync(path.join(appPath, 'icon.png'), fs.readFileSync('template/icon.png'), (err) => {
      if (err) throw err;
    });
    console.log('文件：' + path.join(appPath, 'icon.png') + '创建成功');
    console.log('App：' + args[0] + '创建成功');
  }
}

main()