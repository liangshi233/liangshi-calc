# liangshi-calc

#### liangshi-calc是一个Miao-Plugin的面板拓展插件
使用说明（需要安装Miao-Plugin才能使用）
~~~~~~~~~~
#打开Yunzai-Bot 根目录输入

git clone --depth=1 https://gitee.com/liangshi233/liangshi-calc.git ./plugins/liangshi-calc/

#将目录下replace文件夹中的cfg_system.js放置于plugins\miao-plugin\config\system内
#将目录下replace文件夹中的ProfileDmg.js放置于plugins\miao-plugin\models内
#在plugins\miao-plugin\config\cfg.js 中添加
 export const teamLiang = true 
#或直接使用目录replace文件夹中的cfg.js替换
#重启Yunzai-Bot即可使用

~~~~~~~~~~
功能
~~~~~~~~~~
现有的角色更多的伤害计算条目
支持旅行者各元素的伤害计算
添加了用于测试的白板武器
添加了预设面板（原极限面板）
~~~~~~~~~~
后续会添加的功能
~~~~~~~~~~
对每个角色不同玩法的圣遗物评分细化（暂时只支持2月14日 03:47 之前的 miao-plugin  ）
米游社历史活动战绩展示（例如海岛宝箱）
~~~~~~~~~~