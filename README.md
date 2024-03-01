# Clean Architecture com TypeScript

Este projeto simula um aplicativo de leilões. Você pode cadastrar um produto, ver o produto cadastrado pelo id, cadastrar uma proposta e listar as propostas de um produto. Ele ainda é um trabalho em andamento.

O banco de dados utilizado foi o [sqlite](https://www.sqlite.org/), com o ORM [drizzle](https://orm.drizzle.team/)

Para o barramento de API usei o [express.js](https://expressjs.com/)

## Endpoints

### **POST** /produtos

```json
{ 
  "nome": "lavaroupas",
  "valor_esperado": 20000,
  "valor_minimo": 13000
}
```

### **GET** /produtos/<id_produto>

### **POST** /produtos/<id_produto>/propostas

```json
{
  "documento": "444444",
  "valor":200000  
}
```

### **GET** /produtos/<id_produto>/propostas

## Para iniciar: 

Instale o node (*testei com a versão 20*), e pnpm. 

Rode o comando `pnpm install`

Rode o comando `pnpm apidev`