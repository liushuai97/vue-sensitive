const sensitive = {
  name: 'Sensitive',
  install: {
    props: ['val', 'category'],
    template: `<span @click="copyText" @mouseout="hideVal">{{text}}</span>`,
  },
};

export default sensitive;
