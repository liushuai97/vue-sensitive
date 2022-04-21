import sensitive from './src/lib/sensitive';

const version = '1.1.8';
exports.version = version;

function install (Vue) {
  if (typeof window !== 'undefined' && window.Vue) {
    Vue = window.Vue;
    const components = Vue.extend(sensitive.install);
    Vue.component(sensitive.title, components);
  }
}

const _default = {
  install,
  version,
};

exports.default = _default;

