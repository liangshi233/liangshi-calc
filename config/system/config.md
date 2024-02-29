#config设置内容
如果出现错误可将配置文件删除，重启后会自动生成
##设置1
~~~~~~~~~~YAML
autoRestart: false 
~~~~~~~~~~
<details><summary>可用的内容 false true</summary>

`true` 使用【梁氏启动】后会自动进行重启

`false` 使用【梁氏启动】后不会进行重启操作

</details>

##设置2
~~~~~~~~~~YAML
autoRefresh: true
~~~~~~~~~~
<details><summary>可用的内容 false true</summary>

`true` 重启后会自动刷新设置的预设面板

`false` 重启后将不会刷新预设面板

</details>

##设置3
~~~~~~~~~~YAML
panelmodel: 1 
~~~~~~~~~~

<details><summary>可用的内容 0 1 2 其他</summary>

`0` 用户自行修改的预设面板

`1` liangshi-calc默认的预设面板

`2` liangshi-calc默认的带主角版本预设面板

`其他` 将此选项设置为其他作者的预设面板名称

</details>

##设置4
- **适配中** —— 此设置可能只在部分角色中生效
~~~~~~~~~~YAML
namemodel: 1
~~~~~~~~~~

<details><summary>可用的内容 1~6 </summary>

`1` 伤害条目名称将使用默认设置名称
>举例： 普通攻击一段伤害 / 海月之誓伤害 / 琉金火光爆炸伤害 / 提八妲钟 Q落雷

`2` 伤害条目将使用全称
>举例： 弦月舞步一段伤害 / 海月之誓伤害 / 琉金火光爆炸伤害 / 提八妲钟 大密法·天狐显真落雷

`3` 伤害条目将简化小部分名称
>举例： 普通攻击一段伤害 / 海月之誓伤害 / 琉金火光爆炸伤害 / 提八妲钟 大密法·天狐显真落雷

`4` 伤害条目将使用通俗叫法
>举例： 普通攻击一段伤害 / 元素战技伤害 / 元素爆发爆炸伤害 / 提八妲钟 元素爆发落雷

`5` 伤害条目将使用字母简化名称
>举例： 普攻一段伤害 / E技能伤害 / Q技能爆炸伤害 / 提八妲钟 Q技能落雷

`6` 伤害条目将使用纯字母名称显示
>举例： A一段伤害 / E伤害 / Q爆炸伤害 / 提八妲钟 Q落雷

</details>

##设置5
- **适配中** —— 此设置可能只在部分角色中生效
~~~~~~~~~~YAML
energymodel: 0
~~~~~~~~~~
<details><summary>可用的内容 数字 </summary>

>此选项产出的能量会被角色的元素充能影响且会影响到角色DPS的计算，请慎重调整

`<0` 环境会扣除角色能量，例如 噬能之雷 深海龙蜥

`0` 环境不产出元素能量，角色无法通过环境获取元素能量

`>0` 环境会为角色提供能量或目标会产出元素能量

</details>

##设置6
- **适配中** —— 此设置可能只在部分角色中生效
~~~~~~~~~~YAML
rankingOnemodel: m
~~~~~~~~~~
<details><summary>可用的内容 m a z c e q </summary>

>此选项为角色排行首选规则，角色排行时会首先选择设定的属性进行排行

`m` 默认的排行设置

`a` 使用普通攻击伤害

`z` 使用重击伤害

`c` 使用高空下落攻击伤害

`e` 使用元素战技/战技攻击伤害

`q` 使用元素爆发/终结技攻击伤害

`f` 使用角色的辅助队友能力

`h` 使用角色的治疗量/护盾吸收量

`y` 使用角色的养成度（仅限使用极简版伤害计算）

`dph` 使用角色的单轮总伤害量（仅限使用超全版伤害计算）

`hph` 使用角色的单轮总治疗量（仅限使用超全版伤害计算）

`dps` 使用角色的平均每秒伤害值（仅限使用超全版伤害计算）

`hps` 使用角色的平均每秒治疗量（仅限使用超全版伤害计算）

`undefined` 摆烂

</details>

##设置7
- **适配中** —— 此设置可能只在部分角色中生效
~~~~~~~~~~YAML
rankingTwomodel: hps
~~~~~~~~~~
<details><summary>可用的内容 m a z c e q </summary>

>此选项为角色排行次选规则，角色排行时，首选规则未命中时候将会使用此规则

`可用的内容` 与首选规则一致

</details>

##设置8
- **适配中** —— 此设置可能只在部分角色中生效
~~~~~~~~~~YAML
rankingThreemodel: dps
~~~~~~~~~~
<details><summary>可用的内容 m a z c e q </summary>

>此选项为角色排行备选规则，角色排行时，首选与次选规则均未命中时候将会使用此规则

`可用的内容` 与首选规则一致

</details>

---

##默认配置
<details><summary>点此展开</summary>

>出现异常时可复制下方配置尝试恢复

~~~~~~~~~~YAML
autoRestart: false

autoRefresh: false

panelmodel: 1

namemodel: 1

energymodel: 0

rankingOnemodel: m

rankingTwomodel: hps

rankingThreemodel: dps
~~~~~~~~~~

</details>

---

#以下为未来可能启用的设置

##未来可能会启用的设置1
~~~~~~~~~~YAML
dmgmodel: 1
~~~~~~~~~~
<details><summary>可用的内容 数字 </summary>

>此选项会直接影响到伤害计算的数值，请慎重调整

`0.85` 模拟实战存在失误的伤害

`1` 游戏内实际伤害

`1.3` 模拟小程序等其他计算器的伤害

</details>

##未来可能会启用的设置2
~~~~~~~~~~YAML
datamodel: false
~~~~~~~~~~
<details><summary>可用的内容 false true </summary>

`true` 安装的所有预设面板将会自动更新

`false` 禁用预设面板自动更新

</details>

##未来可能会启用的设置3
~~~~~~~~~~YAML
stylemodel: false
~~~~~~~~~~
<details><summary>可用的内容 false true </summary>

`true` 安装的所有面板主题将会自动更新

`false` 禁用面板主题自动更新

</details>