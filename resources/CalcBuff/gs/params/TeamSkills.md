# Team Skills/Burst
### 队友释放技能数

---

<details><summary>使用类型</summary>

##### 可用类型

队友释放对应技能时触发/叠加的buff


</details>

---

<details><summary>Buff侧设置</summary>

##### 通用配置
~~~~~~~~~~
params.TeamSkills || 0
~~~~~~~~~~

~~~~~~~~~~
params.TeamBurst || 0
~~~~~~~~~~

</details>

---
<details><summary>Dmg侧设置</summary>

此项可留空，留空默认0

</details>

---

<details><summary>受影响的内容</summary>

>圣遗物/武器/共鸣/环境/其他

| 来源  |  影响名称  |         详细内容         |
|:---:|:------:|:--------------------:|
| 武器  | 波乱月白经津 |  TeamSkills大于0时叠加效果  |
| 武器  |  镇山之钉  | TeamSkills大于0时效果额外提升 |

</details>

---

##### 相关内容

|  名称   |           转跳            |
|:-----:|:-----------------------:|
|  首页   | [params](../params.md)  |