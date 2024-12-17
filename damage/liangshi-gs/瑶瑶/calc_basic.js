import { characterBuffGs, enemyBuffGs, ImaginariumBuff } from '../../../resources/CalcBuff/index.js'

export const details = [
  {
    title: '白玉萝卜伤害',
    dmg: ({ talent }, dmg) => dmg(talent.e['白玉萝卜伤害'], 'e')
  }, {
    title: '白玉萝卜-蔓激化',
    dmg: ({ talent }, dmg) => dmg(talent.e['白玉萝卜伤害'], 'e', 'spread')
  }, {
    title: '桂子仙机白玉萝卜伤害',
    dmg: ({ talent }, dmg) => dmg(talent.q['桂子仙机白玉萝卜伤害'], 'q')
  }, {
    title: '桂子仙机萝卜-蔓激化',
    dmg: ({ talent }, dmg) => dmg(talent.q['桂子仙机白玉萝卜伤害'], 'q', 'spread')
  }, {
    title: '玉颗珊珊月中落伤害',
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  }, {
    title: '白玉萝卜每跳治疗',
    dmg: ({ talent, calc, attr }, { heal }) =>
      heal(talent.e['白玉萝卜治疗量2'][0] * calc(attr.hp) / 100 + talent.e['白玉萝卜治疗量2'][1])
  }, {
    title: '桂子仙机萝卜每跳治疗',
    dmg: ({ talent, calc, attr }, { heal }) =>
      heal(talent.q['桂子仙机白玉萝卜治疗量2'][0] * calc(attr.hp) / 100 + talent.q['桂子仙机白玉萝卜治疗量2'][1])
  }, {
    title: '萝卜炸裂天赋治疗',
    dmg: ({ talent, calc, attr }, { heal }) => heal(calc(attr.hp) * 0.8 / 100)
  }, {
    title: '6命大萝卜治疗',
    cons: 6,
    dmg: ({ talent, calc, attr }, { heal }) => heal(calc(attr.hp) * 7.5 / 100)
  }
]

export const defParams = { soda: 1 }
export const defDmgIdx = 6
export const mainAttr = 'atk,hp,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '瑶瑶技能：[玉颗珊珊月中落] 周期性召唤「月桂·弹跳型」并使瑶瑶的移动速度提升[_jSpeed]%获得[_dendroRes]%草元素抗性',
    data: {
      _jSpeed: 8,
      _dendroRes: 50
    }
  }, {
    title: '瑶瑶1命：[妙受琼阁] 白玉萝卜炸裂时,处在其影响范围内的当前场上角色获得[dmg]%草元素伤害加成并恢复[_stamina]点体力',
    cons: 1,
    data: {
      dmg: 15,
      _stamina: 15
    }
  }, {
    title: '瑶瑶2命：[正思无邪] 白玉萝卜的炸裂伤害命中敌人,瑶瑶将恢复[_energyevery]点元素能量',
    cons: 2,
    data: {
      _energyevery: 3
    }
  }, {
    title: '瑶瑶4命：[爰爰可亲] 施放云台团团降芦菔或玉颗珊珊月中落后提升瑶瑶的元素精通[mastery]点',
    cons: 4,
    data: {
      mastery: ({ calc, attr }) => Math.min(120, calc(attr.hp) * 0.3 / 100)
    }
  }, {
    title: '瑶瑶6命：[慈惠仁心] 月桂·抛掷型每投掷2次白玉萝卜,就会在下次投掷时额外投掷1枚超厉害·大萝卜',
    cons: 6
  },
  'spread',
  { title: '1.29最后修改：[10.24重置] 修复昔时之歌加成失效问题' }
]
