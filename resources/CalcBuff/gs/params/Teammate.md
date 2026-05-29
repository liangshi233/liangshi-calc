# *Teammate

### 队伍角色类型配置

---

<details><summary>使用类型</summary>

##### 可用类型

依据队伍中不同地区的角色数触发/叠加的buff

依据队伍中不同属性的角色数触发/叠加的buff

依据队伍中指定属性的角色数触发/叠加的buff

##### 关于队伍角色类型配置buff

此项统计包括角色自身

</details>

---

<details><summary>Buff侧设置</summary>

队伍中存在的元素类型总数(去除角色本身元素后为与角色不同的元素类型总数)

~~~
[params.ElementGrassTeam, params.ElementIceTeam, params.ElementWaterTeam, params.ElementFireTeam, params.ElementMineTeam, params.ElementRockTeam, params.ElementWindTeam]filter(element => element >= 1).length
~~~

队伍中存在与自己元素类型相同的角色数
~~~
params.Element*Team - 1
~~~

</details>

---

<details><summary>Dmg侧设置</summary>

此项可留空，留空默认0

按实际设置即可

如有**视为**效果则按转换后设置

</details>

---

<details><summary>受影响的内容</summary>

>圣遗物/武器/共鸣/环境/其他

| 来源 |  影响名称  |                详细内容                |
|:--:|:------:|:----------------------------------:|
| 武器 |  星鹫赤羽  |      ElementDifferent大于0时叠加效果      |
| 武器 | 最初的大魔术 | 依据ElementDifferent和ElementSame获得效果 |
| 武器 |  千夜浮梦  | 依据ElementDifferent和ElementSame获得效果 |
| 武器 | 乘浪的回旋  |       依据ElementWaterTeam叠加效果       |
| 武器 |   碎链   |        依据NatlanTeammate叠加效果        |
| 武器 |  峡湾长歌  |      ElementDifferent大于0时叠加效果      |
| 武器 |  千岩古剑  |        依据LiyueTeammate叠加效果         |
| 武器 |  千岩长枪  |        依据LiyueTeammate叠加效果         |

</details>

---

##### 相关内容


|  名称   |           转跳            |
|:-----:|:-----------------------:|
|  首页   | [params](../params.md)  |