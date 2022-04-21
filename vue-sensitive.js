import _Vue from 'vue';
import sensitive from './src/lib/sensitive';

const Sensitive = (Vue) => {
  if (typeof window !== 'undefined' && window.Vue) {
    Vue = window.Vue || _Vue;
  }
  Vue.extend(sensitive.install);
  Vue.component(sensitive.name, components);
};

export default Sensitive;

