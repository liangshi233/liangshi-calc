# SubjectedDmg
### 受到伤害次数

---

<details><summary>使用类型</summary>

##### 可用类型

受到伤害时触发/叠加的buff

##### 可用举例

|     类型     |                 使用举例                 |
|:----------:|:------------------------------------:|
| 生命值提升或降低次数 | ChangeHp + SubjectedDmg + HealNumber |
|  生命值降低次数   |       ChangeHp + SubjectedDmg        |
|   受到伤害次数   |             SubjectedDmg             |

##### 关于受到伤害次数buff

>消耗/损失生命值不计数,后台受到伤害正常计数

如果队伍/角色以燃烧为主题时默认计5层

如果队伍/角色有创造护盾的能量时默认计0层

简单判断法则：会跳字的伤害基本计入此项

</details>

---

<details><summary>Buff侧设置</summary>

>使用时优先使用通用配置以保证不同buff显示的值一致

##### 优先级
手动指定 > 护盾 > 燃烧 > 默认

##### 通用配置
~~~~~~~~~~
params.SubjectedDmg || (!params.ShieldDetermine ? (!params.ShieldTime ? (params.BurningDetermine == true ? 5 : 1) : 0) : 0)
~~~~~~~~~~

</details>

---

<details><summary>Dmg侧设置</summary>

此项可留空，留空默认1

</details>

---

<details><summary>受影响的内容</summary>

>圣遗物/武器/共鸣/环境/其他

| 来源  |  影响名称  |                     详细内容                     |
|:---:|:------:|:--------------------------------------------:|
| 圣遗物 |  逐影猎人  |   依据ChangeHp,SubjectedDmg,HealNumber之和叠加层数   |
| 圣遗物 | 辰砂往生录  |        依据ChangeHp,SubjectedDmg之和叠加层数         |
| 武器  | 静水流涌之辉 | ChangeHp,SubjectedDmg,HealNumber大于1时元素战技伤害提升 |
| 武器  | 万世流涌大典 |   依据ChangeHp,SubjectedDmg,HealNumber之和叠加层数   |
| 武器  |  金流监督  |   依据ChangeHp,SubjectedDmg,HealNumber之和叠加层数   |

>角色

|  来源  |     影响名称     |                     详细内容                      |
|:----:|:------------:|:---------------------------------------------:|
| 莱欧斯利 | 罪业终有报偿之时（天赋） |   依据ChangeHp,SubjectedDmg,HealNumber之和叠加层数    |
| 莱欧斯利 | 予骄暴者以镣锁（命座）  | 依据ChangeHp,SubjectedDmg,HealNumber之和使元素爆发伤害提升 |
| 迪卢克  |   罪罚裁断（命座）   |            依据SubjectedDmg提高攻击力攻击速度            |

</details>

---

##### 相关内容

|   名称    |           转跳           |
|:-------:|:----------------------:|
|   首页    | [params](../params.md) |
| 生命值降低次数 | [params](ChangeHp.md)  |