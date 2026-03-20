# api

## Como executar

```bash
npm install
node index.js
```

Servidor disponivel em: http://localhost:3000

Mantenha o terminal aberto enquanto testa. Fechar o terminal encerra o servidor.

---

## Endpoints

### GET /api/filmes

Retorna a lista de filmes. Suporta filtros, ordenacao e paginacao.

Query params disponiveis:

| Parametro | Tipo   | Descricao                                       | Exemplo            |
|-----------|--------|-------------------------------------------------|--------------------|
| genero    | string | Filtra por genero (exato)                       | ?genero=Drama      |
| titulo    | string | Filtra por titulo (busca parcial)               | ?titulo=matrix     |
| nota_min  | number | Filtra filmes com nota maior ou igual ao valor  | ?nota_min=8.5      |
| ordem     | string | Ordena por titulo ou nota                       | ?ordem=nota        |
| direcao   | string | asc (padrao) ou desc                            | ?direcao=desc      |
| pagina    | number | Numero da pagina (padrao: 1)                    | ?pagina=2          |
| limite    | number | Itens por pagina (padrao: 5)                    | ?limite=3          |

Exemplos:

```
GET /api/filmes
GET /api/filmes?genero=Drama
GET /api/filmes?titulo=matrix
GET /api/filmes?nota_min=8.5
GET /api/filmes?ordem=nota&direcao=desc
GET /api/filmes?genero=Drama&ordem=nota&direcao=desc
GET /api/filmes?pagina=1&limite=5
```

Resposta 200:

```json
{
  "dados": [
    {
      "id": 7,
      "titulo": "Clube da Luta",
      "diretor": "David Fincher",
      "ano": 1999,
      "genero": "Drama",
      "nota": 8.8
    }
  ],
  "paginacao": {
    "pagina_atual": 1,
    "itens_por_pagina": 5,
    "total_itens": 4,
    "total_paginas": 1
  }
}
```

---

### GET /api/filmes/:id

Retorna um unico filme pelo ID.

Exemplo:

```
GET /api/filmes/1
```

Resposta 200:

```json
{
  "id": 1,
  "titulo": "O Poderoso Chefao",
  "diretor": "Francis Ford Coppola",
  "ano": 1972,
  "genero": "Crime",
  "nota": 9.2
}
```

Resposta 404:

```json
{
  "erro": "Filme nao encontrado"
}
```

---

### POST /api/filmes

Cria um novo filme no catalogo.

Header obrigatorio: Content-Type: application/json

Body:

```json
{
  "titulo": "Oppenheimer",
  "diretor": "Christopher Nolan",
  "ano": 2023,
  "genero": "Drama",
  "nota": 8.9
}
```

Resposta 201:

```json
{
  "id": 11,
  "titulo": "Oppenheimer",
  "diretor": "Christopher Nolan",
  "ano": 2023,
  "genero": "Drama",
  "nota": 8.9
}
```

Resposta 400 — campos faltando:

```json
{
  "erro": "Todos os campos sao obrigatorios"
}
```

Resposta 400 — nota invalida:

```json
{
  "erro": "Nota deve ser entre 0 e 10"
}
```

---

## Validacoes do POST

| Campo   | Tipo   | Regra                      |
|---------|--------|----------------------------|
| titulo  | string | Obrigatorio                |
| diretor | string | Obrigatorio                |
| ano     | number | Obrigatorio                |
| genero  | string | Obrigatorio                |
| nota    | number | Obrigatorio. Entre 0 e 10. |

---

## Filmes do catalogo inicial

| ID | Titulo                               | Diretor                | Ano  | Genero            | Nota |
|----|--------------------------------------|------------------------|------|-------------------|------|
| 1  | O Poderoso Chefao                    | Francis Ford Coppola   | 1972 | Crime             | 9.2  |
| 2  | Interestelar                         | Christopher Nolan      | 2014 | Ficcao Cientifica | 8.7  |
| 3  | Parasita                             | Bong Joon-ho           | 2019 | Drama             | 8.6  |
| 4  | Coringa                              | Todd Phillips          | 2019 | Drama             | 8.4  |
| 5  | Vingadores: Ultimato                 | Anthony e Joe Russo    | 2019 | Acao              | 8.4  |
| 6  | Whiplash                             | Damien Chazelle        | 2014 | Drama             | 8.5  |
| 7  | Clube da Luta                        | David Fincher          | 1999 | Drama             | 8.8  |
| 8  | Matrix                               | Lana e Lilly Wachowski | 1999 | Ficcao Cientifica | 8.7  |
| 9  | Cidade de Deus                       | Fernando Meirelles     | 2002 | Crime             | 8.6  |
| 10 | O Senhor dos Aneis: O Retorno do Rei | Peter Jackson          | 2003 | Fantasia          | 9.0  |
