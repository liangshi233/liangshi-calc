export const TeamBuff_Aino = [
  {
    check: ({ params }) => params.team === true && params.Aino === true && !params.TruceTime,
    title: '爱诺1命：[灰与力场的平衡理论] 施放元素战技或元素爆发后当前场上角色元素精通提升[mastery]点',
    cons: 1,
    data: {
      mastery: 80
    }
  },
  {
    check: ({ params }) => params.team === true && params.Aino === true && !params.TruceTime,
    title: '爱诺6命：[「我愿将这血与泪奉予月明」] 施放元素爆发后,当前场上角色触发的感电、绽放、月感电、月绽放造成的伤害提升[lunarBloom]%',
    cons: 6,
    data: {
      electroCharged: ({ params }) => ((params.Moonsign || 0) >= 3 ? 35 : 15),
      bloom: ({ params }) => ((params.Moonsign || 0) >= 3 ? 35 : 15),
      lunarCharged: ({ params }) => ((params.Moonsign || 0) >= 3 ? 35 : 15),
      lunarBloom: ({ params }) => ((params.Moonsign || 0) >= 3 ? 35 : 15)
    }
  }]
