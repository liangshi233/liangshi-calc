export default function ({ artis, attr, rule, def , cons }) {
  if (artis.is('乐园4')) {
    return rule('八重-超绽', { atk: 35, cpct: 85, cdmg: 85, dmg: 35, mastery: 100 , recharge: 45 })
  }
  if ( cons >= 2 ) {
   if ( attr.dmg < 120 ) {
    if ( attr.atk < 2100 ) {
     if ( attr.mastery >= 242 ) {
      if ( attr.atk >= 1950 ) {
       if ( attr.dmg < 63.8 ) {
        return rule('八重-动态', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, mastery: 65, recharge: 60 })
       }
       if ( attr.dmg >= 63.8 ) {
        return rule('八重-动态', { atk: 85, cpct: 100, cdmg: 100, dmg: 90, mastery: 65, recharge: 60 })
       }
      }
      if ( attr.atk < 1950 ) {
       if ( attr.dmg < 64 ) {
        return rule('八重-动态', { atk: 85, cpct: 100, cdmg: 100, dmg: 87, mastery: 68, recharge: 60 })
       }
       if ( attr.dmg >= 64 ) {
        return rule('八重-动态', { atk: 90, cpct: 100, cdmg: 100, dmg: 85, mastery: 65, recharge: 60 })
       }
      }
     }
     if ( attr.mastery >= 205 && attr.mastery < 242 ) {
      if ( attr.atk < 1950 ) {
       if ( attr.dmg < 63.8 ) {
        return rule('八重-动态', { atk: 85, cpct: 100, cdmg: 100, dmg: 87, mastery: 68, recharge: 60 })
       }
       if ( attr.dmg >= 63.8 ) {
        return rule('八重-动态', { atk: 90, cpct: 100, cdmg: 100, dmg: 78, mastery: 72, recharge: 60 })
       }
      }
      if ( attr.atk >= 1950 ) {
       return rule('八重-动态', { atk: 80, cpct: 100, cdmg: 100, dmg: 84, mastery: 76, recharge: 60 })
      }
     }
     if ( attr.mastery < 205 ) {
      if ( attr.atk >= 1950 ) {
       if ( attr.dmg < 64 ) {
        return rule('八重-动态', { atk: 72, cpct: 100, cdmg: 100, dmg: 78, mastery: 90, recharge: 60 })
       }
       if ( attr.dmg >= 64 ) {
        return rule('八重-动态', { atk: 70, cpct: 100, cdmg: 100, dmg: 88, mastery: 82, recharge: 60 })
       }
      }
      if ( attr.atk < 1950 ) {
       if ( attr.dmg < 64 ) {
        if (attr.cpct * 2 + attr.cdmg > 260 ) {
         return rule('八重-动态', { atk: 78, cpct: 90, cdmg: 90, dmg: 86, mastery: 76, recharge: 60 })
        }
        return rule('八重-动态', { atk: 78, cpct: 100, cdmg: 100, dmg: 86, mastery: 76, recharge: 60 })
       }
       if ( attr.dmg >= 64 ) {
       return rule('八重-动态', { atk: 80, cpct: 100, cdmg: 100, dmg: 90, mastery: 70, recharge: 60 })
       }
      }
     }
    }
    if ( attr.atk >= 2100 ) {
     if ( attr.mastery < 205 ) {
      return rule('八重-动态', { atk: 75, cpct: 100, cdmg: 100, dmg: 85, mastery: 90, recharge: 60 })
     }
     if ( attr.mastery >= 205 && attr.mastery < 242 ) {
      if ( attr.dmg >= 64 ) {
      return rule('八重-动态', { atk: 70, cpct: 100, cdmg: 100, dmg: 88, mastery: 82, recharge: 60 })
      }
      if ( attr.dmg < 64 ) {
      return rule('八重-动态', { atk: 60, cpct: 100, cdmg: 100, dmg: 100, mastery: 75, recharge: 60 })
      }
     }
     if ( attr.mastery >= 242 ) {
       return rule('八重-动态', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, mastery: 65, recharge: 60 })
     }
    }
   }
   if ( attr.dmg >= 120 ) {
    if ( attr.atk >= 2100 ) {
     if ( attr.mastery >= 242 ) {
      return rule('八重-动态', { atk: 78, cpct: 100, cdmg: 100, dmg: 86, mastery: 76, recharge: 60 })
     }
     if (attr.mastery < 242 ) {
      return rule('八重-动态', { atk: 74, cpct: 100, cdmg: 100, dmg: 78, mastery: 88, recharge: 60 })
     }
    }
    if ( attr.atk >= 1950 && attr.atk < 2100 ) {
     if ( attr.mastery >= 242 ) {
      return rule('八重-动态', { atk: 90, cpct: 100, cdmg: 100, dmg: 78, mastery: 72, recharge: 60 })
     }
     if ( attr.mastery >= 205 && attr.mastery < 242 ) {
      return rule('八重-动态', { atk: 86, cpct: 100, cdmg: 100, dmg: 70, mastery: 84, recharge: 60 })
     }
     if ( attr.mastery < 205 ) {
      return rule('八重-动态', { atk: 80, cpct: 100, cdmg: 100, dmg: 70, mastery: 90, recharge: 60 })
     }
    }
    if ( attr.atk < 1950 ) {
     if ( attr.mastery >= 242 ) {
      return rule('八重-动态', { atk: 90, cpct: 100, cdmg: 100, dmg: 78, mastery: 72, recharge: 60 })
     }
     if ( attr.mastery >= 205 && attr.mastery < 242 ) {
      return rule('八重-动态', { atk: 90, cpct: 100, cdmg: 100, dmg: 70, mastery: 80, recharge: 60 })
     }
     if ( attr.mastery < 205 ) {
      return rule('八重-动态', { atk: 86, cpct: 100, cdmg: 100, dmg: 70, mastery: 84, recharge: 60 })
     }
    }
   }
  }
  if ( cons < 2 ) {
   if ( attr.dmg < 120 ) {
    if ( attr.atk < 2100 ) {
     if ( attr.mastery >= 242 ) {
      if ( attr.atk >= 1950 ) {
       if ( attr.dmg < 63.8 ) {
        return rule('八重-动态', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, mastery: 65, recharge: 60 })
       }
       if ( attr.dmg >= 63.8 ) {
        return rule('八重-动态', { atk: 82, cpct: 100, cdmg: 100, dmg: 88, mastery: 70, recharge: 60 })
       }
      }
      if ( attr.atk < 1950 ) {
       if ( attr.dmg < 64 ) {
        return rule('八重-动态', { atk: 82, cpct: 100, cdmg: 100, dmg: 88, mastery: 70, recharge: 60 })
       }
       if ( attr.dmg >= 64 ) {
        return rule('八重-动态', { atk: 90, cpct: 100, cdmg: 100, dmg: 85, mastery: 65, recharge: 60 })
       }
      }
     }
     if ( attr.mastery >= 205 && attr.mastery < 242 ) {
      if ( attr.atk < 1950 ) {
       if ( attr.dmg < 63.8 ) {
        return rule('八重-动态', { atk: 82, cpct: 100, cdmg: 100, dmg: 88, mastery: 70, recharge: 60 })
       }
       if ( attr.dmg >= 63.8 ) {
        return rule('八重-动态', { atk: 90, cpct: 100, cdmg: 100, dmg: 78, mastery: 72, recharge: 60 })
       }
      }
      if ( attr.atk >= 1950 ) {
       return rule('八重-动态', { atk: 78, cpct: 100, cdmg: 100, dmg: 84, mastery: 78, recharge: 60 })
      }
     }
     if ( attr.mastery < 205 ) {
      if ( attr.atk >= 1950 ) {
       if ( attr.dmg < 64 ) {
        return rule('八重-动态', { atk: 72, cpct: 100, cdmg: 100, dmg: 78, mastery: 90, recharge: 60 })
       }
       if ( attr.dmg >= 64 ) {
        return rule('八重-动态', { atk: 70, cpct: 100, cdmg: 100, dmg: 88, mastery: 82, recharge: 60 })
       }
      }
      if ( attr.atk < 1950 ) {
       if ( attr.dmg < 64 ) {
        if (attr.cpct * 2 + attr.cdmg > 260 ) {
         return rule('八重-动态', { atk: 78, cpct: 90, cdmg: 90, dmg: 84, mastery: 78, recharge: 60 })
        }
        return rule('八重-动态', { atk: 78, cpct: 100, cdmg: 100, dmg: 84, mastery: 78, recharge: 60 })
       }
       if ( attr.dmg >= 64 ) {
       return rule('八重-动态', { atk: 75, cpct: 100, cdmg: 100, dmg: 90, mastery: 75, recharge: 60 })
       }
      }
     }
    }
    if ( attr.atk >= 2100 ) {
     if ( attr.mastery < 205 ) {
      return rule('八重-动态', { atk: 70, cpct: 100, cdmg: 100, dmg: 80, mastery: 100, recharge: 60 })
     }
     if ( attr.mastery >= 205 && attr.mastery < 242 ) {
      if ( attr.dmg >= 64 ) {
      return rule('八重-动态', { atk: 70, cpct: 100, cdmg: 100, dmg: 80, mastery: 90, recharge: 60 })
      }
      if ( attr.dmg < 64 ) {
      return rule('八重-动态', { atk: 60, cpct: 100, cdmg: 100, dmg: 100, mastery: 75, recharge: 60 })
      }
     }
     if ( attr.mastery >= 242 ) {
       return rule('八重-动态', { atk: 70, cpct: 100, cdmg: 100, dmg: 100, mastery: 70, recharge: 60 })
     }
    }
   }
   if ( attr.dmg >= 120 ) {
    if ( attr.atk >= 2100 ) {
     if ( attr.mastery >= 242 ) {
      return rule('八重-动态', { atk: 78, cpct: 100, cdmg: 100, dmg: 84, mastery: 78, recharge: 60 })
     }
     if (attr.mastery < 242 ) {
      return rule('八重-动态', { atk: 74, cpct: 100, cdmg: 100, dmg: 78, mastery: 88, recharge: 60 })
     }
    }
    if ( attr.atk >= 1950 && attr.atk < 2100 ) {
     if ( attr.mastery >= 242 ) {
      return rule('八重-动态', { atk: 90, cpct: 100, cdmg: 100, dmg: 78, mastery: 72, recharge: 60 })
     }
     if ( attr.mastery >= 205 && attr.mastery < 242 ) {
      return rule('八重-动态', { atk: 85, cpct: 100, cdmg: 100, dmg: 70, mastery: 85, recharge: 60 })
     }
     if ( attr.mastery < 205 ) {
      return rule('八重-动态', { atk: 80, cpct: 100, cdmg: 100, dmg: 65, mastery: 90, recharge: 60 })
     }
    }
    if ( attr.atk < 1950 ) {
     if ( attr.mastery >= 242 ) {
      return rule('八重-动态', { atk: 90, cpct: 100, cdmg: 100, dmg: 78, mastery: 72, recharge: 60 })
     }
     if ( attr.mastery >= 205 && attr.mastery < 242 ) {
      return rule('八重-动态', { atk: 90, cpct: 100, cdmg: 100, dmg: 65, mastery: 80, recharge: 60 })
     }
     if ( attr.mastery < 205 ) {
      return rule('八重-动态', { atk: 85, cpct: 100, cdmg: 100, dmg: 70, mastery: 85, recharge: 60 })
     }
    }
   }
  }
 }
/*
  if (artis.is('乐园4')) {
    return rule('八重-超绽', { atk: 35, cpct: 85, cdmg: 85, dmg: 35, mastery: 100 , recharge: 45 })
  }
  if (artis.is('剧团4')) {
    return rule('八重-速切', { atk: 70, cpct: 100, cdmg: 100, mastery: 60, dmg: 100, recharge: 45 })
  }
  if (attr.mastery >= 80) {
    return rule('八重-激绽', { atk: 75, cpct: 100, cdmg: 100, mastery: 55, dmg: 100, recharge: 45 })
  }
  if (attr.mastery < 80 && attr.cpct * 2 + attr.cdmg > 200 ) {
    return rule('八重-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100 , mastery: 25, recharge: 45 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 55 })
}
*/
