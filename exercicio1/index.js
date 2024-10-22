import createFile from './createFile.js';
import rewriteFile from "./rewriteFile.js"
import removeFile from "./removeFile.js"
import readFile from "./readFile.js"

createFile("Olá eu sou o Bernardo!")
readFile()
rewriteFile("Modificado!")
readFile()
removeFile()
