const http = require('http')

let vendas = [
    {
        codVendedor: '01',
        nomeVendedor: 'Leonardo Brito Gomes',
        cargo: 'Pleno',
        codVenda: '01',
        valorVenda: '30000'
    },

    {
        codVendedor: '02',
        nomeVendedor: 'Gimli, filho de Glóin',
        cargo: 'Júnior',
        codVenda: '03',
        valorVenda: '80'
    },

    {
        codVendedor: '01',
        nomeVendedor: 'Leonardo Brito Gomes',
        cargo: 'Pleno',
        codVenda: '02',
        valorVenda: '200'
    }
]

//funções de manipulação
function obterVendas(req, res) {
    res.statusCode = 200
    res.end(JSON.stringify(vendas))
}

function adicionarVenda(req, res) {
    let body = ''
    req.on('data', chunk => body += chunk.toString()) //parte por parte 'chunks' body é a junção deles
    req.on('end', () => {
        let venda = JSON.parse(body)
        vendas.push(venda)
        res.statusCode = 200
        res.end(JSON.stringify(venda)) //avisar que salvou
    })
}

function editarVenda(req, res) {
    const indexParaEditar = req.url.split('/')[2]
    let body = ''
    req.on('data', chunk => body += chunk.toString()) //parte por parte 'chunks' body é a junção deles
    req.on('end', () => {
        let venda = JSON.parse(body)
        vendas[indexParaEditar] = venda
        res.statusCode = 200
        res.end(JSON.stringify(venda)) //avisar que salvou a edição
    })
}

function apagarContato(req, res) {
    const indexParaApagar = req.url.split('/')[2]

    if(indexParaApagar > -1){
        vendas.splice(indexParaApagar, 1)
        res.statusCode = 200
        res.end(JSON.stringify({ mensagem: "apagado com sucesso" }))
    } else {
        res.statusCode = 404
        res.end(JSON.stringify({ mensagem: "indice não encontrado"}))
    }
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
        apagarContato(req, res)
    } else {
        res.statusCode = 404
        res.end(JSON.stringify({ mensagem: "rota não encontrada" }))
    }

})

servidorWEB.listen(5000, () => console.log("42!"))