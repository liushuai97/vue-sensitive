<template>
  <span @click="copyText" @mouseout="hideVal">{{text}}</span>
</template>

<script>
import { name, phone, email, card, bank } from '../utils';
export default {
  name: 'Sensitive',
  props: {
    val: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    text: () => {
      let _this = this;
      _this.hideVal();
    }
  },
  methods: {
    // 回显&复制
    copyText (events) {
      let _this = this;
      // 回显
      events.target.innerText = _this.val;
      // 复制
      let copyipt = document.createElement('input');
      copyipt.setAttribute('value', _this.val);
      document.body.appendChild(copyipt);
      copyipt.select();
      document.execCommand('copy');
      document.removeChild(copyipt);
    },
    // 脱敏
    hideVal () {
      let _this = this;
      switch (_this.type) {
        case 'name':
          name(_this.val);
          break
        case 'phone':
          phone(_this.val);
          break
        case 'email':
          email(_this.val);
          break
        case 'card':
          card(_this.val);
          break
        case 'bank':
          bank(_this.val);
          break
      }
    }
  }
}
</script>

<style scoped>
</style>