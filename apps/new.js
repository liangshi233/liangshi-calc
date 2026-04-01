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
            reg: '^#*(梁氏|liangshi)?一键更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)(最|当前最)?新版本(完整|全部)?(角色|共鸣者|武器|光锥|圣遗物|声骸|遗器|物品|材料|敌人|敌怪|怪物|残响|残像|boss|BOSS)?(数据|资源|内容|资源数据)$',
            fnc: 'NewData'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)(.*?)(角色|共鸣者)(数据|资源|资源数据)?$',
            fnc: 'CharacterNew'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)(.*?)(武器|光锥)(数据|资源|资源数据)?$',
            fnc: 'WeaponNew'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)(.*?)(圣遗物|声骸|遗器)(数据|资源|资源数据)?$',
            fnc: 'ArtifactNew'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)(.*?)(敌人|敌怪|怪物|残响|残像|boss|BOSS)(数据|资源|资源数据)?$',
            fnc: 'MonsterNew'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)(.*?)物品(数据|资源|资源数据)?$',
            fnc: 'ItemNew'
          }
        ]
      }
    )
  }

  async NewData (e) {
    if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      await McNew(e, "All"); return true
    } else if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      await GsNew(e, "All"); return true
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
      await SrNew(e, "All"); return true
    } else if (/绝区零|绝|zzz|ZZZ/.test(e.msg)) {
      await ZzNew(e, "All"); return true
    }
  }

  async CharacterNew (e) {
    if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      await McNew(e, "Cha"); return true
    } else if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      await GsNew(e, "Cha"); return true
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
      await SrNew(e, "Cha"); return true
    } else if (/绝区零|绝|zzz|ZZZ/.test(e.msg)) {
      await ZzNew(e, "Cha"); return true
    }
  }

  async WeaponNew (e) {
    if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      await McNew(e, "Wea"); return true
    } else if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      await GsNew(e, "Wea"); return true
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
      await SrNew(e, "Wea"); return true
    } else if (/绝区零|绝|zzz|ZZZ/.test(e.msg)) {
      await ZzNew(e, "Wea"); return true
    }
  }

  async ArtifactNew (e) {
    if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      await McNew(e, "Art"); return true
    } else if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      await GsNew(e, "Art"); return true
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
      await SrNew(e, "Art"); return true
    } else if (/绝区零|绝|zzz|ZZZ/.test(e.msg)) {
      await ZzNew(e, "Art"); return true
    }
  }

  async MonsterNew (e) {
    if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      await McNew(e, "Mon"); return true
    } else if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      await GsNew(e, "Mon"); return true
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
      await SrNew(e, "Mon"); return true
    } else if (/绝区零|绝|zzz|ZZZ/.test(e.msg)) {
      await ZzNew(e, "Mon"); return true
    }
  }

  async ItemNew (e) {
    if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      await McNew(e, "Ite"); return true
    } else if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      await GsNew(e, "Ite"); return true
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
      await SrNew(e, "Ite"); return true
    } else if (/绝区零|绝|zzz|ZZZ/.test(e.msg)) {
      await ZzNew(e, "Ite"); return true
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
