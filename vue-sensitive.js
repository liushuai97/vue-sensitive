import sensitive from './src/lib/sensitive';

const version = '1.1.4';
exports.version = version;

function install (Vue) {
  const components = [sensitive];
  components.forEach((item) => {
    if (item.install) {
      Vue.use(item);
    } else if (item.name) {
      Vue.component(item.name, item);
    }
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

