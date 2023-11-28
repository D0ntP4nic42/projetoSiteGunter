const sqlite = require('sqlite3').verbose()

const bd = new sqlite.Database('./vendas.sqlite3', function (err) { //abrir conexão
    if (err) {
        console.log("Erro: ", err)
    } else {
        console.log("Banco de dados estabelecido")
    }
})

if(bd.){

}