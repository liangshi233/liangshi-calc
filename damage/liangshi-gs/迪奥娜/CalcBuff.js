import { resonanceBuffGs, characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'
import { TeamBuff } from '../index.js'

export const CalcBuff = [
  characterBuffGs,
  enemyBuffGs,
  ImaginariumBuff,
  MasteryGs,
  {
    check: ({ params }) => (params.Icy_Paws || 0) >= 5,
    title: '迪奥娜技能：[猫爪冻冻] 通过长按产生的护盾获得[shield]%伤害吸收量加成。',
    data: {
      shield: 75
    }
  },
  {
    title: '迪奥娜天赋：[猫尾隐藏菜单] 处于猫爪冻冻的护盾保护下的角色，移动速度提升[_jSpeed]%，体力消耗降低[_staminaPct]%。',
    data: {
      _jSpeed: 10 ,
      _staminaPct: 10
    }
  },
  {
    check: ({ params }) => params.Drunken_Mist === true,
    title: '迪奥娜天赋：[滑稽百出的醉相] 敌人进入最烈特调的领域后，攻击力降低[_enemyAtk]%。',
    data: {
      _enemyAtk: 10
    }
  },
  {
    title: '迪奥娜1命：[特调的余韵] 最烈特调的效果结束时，恢复[_energyevery]点元素能量。',
    cons: 1,
    data: {
      _energyevery: 15
    }
  },
  {
    title: '迪奥娜2命：[猫爪冰摇] 猫爪冻冻造成的伤害提高[eDmg]%，护盾的伤害吸收量提高[shield]%',
    cons: 2,
    data: {
      eDmg: 15,
      shield: 15
    }
  },
  {
    check: ({ params }) => params.Drunken_Mist === true,
    title: '迪奥娜4命：[「酒业杀手」] 在最烈特调的领域内，瞄准射击的所需的蓄力时间减少[_a2Speed]%',
    cons: 4,
    data: {
      _a2Speed: 60
    }
  },
  {
    check: ({ params }) => params.Drunken_Mist === true,
    title: '迪奥娜6命：[猫尾打烊之时] 处在最烈特调领域内的角色生命值[buff]%，受治疗加成提升[healInc]%，元素精通提升[mastery]',
    cons: 6,
    data: {
      buff: ({ params, artis }) => params.OwnHp || (artis['战狂'] === 4 ? 50 : 100),
      healInc: ({ params, artis }) => (params.OwnHp || (artis['战狂'] === 4 ? 50 : 100)) > 50 ? 0 : 30,
      mastery: ({ params, artis }) => (params.OwnHp || (artis['战狂'] === 4 ? 50 : 100)) > 50 ? 200 : 0
    }
  },
  {
    title: '枫原万叶武器：[苍古自由之誓-精1] 消耗所有奋起之符使附近队伍中所有角色获得[atkPct]%攻击力 { 该武器效果不可叠加 }',
    check: ({ params, cons, weapon }) => (cons < 6 && cons > 1) && params.Kaedehara_Kazuha === true && weapon.name !== '终末嗟叹之诗',
    sort: 1,
    data: {
      atkPct: 20
    }
  },
  {
    title: '枫原万叶武器：[苍古自由之誓-精5] 消耗所有奋起之符使附近队伍中所有角色获得[aDmg]%普通攻击,重击,下落攻击伤害提升',
    check: ({ params, cons }) => cons >= 6 && params.Kaedehara_Kazuha === true,
    data: {
      aDmg: 32,
      a2Dmg: 32,
      a3Dmg: 32
    }
  },
  {
    title: '枫原万叶武器：[苍古自由之誓-精5] 消耗所有奋起之符使附近队伍中所有角色获得[atkPct]%攻击力 { 该武器效果不可叠加 }',
    check: ({ params, cons, weapon }) => cons >= 6 && params.Kaedehara_Kazuha === true && weapon.name !== '终末嗟叹之诗',
    sort: 1,
    data: {
      atkPct: 40
    }
  },
  {
    title: '班尼特圣遗物：[昔日宗室之仪4] 释放元素爆发后，队伍中所有角色攻击力提升[atkPct]% { 该圣遗物效果不可叠加 }',
    check: ({ params, artis }) => params.Bennett === true && artis.昔日宗室之仪 !== 4,
    sort: 1,
    data: {
      atkPct: 20
    }
  },
  {
    title: '纳西妲武器：[千夜浮梦-精1] 队伍中装备者以外的附近角色的元素精通提升[mastery]点',
    check: ({ params, cons }) => cons < 6 && params.Nahida === true,
    sort: 1,
    data: {
      mastery: 40
    }
  },
  {
    title: '纳西妲武器：[千夜浮梦-精5] 队伍中装备者以外的附近角色的元素精通提升[mastery]点',
    check: ({ params, cons }) => cons >= 6 && params.Nahida === true,
    sort: 1,
    data: {
      mastery: 48
    }
  },
  ...TeamBuff,
  ...resonanceBuffGs
]
