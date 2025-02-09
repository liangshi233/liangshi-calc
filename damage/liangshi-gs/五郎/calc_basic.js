import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '重击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
}, {
  title: '犬坂吠吠方圆阵伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '兽牙逐突形胜战法伤害',
  dmg: ({ talent, attr, calc }, { basic }) => basic(talent.q['技能伤害'] * calc(attr.def) / 100, 'q')
}, {
  title: '逐突形胜战法每跳伤害',
  dmg: ({ talent, attr, calc }, { basic }) => basic(talent.q['岩晶崩破伤害'] * calc(attr.def) / 100, 'q')
}, {
  title: '逐突形胜战法每跳治疗',
  cons: 4,
  dmg: ({ attr, calc }, { heal }) => heal(0.5 * calc(attr.def))
}]

export const defDmgIdx = 3
export const mainAttr = 'atk,def,cpct,cdmg'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '五郎天赋2：犬坂吠吠方圆阵造成的伤害基于防御值提高[ePlus]',
    data: {
      ePlus: ({ attr, calc }) => calc(attr.def) * 1.56
    }
  }, {
    title: '五郎天赋2：兽牙逐突形胜战法造成的伤害基于防御值提高[qPlus]',
    data: {
      qPlus: ({ attr, calc }) => calc(attr.def) * 0.156
    }
  }, {
    title: '五郎天赋：释放E或Q后防御力提高[defPlus]，岩伤提高15%',
    data: {
      defPlus: ({ talent }) => talent.e['防御力提升'] * 1,
      dmg: 15
    }
  }, {
    title: '五郎天赋1：释放Q后防御力提高25%',
    data: {
      defPct: 25
    }
  }, {
    title: '五郎4命：Q每跳回复防御力50%',
    cons: 4
  }, {
    title: '五郎6命：三岩队伍提高40%岩伤',
    cons: 6,
    data: {
      dmg: 40
    }
  },
  { title: '10.30最后修改：如有问题请输入 #伤害计算反馈' }
]
