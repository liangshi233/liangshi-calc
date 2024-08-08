# liangshi-calc

## 为角色面板功能提供全方位拓展
使用说明（需要安装Miao-Plugin才能使用）

打开Yunzai-Bot 根目录输入

<details><summary>跑路了</summary>

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
~~~~~~~~~~
支持内容查询 [点击](damage/README.md)🤔

---

> 其他资源位置

* qsyhh的插件库： [PlugLib](https://qsyhh.icu/xmdz)
* Yunzai-Bot 乐乐乐原版： [gitee](https://gitee.com/le-niao/Yunzai-Bot) [github](https://github.com/le-niao/Yunzai-Bot)
* Yunzai-Bot Miao版：[gitee](https://gitee.com/yoimiya-kokomi/Yunzai-Bot) [github](https://github.com/yoimiya-kokomi/Yunzai-Bot)
* Miao-Yunzai [gitee](https://gitee.com/yoimiya-kokomi/Miao-Yunzai) [github](https://github.com/yoimiya-kokomi/Miao-Yunzai)
* Miao-Plugin [gitee](https://gitee.com/yoimiya-kokomi/miao-plugin) [github](https://github.com/yoimiya-kokomi/miao-plugin)
* 鸣潮插件 [gitee](https://gitee.com/qsyhh/mc-wiki)
* 预设面板JS版 [gitee](https://gitee.com/liangshi233/presets-panel)