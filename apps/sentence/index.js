// 主要功能
import { copy } from '/utils/index.js'
const App = new Vue({
  data() {
    return {
      sentenceApi: 'https://open.fangjiayun.cn/v1/sentence',
      sentence: '生死听天命，你也由天定！',
      origin: "原创",
      author: "by柯乐",
      content: "生死听天命，你也由天定！",
    }
  },
  mounted() {
    this.getSentence()
  },
  methods: {
    getSentence() {
      fetch(this.sentenceApi).then(res => {
        return res.json()
      }).then(res => {
        this.sentence = res.data.content
        this.origin = res.data.origin
        this.author = res.data.author
        this.content = res.data.content
      }).catch(err => {
        console.log(err);
      })
    },
    handleRefresh() {
      this.getSentence()
    },
    handleCopy() {
      copy(this.sentence).then(res=> {
        autolog.log("复制成功", "success", 2500);
      }).catch(err => {
        autolog.log(err, "error", 2500);
      })
    }
  }
})
App.$mount('#root')
