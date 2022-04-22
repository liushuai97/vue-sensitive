import mixin from './src/lib/mixin';
import funcs from './src/lib/funcs';

const Weaken = {
  install (Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue;
    }
    // 注册全局组件
    const Text = Vue.extend({
      props: ['val', 'category'],
      data () {
        return {
          text: null,
        };
      },
      template: `<span @mouseover="copyText" @mouseout="showVal">{{text}}</span>`,
      mixins: [mixin],
    });
    Vue.component('Weaken', Text);
    // 注册全局过滤器 & 指令
    Object.keys(funcs).forEach((key) => {
      if (key !== 'weaken') {
        Vue.filter(key, funcs[key]);
      }
    });
    // 添加实例方法
    Vue.prototype.$fullName = funcs.fullName;
    Vue.prototype.$eMail = funcs.eMail;
    Vue.prototype.$telePhone = funcs.telePhone;
    Vue.prototype.$credentials = funcs.credentials;
    Vue.prototype.$bankCard = funcs.bankCard;
    Vue.prototype.$weaken = funcs.weaken;
  },
};

export default Weaken;

