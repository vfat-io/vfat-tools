$(function() {
consoleInit(main)
});

async function main() {
    await loadBasisFork(Basis.YFLUSD);
}
