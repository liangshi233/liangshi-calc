# PrimordialDetermine

### 角色是否具有始基力

---

<details><summary>使用类型</summary>

##### 关于是否具有始基力buff

截止目前(5.2)，是否具有始基力buff对伤害计算没有任何影响

没有任何增益buff会需要始基力触发/叠层,仅武器水仙十字剑需要判断此项

</details>

---

<details><summary>Buff侧设置</summary>

##### 通用配置
~~~~~~~~~~
params.PrimordialDetermine === * ? true : false
~~~~~~~~~~

</details>

---

<details><summary>Dmg侧设置</summary>

此项可留空，留空默认false

|  效果  |   设置   |
|:----:|:------:|
| 无始基力 | false  |
|  荒性  | ousia  |
|  芒性  | pneuma |
| 圣俗杂座 |  true  |

</details>

---

<details><summary>受影响的内容</summary>

>圣遗物/武器/共鸣/环境/其他

| 来源 | 影响名称  |          详细内容           |
|:--:|:-----:|:-----------------------:|
| 武器 | 水仙十字剑 | 角色没有始基力时普攻重击下落攻击附加始基力冲击 |

</details>

---

##### 相关内容


|  名称   |           转跳            |
|:-----:|:-----------------------:|
|  首页   | [params](../params.md)  |