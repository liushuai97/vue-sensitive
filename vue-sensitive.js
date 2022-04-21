import sensitive from './src/lib/sensitive';
import mixin from './src/lib/mixin';

const Sensitive = (Vue) => {
  if (typeof window !== 'undefined' && window.Vue) {
    Vue = window.Vue;
  }
  Vue.component(sensitive.name, {
    mixins: mixin,
    extends: sensitive.install,
  });
};

export default Sensitive;

