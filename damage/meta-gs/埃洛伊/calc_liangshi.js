export const details = [{
  title: '附魔普攻第四段',
  params: {team:false},
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
}, {
  title: '冰尘弹伤害',
  params: {team:false},
  dmg: ({ talent }, dmg) => dmg(talent.e['冰尘弹伤害'], 'e')
}, {
  title: '冷冻炸弹伤害',
  params: {team:false},
  dmg: ({ talent }, dmg) => dmg(talent.e['冷冻炸弹伤害'], 'e')
}, {
  title: '冷冻炸弹融化伤害',
  params: {team:false},
  dmg: ({ talent }, dmg) => dmg(talent.e['冷冻炸弹伤害'], 'e', 'melt')
}, {
  title: '曙光寓言伤害',
  params: {team:false},
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '曙光寓言融化伤害',
  params: {team:false},
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'melt')
}, {
	title: '埃鹤万心 冰尘弹伤害',
  params: {team:true},
  dmg: ({ talent }, dmg) => dmg(talent.e['冰尘弹伤害'], 'e')
}, {
  title: '埃鹤万心 Q伤害',
  params: {team:true},
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}]

export const mainAttr = 'atk,cpct,cdmg'
export const defDmgIdx = 4

export const defParams = {
    team:true
}

export const buffs = [{
  title: '埃洛伊天赋：冰驰状态提高普攻伤害',
  data: {
    aDmg: ({ talent }) => talent.e['冰驰普通攻击伤害提升']
  }
}, {
  title: '埃洛伊天赋1：触发线圈效果时提升攻击力16%',
  data: {
    atkPct: 16
  }
}, {
  title: '埃洛伊天赋2：埃洛伊处于冰尘雪野的冰驰状态下提升35%冰元素伤害加成',
  data: {
    dmg: 35
  }
}, {check: ({ cons,params }) => cons <= 1 && params.team === true,
    title: '精1苍古0命万叶：获得[dmg]%增伤(苍古普攻16增伤)，增加[atkPct]%攻击,减抗[kx]%',
    data: {
      aDmg:16,
      a2Dmg:16,
      a3Dmg:16,
      dmg: 40,
      atkPct:20,
      kx:40,
   }
  }, {check: ({ cons,params }) => ((cons < 6 && cons >1) && params.team === true),
    title: '精1苍古2命万叶：获得[dmg]%增伤(苍古普攻16增伤)，增加[atkPct]%攻击,减抗[kx]%,精通[mastery]',
    data: {
      aDmg:16,
      a2Dmg:16,
      a3Dmg:16,
      dmg: 48,
      atkPct:20,
      kx:40,
      mastery:200
   }
  }, {check: ({ cons,params }) =>  (cons >= 6 && params.team === true),
    title: '精5苍古6命万叶：获得[dmg]%增伤(苍古普攻32增伤)，增加[atkPct]%攻击,减抗[kx]%,精通[mastery]',
    data: {
      aDmg:32,
      a2Dmg:32,
      a3Dmg:32,
      dmg: 48,
      atkPct:40,
      kx:40,
      mastery:200
   }
  }, {check: ({ cons,params }) =>  (cons >= 6 && params.team === true),
    title: '精5息灾申鹤：获得[dmg]%增伤,减抗[kx]%,爆伤15%,双冰暴击15%，提升冰伤害5700',
    data: {
      dmg: 30,
      kx:15,
      cdmg:15,
      cpct: 15,
      a2Plus:5700*3,
      ePlus:5700,
      qPlus:5700
   }
  }, {check: ({ cons,params }) =>  (cons < 6 && params.team === true),
    title: '精1息灾申鹤：获得[dmg]%增伤,减抗[kx]%,双冰暴击15%，提升冰伤害4300',
    data: {
      dmg: 30,
      kx:15,
      cpct: 15,
      a2Plus:4300*3,
      ePlus:4300,
      qPlus:4300
   }
  }, 
  {  
	check: ({ params }) => params.team === true,
    title: '千岩讨龙0命珊瑚宫心海：增加[atkPct]%攻击',
    data: {
      atkPct:68
   }
  }, {
  check: ({ params }) => params.team === true,
  title: '元素共鸣 粉碎之冰：攻击处于冰元素附着或冻结下的敌人时，暴击率提高[cpct]%',
  data: {
    cpct: 15
  }
},
 {title: '4.4最后修改：如有问题请输入 #伤害计算反馈'}
 ]
