# Install Plugin

npm install vue-sensitive --save

yarn add vue-sensitive --save

# Do It

main.js

import Sensitive from 'vue-sensitive'

Vue.use(Sensitive)

<sensitive val="value" category="name|phone|email|card|bank"/>

# filters

{{value | fullName}} 中文姓名

{{value | eMail}} 电子邮箱

{{value | telePhone}} 手机/固话

{{value | credentials}} 身份证号码

{{value | bankCard}} 银行卡

# methods

$fullName(value)

$eMail(value)

$telePhone(value)

$credentials(value)

$bankCard(value)
