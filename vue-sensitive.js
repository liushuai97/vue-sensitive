module.exports = {
  // eslint-disable-next-line space-before-function-paren
  install (Vue) {
    // eslint-disable-next-line consistent-return
    Vue.filter('sensitive', (...args) => {
      args = Array.prototype.slice.call(args);
      // 参数
      const val = args.shift();
      // 类型
      const type = args.shift();
      // 判断非空
      if (val) {
        // 公共函数 弱化字符串
        // str 需要处理的字符串
        // start  保留的前几位
        // end  保留的后几位
        // char  替换的字符串
        const hideStr = (str, start, end, char) => {
          const size = str.length - start - end;
          let middleStr = '';
          for (let i = 0; i < size; i++) {
            middleStr += char;
          }
          const leftStr = str.substring(0, start);
          const rightStr = str.substring(str.length - end);
          const newStr = leftStr + middleStr + rightStr;
          return newStr;
        };
        // 过滤转换
        // eslint-disable-next-line default-case
        switch (type) {
          // 中文姓氏
          case 'name': {
            // 复姓
            const surname = ['欧阳', '太史', '端木', '上官', '司马', '东方', '独孤', '南宫', '万俟', '闻人', '夏侯', '诸葛', '尉迟', '公羊', '赫连', '澹台', '皇甫', '宗政', '濮阳', '公冶', '太叔', '申屠', '公孙', '慕容', '仲孙', '钟离', '长孙', '宇文', '城池', '司徒', '鲜于', '司空', '汝嫣', '闾丘', '子车', '亓官', '司寇', '巫马', '公西', '颛孙', '壤驷', '公良', '漆雕', '乐正', '宰父', '谷梁', '拓跋', '夹谷', '轩辕', '令狐', '段干', '百里', '呼延', '东郭', '南门', '羊舌', '微生', '公户', '公玉', '公仪', '梁丘', '公仲', '公上', '公门', '公山', '公坚', '左丘', '公伯', '西门', '公祖', '第五', '公乘', '贯丘', '公皙', '南荣', '东里', '东宫', '仲长', '子书', '子桑', '即墨', '达奚', '褚师'];
            let star = '';
            // 名字是两位，取姓名首位+*
            if (val.length <= 2) {
              return `${val.substring(0, 1)}*`;
            }
            // 名字存在复姓，去复姓+*, 复姓 + * +名
            if (surname.indexOf(val.substring(0, 2)) > 0) {
              star = `${val.substring(0, 2)}`;
              if (val.length === 3) {
                return `${star}*`;
              }
              if (val.length > 3) {
                for (let i = 0; i < val.length - 3; i++) {
                  star += '*';
                }
                return star + val.substring(val.length - 1, val.length);
              }
            }
            // 名字不存在复姓，姓名+*
            if (surname.indexOf(val.substring(0, 2)) < 0) {
              for (let i = 0; i < val.length - 2; i++) {
                star += '*';
              }
              return val.substring(0, 1) + star + val.substring(val.length - 1, val.length);
            }
            break;
          }
          case 'phone': {
            // 11位手机号码
            if (val.length === 11) {
              return val.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
            }
            // 固定电话
            if (val.length !== 11) {
              return hideStr(val, 3, 4, '*');
            }
            break;
          }
          case 'email': {
            // 邮箱地址
            if (val.indexOf('@') > 0) {
              let email = '';
              const str = val.split('@');
              let result = '';
              if (str[0].length > 3) {
                for (let i = 0; i < str[0].length - 3; i++) {
                  result += '*';
                }
              }
              email = `${str[0].substring(0, 3) + result}@${str[1]}`;
              return email;
            }
            break;
          }
          case 'card': {
            // 15、18位身份证号
            // 第一代身份证15位，第二代身份证18位
            if (val.length === 15) {
              // 前六后三不脱敏，中间脱敏
              return hideStr(val, 6, 3, '*');
            }
            if (val.length === 18) {
              // 前六后四不脱敏，中间脱敏
              return hideStr(val, 6, 4, '*');
            }
            break;
          }
          case 'bank': {
            // 15、16、17、19位银行卡号
            // 中国银行账号借记卡19位，对公帐户18位，个人帐户17位，一本通15位，老卡12位
            if (val.length > 12) {
              return val.replace(/^(.{4})(?:\d+)(.{4})$/, '$1 **** **** $2');
            }
            break;
          }
        }
      }
    });
  },
};
