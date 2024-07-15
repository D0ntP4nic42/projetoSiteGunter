CREATE DATABASE IF NOT EXISTS meu_banco;
USE meu_banco;

CREATE TABLE IF NOT EXISTS vendedores(
  id INT PRIMARY KEY AUTO_INCREMENT,
  nomeVendedor VARCHAR(40),
  cargoVendedor VARCHAR(40),
);

CREATE TABLE IF NOT EXISTS vendas (
  idVenda INT PRIMARY KEY AUTO_INCREMENT,
  idVendedor INT FOREIGN KEY REFERENCES vendedores(id)
  valorVenda VAECHAR(40)
);

INSERT INTO vendedores VALUES('Valderrama dos Prazeres','pleno');
INSERT INTO vendedores VALUES('Lydia Carmona Mesquita','junior');
INSERT INTO vendedores VALUES('Robson Fabiano Oliveira','junior');
INSERT INTO vendedores VALUES('Francisco Cassiano Silva','pleno');
INSERT INTO vendedores VALUES('Perla da Silva Souza','senior');
INSERT INTO vendedores VALUES('Lydyane Kevany Kowalsky','senior');
INSERT INTO vendedores VALUES('Bond, James Bond','pleno');
INSERT INTO vendedores VALUES('Emira da Costa Rodrigues','junior');
INSERT INTO vendedores VALUES('Domingues Castro Alves','senior');
INSERT INTO vendedores VALUES('Leonardo Brito Gomes','senior');


INSERT INTO vendas VALUES('3',1,'66295.58');
INSERT INTO vendas VALUES('4',2,'29787.65');
INSERT INTO vendas VALUES('8',2,'8552.36');
INSERT INTO vendas VALUES('9',7,'34256.99');
INSERT INTO vendas VALUES('10',3,'21445.39');
INSERT INTO vendas VALUES('11',4,'12128.11');
INSERT INTO vendas VALUES('5',5,'135882.36');
INSERT INTO vendas VALUES('6',6,'87366.29');
INSERT INTO vendas VALUES('14',4,'15785.36');
INSERT INTO vendas VALUES('7',8,'45365.89');
INSERT INTO vendas VALUES('16',9,'231333.99');
INSERT INTO vendas VALUES('17',1,'43558.69');
INSERT INTO vendas VALUES('18',1,'12532.87');
INSERT INTO vendas VALUES('15',6,'196333.88');
INSERT INTO vendas VALUES('20',8,'21456.12');
INSERT INTO vendas VALUES('21',3,'36963.21');
INSERT INTO vendas VALUES('22',7,'67158.24');
INSERT INTO vendas VALUES('23',3,'19345.29');
INSERT INTO vendas VALUES('24',4,'55222.69');
INSERT INTO vendas VALUES('13',9,'39753.35');
INSERT INTO vendas VALUES('19',2,'67475.11');
INSERT INTO vendas VALUES('12',1,'26545.22');
INSERT INTO vendas VALUES('26',5,'94568.65');
INSERT INTO vendas VALUES('42',10,'42424242');
