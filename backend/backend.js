const http = require('http')
const mysql = require('mysql2');

function conectar(connection, tentativa = 1, tentativaMax = 10) {
    connection.connect(err => {
        if(err){
            console.error("Erro de conexão, Tentatando novamente")
            if(tentativa <= tentativaMax) {
                setTimeout(() => connect(connection, tentativa + 1), 10000)
            } else {
                console.error("Falha ao conectar")
            }
        } else {
            console.log("Conectado")
        }
        
    }
}

const connection = mysql.createConnection ({
    host: 'mysql',
    user: 'root',
    password: '3384',
    database: 'meu_banco',
});

conectar(connection)

//funções de manipulação
function obterVendas(req, res) {
    const sql = 'SELECT * FROM vendas';

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao obter vendas: ', err);
            res.statusCode = 500;
            res.end(JSON.stringify({ mensagem: "Erro ao obter vendas" }));
            return;
        }
        res.statusCode = 200;
        res.end(JSON.stringify(results));
    });
}

function adicionarVenda(req, res) {
    let body = ''
    req.on('data', chunk => body += chunk.toString()) //parte por parte 'chunks' body é a junção deles
    req.on('end', () => {
        const venda = JSON.parse(body);
        const sql = 'INSERT INTO vendas (codVendedor, nomeVendedor, cargoVendedor, codVenda, valorVenda) VALUES (?, ?, ?, ?, ?)';

        connection.query(sql, [venda.codVendedor, venda.nomeVendedor, venda.cargoVendedor, venda.codVenda, venda.valorVenda], (err) => {
            if (err) {
                console.error('Erro ao adicionar venda: ', err);
                res.statusCode = 500;
                res.end(JSON.stringify({ mensagem: "Erro ao adicionar venda" }));
                return;
            }

            res.statusCode = 200;
            res.end(JSON.stringify(venda));
        })
    })

}

function editarVenda(req, res) {
    let body = ''
    req.on('data', chunk => body += chunk.toString()) //parte por parte 'chunks' body é a junção deles
    req.on('end', () => {
        const venda = JSON.parse(body)
        const sql = 
                        `   UPDATE
                                vendas
                            INNER JOIN
                                vendedores
                            SET
                                vendedores.id = ?
                                vendedores.nomeVendedor = ?
                                vendedores.cargoVendedor = ?
                                vendas.idVenda = ?
                                vendas.idVendedor = ?
                                vendas.valorVenda = ?
                            WHERE   
                                vendedores.id = ?
                        `
        const id = req.url.split('/')[2];

        connection.query(sql, [venda.codVendedor, venda.nomeVendedor, venda.cargoVendedor, venda.codVenda, venda.codVendedor, venda.valorVenda, venda.codVendedor], (err) => {
            if (err) {
                console.error('Erro ao editar venda: ', err);
                res.statusCode = 500;
                res.end(JSON.stringify({ mensagem: "Erro ao editar venda" }));
                return;
            }

            res.statusCode = 200;
            res.end(JSON.stringify(venda));
        })
    })
}

function apagarVenda(req, res) {
    const sql = 'DELETE FROM vendas WHERE id = ?';
    const id = req.url.split('/')[2];

    if(id > 0){
        connection.query(sql, [id], (err) => {
            if (err) {
                console.error('Erro ao apagar venda: ', err);
                res.statusCode = 500;
                res.end(JSON.stringify({ mensagem: "Erro ao apagar venda" }));
                return;
            }
            res.statusCode = 200;
            res.end(JSON.stringify({ mensagem: "Venda apagada com sucesso" }));
        })

    } else {
        res.statusCode = 400;
        res.end(JSON.stringify({ mensagem: "ID inválido" }));
        return;
    }
}

function vendaPorId(req, res) {
    const sql = "SELECT * FROM vendas"
}

function obterPagina(req, res) {

}

//montar server
const servidorWEB = http.createServer(function (req, res) {
    //cors
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
    } else if (req.url === '/vendas/' && req.method === 'GET') {
        vendaPorId(req, res)
    } else if (req.url === '/vendas' && req.method === 'POST') { //add
        adicionarVenda(req, res)
    } else if (req.url.startsWith('/vendas/') && req.method === 'PUT') {
        editarVenda(req, res)
    } else if (req.url.startsWith('/vendas/') && req.method === 'DELETE') {
        apagarVenda(req, res)
    } else if (req.url === '/' && req.method === 'GET') {
        obterPagina(req, res)
    } else {
        res.statusCode = 404
        res.end(JSON.stringify({ mensagem: "rota não encontrada" }))
    }

})

//fechar bd ao sair do programa
process.on('SIGINT', () => {
    console.log('Recebido SIGINT. Fechando conexão com o banco de dados.');
    connection.end(err => {
        if (err) {
            console.error('Erro ao fechar a conexão com o banco de dados:', err);
        } else {
            console.log('Conexão com o banco de dados fechada com sucesso.');
        }
        process.exit(0); // Sai do processo após fechar a conexão
    });
});

process.on('SIGTERM', () => {
    console.log('Recebido SIGTERM. Fechando conexão com o banco de dados.');
    connection.end(err => {
        if (err) {
            console.error('Erro ao fechar a conexão com o banco de dados:', err);
        } else {
            console.log('Conexão com o banco de dados fechada com sucesso.');
        }
        process.exit(0); // Sai do processo após fechar a conexão
    });
});

servidorWEB.listen(5000, () => console.log("42!"))
