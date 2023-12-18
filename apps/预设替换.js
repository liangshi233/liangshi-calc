/**
 * 预设面板替换关键词
 * 顺序不可乱，对应10000000-100000005
 */
const replace_list = {
  极限: '极限',
  核爆: '核爆',
  辅助: '辅助',
  平民: '平民',
  毕业: '毕业',
  试用: '试用'
}

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
    for (let key in replace_list) {
      try {
        let reg = RegExp(key)
        if (!reg.test(e.msg)) continue
        let msg = e.msg.split('换')
        if (msg.length > 1) {
          let msgone = await set(e, msg[0], true)
          let msgtwo = await set(e, msg[1], false)
          e.msg = msgone + '换' + msgtwo
        } else {
          e.msg = await set(e, e.msg, true)
        }
      } catch (err) { }
    }
    return false
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

async function set (e, msg, s) {
  msg = msg.replace(/#|极限|核爆|辅助|平民|毕业|试用|详情|详细/g, '')
  const keywords = Object.keys(replace_list)
  if (keywords.includes(e.msg)) return e.msg

  const mb = `${msg}${/伤害|圣遗物|武器|面板/.test(e.msg) ? '' : '面板'}`
  keywords.forEach((v, k) => {
    let reg = new RegExp(v)
    if (reg.test(e.msg)) {
      if (s) msg = `#${mb}10000000${k}`
      else msg = `10000000${k}${msg}`
    }
  })
  return msg
}
