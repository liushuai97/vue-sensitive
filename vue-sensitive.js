import sensitive from './src/lib/sensitive';

const version = '1.1.7';
exports.version = version;

function install (Vue) {
  const components = Vue.extend(sensitive.install);
  Vue.component(sensitive.title, components);
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
const _default = {
  install,
  version,
};

exports.default = _default;

