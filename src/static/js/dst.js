$(function() {
    consoleInit();
    start(main);
});

/*
Dynamic Supply Token (DST): 0xfa9C3dC54baA9eefBe9453B1f3B3B93aD2AF0A77
Dynamic Supply Tracker (DSTR): 0x55696EfC7c9779d868Ac34aC6b4a4C5FeD61aC12
Dynamic Supply Note (DSN): 0xc03a5f41a22e970686f980e6669c6a882e20c262
DST-DAI LP Farm: 0x030cF06D8A39d5Ef4b169EAc0D4D5B0c51b42194
DSTR-DAI LP Farm: 0xCdB0c60EA5bF50641A570E25875EAB6c889E949d
Boardroom: 0x4c8C0F47CA9A1888539Bbb59DdeF8550F329f866
Seignoriage Oracle (6h): 0x3a9A1CEC3546b4FB810756Cd3aD072a3d6345A8a
Note Oracle (30m): 0xa709A321b7684A4dBB9B0023f2e50Bc37A258f02
*/

async function main() {
    await loadBasisFork(Basis.DST);
}