// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
 
Vue.use(Vuex);
const store = new Vuex.Store({
  state : {
    article : 'Mr. Johnson had never been up in an aerophane before and he had read a lot about air accidents, so one day when a friend offered to take him for a ride in his own small phane, Mr. Johnson was very worried about accepting. Finally, however, his friend persuaded him that it was very safe, and Mr. Johnson boarded the plane'
  },
  mutations : {

  }
})
Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
