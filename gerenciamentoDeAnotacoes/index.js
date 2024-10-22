/*
Crie uma aplicação de linha de comando usando Node.js para criar e gerenciar anotações rápidas pelo terminal. 
A aplicação deve possuir um menu de diferentes opções, permitindo criar anotações, listar todas os arquivos salvos, 
ler uma anotação específica e excluir uma anotação específica. 
Todas as anotações devem ser salvas em formato .txt dentro de uma pasta “notes” junto com o próprio script principal.
*/

const fs = require("node:fs")
const readLine = require("node:readline")
const path = require("node:path")

const notesFolder = path.join(__dirname, 'notes') 
const rl = readLine.createInterface({input: process.stdin, output: process.stdout})

run()

function createNote() {
    rl.question("Insira o nome do arquivo (ex: note.txt): ", (noteName) => {
        rl.question("Insira o conteúdo da anotação: \n", (content) => {
            fs.writeFile(`${notesFolder}/${noteName}`, content, "utf-8", (err) => {
                if (err) {
                    console.log("Erro ao criar a anotação:", err.message)
                } else {
                    console.log("Anotação criada com sucesso!")
                }
                run()
            })
        })
    })
}

function showList() {
    if (!fs.existsSync(notesFolder)) {
        console.log("A pasta 'notes' não existe.")
        run()
        return
    }

    fs.readdir(notesFolder, (err, files) => {
        if (err) {
            console.log("Erro ao listar as anotações:", err.message)
        } else if (files.length === 0) {
            console.log("Nenhuma anotação encontrada.")
        } else {
            console.log("Lista de Anotações na pasta Notes: \n")
            files.forEach(file => {
                console.log(file + "\n------\n")
            })
        }
        console.log("\n")
        run()
    })
}

function readNote() {
    rl.question("Qual o nome do arquivo que deseja ler? ", (answer) => {
        fs.readdir(notesFolder, (err, files) => {
            if (err) {
                console.error("Erro ao ler a pasta:", err)
                run()
                return
            }

            if (files.includes(answer)) {
                console.log(`Arquivo encontrado: ${answer}`)
                fs.readFile(`${notesFolder}/${answer}`, 'utf8', (err, data) => {
                    if (err) {
                        console.error("Erro ao ler o arquivo:", err)
                    } else {
                        console.log(`Conteúdo do arquivo ${answer}:`)
                        console.log(data)
                    }
                    run()
                })
            } else {
                console.log("Arquivo não encontrado.")
                run()
            }
        })
    })
}

function removeNote() {
    rl.question("Qual o nome do arquivo que deseja deletar? ", (answer) => {
        fs.readdir(notesFolder, (err, files) => {
            if (err) {
                console.error("Erro ao ler a pasta:", err)
                run()
                return
            }

            if (files.includes(answer)) {
                fs.unlink(`${notesFolder}/${answer}`, (err) => {
                    if (err) {
                        console.error("Erro ao remover o arquivo:", err)
                    } else {
                        console.log(`Arquivo ${answer} removido com sucesso!`)
                    }
                    run()
                })
            } else {
                console.log("Arquivo não encontrado.")
                run()
            }
        })
    })
}

function run() {
    console.log("\n")
    try {
        rl.question("GERENCIADOR DE ANOTAÇÕES V1.0\nEscolha uma opção: \n1. Criar Anotação \n2. Mostrar Lista de Anotações \n3. Ler uma Anotação \n4. Remover uma Anotação \n5. Encerrar\n", (option) => {
            console.log("\n")
            switch (option.trim()) {
                case "1":
                    createNote()
                    break
                case "2":
                    showList()
                    break
                case "3":
                    readNote()
                    break
                case "4":
                    removeNote()
                    break
                case "5":
                    console.log("Encerrando...")
                    rl.close()
                    return
                default:
                    console.log("Opção Inválida")
                    run()
                    break
            }
        })
    } catch (error) {
        console.log("Erro:", error.message)
    }
}
