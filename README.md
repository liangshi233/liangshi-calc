# liangshi-calc

## 安装
> 需要安装Miao-Plugin才能使用

打开Yunzai-Bot 根目录输入

##### gitee
~~~~~~~~~~
git clone --depth=1 https://gitee.com/liangshi233/liangshi-calc.git ./plugins/liangshi-calc/
~~~~~~~~~~

##### github
~~~~~~~~~~
git clone --depth=1 https://github.com/liangshi233/liangshi-calc.git ./plugins/liangshi-calc/
~~~~~~~~~~
   > 如果你的网络环境较差，无法连接到 Github，推荐使用文件代理加速下载服务
   >
   > ```
   > git clone --depth=1 https://git.090708.xyz/https://github.com/liangshi233/liangshi-calc.git ./plugins/liangshi-calc/
   > ```

重启Bot后即可启用插件

----

## 功能

### 一键更新未来角色的数据

<details><summary>点击展开</summary>

> 此功能严禁设置为定时任务，如更新报错或更新数据异常可前往762197317反馈，网络问题自行解决，可在设置ProxyUrl中添加代理。

<details><summary>一键更新新版本内容</summary>

> 此指令仅会更新新版本新加入的内容，如新版本有修改旧内容，可使用指定更新更新对应内容.

> 如果你不知道被修改旧内容ID可使用完整更新（不推荐）覆盖更新所有角色武器等内容至最新版本

~~~
#梁氏一键更新原神新版本数据
~~~

此指令无需使用强制 会自动写入data.json

</details>

<details><summary>更新指定角色</summary>

###### 参考指令（以伊涅芙为例）

~~~~~~~~~~
#更新原神10000116资源数据
~~~~~~~~~~

将数字ID替换为需要更新的角色ID即可

###### 数字ID

数字ID可参考以下规律

| Game |                 数字ID参考                 |      新角色ID规律      |
|:----:|:--------------------------------------:|:-----------------:|
|  原神  | [README](damage/liangshi-gs/README.md) |    已实装最新角色ID+1    |
|  鸣潮  | [README](damage/liangshi-mc/README.md) | 已实装最新对应共鸣属性角色ID+1 |

</details>

<details><summary>更新指定武器</summary>

###### 参考指令（以星序协响为例）

~~~~~~~~~~
#更新鸣潮21050036武器数据
~~~~~~~~~~

将数字ID替换为需要更新的武器ID即可

</details>

<details><summary>更新指定装备</summary>

###### 参考指令（以海之女为例）

~~~~~~~~~~
#更新鸣潮6000160声骸数据
~~~~~~~~~~

将数字ID替换为需要更新的装备(圣遗物/遗器/声骸)ID即可

</details>

<details><summary>更新指定物品</summary>

###### 参考指令（以潮声答谢券为例）

~~~~~~~~~~
#更新鸣潮50006物品数据
~~~~~~~~~~

将数字ID替换为需要更新的装备(圣遗物/遗器/声骸)ID即可

</details>

<details><summary>完整更新全部内容</summary>

> 此指令会覆盖更新所有角色武器装备物品数据，需要非常长的时间，仅在旧内容被大量修改时或一键更新时更新缺失时推荐使用

~~~
#梁氏一键更新鸣潮新版本完整数据
~~~

此指令无需使用强制 会自动写入data.json

> 不支持断点续传，若中途终止再次执行时将重新开始

</details>


##### 数据更新时间

原神: **一般**为版本更新当天20:00~次日8:00左右(如未更新耐心等待即可)

鸣潮: **一般**为版本更新后14天20：00~次日8：00左右(如未更新耐心等待即可)

##### 注意事项

> 使用此功能更新后会导致miao-plugin后续更新出现冲突

默认更新不会将角色自动添加到data.json

在设置中启用AutoUpdateData可使每次更新自动写入data.json

使用强制更新可使当次更新强制添加角色data

> 不建议更新miao-plugin已更新过的角色数据，避免文件被替换

如遇小版本更新(角色数据有修改)，可使用强制更新替换已更新的数据至最新

> 此功能仅更新计算必要的数据，详细角色数据以miao-plugin更新的为准

---

</details>

### 预设面板

<details><summary>点击展开</summary>

默认启用，对Bot输入指令即可使用

~~~
#XX极限面板
#XX辅助面板
#极限XX
#辅助XX
#XX面板100000000
~~~

---

</details>

### 智能组队计算

<details><summary>点击展开</summary>

开启组队计算(calcLiangT)或超全计算后启用

##### 使用面板数据进行组队计算（以阿千艾钟为例）

###### 使用自己的面板数据
~~~~~~~~~~
依次使用（部分队伍使用不同的顺序可能会导致实际伤害误差）
#钟离面板（建议根据上场顺序依次呼出）
#艾梅莉埃面板（一般呼出顺序为：生存位-辅助位-副输出位-主输出位）
#千织面板（部分特殊队伍中的角色可能需要多次呼出）
最后使用（如果缺少某一角色则对应角色buff将使用预设值）
#阿蕾奇诺面板（在队伍中作为主要输出的角色面板必须最后一个呼出）
~~~~~~~~~~
每次使用对应角色面板均会自动更新对应角色组队buff加成

###### 使用他人的面板数据
~~~~~~~~~~
与使用自己的面板数据步骤一致
如果你需要使用他人的圣遗物只需在使用面板时更换即可
例#千织面板换XX圣遗物
不主动使用对应角色面板功能其角色组队buff加成不会变动
即使用过`#千织面板换XX圣遗物`后不使用`#千织面板`，后续组队计算buff均会使用他人圣遗物，不会自动切换为自己的圣遗物
~~~~~~~~~~

##### 注意事项
由于任何人都可以修改其他人的组队buff，伤害异常时建议使用#XX伤害查看组队buff详细并重新刷新异常的buff

---

</details>

### 与liangshi-calc适配的 武器/圣遗物 计算

<details><summary>点击展开</summary>

根据群友素质与个人需求自行选择

#### 武器

将`liangshi-calc\damage\liangshi-gs\weapon`替换至`miao-plugin\resources\meta-gs\weapon`后重启

使用后角色携带的武器将会与角色计算联动，实现更精准的buff，如果同时启用了圣遗物也会和圣遗物同步buff状态（例如攻击次数，元素能量，受攻击次数，血量状态等）避免出现互斥buff

#### 圣遗物

将`liangshi-calc\damage\liangshi-gs\artifact\calc.js`替换至`miao-plugin\resources\meta-gs\artifact\calc.js`后重启

使用后角色携带的圣遗物将会与角色计算联动，实现更精准的buff，如果同时启用了武器也会和武器同步buff状态（例如攻击次数，元素能量，受攻击次数，血量状态等）避免出现互斥buff

---

</details>

### 安装他人的计算

<details><summary>点击展开</summary>

> 参考用的仓库被封了，示例仅供展示

###### 步骤1

使用链接安装示例 - 仅供参考，具体步骤请按对应计算说明中写明方法
~~~~~~~~~~
#更新 + '主页链接' + '游戏名字' + '仓库名字' + 伤害计算

#更新https://gitee.com/liangshi233星铁liangshi伤害计算
~~~~~~~~~~

使用名字安装/更新示例 - 仅供参考，具体步骤请按对应计算说明中写明方法
~~~~~~~~~~
#更新 + '仓库名字' + '游戏名字' + 伤害计算

#更新liangshi星铁伤害计算
~~~~~~~~~~

手动安装示例 - 仅供参考，具体步骤请按对应计算说明中写明方法

~~~~~~~~~~
git clone --depth=1 https://gitee.com/liangshi233/liangshi-sr.git ./plugins/liangshi-calc/damage/liangshi-sr/
~~~~~~~~~~

###### 步骤2

在设置中手动添加-仅供参考，具体步骤请按对应计算说明中的方法
~~~~~~~~~~YAML
calcmodel: liangshi #你安装计算的名字（例如abc-gs，就填abc）
~~~~~~~~~~

###### 步骤3

重启Bot

---

</details>

### 基础功能

<details><summary>点击展开</summary>

#### 更多伤害计算

开启`calcLiang`后启用（默认开启）

启用现有的角色更多类型的伤害计算条目

支持在设置中深度对计算条目场景进行自定义

#### 更多面板评分

开启`artisLiang`后启用（默认关闭）

> 此功能暂时关闭，待计算重置稳定后继续更新

启用现有的角色更多流派的评分规则

---

</details>

> 更多功能敬请期待

---

## 设置

### 关闭来自liangshi-calc的星铁相关功能

<details><summary>点击展开</summary>

在插件目录下`config/config.yaml` 中添加

~~~~~~~~~~YAML
SrDisabled: true
~~~~~~~~~~

添加完成后重启即可

---

</details>

### 自定义计算条目数量与内容

<details><summary>点击展开</summary>

> 使用此功能需先开启 calcLiangK

#### 1. (如果从未进行过条目自定义) 先初始化自定义配置

选择一个模板作为基础替换自定义配置文件使用以下指令自动替换

支持(基础|极简|组队|队伍|空白)

~~~~~~~~~~
#重置计算条目为基础
~~~~~~~~~~

#### 2. 查看当前设置的自定义配置

使用以下指令查看指定角色当前配置的计算条目(以迪奥娜为例)

~~~~~~~~~~
#查看原神迪奥娜计算条目
~~~~~~~~~~

#### 3. 修改自定义配置

手动前往文件config/calc.json中修改 **或** 使用以下自动方法修改

添加一个希望展示的条目(以0为例)

~~~~~~~~~~
#增加原神迪奥娜计算条目0
~~~~~~~~~~

> 注意最新添加的条目会显示在最后，条目数字由0开始计数

移除一个不想要的条目(以0为例)
~~~~~~~~~~
#移除原神迪奥娜计算条目0
~~~~~~~~~~

#### 4. 重启

修改完自己想要的配置后重启即可使用自定义配置

<details><summary>演示(会了就不用看)</summary>

###### 初始化配置为组队计算 (即使用组队计算作为基础模板编辑)
~~~~~~~~~~
#重置计算条目为组队
~~~~~~~~~~

###### 在`迪奥娜`的计算中添加计算条目`短按E护盾`
~~~~~~~~~~
#增加原神迪奥娜计算条目15
~~~~~~~~~~

###### 在`迪奥娜`的计算中删除计算条目`高空下落攻击伤害`
~~~~~~~~~~
#移除原神迪奥娜计算条目8
~~~~~~~~~~

</details>

---

</details>


### 自定义计算条目显示方式

<details><summary>点击展开</summary>

通用设置，在`config/config.yaml` 中修改


<details><summary>单种形式显示</summary>

~~~~~~~~~~YAML
namemodel: 1
~~~~~~~~~~

用1位数字配置，将影响所有liangshi-calc计算显示

`0` 伤害条目名称将使用默认设置名称
>举例： 普通攻击一段伤害 / 海月之誓伤害 / 琉金火光爆炸伤害 / 提八妲钟 Q落雷

`1` 伤害条目将使用完整名称
>举例： 弦月舞步一段伤害 / 海月之誓伤害 / 琉金火光爆炸伤害 / 提八妲钟 大密法·天狐显真落雷

`2` 伤害条目将简化小部分名称
>举例： 普通攻击一段伤害 / 海月之誓伤害 / 琉金火光爆炸伤害 / 提八妲钟 大密法·天狐显真落雷

`3` 伤害条目将使用通俗叫法
>举例： 普通攻击一段伤害 / 元素战技伤害 / 元素爆发爆炸伤害 / 提八妲钟 元素爆发落雷

`4` 伤害条目将使用字母简化名称
>举例： 普攻一段伤害 / E技能伤害 / Q技能爆炸伤害 / 提八妲钟 Q技能落雷

`5` 伤害条目将使用纯字母名称显示
>举例： A一段伤害 / E伤害 / Q爆炸伤害 / 提八妲钟 Q落雷

</details>

<details><summary>[x] xx 形式显示</summary>

~~~~~~~~~~YAML
namemodel: 51
~~~~~~~~~~

使用2位数字配置，首位为方括号内容设置，末位为括号外显示内容

（可随意组合，以下为举例）

`50`同时显示纯字母与默认设置名称
>举例：[C2]二命人偶切斩 / [Z]重击伤害 / [Q]琉金火光爆炸伤害 / [A]普通攻击一段伤害

`41`同时显示字母简化与完整名称
>举例：[二命]落染五色人偶切斩 / [重]重击伤害 / [Q技能]琉金火光爆炸伤害 / [普攻]弦月舞步一段伤害

`51`同时显示纯字母与完整名称
>举例：[C2]落染五色人偶切斩 / [Z]重击伤害 / [Q]琉金火光爆炸伤害 / [A]弦月舞步一段伤害

</details>

---

</details>


### 自定义计算排行规则

<details><summary>点击展开</summary>

#### 通用排行规则

通用设置，在`config/config.yaml` 中修改

~~~~~~~~~~YAML
rankingOnemodel: m #首选通用排行规则
rankingTwomodel: hps #次选通用排行规则
rankingThreemodel: dps #备选通用排行规则
~~~~~~~~~~

如果没有对角色单独设定排行规则将会自动使用通用规则

#### 独立排行规则

独立设置，在`config\ranking.json` 中修改（文件删除后重启会重新生成）

打开文件找到需要修改的角色更改其排行规则

---

</details>

### 自定义预设面板

<details><summary>点击展开</summary>

通用设置，在`config/config.yaml` 中修改

~~~~~~~~~~YAML
autoRefresh: true #重启后会自动刷新极限、平民等预设面板，默认开启，不需要则改为 false
panelmodel: 1 #自动刷新预设面板的版本，默认使用liangshi，需要自定义请修改为 0
~~~~~~~~~~

---

</details>

### 预设计算配置

<details><summary>点击展开</summary>

> true启用 / false禁用

通用设置，在`config/config.yaml` 中修改

~~~~~~~~~~YAML
calcLiang: true #liangshicalc 基础（启用此项才可启用其他配置）
calcLiangQ: false #liangshicalc 超全
calcLiangJ: false #liangshicalc 极简
calcLiangT: false #liangshicalc 组队
calcLiangK: false #liangshicalc 自定义（详细自定义在[自定义计算条目数量与内容]中查看）
calcLi: false #liangshicalc 大爷
~~~~~~~~~~

---

</details>

> 更多设置内容请 [点击](config/system/config.md)🤔（重制中）

通用设置请在本插件目录下`config/config.yaml` 修改

> 若设置出现问题可删除`config/config.yaml`重启后会重新生成

---

## 关于 Pull Requests 与 lssues

<details><summary>点击展开</summary>

建议在Gitee中创建，GitHub中不一定会及时查看

PR自定义计算条目时请将你的条目放置于`CalcData.js`中**AllCalc**的末尾(如果此角色计算还未重制则无此限制)

添加条目后在对应的配置文件中添加展示位置（基础计算不宜超过9个，极简计算不宜超过2个，超全与组队计算无限制）

<details><summary>演示(会了就不用看)</summary>

以`砂糖`添加`赛夜砂伊 队友提升精通`为例

###### 1.将你的条目复制到对应角色的`CalcData.js`中

将条目

~~~
, 
  {
    title: '赛夜砂伊 队友提升精通',
    dmgKey: 'f',
    params: { WaterAttachment: true, MineAttachment: true, ShieldTime: 20, TruceTime: 8, SkillsHit: 1, SkillsDmg: 1, team: true, ElementSame: 1, ElementDifferent: 3, LiyueTeammate: 1, NatlanTeammate: 1, ElementWindTeam: 1, ElementMineTeam: 2, ElementWaterTeam: 1, EnergyTeammate: 290, Cyno: true, Ye_Lan: true, Ineffa: true },
    dmg: ({ calc, attr }) => {
      return {
        avg: calc(attr.mastery) * 0.2 + 50
      }
    }
  }
~~~

添加至`liangshi-calc\damage\liangshi-gs\砂糖\CalcData.js`中AllCalc的末尾（无论是什么类型的条目）

添加完成后应为以下格式

~~~
.....省略
      recordData(`./plugins/liangshi-calc/damage/liangshi-gs/${CharacterName}/TeamData.json`, uid, TData, CharacterName)
      return T1r1Dmg
    }
  }, 
  {
    title: '赛夜砂伊 队友提升精通',
    dmgKey: 'f',
    params: { WaterAttachment: true, MineAttachment: true, ShieldTime: 20, TruceTime: 8, SkillsHit: 1, SkillsDmg: 1, team: true, ElementSame: 1, ElementDifferent: 3, LiyueTeammate: 1, NatlanTeammate: 1, ElementWindTeam: 1, ElementMineTeam: 2, ElementWaterTeam: 1, EnergyTeammate: 290, Cyno: true, Ye_Lan: true, Ineffa: true },
    dmg: ({ calc, attr }) => {
      return {
        avg: calc(attr.mastery) * 0.2 + 50
      }
    }
  }]
~~~

###### 2.根据你添加条目所属类型找到对应配置

> 基础计算`BasicCalc.json`，  极简计算`ConciseCalc.json`，  组队计算`TeamCalc.json`

找到对应类型的计算配置中的对应角色

例`赛夜砂伊 队友提升精通`属于组队计算，找到`liangshi-calc\damage\liangshi-gs\data\TeamCalc.json`中的砂糖

根据你想显示的位置将刚刚添加的条目的序号（添加在最后默认为条目总数-1）添加至对应位置

~~~
//显示在组队计算第一个
  "砂糖": [21, 18, 19, 20],
//显示在组队计算最后一个
  "砂糖": [18, 19, 20, 21],
~~~

> 如不设置此项则此条目为隐藏条目，他人仅可使用指令`#增加原神砂糖计算条目21`后在自定义中使用

###### 3.根据你添加条目添加排名规则(如果配置了排名Key)

> 基础计算`BasicMiss.json`，  极简计算`ConciseMiss.json`，  组队计算`TeamMiss.json`

找到对应类型的排名规则配置，移除你配置的key

例`liangshi-calc\damage\liangshi-gs\data\TeamCalc.json`中的砂糖，将其配置中的`r`移除

如果需要将此条目设置为默认排名规则则在`liangshi-calc\damage\liangshi-gs\data\Ranking.json`找到对应角色修改

###### 4.重启后试验是否添加正确

重启后正常显示即可提交PR（一般6~14小时，看到了就会通过）

</details>

</details>

---
## 其他资源位置

> 鸣潮数据库 [meta-mc](https://gitee.com/liangshi233/meta-mc) | 原神数据库 [meta-gs](https://gitee.com/Ke_Akatsuki/meta-gs)

|     名称      |                         gitee                         |                         github                          |
|:-----------:|:-----------------------------------------------------:|:-------------------------------------------------------:|
| Yunzai-Bot  |     [gitee](https://gitee.com/le-niao/Yunzai-Bot)     |     [github](https://github.com/le-niao/Yunzai-Bot)     |
| Yunzai-Miao | [gitee](https://gitee.com/yoimiya-kokomi/Yunzai-Bot)  | [github](https://github.com/yoimiya-kokomi/Yunzai-Bot)  |
| Miao-Yunzai | [gitee](https://gitee.com/yoimiya-kokomi/Miao-Yunzai) | [github](https://github.com/yoimiya-kokomi/Miao-Yunzai) |
| Miao-Plugin | [gitee](https://gitee.com/yoimiya-kokomi/miao-plugin) | [github](https://github.com/yoimiya-kokomi/miao-plugin) |
