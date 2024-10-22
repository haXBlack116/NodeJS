import fs from 'node:fs';

function rewriteFile(text) {
    const exists = fs.existsSync('./meuarquivo.txt')
    try {
        if (exists) {
            fs.writeFileSync('./meuarquivo.txt', text, 'utf-8')
            console.log('Arquivo reescrito com sucesso!')
        }
    } catch (error) {
        console.log('Erro ao reescrever arquivo: ', error.message)
    }
}

export default rewriteFile
