import sensitive from './src/lib/sensitive';

export default function Sensitive (Vue) {
  if (typeof window !== 'undefined' && window.Vue) {
    Vue = window.Vue;
    const components = Vue.extend(sensitive.install);
    Vue.component(sensitive.title, components);
  }
}

