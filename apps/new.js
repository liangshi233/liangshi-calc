import plugin from '../../../lib/plugins/plugin.js'
import common from '../../../lib/common/common.js'
import { Common } from '../components/index.js'
import { McNew } from './new/McNew.js'
import { GsNew } from './new/GsNew.js'
import { SrNew } from './new/SrNew.js'
import { ZzNew } from './new/ZzNew.js'
import { performance } from 'perf_hooks'
import { LSconfig } from '#liangshi'
import https from 'https';
import http from 'http';
import fs from 'node:fs'

export class calc extends plugin {
  constructor () {
    super(
      {
        name: 'liangshicalc',
        dsc: 'liangshicalc拓展',
        event: 'message',
        priority: 5000,
        rule: [
            /*
          {
            reg: '^#*(梁氏|liangshi)?(查看|查询|检查)一键更新(API|api|接口)?状态$',
            fnc: 'New'
          },
            */
          {
            reg: '^#*(梁氏|liangshi)?一键更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC|异环|yh|YH|nte|NTE)(最|当前最)?新版本(完整|全部)?(角色|共鸣者|武器|光锥|弧盘|圣遗物|声骸|遗器|终端|卡带|驱动块|物品|材料|敌人|敌怪|怪物|残响|残像|boss|BOSS|异象)?(数据|资源|内容|资源数据)(api|API|Api|接口)?(.*?)$',
            fnc: 'NewData'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC|异环|yh|YH|nte|NTE)(.*?)(角色|共鸣者)(数据|资源|资源数据)?(api|API|Api|接口)?(.*?)$',
            fnc: 'CharacterNew'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC|异环|yh|YH|nte|NTE)(.*?)(武器|光锥|弧盘)(数据|资源|资源数据)?(api|API|Api|接口)?(.*?)$',
            fnc: 'WeaponNew'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC|异环|yh|YH|nte|NTE)(.*?)(圣遗物|声骸|遗器|终端|卡带|驱动块)(数据|资源|资源数据)?(api|API|Api|接口)?(.*?)$',
            fnc: 'ArtifactNew'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC|异环|yh|YH|nte|NTE)(.*?)(敌人|敌怪|怪物|残响|残像|boss|BOSS|异象)(数据|资源|资源数据)?(api|API|Api|接口)?(.*?)$',
            fnc: 'MonsterNew'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC|异环|yh|YH|nte|NTE)(.*?)物品(数据|资源|资源数据)?(api|API|Api|接口)?(.*?)$',
            fnc: 'ItemNew'
          }
        ]
      }
    )
  }

  async NewData (e) {
    let api, TextData = e.msg.match(/^#*(梁氏|liangshi)?一键更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC|异环|yh|YH|nte|NTE)(最|当前最)?新版本(完整|全部)?(角色|共鸣者|武器|光锥|弧盘|圣遗物|声骸|遗器|终端|卡带|驱动块|物品|材料|敌人|敌怪|怪物|残响|残像|boss|BOSS|异象)?(数据|资源|内容|资源数据)(api|API|Api|接口)?(.*?)$/)
    if (/api|API|Api|接口/.test(e.msg)) api = TextData[8]
    if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      await McNew(e, "All", api); return true
    } else if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      await GsNew(e, "All", api); return true
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
      await SrNew(e, "All", api); return true
    } else if (/异环|yh|YH|nte|NTE/.test(e.msg)) {
      await YhNew(e, "All", api); return true
    } else if (/绝区零|绝|zzz|ZZZ/.test(e.msg)) {
      await ZzNew(e, "All", api); return true
    }
  }

  async CharacterNew (e) {
    let api, TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC|异环|yh|YH|nte|NTE)(.*?)(角色|共鸣者)(数据|资源|资源数据)?(api|API|Api|接口)?(.*?)$/)
    if (/api|API|Api|接口/.test(e.msg)) api = TextData[8]
    if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      await McNew(e, "Cha", api); return true
    } else if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      await GsNew(e, "Cha", api); return true
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
      await SrNew(e, "Cha", api); return true
    } else if (/异环|yh|YH|nte|NTE/.test(e.msg)) {
      await YhNew(e, "Cha", api); return true
    } else if (/绝区零|绝|zzz|ZZZ/.test(e.msg)) {
      await ZzNew(e, "Cha", api); return true
    }
  }

  async WeaponNew (e) {
    let api, TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC|异环|yh|YH|nte|NTE)(.*?)(武器|光锥|弧盘)(数据|资源|资源数据)?(api|API|Api|接口)?(.*?)$/)
    if (/api|API|Api|接口/.test(e.msg)) api = TextData[8]
    if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      await McNew(e, "Wea", api); return true
    } else if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      await GsNew(e, "Wea", api); return true
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
      await SrNew(e, "Wea", api); return true
    } else if (/异环|yh|YH|nte|NTE/.test(e.msg)) {
      await YhNew(e, "Wea", api); return true
    } else if (/绝区零|绝|zzz|ZZZ/.test(e.msg)) {
      await ZzNew(e, "Wea", api); return true
    }
  }

  async ArtifactNew (e) {
    let api, TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC|异环|yh|YH|nte|NTE)(.*?)(圣遗物|声骸|遗器|终端|卡带|驱动块)(数据|资源|资源数据)?(api|API|Api|接口)?(.*?)$/)
    if (/api|API|Api|接口/.test(e.msg)) api = TextData[8]
    if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      await McNew(e, "Art", api); return true
    } else if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      await GsNew(e, "Art", api); return true
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
      await SrNew(e, "Art", api); return true
    } else if (/异环|yh|YH|nte|NTE/.test(e.msg)) {
      await YhNew(e, "Art", api); return true
    } else if (/绝区零|绝|zzz|ZZZ/.test(e.msg)) {
      await ZzNew(e, "Art", api); return true
    }
  }

  async MonsterNew (e) {
    let api, TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC|异环|yh|YH|nte|NTE)(.*?)(敌人|敌怪|怪物|残响|残像|boss|BOSS|异象)(数据|资源|资源数据)?(api|API|Api|接口)?(.*?)$/)
    if (/api|API|Api|接口/.test(e.msg)) api = TextData[8]
    if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      await McNew(e, "Mon", api); return true
    } else if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      await GsNew(e, "Mon", api); return true
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
      await SrNew(e, "Mon", api); return true
    } else if (/异环|yh|YH|nte|NTE/.test(e.msg)) {
      await YhNew(e, "Mon", api); return true
    } else if (/绝区零|绝|zzz|ZZZ/.test(e.msg)) {
      await ZzNew(e, "Mon", api); return true
    }
  }

  async ItemNew (e) {
    let api, TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC|异环|yh|YH|nte|NTE)(.*?)物品(数据|资源|资源数据)?(api|API|Api|接口)?(.*?)$/)
    if (/api|API|Api|接口/.test(e.msg)) api = TextData[7]
    if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      await McNew(e, "Ite", api); return true
    } else if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      await GsNew(e, "Ite", api); return true
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
      await SrNew(e, "Ite", api); return true
    } else if (/异环|yh|YH|nte|NTE/.test(e.msg)) {
      await YhNew(e, "Ite", api); return true
    } else if (/绝区零|绝|zzz|ZZZ/.test(e.msg)) {
      await ZzNew(e, "Ite", api); return true
    }
  }

  async yc(url, options = {}) {
    const { retries = 3, timeout = 6000, method = 'HEAD' } = options
    let cca = 0, ccb = 0;
    for (let i = 0; i < retries; i++) {
      try {
        let ccd = performance.now(), cce = url.startsWith('https') ? https : http, req = cce.request(url, { method, timeout: timeout, headers: { 'Connection': 'keep-alive' } }, (res) => { res.on('data', () => {}); res.on('end', () => { let cce = performance.now() - ccd; cca += cce; ccb++ }) }); req.on('timeout', () => req.destroy()); req.on('error', (err) => { console.error(err.message) }); req.end();
        await new Promise((resolve) => { req.on('close', resolve); req.on('error', resolve) })
      } catch (err) { console.warn(err.message) }
    }
    if (ccb > 0) return (cca / ccb)
    return undefined
  }

}
