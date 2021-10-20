$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"FANTOM Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      [
        "Popsicle",
        `<a href='popsicle'>Various</a>`,
        "ICE",
        "https://popsicle.finance"
      ],
      [
        "Spooky",
        `<a href='spooky'>Various</a>`,
        "boo",
        "https://spookyswap.finance"
      ],
      [
        "Spirit",
        `<a href='spirit'>Various</a>`,
        "SPIRIT",
        "https://app.spiritswap.finance"
      ],
      [
        "Borg",
        `<a href='borg'>Various</a>`,
        "SON",
        "https://ftm.borgswap.exchange"
      ],
      [
        "Hyperjump",
        `<a href='hyperjump'>Various</a>`,
        "ORI",
        "https://hyperjump.fi"
      ],
      [
        "Ester",
        `<a href='ester'>Various</a>`,
        "EST",
        "https://ester.finance"
      ],
      [
        "Froyo",
        `<a href='froyo'>Various</a>`,
        "FROYO",
        "https://frozenyogurt.finance"
      ],
      [
        "Ghost",
        `<a href='ghost'>Various</a>`,
        "GHOST",
        "https://www.theghost.finance"
      ],
      [
        "Beefy",
        `<a href='beefy'>Various</a>`,
        "BIFI",
        "https://fantom.beefy.finance"
      ],
      [
        "Liquid Driver",
        `<a href='liquid'>Various</a>`,
        "LQDR",
        "https://www.liquiddriver.finance"
      ],
      [
        "Mushrooms",
        `<a href='mushrooms'>Various</a>`,
        "MM",
        "https://mushrooms.finance/farms"
      ],
      [
        "Greenhouse",
        `<a href='greenhouse'>Various</a>`,
        "SEED",
        "https://thegreenhouse.finance"
      ],
      [
        "Stake Steak",
        `<a href='steak'>Various</a>`,
        "STEAK",
        "https://stakesteak.com"
      ],
      [
        "Frankenstein",
        `<a href='frankenstein'>Various</a>`,
        "FRANK",
        "https://frankenstein.finance"
      ],
      [
        "Waka",
        `<a href='waka'>Various</a>`,
        "WAKA",
        "https://waka.finance"
      ],
      [
        "Elk",
        `<a href='elk'>Various</a>`,
        "ELK",
        "https://app.elk.finance"
      ],
      [
        "Paintswap",
        `<a href='paintswap'>Various</a>`,
        "BRUSH",
        "https://paintswap.finance"
      ],
      [
        "Tomb",
        `<a href='tomb'>Various</a>`,
        "TOMB",
        "https://tomb.finance"
      ],
      [
        "Shadow",
        `<a href='shadow'>Various</a>`,
        "SHADOW",
        "https://shadowswap.app"
      ],
      [
        "Borgswap",
        `<a href='borgswap'>Various</a>`,
        "KLING",
        "https://klingftm.borgswap.exchange"
      ],
      [
        "Opera",
        `<a href='opera'>Various</a>`,
        "OPERA",
        "https://www.operaswap.finance"
      ],
      [
        "Chad",
        `<a href='chad'>Various</a>`,
        "CHAD",
        "https://www.chadfinance.io"
      ],
      [
        "Guru",
        `<a href='guru'>ELITE-WFTM SLP</a>`,
        "ELITE",
        "https://ftm.guru"
      ],
      [
        "Rediant",
        `<a href="rediant">Various</a>`,
        "RDT",
        "https://rediant.finance"
      ],
      [
        "Mlnl",
        `<a href="mlnl">Various</a>`,
        "MLNL",
        "https://milfinance.xyz"
      ],
      [
        "Yorocoon",
        `<a href="yorocoon">Various</a>`,
        "CATNIP",
        "https://yorocoon.com"
      ],
      [
        "Balloon Farms",
        `<a href='balloonfarms'>Various</a>`,
        "BALLOON",
        "https://www.fantomballoons.com"
      ],
      [
        "Spoon",
        `<a href='spoon'>Various</a>`,
        "SPOON",
        "https://app.spoon.finance"
      ],
      [
        "Bullrun",
        `<a href='bullrun'>Various</a>`,
        "BULL",
        "https://fantom.bullrun.finance"
      ],
      [
        "Strangebrew",
        `<a href='strangebrew'>Various</a>`,
        "BEERMONEY",
        "https://www.strangebrew.finance"
      ],
      [
        "Uniron",
        `<a href='uniron'>Various</a>`,
        "UNIRON",
        "https://www.uniron.finance"
      ],
      [
        "Shade",
        `<a href='shade'>Various</a>`,
        "SHADE",
        "https://shade.cash"
      ],
      [
        "Butt",
        `<a href='butt'>Various</a>`,
        "BUTT",
        "https://www.buttcoincrypto.com"
      ],
      [
        "Grim",
        `<a href='grim'>Various</a>`,
        "GRIM",
        "https://app.grim.finance"
      ],
      [
        "Ryu Inu",
        `<a href='ryuinu'>Various</a>`,
        "RYUINU",
        "https://ftm.ryuinu.finance"
      ],
      [
        "Knight",
        `<a href='knight'>Various</a>`,
        "KF",
        "https://www.knight-finance.xyz"
      ],
      [
        "beHODL",
        `<a href='behodl'>Various</a>`,
        "beHODL",
        "N/A"
      ],
      [
        "AURA",
        `<a href='aura'>Various</a>`,
        "AURA",
        "https://dapp.aurafi.org/"
      ],
      [
        "Galaxy Finance One",
        `<a href='galaxy_triton'>Various</a>`,
        "TRITON",
        "https://fantom-triton.galaxyfinance.one/"
      ],
      [
        "ShibaSwap - GBONE",
        `<a href='shibaswap'>Various</a>`,
        "GBONE",
        "https://shibafantom.finance"
      ],
      [
        "ShibaSwap - BONE",
        `<a href='shibaswap_bone'>Various</a>`,
        "BONE",
        "https://shibafantom.finance"
      ],
      [
        "Guru - LF#1",
        `<a href='guru_lite1'>NIPS-WFTM ZDEXLP</a>`,
        "NIPS",
        "https://ftm.guru/LF/1"
      ],
      [
        "Yield Enhancement Labs",
        `<a href='yel'>Various</a>`,
        "YEL",
        "https://yel.finance"
      ],
      [
        "Guru - LF#2001",
        `<a href='guru_lite2001'>Nova-WFTM spLP</a>`,
        "BLK",
        "https://ftm.guru/LF/2001"
      ],
      [
        "Guru - LF#2002",
        `<a href='guru_lite2002'>Nova-BLK spLP</a>`,
        "Nova",
        "https://ftm.guru/LF/2002"
      ],
      [
        "Bomb",
        `<a href='fbomb'>Various</a>`,
        "SHRAP",
        "https://app.fbomb.finance"
      ],
      [
        "xDao",
        `<a href='xdao'>Various</a>`,
        "HTZ",
        "https://thexdao.com"
      ],
      [
        "Guru - YS#2",
        `<a href='guru_ys2'>ELITE-WFTM spLP</a>`,
        "ELITE",
        "https://ftm.guru/YS/2"
      ],
      [
        "Guru - LF#23",
        `<a href='guru_lite23'>DEATH-WFTM spLP</a>`,
        "DEATH",
        "https://ftm.guru/LF/23"
      ],
      [
        "Zoocoin",
        `<a href='zoocoin'>Various</a>`,
        "WILD",
        "https://dex.zoocoin.cash"
      ],
      [
        "FrensFi",
        `<a href='frensfi'>Various</a>`,
        "Various",
        "https://frens.fi"
      ],
      [
        "Reaper.Farm",
        `<a href='reaperfarm'>Various</a>`,
        "Various",
        "https://reaper.farm"
      ],
      [
        "OberonFinance",
        `<a href='galaxy_oberon'>Various</a>`,
        "OBERON",
        "https://fantom-oberon.galaxyfinance.one/"
      ],
      [
        "Guru - LF#2005",
        `<a href='guru_lite2005'>BLK-WFTM spLP</a>`,
        "Nova",
        "https://ftm.guru/LF/2005"
      ],
      [
        "Guru - LF#301",
        `<a href='guru_lite301'>TCUZ-WFTM SPIRIT-LP</a>`,
        "TCUZ",
        "https://ftm.guru/LF/301"
      ],
      [
        "Morpheus Swap",
        `<a href='morpheusswap'>Various</a>`,
        "MORPH",
        "https://morpheusswap.finance"
      ],
      [
        "Olive",
        `<a href='olive'>Various</a>`,
        "OLIVE",
        "https://olive.cash"
      ],
      [
        "Guru - LF#2004",
        `<a href='guru_lite2004'>Nova</a>`,
        "BLK",
        "https://ftm.guru/LF/2004"
      ],
      [
        "Guru - LF#2006",
        `<a href='guru_lite2006'>SST-WFTM spLP</a>`,
        "BLK",
        "https://ftm.guru/LF/2006"
      ],
      [
        "PumpKins Farm",
        `<a href='pumpkinsfarm'>Various</a>`,
        "KINS",
        "https://pumpkins.farm"
      ],
      [
        "NippleLabs - BOOB",
        `<a href='nipplelabs'>Various</a>`,
        "BOOB",
        "https://nipplelabs.finance"
      ],
      [
        "NippleLabs - MILK",
        `<a href='nipplelabs_milk'>Various</a>`,
        "MILK",
        "https://nipplelabs.finance"
      ],
      [
        "Guru - LF#1010",
        `<a href='guru_lite1010'>SUN</a>`,
        "SUN",
        "https://ftm.guru/LF/1010"
      ],
      [
        "Guru - LF#1011",
        `<a href='guru_lite1010'>SUN-WFTM SPIRIT-LP</a>`,
        "SUN",
        "https://ftm.guru/LF/1011"
      ],
      [
        "WraithSwap",
        `<a href='wraith'>Various</a>`,
        "WRA",
        "https://wraithswap.finance"
      ],
      [
        "FoxyFinance",
        `<a href='foxyfinance'>Various</a>`,
        "FOXY",
        "https://foxyfinance.co"
      ],
      [
        "Eleven",
        `<a href='eleven'>Various</a>`,
        "Various",
        "https://eleven.finance"
      ],
      [
        "Fantom Cougar",
        `<a href='cougar'>Various</a>`,
        "CGS",
        "https://fantomapp.cougarswap.io"
      ],
      [
        "Meso Finance",
        `<a href='meso'>Various</a>`,
        "MESO",
        "https://www.meso.finance"
      ],
      [
        "Fantom Berry",
        `<a href='berry'>Various</a>`,
        "BERRY",
        "https://fantomberry.world"
      ],
      [
        "Procyon",
        `<a href='procyon'>Various</a>`,
        "PROCYON",
        "https://procyonswap.com"
      ],
      [
       "Soul Swap",
       `<a href='soulswap'>Various</a>`,
       "SOUL",
       "https://soul.sh",
      ],
      [
       "Kavian Finance",
       `<a href='kavian'>Various</a>`,
       "fKAVIAN",
       "https://fantom.kavian.finance",
      ],
      [
        "Sapphire DeFi",
        `<a href='sapphire'>Various</a>`,
        "SAPPHIRE",
        "https://sapphiredefi.com"
      ],
      [
       "Geist Finance",
       `<a href='geist'>Various</a>`,
       "GEIST",
       "https://geist.finance",
      ],
      [
       "Beethovenx",
       `<a href='beethovenx'>Various</a>`,
       "BEETS",
       "https://app.beethovenx.io",
      ],
      [
       "Curve",
       `<a href='curve'>Various</a>`,
       "CRV/FTM",
       "https://ftm.curve.fi",
      ],
      [
        "Singular",
        `<a href='singular'>Various</a>`,
        "SING",
        "https://singular.farm"
      ],
      ["KogeFarm           ", `<a href="koge"         >Various</a>`,'Various      ',"https://kogefarm.io"],
      [
        "ScareCrow Finance",
        `<a href='scarecrow'>Various</a>`,
        "SCARE",
        "https://scarecrow.fi"
      ],
      [
        "Sapphire War",
        `<a href='sapphirewar'>Various</a>`,
        "WAR",
        "https://war.sapphiredefi.com/"
      ],
      ["DarkMatter         ", `<a href="darkmatter"   >Various</a>`,'DMD          ',"https://www.darkmatterdefi.com"],
      ["DegenApe           ", `<a href="degenape"     >Various</a>`,'DAPE         ',"https://www.degenapefarm.com"],
      ["ArcDefi            ", `<a href="arcdefi "     >Various</a>`,'ARC         ',"https://arcdefi.org"],
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
