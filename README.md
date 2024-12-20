 # liangshi-calc

## 为角色面板功能提供全方位拓展
使用说明（需要安装Miao-Plugin才能使用）

打开Yunzai-Bot 根目录输入

<details><summary>跑路了</summary>
跑路了，有空就更新，没空就没空

![](./resources/LLQ.jpg)

</details>

##### gitee
~~~~~~~~~~
git clone --depth=1 https://gitee.com/liangshi233/liangshi-calc.git ./plugins/liangshi-calc/
~~~~~~~~~~
##### github
~~~~~~~~~~
git clone --depth=1 https://github.com/liangshi233/liangshi-calc.git ./plugins/liangshi-calc/
~~~~~~~~~~
重启Bot后即可启用插件

### 设置
设置请在本插件目录下`config/config.yaml` 修改
>若设置出现问题可删除`config/config.yaml`，重启后会重新生成

###### 计算/评分基础设置
~~~~~~~~~~YAML
calcLiang: true #liangshicalc 基础
calcLiangQ: false #liangshicalc 超全
calcLi: false #liangshicalc 大爷
artisLiang: false #liangshicalc普通评分
artisLiangZ: false #liangshicalc自适应评分
~~~~~~~~~~
###### 其他设置
~~~~~~~~~~YAML
autoRefresh: true #重启后会自动刷新极限、平民等预设面板，默认开启，不需要则改为 false
panelmodel: 1 #自动刷新预设面板的版本，默认使用liangshi，需要自定义请修改为 0
~~~~~~~~~~
更多设置内容请 [点击](config/system/config.md)🤔

### 功能
~~~~~~~~~~
现有的角色更多类型的伤害计算条目
现有的角色提供预设面板以供查看
支持部分角色自定义排行条目
支持部分角色自定义条目名称
支持安装他人伤害计算与评分
~~~~~~~~~~
！希诺宁及往后计算未经实机检验正确性，有问题请在issues中提出

默认支持内容查询 [点击](damage/liangshi-gs/README.md)🤔

<details><summary>安装他人的计算-仅供参考</summary>

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

> 由于个人时间精力有限，后续自带的计算基本不再会更新新角色，建议安装其他仓库的计算避免后续角色无计算

</details>

---

> 其他资源位置

|名称|gitee|github|
|:----:|:----:|:----:|
|Yunzai-Bot | [gitee](https://gitee.com/le-niao/Yunzai-Bot) | [github](https://github.com/le-niao/Yunzai-Bot) |
|Yunzai-Miao| [gitee](https://gitee.com/yoimiya-kokomi/Yunzai-Bot) | [github](https://github.com/yoimiya-kokomi/Yunzai-Bot) |
|Miao-Yunzai | [gitee](https://gitee.com/yoimiya-kokomi/Miao-Yunzai) | [github](https://github.com/yoimiya-kokomi/Miao-Yunzai) |
|Miao-Plugin | [gitee](https://gitee.com/yoimiya-kokomi/miao-plugin) | [github](https://github.com/yoimiya-kokomi/miao-plugin) |