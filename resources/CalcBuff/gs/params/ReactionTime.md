# Reaction Time/Dmg
### 触发元素反应 后的时间/次数

---

## 已废弃的配置

---

<details><summary>Buff侧设置</summary>

>使用时优先使用通用配置以保证不同buff显示的值一致

##### 优先级
手动指定 > 默认

##### 通用配置
~~~~~~~~~~
params.ReactionTime || 0
~~~~~~~~~~
~~~~~~~~~~
params.ReactionDmg || 4
~~~~~~~~~~
</details>

---
<details><summary>Dmg侧设置</summary>

已废弃无需配置

</details>

---

<details><summary>受影响的内容</summary>

>圣遗物/武器/共鸣/环境/其他

| 来源  |  影响名称  |            详细内容            |
|:---:|:------:|:--------------------------:|
| 武器  |  风信之锋  |   ReactionTime小于10时激活效果    |
| 武器  |  掠食者   |   ReactionDmg(火)大于1时触发效果   |
| 武器  |  饰铁之花  |    ReactionTime小于8时激活效果    |
| 武器  |  暗铁剑   |   ReactionTime小于12时激活效果    |
| 武器  |  翡玉法球  |   ReactionTime小于12时激活效果    |
| 武器  | 苍古自由之誓 |   ReactionDmg大于1时叠加1层效果    |
| 武器  |  星鹫赤羽  |  ReactionDmg(风)大于1时攻击力提高   |
| 武器  | 寝正月初晴  |  ReactionDmg(风)大于1时攻击力提高   |
| 武器  |  白辰之环  |   ReactionDmg(雷)大于1时伤害提高   |
| 武器  |  盈满之实  | ReactionDmg大于1时精通提高攻击力降低5% |
| 武器  | 万国诸海图谱 |   ReactionDmg大于1时叠加1层效果    |
| 圣遗物 | 烬城勇者绘卷 |   ReactionTime小于15时激活效果    |
| 圣遗物 |  饰金之梦  |    ReactionTime小于8时激活效果    |
| 圣遗物 |   教官   |    ReactionTime小于8时激活效果    |

>角色

无

</details>

---

##### 相关内容

|  名称   |           转跳           |
|:-----:|:----------------------:|
|  首页   | [params](../params.md) |

