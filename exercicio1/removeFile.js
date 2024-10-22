import fs from 'node:fs'

function removeFile() {
    const exists = fs.existsSync('./meuarquivo.txt')
    try {
        if (exists) {
            fs.unlinkSync('./meuarquivo.txt')
            console.log('Arquivo excluido com sucesso!')
        }
    } catch (error) {
        console.log("Erro ao excluir arquivo: ", error.message)
    }
}

export default removeFile
