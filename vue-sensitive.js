import name from './src/utils/name';
import email from './src/utils/email';
import phone from './src/utils/phone';
import card from './src/utils/card';
import bank from './src/utils/bank';

const install = (Vue) => {
  // 添加实例方法
  Vue.prototype.$fullName = name;
  Vue.prototype.$telePhone = phone;
  Vue.prototype.$eMail = email;
  Vue.prototype.$idCard = card;
  Vue.prototype.$bankCard = bank;
  // 注册全局组件
  Vue.component('sensitive', {
    props: {
      val: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
    },
    data: () => ({
      text: null,
    }),
    template: `<span @click="copyText" @mouseout="hideVal">{{text}}</span>`,
    moutend: () => {
      this.$nextTick(() => {
        this.hideVal();
      });
    },
    methods: {
      // 回显&复制
      copyText: (events) => {
        // 回显
        events.target.innerText = this.val;
        // 复制
        const copyipt = document.createElement('input');
        copyipt.setAttribute('value', this.val);
        document.body.appendChild(copyipt);
        copyipt.select();
        document.execCommand('copy');
        document.removeChild(copyipt);
      },
      // 脱敏
      hideVal: () => {
        switch (this.category) {
          case 'name':
            this.text = name(this.val);
            break;
          case 'phone':
            this.text = phone(this.val);
            break;
          case 'email':
            this.text = email(this.val);
            break;
          case 'card':
            this.text = card(this.val);
            break;
          default:
            this.text = bank(this.val);
        }
      },
    },
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default install;
