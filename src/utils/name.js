// 中文姓名脱敏规则
const surname = [
  '欧阳', '太史', '端木', '上官', '司马', '东方',
  '独孤', '南宫', '万俟', '闻人', '夏侯', '诸葛',
  '尉迟', '公羊', '赫连', '澹台', '皇甫', '宗政',
  '濮阳', '公冶', '太叔', '申屠', '公孙', '慕容',
  '仲孙', '钟离', '长孙', '宇文', '城池', '司徒',
  '鲜于', '司空', '汝嫣', '闾丘', '子车', '亓官',
  '司寇', '巫马', '公西', '颛孙', '壤驷', '公良',
  '漆雕', '乐正', '宰父', '谷梁', '拓跋', '夹谷',
  '轩辕', '令狐', '段干', '百里', '呼延', '东郭',
  '南门', '羊舌', '微生', '公户', '公玉', '公仪',
  '梁丘', '公仲', '公上', '公门', '公山', '公坚',
  '左丘', '公伯', '西门', '公祖', '第五', '公乘',
  '贯丘', '公皙', '南荣', '东里', '东宫', '仲长',
  '子书', '子桑', '即墨', '达奚', '褚师'];

export default function name (val) {
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
}
