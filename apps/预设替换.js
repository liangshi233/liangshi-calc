import { Character } from '../../miao-plugin/models/index.js'

/**
 * 预设面板替换关键词
 * 顺序不可乱，对应10000000-100000005
 */
const replace_list = [
  '极限',
  '核爆',
  '辅助',
  '平民',
  '毕业',
  '试用'
]

export class ysmb_input_replace extends plugin {
  constructor () {
    super({
      name: '预设面板',
      dsc: '预设面板输入替换',
      event: 'message',
      priority: -10000,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '^#?预设面板(帮助|说明)?$', // 匹配消息正则，命令正则
          /** 执行方法 */
          fnc: 'ysmb'
        }
      ]
    })
  }

  async accept (e) {
    let reg = RegExp(replace_list.join('|'))
    if (!reg.test(e.msg) || /添加|删除|表情/.test(e.msg)) return false
    let msg = /换/.test(e.msg) ? e.msg.split('换') : [e.msg]
    if (replace_list.includes(msg[0])) return false
    let result = this._replace(msg)
    let Msg = result[0].replace(/#(星铁)?/g, '')
    if (reg.test(msg[0])) {
      let uid = Msg.match(/\d+/)
      let name = Msg.replace(uid, '')
      let char = Character.get(name.replace(/面板|圣遗物|伤害|武器/g, ''), e.isSr ? 'sr' : 'gs')
      if (!char && !/面板/.test(Msg)) return false
      result[0] = `#${name}${/面板|圣遗物|伤害|武器/.test(Msg) ? '' : '面板'}${uid}`
    }
    e.msg = msg.length > 1 ? result.slice(0).join('换') : result[0]
  }

  _replace (msg) {
    let Msg = []
    msg.forEach(i => {
      let idx = replace_list.findIndex(k => i.includes(k))
      Msg.push(idx !== -1 ? i.replace(replace_list[idx], `10000000${idx}`) : i)
    })
    return Msg
  }

  // 预设面板说明
  async ysmb () {
    const help = [
      '【预设面板使用帮助】',
      '#**极限面板',
      '查看该角色理论最高期望伤害面板',
      '#**核爆面板',
      '查看该角色理论最高伤害面板',
      '#**辅助面板',
      '查看该角色理论最高辅助能力面板',
      '#**平民面板',
      '查看该角色约20个有效词条的基本参考面板',
      '#**毕业面板(咕咕中，尽快完成）',
      '查看该角色约28个有效词条的基本毕业面板',
      '#**试用面板(咕咕中，尽快完成）',
      '查看该角色在试用秘境中的面板',
      '不输入角色名可查看该指令已支持的角色',
      '(星铁暂只支持极限面板请等待后续更新)'
    ]
    await this.e.reply(help.join('\n'))
    return true
  }
}
