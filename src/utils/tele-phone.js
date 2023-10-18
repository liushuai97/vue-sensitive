import weaken from '../lib/weaken';

// 手机号、固定电话脱敏
export default function telePhone (val) {
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
