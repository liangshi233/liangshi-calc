import plugin from '../../../lib/plugins/plugin.js'

/**
 * 已知问题
 * 更新鸣潮角色数据时角色天赋顺序会被打乱
 * 更新鸣潮声骸数据时会丢失代号数据
 *
 * 如果有新的问题建议去issue反馈
 */

export class calc extends plugin {
    constructor () {
      super(
        {
          name: 'liangshicalc',
          dsc: 'liangshicalc拓展',
          event: 'message',
          priority: 5000,
          rule: [
            {
              reg: '^#*(梁氏|liangshi)?检查(鸣潮|明朝|潮|mc|MC)更新$',
              fnc: 'VerNew'
            },
            {
              reg: '^#*(梁氏|liangshi)?一键更新(原神|原|ys|YS|gs|GS|鸣潮|明朝|潮|mc|MC|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR)(最|当前最)?新版本(完整|全部)?(角色|共鸣者|武器|光锥|圣遗物|声骸|遗器|物品|材料|敌人|敌怪|怪物|残响|残像|boss|BOSS)?(数据|资源|内容|资源数据)$',
              fnc: 'New'
            },
            {
              reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)(角色|共鸣者)(数据|资源|资源数据)?$',
              fnc: 'CharacterNew'
            },
            {
              reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)(圣遗物|声骸|遗器)(数据|资源|资源数据)?$',
              fnc: 'ArtifactNew'
            },
            {
              reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)(武器|光锥)(数据|资源|资源数据)?$',
              fnc: 'WeaponNew'
            },
            {
              reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)物品(数据|资源|资源数据)?$',
              fnc: 'ItemNew'
            },
            {
              reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)(敌人|敌怪|怪物|残响|残像|boss|BOSS)(数据|资源|资源数据)?$',
              fnc: 'MonsterNew'
            }
          ]
        }
      )
    }

    async New (e) {
        if (!e.isMaster) {
            e.reply('你不可以更新哦~(*/ω＼*)')
            return false
        } else {
            e.reply('功能重做中~(*/ω＼*)')
            return false
        }
    }

    async CharacterNew (e, mode) {
        if (!e.isMaster) {
            e.reply('你不可以更新哦~(*/ω＼*)')
            return false
        } else {
            e.reply('功能重做中~(*/ω＼*)')
            return false
        }
    }

    async WeaponNew (e, mode) {
        if (!e.isMaster) {
            e.reply('你不可以更新哦~(*/ω＼*)')
            return false
        } else {
            e.reply('功能重做中~(*/ω＼*)')
            return false
        }
    }

    async ArtifactNew (e, mode) {
        if (!e.isMaster) {
            e.reply('你不可以更新哦~(*/ω＼*)')
            return false
        } else {
            e.reply('功能重做中~(*/ω＼*)')
            return false
        }
    }

    async MonsterNew (e, mode) {
        if (!e.isMaster) {
            e.reply('你不可以更新哦~(*/ω＼*)')
            return false
        } else {
            e.reply('功能重做中~(*/ω＼*)')
            return false
        }
    }

    async ItemNew (e, mode, JsonOk) {
        if (!e.isMaster) {
            e.reply('你不可以更新哦~(*/ω＼*)')
            return false
        } else {
            e.reply('功能重做中~(*/ω＼*)')
            return false
        }
    }

    async VerNew (e) {
        e.reply('功能重做中~(*/ω＼*)')
        return false
    }
}