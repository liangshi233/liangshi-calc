# ShieldTime
### 角色处于护盾下的时间

---

<details><summary>使用类型</summary>

##### 可用类型

角色处于护盾下触发/叠加的buff

角色不处于护盾下触发/叠加的buff

##### 关于处于护盾下buff

处于结晶/场景护盾不计入此项

此项大于0时会导致受到伤害的默认值为0

</details>

---

<details><summary>Buff侧设置</summary>

>使用时优先使用通用配置以保证不同buff显示的值一致

##### 通用配置
~~~~~~~~~~
params.ShieldTime || 0
~~~~~~~~~~

</details>

---

<details><summary>Dmg侧设置</summary>

此项可留空，留空默认0

>一般设置为护盾最大持续时间的50%

</details>

---

<details><summary>受影响的内容</summary>

>圣遗物/武器/共鸣/环境/其他

|  来源  | 影响名称  |                详细内容                |
|:----:|:-----:|:----------------------------------:|
| 圣遗物  | 逆飞的流星 |     ShieldTime大于0时普攻重击伤害提高40%      |
| 元素共鸣 | 坚定之岩  | ShieldTime大于0时伤害提高15%,敌人岩元素抗性降低20% |
|  武器  | 苇海信标  |       ShieldTime大于0失去生命值提高效果       |
|  武器  | 斫峰之刃  |         ShieldTime大于0时效果翻倍         |
|  武器  | 无工之剑  |         ShieldTime大于0时效果翻倍         |
|  武器  | 尘世之锁  |         ShieldTime大于0时效果翻倍         |
|  武器  | 贯虹之槊  |         ShieldTime大于0时效果翻倍         |
|  武器  | 厄水之祸  |     ShieldTime大于0时效果普攻重击伤害暴击提高     |
|  武器  |  钟剑   |         ShieldTime大于0时伤害提高         |

</details>

---

##### 相关内容

|   名称   |            转跳             |
|:------:|:-------------------------:|
|   首页   |  [params](../params.md)   |
| 受到伤害次数 | [params](SubjectedDmg.md) |