const os = require("node:os")
const path = require("node:path")
const fs = require("node:fs").promises

async function pcDetails() {
    const so = os.platform()
    const arquitetura = os.arch()
    const modeloProcessador = os.cpus()[0].model
    const tempoAtividade = os.uptime()
    const totalMemoria = os.totalmem()
    const memoriaLivre = os.freemem()
    const usoMemoria = ((totalMemoria - memoriaLivre) / totalMemoria) * 100

    return {
        so,
        arquitetura,
        modeloProcessador,
        tempoAtividade,
        usoMemoria
    }
}

setInterval(async () => {
    const details = await pcDetails()
    console.clear()
    console.log(details)
    await registerDetails(details);
}, 1000);

async function registerDetails(details) {
    const relPath = "./monitorDoSistema/log/log.txt";
    const absPath = path.resolve(relPath);

    const dir = path.dirname(absPath);
    try {
        await fs.access(dir); // Tenta acessar o diretório
    } catch {
        await fs.mkdir(dir, { recursive: true }); // Criar diretório de forma assíncrona se não existir
    }

    const detailsString = JSON.stringify(details, null, 2); 
    await fs.appendFile(absPath, `${detailsString}\n----------\n`); // Usar appendFile para adicionar detalhes ao arquivo de forma assíncrona
}

// Para iniciar o registro de detalhes assim que o arquivo estiver configurado
(async () => {
    await registerDetails(await pcDetails()); // Escrever uma entrada inicial
})();


