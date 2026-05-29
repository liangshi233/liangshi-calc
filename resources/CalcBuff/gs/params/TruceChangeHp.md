# TruceChangeHp

### 队伍中后台角色可以变动生命值

---

<details><summary>使用类型</summary>

##### 可用类型

后台角色受到治疗时触发的buff

后台角色生命值提升时触发的buff

后台角色生命值降低时触发的buff

##### 关于后台角色变动生命值buff

此项只是简单的统计是否有能力使后台角色变动生命值

只要拥有同时治疗全队生命值的效果此项就可为true

组队中**队友**包含迪希雅,希格雯等处于后台可受到伤害或后置自我治疗的其他角色也可为true

</details>

---

<details><summary>Buff侧设置</summary>

##### 通用配置
~~~~~~~~~~
params.TruceChangeHp === true ? true : false
~~~~~~~~~~

</details>

---

<details><summary>Dmg侧设置</summary>

此项可留空，留空默认false

</details>

---

<details><summary>受影响的内容</summary>

>圣遗物/武器/共鸣/环境/其他

| 来源  |  影响名称  |         详细内容         |
|:---:|:------:|:--------------------:|
| 武器  | 静水流涌之辉 | 后台角色生命值提升或降低时生命值上限提升 |

</details>

---

##### 相关内容


|  名称   |           转跳            |
|:-----:|:-----------------------:|
|  首页   | [params](../params.md)  |