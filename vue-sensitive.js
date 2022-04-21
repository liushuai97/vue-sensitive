import sensitive from './src/lib/sensitive';

const Sensitive = (Vue) => {
  if (typeof window !== 'undefined' && window.Vue) {
    Vue = window.Vue;
  }
  Vue.component(sensitive.name, sensitive.install);
};

export default Sensitive;

