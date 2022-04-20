// 银行卡号脱敏
export default function bank (val) {
  // 15、16、17、19位银行卡号
  // 中国银行账号借记卡19位，对公帐户18位，个人帐户17位，一本通15位，老卡12位
  if (val.length > 12) {
    return val.replace(/^(.{4})(?:\d+)(.{4})$/, '$1 **** **** $2');
  }
}
