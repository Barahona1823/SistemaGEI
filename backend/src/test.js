console.log("Inicio de prueba");

(async function testFunction() {
    console.log("Probando ejecución de código...");
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Código ejecutado correctamente");
})();

console.log("Fin de prueba");
