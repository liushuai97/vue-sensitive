import mixin from './src/lib/mixin';

const Sensitive = {
  install (Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue;
    }
    const Text = Vue.extend({
      props: ['val', 'category'],
      data () {
        return {
          text: null,
        };
      },
      template: `<span @click="copyText" @mouseout="hideVal">{{text}}</span>`,
      mixins: [mixin],
    });
    Vue.component('Sensitive', Text);
  },
};

export default Sensitive;

