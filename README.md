# liangshi-calc

#### liangshi-calc是一个Miao-Plugin的面板拓展插件
使用说明（需要安装Miao-Plugin才能使用）
~~~~~~~~~~
#打开Yunzai-Bot 根目录输入

//gitee
git clone --depth=1 https://gitee.com/liangshi233/liangshi-calc.git ./plugins/liangshi-calc/

//github
git clone --depth=1 https://github.com/liangshi233/liangshi-calc.git ./plugins/liangshi-calc/

#重启Bot载入插件发送
#梁氏启动
即可启用插件，需再次重启
（更新插件可使用 #梁氏更新 ）
（建议使用 #全部更新 来更新，看到本插件同步更新后再替换，避免与miao-plugin版本不一致替换后直接爆炸）

~~~~~~~~~~
### 设置
请在本插件目录下`config/config.yaml` 修改设置
~~~~~~~~~~YAML
autoRestart: false #发送【梁氏启动】后会自动进行重启，默认关闭，需要则改为 true

autoRefresh: true #重启后会自动刷新极限、平民等预设面板，默认开启，不需要则改为 false

panelmodel: 1 #自动刷新预设面板的版本，默认使用liangshi，需要自定义请修改为 0
~~~~~~~~~~
如果您也有持续更新极限面板的意愿可联系我们将您的预设面板加入其中以便持续更新

### 功能
~~~~~~~~~~
现有的角色更多的伤害计算条目

开启基本面板方法：#喵喵设置梁氏计算开启(默认开启)
开启超全面板方法：#喵喵设置超全计算开启

现有的角色更多的评分规则
开启基本评分方法：#喵喵设置梁氏评分开启
开启自适应评分方法：#喵喵设置自动评分开启(等待后续更新)

现有的角色预设的面板数据
开启预设面板方法：#梁氏刷新预设面板(默认开启)

支持旅行者各元素的极限面板
使用方法：#主角面板换*元素 #*元素极限面板

添加了用于测试的白板武器（需要手动替换启用）
使用方法：#甘雨面板换测试弓箭一档攻击

~~~~~~~~~~
---

> 其他资源位置

|                              gitee                                |                               github                            |          名称       |
|:-----------------------------------------------------------------:|:---------------------------------------------------------------:|:------------------:|
|      [gitee](https://gitee.com/yoimiya-kokomi/Miao-Yunzai)        |    [github](https://github.com/yoimiya-kokomi/Miao-Yunzai)      | Miao Zai           |
|      [gitee](https://gitee.com/yoimiya-kokomi/Yunzai-Bot)         |    [github](https://github.com/yoimiya-kokomi/Yunzai-Bot)       | Miao-Yunzai        |
|      [gitee](https://gitee.com/le-niao/Yunzai-Bot)                |    [github](https://github.com/le-niao/Yunzai-Bot)              | Yunzai-Bot         |
|      [gitee](https://gitee.com/yoimiya-kokomi/miao-plugin)        |    [github](https://github.com/yoimiya-kokomi/miao-plugin)      | miao-plugin        |