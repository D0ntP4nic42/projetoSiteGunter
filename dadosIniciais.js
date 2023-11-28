const sqlite = require('sqlite3').verbose()
let tabelas = []

let dadosIniciais = [
    {
        codVendedor: '5',
        nomeVendedor: 'Perla da Silva Souza',
        cargoVendedor: 'senior',
        codVenda: '1',
        valorVenda: '636.0',
        id: 1
    },
    {
        codVendedor: '4',
        nomeVendedor: 'Valderrama dos Prazeres',
        cargoVendedor: 'pleno',
        codVenda: '3',
        valorVenda: '66295.58',
        id: 3
    },
    {
        codVendedor: '6',
        nomeVendedor: 'Lydia Carmona Mesquita',
        cargoVendedor: 'junior',
        codVenda: '4',
        valorVenda: '29787.65',
        id: 4
    },
    {
        codVendedor: '5',
        nomeVendedor: 'Perla da Silva Souza',
        cargoVendedor: 'senior',
        codVenda: '5',
        valorVenda: '135882.36',
        id: 5
    },
    {
        codVendedor: '9',
        nomeVendedor: 'Lydyane Kevany Kowalsky',
        cargoVendedor: 'senior',
        codVenda: '6',
        valorVenda: '87366.29',
        id: 6
    },
    {
        codVendedor: '10',
        nomeVendedor: 'Emira da Costa Rodrigues',
        cargoVendedor: 'junior',
        codVenda: '7',
        valorVenda: '45365.89',
        id: 7
    },
    {
        codVendedor: '6',
        nomeVendedor: 'Lydia Carmona Mesquita',
        cargoVendedor: 'junior',
        codVenda: '8',
        valorVenda: '8552.36',
        id: 8
    },
    {
        codVendedor: '7',
        nomeVendedor: 'Bond, James Bond',
        cargoVendedor: 'pleno',
        codVenda: '9',
        valorVenda: '34256.99',
        id: 9
    },
    {
        codVendedor: '11',
        nomeVendedor: 'Robson Fabiano Oliveira',
        cargoVendedor: 'junior',
        codVenda: '10',
        valorVenda: '21445.39',
        id: 10
    },
    {
        codVendedor: '12',
        nomeVendedor: 'Francisco Cassiano Silva',
        cargoVendedor: 'pleno',
        codVenda: '11',
        valorVenda: '12128.11',
        id: 11
    },
    {
        codVendedor: '4',
        nomeVendedor: 'Valderrama dos Prazeres',
        cargoVendedor: 'pleno',
        codVenda: '12',
        valorVenda: '26545.22',
        id: 12
    },
    {
        codVendedor: '8',
        nomeVendedor: 'Domingues Castro Alves',
        cargoVendedor: 'senior',
        codVenda: '13',
        valorVenda: '39753.35',
        id: 13
    },
    {
        codVendedor: '12',
        nomeVendedor: 'Francisco Cassiano Silva',
        cargoVendedor: 'pleno',
        codVenda: '14',
        valorVenda: '15785.36',
        id: 14
    },
    {
        codVendedor: '9',
        nomeVendedor: 'Lydyane Kevany Kowalsky',
        cargoVendedor: 'senior',
        codVenda: '15',
        valorVenda: '196333.88',
        id: 15
    },
    {
        codVendedor: '8',
        nomeVendedor: 'Domingues Castro Alves',
        cargoVendedor: 'senior',
        codVenda: '16',
        valorVenda: '231333.99',
        id: 16
    },
    {
        codVendedor: '4',
        nomeVendedor: 'Valderrama dos Prazeres',
        cargoVendedor: 'pleno',
        codVenda: '17',
        valorVenda: '43558.69',
        id: 17
    },
    {
        codVendedor: '4',
        nomeVendedor: 'Valderrama dos Prazeres',
        cargoVendedor: 'pleno',
        codVenda: '18',
        valorVenda: '12532.87',
        id: 18
    },
    {
        codVendedor: '6',
        nomeVendedor: 'Lydia Carmona Mesquita',
        cargoVendedor: 'junior',
        codVenda: '19',
        valorVenda: '67475.11',
        id: 19
    },
    {
        codVendedor: '10',
        nomeVendedor: 'Emira da Costa Rodrigues',
        cargoVendedor: 'junior',
        codVenda: '20',
        valorVenda: '21456.12',
        id: 20
    },
    {
        codVendedor: '11',
        nomeVendedor: 'Robson Fabiano Oliveira',
        cargoVendedor: 'junior',
        codVenda: '21',
        valorVenda: '36963.21',
        id: 21
    },
    {
        codVendedor: '7',
        nomeVendedor: 'Bond, James Bond',
        cargoVendedor: 'pleno',
        codVenda: '22',
        valorVenda: '67158.24',
        id: 22
    },
    {
        codVendedor: '11',
        nomeVendedor: 'Robson Fabiano Oliveira',
        cargoVendedor: 'junior',
        codVenda: '23',
        valorVenda: '19345.29',
        id: 23
    },
    {
        codVendedor: '12',
        nomeVendedor: 'Francisco Cassiano Silva',
        cargoVendedor: 'pleno',
        codVenda: '24',
        valorVenda: '55222.69',
        id: 24
    },
    {
        codVendedor: '5',
        nomeVendedor: 'Perla da Silva Souza',
        cargoVendedor: 'senior',
        codVenda: '26',
        valorVenda: '94568.65',
        id: 26
    },
    {
        codVendedor: '042',
        nomeVendedor: 'Leonardo Brito Gomes',
        cargoVendedor: 'senior',
        codVenda: '042',
        valorVenda: '424242.42',
        id: 27
    }
]

const bd = new sqlite.Database('./vendas.sqlite3', function (err) { //abrir conexão
    if (err) {
        console.log("Erro: ", err)
    } else {
        console.log("Banco de dados estabelecido")
    }
})

bd.all(`SELECT * FROM sqlite_schema WHERE type ='table' AND name NOT LIKE 'sqlite_%'`, function(err, tables){
    tables.forEach(table => {
        tabelas.push(table.tbl_name)
    })

    if(!tabelas.includes('vendas')){
        bd.all(`CREATE TABLE "vendas"(id integer primary key, codVendedor text, "nomeVendedor" text, "cargoVendedor" text, codVenda text, valorVenda text)`, function (err) {
            if(err){
                throw err
            } else {
                console.log("Tabela Criada")
                dadosIniciais.forEach(venda => {
                    bd.all(`INSERT INTO "vendas" ("codVendedor", "nomeVendedor", "cargoVendedor", "codVenda", "valorVenda")
                            VALUES (?, ?, ?, ?, ?)`,
                            [venda.codVendedor, venda.nomeVendedor, venda.cargoVendedor, venda.codVenda, venda.valorVenda],
                            function(err2) {
                                if(err2){
                                    throw err2
                                } else {
                                    console.log("Venda adicionada")
                                }
                    })
                })
            }
        })
        

    }
    
    bd.close((err) => { //fechar conexão
        if (err) {
            console.log("Erro: ", err)
        } else {
            console.log("Conexão fechada")
        }
    })
})