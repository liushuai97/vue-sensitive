#### Project Background - 用途

数据脱敏是指对某些敏感信息通过脱敏规则进行数据的变形，实现敏感隐私数据的可靠保护。在涉及客户安全数据或者一些商业性敏感数据的情况下，在不违反系统规则条件下，对真实数据进行改造并提供测试使用，如身份证号、手机号、卡号、客户号等个人信息都需要进行数据脱敏，文本弱化。

#### Compatible - 版本要求

```
Vue.js v2.5
```

#### Install Plugin - 安装

```
npm install vue-sensitive

yarn add vue-sensitive
```

#### Do It - 引用

main.js

```
import Weaken from 'vue-sensitive'
Vue.use(Weaken)
```

默认显示脱敏后的弱文信息，鼠标经过自动复制内容并回显明文，鼠标移出自动恢复成弱文

##### Template - 模板语法

```
<weaken val="value" category="name|phone|email|card|bank"/>

name - 中文姓名
phone - 手机/固话号码
email - 电子邮箱
card - 身份证号码
bank - 银行卡号
```

##### Filters - 过滤器

###### 中文姓名

```
{{value | fullName}}

张三 -> 张*

张三四 -> 张*四

诸葛亮 -> 诸葛*

诸葛孔明 -> 诸葛*明
```

###### 电子邮箱

```
 {{value | eMail}}

123456@qq.com -> 123***@qq.com
```

###### 手机/固话

```
{{value | telePhone}}

18027273233 -> 180****3233

0259033827 -> 025****3827
```

###### 身份证号码

```
{{value | credentials}}

334411 9090 90 90 9090 -> 334411********9090
```

###### 银行卡

```
{{value | bankCard}}

3333444455556666 -> 3333 **** **** 6666
```

##### Methods - 函数方法

```
$fullName(value)

$eMail(value)

$telePhone(value)

$credentials(value)

$bankCard(value)

// 公共函数 弱化字符串
// str     需要处理的字符串
// start   保留的前几位
// end     保留的后几位
// char    替换的字符串
$weaken(str, start, end, char)
```
