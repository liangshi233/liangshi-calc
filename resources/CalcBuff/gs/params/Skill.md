# Normal/Charged/Plunging/Skills/Burst Progress/Use/Hit/Dmg/Kill/After
### 技能相关配置

---

<details><summary>使用类型</summary>

##### 可用类型

使用特定技能时触发/叠加的buff

特定技能命中时触发/叠加的buff

特定技能造成伤害时触发/叠加的buff

特定技能使用后触发/叠加的buff

特定技能击杀敌人时触发/叠加的buff

##### 关于技能相关配置buff

部分技能命中自身也计入命中

并非所有攻击命中都会造成伤害

并非所有攻击使用都会命中及造成伤害

** Progress 一般仅用于快照机制设置


</details>

---

<details><summary>Buff侧设置</summary>

>使用时优先使用通用配置以保证不同buff显示的值一致

##### 通用配置

技能使用种类数
~~~~~~~~~~
([params.BurstUse || 0, params.SkillsUse || 1, params.PlungingUse || 0, params.ChargedUse || 0, params.NormalUse|| 1]).filter(dmg => dmg >= 1).length
~~~~~~~~~~

</details>

---

<details><summary>Dmg侧设置</summary>

此项可留空，留空默认普攻1元素战技1其余0

普攻和元素战技无法造成伤害的角色需手动设置为0

> 元素战技无法造成伤害的角色

|   角色   |  技能   |
|:------:|:-----:|
|  玛拉妮   | 踏鲨破浪  |
|  克洛琳德  | 狩夜之巡  |
|   嘉明   | 瑞兽登高楼 |
|  莱欧斯利  | 冰牙突驰  |
|   宵宫   | 焰硝庭火舞 |
| 旅行者（无） | 无此技能  |

> 元素爆发无法造成伤害的角色

|   来源   |     技能      |
|:------:|:-----------:|
|  赛索斯   |   秘仪·瞑光贯影   |
|   米卡   |    苍翎的颂愿    |
|  纳西妲   |    心景幻成     |
|   赛诺   |  圣仪·煟煌随狼行   |
|  荒泷一斗  | 最恶鬼王·一斗轰临！！ |
|   魈    |    靖妖傩舞     |
|  芭芭拉   |    闪耀奇迹♪    |
| 旅行者（无） |    无此技能     |

</details>

---

##### 相关内容

|   名称    |           转跳           |
|:-------:|:----------------------:|
|   首页    | [params](../params.md) |