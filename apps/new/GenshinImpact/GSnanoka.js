import common from '../../../../../lib/common/common.js'
import { Common } from '../../../components/index.js'
import { LSconfig } from '#liangshi'
import fs from 'node:fs'


/**
 * 原神API4
 * nanoka.cc
 *
 * 如果有新的问题建议去issue反馈
 */


export async function New (e) { e.reply('[liangshi-calc]暂不支持使用此API更新(ಥ_ಥ)\n请在设置中切换API后再试'); return false }

export async function CharacterNew (e, mode) { if(!mode) e.reply('[liangshi-calc]暂不支持使用此API更新(ಥ_ಥ)\n请在设置中切换API后再试'); return false }

export async function WeaponNew (e, mode) { if(!mode) e.reply('[liangshi-calc]暂不支持使用此API更新(ಥ_ಥ)\n请在设置中切换API后再试'); return false }

export async function ArtifactNew (e, mode) { if(!mode) e.reply('[liangshi-calc]暂不支持使用此API更新(ಥ_ಥ)\n请在设置中切换API后再试'); return false }

export async function MonsterNew (e, mode, JsonOk) { if(!mode) e.reply('[liangshi-calc]暂不支持使用此API更新(ಥ_ಥ)\n请在设置中切换API后再试'); return false }

export async function ItemNew (e, mode, JsonOk) { if(!mode) e.reply('[liangshi-calc]暂不支持使用此API更新(ಥ_ಥ)\n请在设置中切换API后再试'); return false }

export async function getImg (url, Path, name) {
  try {
    if (!await common.downFile(url, Path)) {
      console.error(`[liangshi-calc]下载${name}图片失败，5秒后重试`)
      await common.sleep(5000)
      if (!await common.downFile(url, Path)) {
        console.error(`[liangshi-calc]重试下载${name}图片失败`)
        let filePath = "./plugins/liangshi-calc/resources/log.json"
        let oldLog = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '{}'
        let y = JSON.parse(oldLog)
        y[new Date()] = { url, Path, name, text: "下载图片错误" }
        let bbxzData = JSON.stringify(y, null, 2)
        fs.writeFile(filePath, bbxzData, 'utf8', (err) => {if (err) { console.error('[liangshi-calc]下载失败内容已记录失败:\n', err); return false } else { console.log('[liangshi-calc]下载失败内容已记录') }})
        return false
      }
      console.log(`[liangshi-calc]下载${name}图片成功`)
      return true
    }
    console.log(`[liangshi-calc]下载${name}图片成功`)
    return true
  } catch (err) {
    console.log(err)
    return true
  }
}
