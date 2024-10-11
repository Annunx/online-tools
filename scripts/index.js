// window.onload = () => {
//   console.log(6666);
//   fetch("/data.json").then((res) => res.json()).then(res=> {
//     console.log(res);
//   }).catch(err=> {
//     console.error
//   });
// }

const app = new Vue({
  el: '#root',
  data: {
    apps: [],
  },
  mounted: function () {
    this.initData();
  },
  methods: {
     async initData() {
      const res = await fetch("/data.json").then((res) => res.json());
      res.forEach(app => {
         this.apps.push(app)
      });;
      console.log(res);
    },
    handleOpen(app){
      let target = app.target ? app.target : '_blank';
      window.open(app.index, target);
    }
  },
})