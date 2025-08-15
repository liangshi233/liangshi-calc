export const CalcBuff = [
  {
    check: ({ params }) => ((params["共鸣解放使用次数"] || 0) > 0) || params.Flaming_Sacrifice,
    title: '长离技能：[离火照丹心] 施放共鸣解放后施放重击时攻击力提升[atkPct]%',
    data: {
      atkPct: 25
    }
  },
  {
    title: '长离固有1：[潜谋] 施放普攻心眼·征或普攻心眼·冲时，拥有[buff]层【离火】，伤害加成提升[dmg]%',
    tree: 1,
    data: {
      buff: ({ params }) => params.Enflamement || 4,
      dmg: ({ params }) => (params.Enflamement || 4) * 5
    }
  },
  {
    check: ({ params }) => ((params["共鸣解放使用次数"] || 0) > 0) || params.Flaming_Sacrifice,
    title: '长离固有2：[散势] 施施放重击或共鸣解放时伤害加成提升[eDmg]%，攻击造成伤害时忽视目标[qIgnore]%防御',
    tree: 2,
    data: {
      eDmg: 20,
      qDmg: 20,
      eIgnore: 15,
      qIgnore: 15
    }
  },
  {
    check: ({ params }) => ((params.Enflamement || 4) === 4) || params.Flaming_Sacrifice,
    title: '长离1链：[隐我所思] 施放共鸣技能或重击时抗打断能力提升，且造成的伤害提升[eDmg]%',
    cons: 1,
    data: {
      eDmg: 10
    }
  },
  {
    check: ({ params }) => (params.Enflamement || 4) > 0,
    title: '长离2链：[循我所望] 获得【离火】时，暴击提升[cpct]%',
    cons: 2,
    data: {
     cpct: 10
    }
  },
  {
    title: '长离3链：[据我所闻] 共鸣解放离造成的伤害提升[qDmg]%',
    cons: 3,
    data: {
      qDmg: 80
    }
  },
  {
    check: ({ params }) => (params["变奏技能使用次数"] || 1) > 0,
    title: '长离4链：[饰我所言] 施放变奏技能后，队伍中的角色攻击提升[atkPct]%',
    cons: 4,
    data: {
      atkPct: 20
    }
  },
  {
    check: ({ params }) => params.Flaming_Sacrifice,
    title: '长离5链：[舍我所得] 重击焚身以火倍率提升[buff]%，造成的伤害提升[eDmg]%',
    cons: 5,
    data: {
      buff: 50,
      eDmg: 50
    }
  },
  {
    check: ({ params }) => params.Flaming_Sacrifice || ((params.Enflamement || 4) === 4),
    title: '长离6链：[成我所谋] 共鸣技能、重击和共鸣解放攻击造成伤害时额外忽视目标[eIgnore]%防御。',
    cons: 6,
    data: {
      eIgnore: 40,
      qIgnore: 40
    }
  }
]