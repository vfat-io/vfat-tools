$(function() {
    consoleInit();
    start(main);
});

/*
Morph Coin (MORC): 0x236ecfb32c2b496f942c86d43b8ca4f6bd931e30
Morph Tracker (MORT): 0x970b596ea3cb9864397f799902f0a579cdc3377b
MORC-DAI LP Farm: 0x256F4048E89c7a96D349e3201B6c201Bf5a03E44
MORT-DAI LP Farm: 0x230EB7EeCd44d5887051Fc2566Ed8E02bd6cA682
Boardroom: 0x2AC38A2250d1B15F4eC2239928f160301eb19451
Seignoriage Oracle (8h): 0xC1f71859862a73193bF6c94805b2d6b0CB783Eb3
*/

async function main() {
    await loadBasisFork(Basis.DST);
}
