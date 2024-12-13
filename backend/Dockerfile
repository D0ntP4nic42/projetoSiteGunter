# Basear a imagem em Node.js Alpine para uma imagem menor
FROM node:alpine

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de definição de dependências primeiro para aproveitar o cache do Docker
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Expor a porta que o servidor Node.js utiliza
EXPOSE 5000

# Comando para iniciar o servidor Node.js
CMD ["node", "backend.js"]