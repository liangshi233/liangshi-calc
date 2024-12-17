import { characterBuffGs, enemyBuffGs, ImaginariumBuff } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '普攻首段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
}, {
  title: '普攻四段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'phy')
}, {
  title: '利爪与苍雷点按伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['点按技能伤害'], 'e')
}, {
  title: '利爪与苍雷长按伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['长按技能伤害'], 'e')
}, {
  title: '长按E超激化伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['长按技能伤害'], 'e', '超激化')
}, {
  title: '雷牙协同攻击首段',
  dmg: ({ talent }, dmg) => dmg(talent.q['狼魂伤害'] * talent.a['一段伤害'] / 100, 'q')
}, {
  title: '雷牙协同攻击首段超激化',
  dmg: ({ talent }, dmg) => dmg(talent.q['狼魂伤害'] * talent.a['一段伤害'] / 100, 'q', '超激化')
}, {
  title: '雷牙协同攻击四段',
  dmg: ({ talent }, dmg) => dmg(talent.q['狼魂伤害'] * talent.a['四段伤害'] / 100, 'q')
}]

export const defDmgIdx = 0
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '雷泽1命：获得元素球后8秒伤害提高10%',
    cons: 1,
    data: {
      dmg: 10,
      phy: 10
    }
  }, {
    title: '雷泽2命：攻击生命值低于30%的敌人暴击率提高10%',
    cons: 2,
    data: {
      cpct: 10
    }
  }, {
    title: '雷泽4命：E点按降低敌人防御力15%',
    cons: 4,
    data: {
      def: 15
    }
  },
  { title: '4.4最后修改：如有问题请输入 #伤害计算反馈' }
]
