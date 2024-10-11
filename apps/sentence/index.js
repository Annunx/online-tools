// 主要功能
import { getStore, setStore } from '/utils/store.js'
import { copy } from '/utils/index.js'
const App = new Vue({
  data() {
    return {
      pixabayApi: 'https://pixabay.com/api/',
      pixabayConfig: {
        key: '13661404-e0690811b3665e9c3b2741d0b',
        q: '',
        lang: 'zh',
        image_type: "photo",
        Default: "all",
        orientation: "horizontal",
        category: 'nature',
        min_width: 1920,
        min_height: 1080,
        per_page: 3
      },
      sentenceApi: 'https://open.fangjiayun.cn/v1/sentence',
      sentence: '生死听天命，你也由天定！',
      origin: "原创",
      author: "by柯乐",
      content: "生死听天命，你也由天定！",
    }
  },
  mounted() {
    const local = getStore('sentence-bg')
    if (local && typeof local === 'string') {
      // 设置背景
      document.body.style.backgroundImage = `url(${local})`
    } else {
      // 获取图片
      this.getImgs()
    }
    this.getSentence()
  },
  methods: {
    getImgs() {
      let query = ''
      for (const key in this.pixabayConfig) {
        query += `&${key}=${this.pixabayConfig[key]}`
      }
      query = query.replace('&', '?')
      fetch(this.pixabayApi + query).then(res => {
        return res.json()
      }).then(res => {
        document.body.style.backgroundImage = `url(${res.hits[0].largeImageURL})`
        setStore('sentence-bg', res.hits[0].largeImageURL)
      }).catch(err => {
        console.log(err);
      })
    },
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
    handleCopyText() {
      console.log(1233);
    },
    handleRefresh() {
      this.getSentence()
    },
    handleCopy() {
      copy(this.sentence)
    }
  }
})
App.$mount('#root')