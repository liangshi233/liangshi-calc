# ElementDmg
### 造成元素伤害数

---

<details><summary>使用类型</summary>

##### 可用类型

造成元素伤害时触发/记数的buff

##### 可用举例

|   类型    |    使用举例    |
|:-------:|:----------:|
| 造成元素伤害数 | ElementDmg |

##### 关于造成元素伤害数

一般情况下不使用此配置

</details>

---

<details><summary>Buff侧设置</summary>

>使用时优先使用通用配置以保证不同buff显示的值一致

##### 优先级
手动指定 > 默认

##### 通用配置
~~~~~~~~~~
params.NormalElement || 2
~~~~~~~~~~

</details>

---
<details><summary>Dmg侧设置</summary>

此项可留空，留空默认为2

</details>

---

<details><summary>受影响的内容</summary>

>圣遗物/武器/共鸣/环境/其他

| 来源  | 影响名称 |                       详细内容                       |
|:---:|:----:|:------------------------------------------------:|
| 武器  | 柔灯挽歌 | BurningDetermine为true的敌人NormalElement(草)大于1时触发效果 |
| 武器  | 掠食者  |             NormalElement(冰)大于1时叠加效果             |
| 武器  | 铁蜂刺  |            NormalElement大于1时叠加效果                 |

>角色

无

</details>

---

##### 相关内容

|  名称   |           转跳           |
|:-----:|:----------------------:|
|  首页   | [params](../params.md) |

