import name from '../utils/name';
import email from '../utils/email';
import phone from '../utils/phone';
import card from '../utils/card';
import bank from '../utils/bank';

const sensitive = Vue.component('Sensitive', {
  props: ['val', 'category'],
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

export default sensitive;
