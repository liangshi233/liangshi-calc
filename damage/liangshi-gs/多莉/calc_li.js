import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '断除烦恼炮总伤害',
  dmg: ({ talent, cons }, dmg) => dmg(talent.e['断除烦恼炮伤害'] + talent.e['售后服务弹伤害'] * (cons >= 1 ? 3 : 2), 'e')
}, {
  title: '断除烦恼炮超激化伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['断除烦恼炮伤害'], 'e', '超激化')
}, {
  title: '灯中幽精每跳恢复生命',
  dmg: ({ talent, calc, attr }, {
    heal
  }) => heal(talent.q['持续治疗量2'][0] * calc(attr.hp) / 100 + talent.q['持续治疗量2'][1] * 1)
}, {
  title: '灯中幽精连接伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['连接伤害'], 'q')
}, {
  title: '灯中幽精连接超激化伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['连接伤害'], 'q', '超激化')
}]

export const defParams = { soda: 1 }
export const mainAttr = 'atk,hp,cpct,cdmg'
export const defDmgIdx = 2

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,{
  title: '多莉1命：断除烦恼炮命中后增加一枚炮弹',
  cons: 1
}, {
  title: '多莉4命：角色生命值低于50%时，获得50%治疗加成',
  cons: 4,
  data: {
    healInc: 50
  }
}]
