import weaken from '../lib/weaken';

// 身份证号脱敏
export default function card (val) {
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
}
