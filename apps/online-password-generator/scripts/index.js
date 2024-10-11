// 预设数据


// 主要功能
const App = new Vue({
  data() {
    return {
      source: {
        SYMBOLS: '~!@#$%^&*()_+',
        NUMBERS: '0123456789',
        LOWERCASECHARACTERS: 'abcdefghijklmnopqrstuvwxyz',
        UPPERCASECHARACTERS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        SIMILAR: 'il1Lo0O'
      },
      model: {
        used: '', // 用户选择的字符拼接
        exclude: [] // 用户排除的字符串拆分
      },
      form: {
        symbols: false, // 勾选预设字符
        custom: '', // 自定义字符
        exclude: '', // 排除的字符
        numbers: true, // 勾选数字
        lowercaseCharacters: true, // 勾选小写字母
        uppercaseCharacters: true, // 勾选大写字母
        similar: false,// 勾选排除相近的字符
        length: 16, // 生成密码长度
        used: '请点击生成按钮', // 最终生成的字符串
      },
      btns: {
        num: 0
      },
      table: [],
      view: {
        history: false
      }
    }
  },
  methods: {
    generatorPassword() {
      // 拼接字符库
      let character = ''
      character += this.form.symbols ? this.source.SYMBOLS : ''
      character += this.form.numbers ? this.source.NUMBERS : ''
      character += this.form.lowercaseCharacters ? this.source.LOWERCASECHARACTERS : ''
      character += this.form.uppercaseCharacters ? this.source.UPPERCASECHARACTERS : ''
      character += this.form.custom
      // 排除易混淆字符
      if (this.form.similar) {
        const similarArr = this.source.SIMILAR.split('')
        similarArr.forEach(item => {
          character += character.replace(item, '')
        })
      }
      // 生成字符串
      let res = ''
      const len = character.length - 1
      for (let i = 0; i < this.form.len; i++) {
        const r = this.random(0, len)
        res += character[r]
      }
      return res
    },
    handleCopyPassword(obj) {
      const classSelector = ".copy-" + obj.id
      let clipboard = new ClipboardJS(classSelector);
      clipboard.on("success", e => {
        this.$message.success("复制成功")
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        this.$message.warning('该浏览器不支持自动复制')
        clipboard.destroy();
      });
    },
    random(x, y) {
      return Math.round(Math.random() * (y - x) + x)
    },
    handleCreatePwdList(num = 1) {
      this.view.history = false
      if (num === 0) {
        num = this.btns.num
      }
      if (num === 0) {
        this.$message.error('请选择要生成的数量')
        return
      }
      this.table = []
      for (let i = 0; i < num; i++) {
        const obj = {
          id: uuidv4(),
          time: new Date().getTime(),
          pwd: this.generatorPassword()
        }
        this.writeHistoryToStorage(obj)
        this.table.push(obj)
      }
    },
    handleShowHistoryList() {
      this.view.history = true
      const local = localStorage.getItem('app-pwd')
      this.table = [...JSON.parse(local)].map(row=> {
        row.time = dayjs(row.time).format('YYYY-MM-DD HH:mm:ss') 
        return row
      })
    },
    handleRemoveHistoryList(){
      this.table = []
      localStorage.setItem('app-pwd','[]')
    },
    writeHistoryToStorage(obj) {
      let pwds = []
      const local = localStorage.getItem('app-pwd')
      if (local) {
        pwds = [...JSON.parse(local)]
      }
      if (pwds.length > 1000) {
        pwds.pop()
      }
      pwds.unshift(obj)
      localStorage.setItem('app-pwd', JSON.stringify(pwds))
    },
    handleChangeOptions() {
      console.log('测试');
    }

  }
})

App.$mount('#root')