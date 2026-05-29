# CrystallizeNumber
### 角色拾取的结晶数量

---

<details><summary>使用类型</summary>

##### 可用类型

角色拾取的结晶时触发/叠加的buff

角色处于结晶护盾的庇护下触发/叠加的buff

##### 可用举例

|    类型     |       使用举例        |
|:---------:|:-----------------:|
| 角色拾取的结晶数量 | CrystallizeNumber |

##### 关于拾取结晶数量buff

仅捡起的角色计数,队友捡起不计数

</details>

---

<details><summary>Buff侧设置</summary>

>使用时优先使用通用配置以保证不同buff显示的值一致

##### 优先级
手动指定 > 默认

##### 通用配置
~~~~~~~~~~
params.CrystallizeNumber || 0
~~~~~~~~~~

</details>

---

<details><summary>Dmg侧设置</summary>

此项可留空，留空默认0

>一般每站场2秒赋予1

</details>

---

<details><summary>受影响的内容</summary>

>圣遗物/武器/共鸣/环境/其他

| 来源  |  影响名称  |                详细内容                 |
|:---:|:------:|:-----------------------------------:|
| 圣遗物 | 回声之林夜话 |    CrystallizeNumber大于0时效果提高150%    |
| 圣遗物 | 悠古的磐岩  | CrystallizeNumber大于0时获得35%四基础元素伤害加成 |
| 武器  |   裁断   |       依据CrystallizeNumber叠加层数       |

>角色

| 来源  |   影响名称    |               详细内容               |
|:---:|:---------:|:--------------------------------:|
| 阿贝多 | 无垢之土（命座）  | CrystallizeNumber大于0时场上角色伤害提高17% |
| 娜维娅 | 典仪式晶火（技能） |   依据CrystallizeNumber提升元素战技倍率    |

</details>

---

##### 相关内容

|   名称   |            转跳             |
|:------:|:-------------------------:|
|   首页   |  [params](../params.md)   |
| 受到伤害次数 | [params](SubjectedDmg.md) |