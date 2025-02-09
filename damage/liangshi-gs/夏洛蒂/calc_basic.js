import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '重击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
}, {
  title: '点按拍照伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['点按拍照伤害'], 'e')
}, {
  title: '长按拍照伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['长按拍照伤害'], 'e')
}, {
  title: '瞬时剪影伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['「瞬时剪影」印记伤害'], 'e')
}, {
  title: '聚焦印象伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['「聚焦印象」印记伤害'], 'e')
}, {
  title: '全方位确证释放治疗',
  dmg: ({ talent, calc, attr }, { heal }) =>
    heal(talent.q['施放治疗量2'][0] * calc(attr.atk) / 100 + talent.q['施放治疗量2'][1] * 1)
}, {
  title: '全方位确证释放伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '全方位确证持续治疗',
  dmg: ({ talent, calc, attr }, { heal }) =>
    heal(talent.q['相机持续治疗量2'][0] * calc(attr.atk) / 100 + talent.q['相机持续治疗量2'][1] * 1)
}, {
  title: '全方位确证持续伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['相机伤害'], 'q')
}]

export const defParams = { soda: 1 }
export const mainAttr = 'atk,hp,cpct,cdmg'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '夏洛蒂天赋2：含有非枫丹角色治疗加成提升15%，含有枫丹角色冰伤加成提升15%',
    data: {
      heal: 15,
      dmg: 15
    }
  }, {
    title: '夏洛蒂2命：命中3命以上敌人攻击力提升30%',
    cons: 2,
    data: {
      atkPct: 30
    }
  }, {
    title: '夏洛蒂4命：Q命中印记敌人伤害提升10%',
    cons: 4,
    data: {
      qDmg: 10
    }
  },
  { title: '9.27最后修改：如有问题请输入 #伤害计算反馈' }
]
