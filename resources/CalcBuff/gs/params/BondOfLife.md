# BondOfLife Get/Use
### 生命之契 获得数/消耗量

---

<details><summary>使用类型</summary>

##### 可用类型

获得生命之契时触发/叠加的buff
消耗生命之契时触发/叠加的buff

##### 可用举例

|      类型      |                使用举例                 |
|:------------:|:-----------------------------------:|
|   生命之契获得次数   |            BondOfLifeGet            |
|   生命之契降低次数   |         DecreasedBondOfLife         |
|  生命之契已消耗百分比  |            BondOfLifeUse            |
| 生命之契已消耗生命百分比 |      BondOfLifeUse * 200 / 100      |
| 生命之契提升与降低次数  | BondOfLifeGet + DecreasedBondOfLife |

##### 关于生命之契获得数/消耗量buff

生命之契消耗量不计入通过治疗消耗，只计入主动清除
生命之契降低数计入通过治疗消耗数

</details>

---

<details><summary>Buff侧设置</summary>

生命之契获得次数
~~~
params.BondOfLifeGet || 0
~~~
生命之契降低次数
~~~
params.DecreasedBondOfLife || 0
~~~
生命之契已消耗百分比
~~~
params.BondOfLifeUse || 0
~~~

</details>

---

<details><summary>Dmg侧设置</summary>

此项可留空，留空默认无生命之契

</details>

---

<details><summary>受影响的内容</summary>

>圣遗物/武器/共鸣/环境/其他

| 来源  |  影响名称  |                    详细内容                    |
|:---:|:------:|:------------------------------------------:|
| 圣遗物 | 谐律异想断章 | 根据BondOfLifeGet与DecreasedBondOfLife,角色造成的伤害提升 |
| 武器  |   赦罪   |          根据BondOfLifeGet角色造成的伤害提升          |
| 武器  |  白雨心弦  |            根据BondOfLifeGet叠加层数             |

>角色

|  角色  |   影响名称    |                       详细内容                       |
|:----:|:---------:|:------------------------------------------------:|
| 克洛琳德 | 契令的酬偿（天赋） | 生命之契大于100%时根据BondOfLifeGet与DecreasedBondOfLife提升暴击率 |

</details>

---

##### 相关内容

|  名称   |           转跳            |
|:-----:|:-----------------------:|
|  首页   | [params](../params.md)  |