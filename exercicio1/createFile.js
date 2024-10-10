import fs from 'node:fs';

function createFile(text) {
    try {
        fs.writeFileSync('./meuarquivo.txt', text, 'utf-8')
        console.log('Arquivo criado!')
    } catch (error) {
        console.log('Erro ao criar arquivo: ', error.message)
    }
}

export default createFile