# HealNumber
### 角色受到与自我治疗次数

---

<details><summary>使用类型</summary>

##### 可用类型

生命值受到治疗时触发/叠加的buff

生命值变动时触发/叠加的buff

##### 可用举例

|     类型     |                  使用举例                   |
|:----------:|:---------------------------------------:|
| 生命值提升或降低次数 |  ChangeHp + SubjectedDmg + HealNumber   |
|  角色受到治疗次数  |               HealNumber                |
|  角色自我治疗次数  | HealDetermine === true ? HealNumber : 0 |

</details>

---

<details><summary>Buff侧设置</summary>

>使用时优先使用通用配置以保证不同buff显示的值一致

##### 优先级
手动指定 > 默认

##### 通用配置
~~~~~~~~~~
params.HealNumber || 0
~~~~~~~~~~

</details>

---

<details><summary>Dmg侧设置</summary>

此项可留空，留空默认0

此项在不同场景效果不同

|   角色场景类型   |                         场景举例                         |  场景效果  |
|:----------:|:----------------------------------------------------:|:------:|
| 可主动治疗自己与他人 | HealDetermine === true && HealTeamDetermine === true | 治疗自己次数 |
|   仅可治疗自己   |                HealDetermine === true                | 治疗自己次数 |
|   仅可被治疗    |                          /                           | 被治疗次数  |

</details>

---

<details><summary>受影响的内容</summary>

>圣遗物/武器/共鸣/环境/其他

| 来源  |  影响名称   |                  详细内容                   |
|:---:|:-------:|:---------------------------------------:|
| 圣遗物 |  昔时之歌   |  HealNumber大于0且HealDetermine为true时激活效果  |
| 武器  |  白雨心弦   | HealNumber大于0且HealDetermine为true时叠加一层效果 |
| 武器  | 沙中伟贤的对答 |  HealNumber大于0且HealDetermine为true时触发效果  |
| 武器  |  船坞长剑   |           HealNumber大于0时叠加效果            |
| 武器  |  便携动力锯  |           HealNumber大于0时叠加效果            |
| 武器  |   测距规   |           HealNumber大于0时叠加效果            |
| 武器  |  勘探钻机   |           HealNumber大于0时叠加效果            |
| 武器  |  浪影阔剑   |           HealNumber大于0时激活效果            |
| 武器  |  静谧之曲   |           HealNumber大于0时激活效果            |
| 武器  |  公义的酬报  |           HealNumber大于0时激活效果            |

>角色

|  来源  |     影响名称     |                     详细内容                      |
|:----:|:------------:|:---------------------------------------------:|


</details>

---

##### 相关内容

|   名称   |            转跳             |
|:------:|:-------------------------:|
|   首页   |  [params](../params.md)   |
| 受到伤害次数 | [params](SubjectedDmg.md) |