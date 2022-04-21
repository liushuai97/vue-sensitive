import fullName from '../utils/full-name';
import eMail from '../utils/e-mail';
import telePhone from '../utils/tele-phone';
import cardId from '../utils/card-id';
import bankCard from '../utils/bank-card';

export default {
  created: () => {
    this.hideVal();
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
          this.text = fullName(this.val);
          break;
        case 'phone':
          this.text = telePhone(this.val);
          break;
        case 'email':
          this.text = eMail(this.val);
          break;
        case 'card':
          this.text = cardId(this.val);
          break;
        default:
          this.text = bankCard(this.val);
      }
    },
  },
};
