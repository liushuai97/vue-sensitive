import funcs from './funcs';

export default {
  created () {
    this.hideVal();
  },
  methods: {
    // 回显&复制
    copyText (events) {
      // 回显
      events.target.innerText = this.val;
      // 复制
      const copyipt = document.createElement('input');
      copyipt.setAttribute('value', this.val);
      document.body.appendChild(copyipt);
      copyipt.select();
      document.execCommand('copy');
      document.body.removeChild(copyipt);
    },
    // 还原
    showVal (events) {
      events.target.innerText = this.text;
    },
    // 脱敏
    hideVal () {
      switch (this.category) {
        case 'name':
          this.text = funcs.fullName(this.val);
          break;
        case 'phone':
          this.text = funcs.telePhone(this.val);
          break;
        case 'email':
          this.text = funcs.eMail(this.val);
          break;
        case 'card':
          this.text = funcs.credentials(this.val);
          break;
        default:
          this.text = funcs.bankCard(this.val);
      }
    },
  },
};
