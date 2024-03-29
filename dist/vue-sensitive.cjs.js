'use strict';

// 中文姓名脱敏规则
var surname = ['欧阳', '太史', '端木', '上官', '司马', '东方', '独孤', '南宫', '万俟', '闻人', '夏侯', '诸葛', '尉迟', '公羊', '赫连', '澹台', '皇甫', '宗政', '濮阳', '公冶', '太叔', '申屠', '公孙', '慕容', '仲孙', '钟离', '长孙', '宇文', '城池', '司徒', '鲜于', '司空', '汝嫣', '闾丘', '子车', '亓官', '司寇', '巫马', '公西', '颛孙', '壤驷', '公良', '漆雕', '乐正', '宰父', '谷梁', '拓跋', '夹谷', '轩辕', '令狐', '段干', '百里', '呼延', '东郭', '南门', '羊舌', '微生', '公户', '公玉', '公仪', '梁丘', '公仲', '公上', '公门', '公山', '公坚', '左丘', '公伯', '西门', '公祖', '第五', '公乘', '贯丘', '公皙', '南荣', '东里', '东宫', '仲长', '子书', '子桑', '即墨', '达奚', '褚师'];

function fullName(val) {
  if (val) {
    var star = '';
    // 名字是两位，取姓名首位+*
    if (val.length <= 2) {
      return val.substring(0, 1) + '*';
    }
    // 名字存在复姓，去复姓+*, 复姓 + * +名
    if (surname.indexOf(val.substring(0, 2)) > -1) {
      star = '' + val.substring(0, 2);
      if (val.length === 3) {
        return star + '*';
      }
      if (val.length > 3) {
        for (var i = 0; i < val.length - 3; i++) {
          star += '*';
        }
        return star + val.substring(val.length - 1, val.length);
      }
    }
    // 名字不存在复姓，姓名+*
    if (surname.indexOf(val.substring(0, 2)) < 0) {
      for (var _i = 0; _i < val.length - 2; _i++) {
        star += '*';
      }
      return val.substring(0, 1) + star + val.substring(val.length - 1, val.length);
    }
  } else {
    return '';
  }
}

// 邮箱地址脱敏
function eMail(val) {
  if (val) {
    if (val.indexOf('@') > 0) {
      var email = '';
      var str = val.split('@');
      var result = '';
      if (str[0].length > 3) {
        for (var i = 0; i < str[0].length - 3; i++) {
          result += '*';
        }
      }
      email = str[0].substring(0, 3) + result + '@' + str[1];
      return email;
    }
  } else {
    return '';
  }
}

// 公共函数 弱化字符串
// str     需要处理的字符串
// start   保留的前几位
// end     保留的后几位
// char    替换的字符串
function weaken(str, start, end, char) {
  var size = str.length - start - end;
  var middleStr = '';
  for (var i = 0; i < size; i++) {
    middleStr += char;
  }
  var leftStr = str.substring(0, start);
  var rightStr = str.substring(str.length - end);
  var newStr = leftStr + middleStr + rightStr;
  return newStr;
}

// 手机号、固定电话脱敏
function telePhone(val) {
  if (val) {
    // 11位手机号码
    if (val.length === 11) {
      return val.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    }
    // 固定电话
    if (val.length !== 11) {
      return weaken(val, 3, 4, '*');
    }
  } else {
    return '';
  }
}

// 身份证号脱敏
function credentials(val) {
  if (val) {
    // 15、18位身份证号
    // 第一代身份证15位，第二代身份证18位
    if (val.length === 15) {
      // 前六后三不脱敏，中间脱敏
      return weaken(val, 6, 3, '*');
    }
    if (val.length === 18) {
      // 前六后四不脱敏，中间脱敏
      return weaken(val, 6, 4, '*');
    }
  } else {
    return '';
  }
}

// 银行卡号脱敏
function bankCard(val) {
  if (val) {
    // 15、16、17、19位银行卡号
    // 中国银行账号借记卡19位，对公帐户18位，个人帐户17位，一本通15位，老卡12位
    if (val.length > 12) {
      return val.replace(/^(.{4})(?:\d+)(.{4})$/, '$1 **** **** $2');
    }
  } else {
    return '';
  }
}

// 过滤函数
var funcs = {
  fullName: fullName,
  eMail: eMail,
  telePhone: telePhone,
  credentials: credentials,
  bankCard: bankCard,
  weaken: weaken
};

var mixin = {
  created: function created() {
    this.hideVal();
  },

  methods: {
    // 回显&复制
    copyText: function copyText(events) {
      // 回显
      events.target.innerText = this.val;
      // 复制
      var copyipt = document.createElement('input');
      copyipt.setAttribute('value', this.val);
      document.body.appendChild(copyipt);
      copyipt.select();
      document.execCommand('copy');
      document.body.removeChild(copyipt);
    },

    // 还原
    showVal: function showVal(events) {
      events.target.innerText = this.text;
    },

    // 脱敏
    hideVal: function hideVal() {
      switch (this.category) {
        case 'name':
          this.text = funcs.fullName(this.val);
          break;
        case 'phone':
          this.text = funcs.telePhone(this.val);
          break;
        case 'email':
          this.text = funcs.eMail(this.val);
          break;
        case 'card':
          this.text = funcs.credentials(this.val);
          break;
        case 'bank':
          this.text = funcs.bankCard(this.val);
          break;
        default:
          this.text = this.val;
      }
    }
  }
};

var Weaken = {
  install: function install(Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue;
    }
    // 注册全局组件
    var Text = Vue.extend({
      props: ['val', 'category'],
      data: function data() {
        return {
          text: null
        };
      },

      template: '<span @mouseover="copyText" @mouseout="showVal">{{text}}</span>',
      mixins: [mixin]
    });
    Vue.component('Weaken', Text);
    // 注册全局过滤器 & 指令
    Object.keys(funcs).forEach(function (key) {
      if (key !== 'weaken') {
        Vue.filter(key, funcs[key]);
      }
    });
    // 添加实例方法
    Vue.prototype.$fullName = funcs.fullName;
    Vue.prototype.$eMail = funcs.eMail;
    Vue.prototype.$telePhone = funcs.telePhone;
    Vue.prototype.$credentials = funcs.credentials;
    Vue.prototype.$bankCard = funcs.bankCard;
    Vue.prototype.$weaken = funcs.weaken;
  }
};

module.exports = Weaken;
