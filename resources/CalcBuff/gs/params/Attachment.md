# *Attachment
### 目标(敌人)元素附着状态

---

<details><summary>使用类型</summary>

##### 可用类型

处于特定元素附着下生效的buff

##### 可用举例

|   类型    |      使用举例       |
|:-------:|:---------------:|
| 目标火元素附着 | FireAttachment  |
| 目标冰元素附着 |  IceAttachment  |
| 目标水元素附着 | WaterAttachment |
| 目标雷元素附着 | MineAttachment  |
| 目标风元素附着 | WindAttachment  |
| 目标岩元素附着 | RockAttachment  |
| 目标草元素附着 | GrassAttachment |

##### 关于目标(敌人)元素附着状态

岩可与任意元素共存

草可与冰元素共存

雷水/激雷可共存

</details>

---

<details><summary>Buff侧设置</summary>

>此项采用被动判断，即判断火元素附着时应判断无法与火元素共存的元素是否存在而不是判断FireAttachment

水附着
~~~
[params.FireAttachment, params.IceAttachment, params.MineAttachment, params.WindAttachment, params.GrassAttachment].every(attachment => !attachment)
~~~

火附着
~~~
[params.IceAttachment, params.WaterAttachment, params.MineAttachment, params.WindAttachment, params.GrassAttachment].every(attachment => !attachment)
~~~

冰附着
~~~
[params.FireAttachment, params.WaterAttachment, params.MineAttachment, params.WindAttachment].every(attachment => !attachment)
~~~

雷附着
~~~
[params.FireAttachment, params.IceAttachment, params.WindAttachment].every(attachment => !attachment)
~~~

草附着
~~~
[params.FireAttachment, params.WaterAttachment].every(attachment => !attachment)
~~~

风附着
~~~
[params.FireAttachment, params.IceAttachment, params.WaterAttachment, params.MineAttachment, params.WindAttachment, params.GrassAttachment].every(attachment => !attachment)
~~~

岩附着
~~~
true
~~~

</details>

---

<details><summary>Dmg侧设置</summary>

此项可留空，留空默认被动判断

冰元素角色非反应条目设置冰附着

其余仅在元素反应条目主动设置，例如火打水蒸发时设置水附着

对于激化配置时，雷元素角色同时激活草雷附着，草元素角色仅激活草附着

</details>

---

<details><summary>受影响的内容</summary>

>圣遗物/武器/共鸣/环境/其他

|  来源  |  影响名称   |      详细内容      |
|:----:|:-------:|:--------------:|
| 圣遗物  | 冰锋迷途的勇士 | 敌人冰附着时暴击提高20%  |
| 圣遗物  | 平息雷鸣的尊者 | 敌人雷附着时伤害提高35%  |
| 圣遗物  | 度过烈火的贤人 | 敌人火附着时伤害提高35%  |
|  武器  |  雪葬的星银  | 敌人冰附着时武器特效伤害提升 |
|  武器  |  忍冬之果   | 敌人冰附着时武器特效伤害提升 |
|  武器  |  龙脊长枪   | 敌人冰附着时武器特效伤害提升 |
|  武器  |  匣里龙吟   |  敌人火雷附着时伤害提高   |
|  武器  |   雨裁    |  敌人水雷附着时伤害提高   |
|  武器  |  匣里灭辰   |  敌人水火附着时伤害提高   |
|  武器  |   冷刃    |  敌人水冰附着时伤害提高   |
|  武器  | 沐浴龙血的剑  |  敌人火雷附着时伤害提高   |
|  武器  |   鸦羽弓   |  敌人附着火水时伤害提高   |
|  武器  |  魔导绪论   |  敌人水雷附着时伤害提高   |
| 元素共鸣 |  粉碎之冰   | 敌人冰附着时暴击提高15%  |

>角色

| 角色 |   影响名称    |          详细内容           |
|:--:|:---------:|:-----------------------:|
| 凯亚 | 卓越的血脉（命座） |  敌人冰附着时普通攻击与重击暴击率提升15%  |
| 七七 | 冰寒蚀骨（命座）  | 敌人冰附着时普通攻击与重击造成的伤害提升15% |
| 重云 | 浮云霜天（命座）  |      敌人冰附着时恢复1元素能量      |

</details>

---

##### 相关内容

|  名称   |           转跳            |
|:-----:|:-----------------------:|
|  首页   | [params](../params.md)  |