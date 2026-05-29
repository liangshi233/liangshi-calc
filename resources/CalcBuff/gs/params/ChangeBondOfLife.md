# DecreasedBondOfLife
### 生命之契变动次数

---

<details><summary>使用类型</summary>

##### 可用类型

生命之契(提升/降低)时(触发/叠加)的buff

##### 关于生命之契变动次数buff

使用治疗消除生命之契也计算至此项

</details>

---

<details><summary>Buff侧设置</summary>

>使用时优先使用通用配置以保证不同buff显示的值一致

##### 通用配置
~~~~~~~~~~
params.DecreasedBondOfLife || 0
~~~~~~~~~~

</details>

---
<details><summary>Dmg侧设置</summary>

此项可留空，留空默认0

</details>

---

<details><summary>受影响的内容</summary>

>圣遗物/武器/共鸣/环境/其他

| 来源  |  影响名称  |          详细内容          |
|:---:|:------:|:----------------------:|
| 圣遗物 | 谐律异想断章 | 依据DecreasedBondOfLife叠加效果 |

>角色

|  来源  |   影响名称    |          详细内容           |
|:----:|:---------:|:-----------------------:|
| 克洛琳德 | 契令的酬偿（天赋） | 依据DecreasedBondOfLife叠加暴击率 |

</details>

---

##### 相关内容

|  名称   |           转跳            |
|:-----:|:-----------------------:|
|  首页   | [params](../params.md)  |
