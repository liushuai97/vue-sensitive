// 邮箱地址脱敏
export default function emial (val) {
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
}
