// 公共函数 弱化字符串
// str     需要处理的字符串
// start   保留的前几位
// end     保留的后几位
// char    替换的字符串
export default function weaken (str, start, end, char) {
  const size = str.length - start - end;
  let middleStr = '';
  for (let i = 0; i < size; i++) {
    middleStr += char;
  }
  const leftStr = str.substring(0, start);
  const rightStr = str.substring(str.length - end);
  const newStr = leftStr + middleStr + rightStr;
  return newStr;
}
