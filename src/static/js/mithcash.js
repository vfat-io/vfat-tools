$(function() {
    consoleInit();
    start(main);
});

async function main() {
    await loadBasisFork(Basis.MITH);
}
