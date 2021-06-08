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
        "Various",
        "https://fantom.beefy.finance"
      ],
      [
        "Liquid Driver",
        `<a href='liquid'>Various</a>`,
        "LQDR",
        "https://www.liquiddriver.finance"
      ],
      [
        "Standard",
        `<a href='standard'>Various</a>`,
        "STRD",
        "https://strd.finance"
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
        "Elk *",
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
        "Various",
        "https://tomb.finance"
      ],
      [
        "Shadow",
        `<a href='shadow'>Various</a>`,
        "Various",
        "https://shadowswap.app"
      ]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}