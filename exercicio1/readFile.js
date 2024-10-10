import fs from 'node:fs'

function readFile() {
    try {
        const exists = fs.existsSync('./meuarquivo.txt')
        if (exists) {
            const data = fs.readFileSync('./meuarquivo.txt', 'utf-8')
            console.log(data)
            console.log('Arquivo lido com sucesso!')
        } else {
            console.log('Arquivo não existe!')
        }
    } catch (error) {
        console.log('Não foi possível ler o arquivo!', error.message)
    }
}

export default readFile
