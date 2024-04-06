# liangshi-calc

## 为角色面板功能提供全方位拓展
使用说明（需要安装Miao-Plugin才能使用）

打开Yunzai-Bot 根目录输入
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
autoRestart: false #发送【梁氏启动】后会自动进行重启，默认关闭，需要则改为 true
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

---

> 其他资源位置

|                              线路一（不是😺                         |                               线路二（不是😺                       |          名称       |
|:-----------------------------------------------------------------:|:---------------------------------------------------------------:|:------------------:|
|      [PlugLib](https://qsyhh.icu/xmdz)                            |    [PlugLib](https://qsyhh.icu/xmdz)                            | 插件库              |
|      [gitee](https://gitee.com/liangshi233/presets-panel)         |    [gitee](https://gitee.com/liangshi233/presets-panel)         | 预设面板JS版         |
|      [gitee](https://gitee.com/yoimiya-kokomi/Miao-Yunzai)        |    [github](https://github.com/yoimiya-kokomi/Miao-Yunzai)      | Miao-Yunzai        |
|      [gitee](https://gitee.com/yoimiya-kokomi/Yunzai-Bot)         |    [github](https://github.com/yoimiya-kokomi/Yunzai-Bot)       | Yunzai-Bot-Miao    |
|      [gitee](https://gitee.com/le-niao/Yunzai-Bot)                |    [github](https://github.com/le-niao/Yunzai-Bot)              | Yunzai-Bot-Le      |
|      [gitee](https://gitee.com/yoimiya-kokomi/miao-plugin)        |    [github](https://github.com/yoimiya-kokomi/miao-plugin)      | miao-plugin        |
|                          制作中预计5月上线                           |                         制作中预计5月上线                          | liangshi-calc-pro  |