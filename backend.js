const http = require('http')
const sqlite = require('sqlite3').verbose()

let vendas = []

//funções de manipulação
function obterVendas(req, res) {
    const bd = new sqlite.Database('./vendas.sqlite3', function (err) { //abrir conexão
        if (err) {
            console.log("Erro: ", err)
        } else {
            console.log("Banco de dados estabelecido")
        }
    })

    bd.all(`SELECT * FROM vendas`, [], (err, rows) => {
        if(err){
            throw err
        }
        vendas = rows
        res.end(JSON.stringify(vendas))
        res.statusCode = 200
    })


    bd.close((err) => { //fechar conexão
        if (err) {
            console.log("Erro: ", err)
        } else {
            console.log("Conexão fechada")
        }
    })
}

function adicionarVenda(req, res) {
    const bd = new sqlite.Database('./vendas.sqlite3', function (err) { //abrir conexão
        if(err) {
            console.log("Erro: ", err)
        } else {
            console.log("Banco de dados estabelecido")
        }
    })

    let body = ''
    req.on('data', chunk => body += chunk.toString()) //parte por parte 'chunks' body é a junção deles
    req.on('end', () => {
        let venda = JSON.parse(body)
        
        const sql = "INSERT INTO vendas (codVendedor, nomeVendedor, cargo, codVenda, valorVenda) VALUES (?, ?, ?, ?, ?)";
        const values = [venda.codVendedor, venda.nomeVendedor, venda.cargo, venda.codVenda, venda.valorVenda];
        
        bd.run(sql, values, function (err) {
            if (err) {
                throw err
            } else {
                console.log('Venda adicionada!')
                res.statusCode = 200
                res.end(JSON.stringify(venda)) //avisar que salvou
            }

            bd.close((err) => { //fechar conexão
                if (err) {
                    console.log("Erro: ", err)
                } else {
                    console.log("Conexão fechada")
                }
            })
        })
    })

}

function editarVenda(req, res) {
    const bd = new sqlite.Database('./vendas.sqlite3', function (err) { //abrir conexão
        if (err) {
            console.log("Erro: ", err)
        } else {
            console.log("Banco de dados estabelecido")
        }
    })

    const idEditar = req.url.split('/')[2]
    let body = ''
    req.on('data', chunk => body += chunk.toString()) //parte por parte 'chunks' body é a junção deles
    req.on('end', () => {
        let venda = JSON.parse(body)

        const sql = "UPDATE vendas set codVendedor = ?, nomeVendedor = ?, cargo = ?, codVenda = ?, valorVenda = ? where id = ?";
        const values = [venda.codVendedor, venda.nomeVendedor, venda.cargo, venda.codVenda, venda.valorVenda, idEditar];

        bd.run(sql, values, function (err) {
            if (err) {
                throw err
            } else {
                console.log('Venda alterada!')
                res.statusCode = 200
                res.end(JSON.stringify(venda)) //avisar que salvou
            }

            bd.close((err) => { //fechar conexão
                if (err) {
                    console.log("Erro: ", err)
                } else {
                    console.log("Conexão fechada")
                }
            })
        })
    })
}

function apagarVenda(req, res) {
    const bd = new sqlite.Database('./vendas.sqlite3', function (err) { //abrir conexão
        if (err) {
            console.log("Erro: ", err)
        } else {
            console.log("Banco de dados estabelecido")
        }
    })

    const idApagar = req.url.split('/')[2]

    if(idApagar > 0){
        bd.all("DELETE FROM vendas WHERE id = (?)", [idApagar])
        res.statusCode = 200
        res.end(JSON.stringify({ mensagem: "apagado com sucesso" }))
    } else {
        res.statusCode = 404
        res.end(JSON.stringify({ mensagem: "indice não encontrado"}))
    }

    bd.close((err) => { //fechar conexão
        if (err) {
            console.log("Erro: ", err)
        } else {
            console.log("Conexão fechada")
        }
    })
}

//montar server
const servidorWEB = http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.statusCode = 204; // No Content
        res.end();
        return;
    }

    res.setHeader('Content-Type', 'application/json')

    //metodos de requisições
    if (req.url === '/vendas' && req.method === 'GET') {
        obterVendas(req, res)
    } else if (req.url === '/vendas' && req.method === 'POST') { //add
        adicionarVenda(req, res)
    } else if (req.url.startsWith('/vendas/') && req.method === 'PUT') {
        editarVenda(req, res)
    } else if (req.url.startsWith('/vendas/') && req.method === 'DELETE') {
        apagarVenda(req, res)
    } else {
        res.statusCode = 404
        res.end(JSON.stringify({ mensagem: "rota não encontrada" }))
    }

})

servidorWEB.listen(5000, () => console.log("42!"))