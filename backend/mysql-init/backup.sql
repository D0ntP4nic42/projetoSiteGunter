CREATE DATABASE IF NOT EXISTS meu_banco;
USE meu_banco;

CREATE TABLE IF NOT EXISTS vendas(
  id INT PRIMARY KEY AUTO_INCREMENT,
  codVendedor VARCHAR(255),
  nomeVendedor VARCHAR(255),
  cargoVendedor VARCHAR(255),
  codVenda VARCHAR(255),
  valorVenda VARCHAR(255)
);

INSERT INTO vendas VALUES(2,'4','Valderrama dos Prazeres','pleno','3','66295.58');
INSERT INTO vendas VALUES(3,'6','Lydia Carmona Mesquita','junior','4','29787.65');
INSERT INTO vendas VALUES(4,'6','Lydia Carmona Mesquita','junior','8','8552.36');
INSERT INTO vendas VALUES(5,'7','Bond, James Bond','pleno','9','34256.99');
INSERT INTO vendas VALUES(6,'11','Robson Fabiano Oliveira','junior','10','21445.39');
INSERT INTO vendas VALUES(7,'12','Francisco Cassiano Silva','pleno','11','12128.11');
INSERT INTO vendas VALUES(8,'5','Perla da Silva Souza','senior','5','135882.36');
INSERT INTO vendas VALUES(9,'9','Lydyane Kevany Kowalsky','senior','6','87366.29');
INSERT INTO vendas VALUES(10,'12','Francisco Cassiano Silva','pleno','14','15785.36');
INSERT INTO vendas VALUES(11,'10','Emira da Costa Rodrigues','junior','7','45365.89');
INSERT INTO vendas VALUES(12,'8','Domingues Castro Alves','senior','16','231333.99');
INSERT INTO vendas VALUES(13,'4','Valderrama dos Prazeres','pleno','17','43558.69');
INSERT INTO vendas VALUES(14,'4','Valderrama dos Prazeres','pleno','18','12532.87');
INSERT INTO vendas VALUES(15,'9','Lydyane Kevany Kowalsky','senior','15','196333.88');
INSERT INTO vendas VALUES(16,'10','Emira da Costa Rodrigues','junior','20','21456.12');
INSERT INTO vendas VALUES(17,'11','Robson Fabiano Oliveira','junior','21','36963.21');
INSERT INTO vendas VALUES(18,'7','Bond, James Bond','pleno','22','67158.24');
INSERT INTO vendas VALUES(19,'11','Robson Fabiano Oliveira','junior','23','19345.29');
INSERT INTO vendas VALUES(20,'12','Francisco Cassiano Silva','pleno','24','55222.69');
INSERT INTO vendas VALUES(21,'8','Domingues Castro Alves','senior','13','39753.35');
INSERT INTO vendas VALUES(23,'6','Lydia Carmona Mesquita','junior','19','67475.11');
INSERT INTO vendas VALUES(24,'4','Valderrama dos Prazeres','pleno','12','26545.22');
INSERT INTO vendas VALUES(25,'5','Perla da Silva Souza','senior','26','94568.65');
INSERT INTO vendas VALUES(26,'42','Leonardo Brito Gomes','senior','42','42424242');