import sensitive from './src/lib/sensitive';

const version = '1.1.5';
exports.version = version;

function install (Vue) {
  const components = [sensitive];
  components.forEach((item) => {
    Vue.component(item.name, item.install);
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
const _default = {
  install,
  version,
};

exports.default = _default;

