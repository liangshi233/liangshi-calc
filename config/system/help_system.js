/*
* 此配置文件为系统使用，请勿修改，否则可能无法正常使用
*
* 如需自定义配置请复制修改上一级help_default.js
*
* */

export const helpCfg = {
  title: '梁氏帮助',
  subTitle: 'Yunzai-Bot & liangshi-calc',
  columnCount: 3,
  colWidth: 280,
  theme: 'all',
  themeExclude: ['default'],
  style: {
    fontColor: '#ceb78b',
    descColor: '#eee',
    contBgColor: 'rgba(6, 21, 31, .5)',
    contBgBlur: 3,
    headerBgColor: 'rgba(6, 21, 31, .4)',
    rowBgColor1: 'rgba(6, 21, 31, .2)',
    rowBgColor2: 'rgba(6, 21, 31, .35)'
  }
}

export const helpList = [
  {
    "group": "功能类指令",
    "list": [
      {
        "icon": 79,
        "title": "#梁氏帮助",
        "desc": "查看本页面"
      },
      {
        "icon": 71,
        "title": "#原神预下载",
        "desc": "查看最近一次预下载的储存占用情况"
      },
      {
        "icon": 86,
        "title": "#原神4.0版本占用",
        "desc": "查看该版本在各平台的储存占用情况"
      }
    ]
  },
  {
    "group": "预设面板帮助",
    "list": [
      {
        "icon": 58,
        "title": "#刻晴极限面板",
        "desc": "查看该角色理论极限面板"
      },
      {
        "icon": 59,
        "title": "#胡桃核爆面板",
        "desc": "查询该角色核爆极限面板"
      },
      {
        "icon": 60,
        "title": "#心海辅助面板",
        "desc": "查询该角色辅助极限面板"
      },
      {
        "icon": 58,
        "title": "#刻晴平民面板",
        "desc": "查询该角色平民面板（20词条）"
      },
      {
        "icon": 59,
        "title": "#胡桃毕业面板",
        "desc": "查询该角色毕业面板（28词条）"
      },
      {
        "icon": 60,
        "title": "#心海试用面板",
        "desc": "查询该角色在试用中的面板"
      },
      {
        "icon": 57,
        "title": "#神里绫华难民面板",
        "desc": "查询该角色难民面板（0词条）"
      },
      {
        "icon": 45,
        "title": "*姬子极限面板",
        "desc": "查看星铁角色理论极限面板"
      },
      {
        "icon": 53,
        "title": "#试用面板",
        "desc": "查看对应类型面板支持哪些角色"
      }
    ]
  },
  {
    "group": "面板替换类帮助",
    "list": [
      {
        "icon": 24,
        "title": "#主角面板换岩元素",
        "desc": "查看其他属性主角的伤害计算"
      },
      {
        "icon": 21,
        "title": "#琴面板换测试短剑一档攻击",
        "desc": "切换至5星白板武器"
      },
      {
        "icon": 80,
        "title": "#主角面板换派蒙",
        "desc": "圣遗物详细调试计算"
      }
    ]
  },
  {
    "group": "将在未来上线的功能",
    "list": [
      {
        "icon": 43,
        "title": "#雷萤术士面板",
        "desc": "原魔面板"
      },
      {
        "icon": 35,
        "title": "#活动查询列表",
        "desc": "历史版本活动ID列表"
      },
      {
        "icon": 34,
        "title": "#活动战绩+ID",
        "desc": "历史版本活动战绩查询"
      }
    ]
  },
  {
    "group": "管理命令，仅管理员可用",
    "auth": "master",
    "list": [
      {
        "icon": 31,
        "title": "#梁氏启动",
        "desc": "更新需要替换的文件"
      },
      {
        "icon": 79,
        "title": "#梁氏版本",
        "desc": "查看近期更新内容"
      },
      {
        "icon": 31,
        "title": "#重置预设面板",
        "desc": "自动替换预设面板文件"
      },
      {
        "icon": 29,
        "title": "#梁氏更新",
        "desc": "更新本插件"
      }
    ]
  }
]

export const isSys = true
