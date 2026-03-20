const express = require('express');
const app = express();

app.use(express.json());

let filmes = [
    { id: 1,  titulo: "O Poderoso Chefão",                    diretor: "Francis Ford Coppola",    ano: 1972, genero: "Crime",             nota: 9.2 },
    { id: 2,  titulo: "Interestelar",                         diretor: "Christopher Nolan",       ano: 2014, genero: "Ficção Científica", nota: 8.7 },
    { id: 3,  titulo: "Parasita",                             diretor: "Bong Joon-ho",            ano: 2019, genero: "Drama",             nota: 8.6 },
    { id: 4,  titulo: "Coringa",                              diretor: "Todd Phillips",           ano: 2019, genero: "Drama",             nota: 8.4 },
    { id: 5,  titulo: "Vingadores: Ultimato",                 diretor: "Anthony e Joe Russo",     ano: 2019, genero: "Ação",              nota: 8.4 },
    { id: 6,  titulo: "Whiplash",                             diretor: "Damien Chazelle",         ano: 2014, genero: "Drama",             nota: 8.5 },
    { id: 7,  titulo: "Clube da Luta",                        diretor: "David Fincher",           ano: 1999, genero: "Drama",             nota: 8.8 },
    { id: 8,  titulo: "Matrix",                               diretor: "Lana e Lilly Wachowski",  ano: 1999, genero: "Ficção Científica", nota: 8.7 },
    { id: 9,  titulo: "Cidade de Deus",                       diretor: "Fernando Meirelles",      ano: 2002, genero: "Crime",             nota: 8.6 },
    { id: 10, titulo: "O Senhor dos Anéis: O Retorno do Rei", diretor: "Peter Jackson",           ano: 2003, genero: "Fantasia",          nota: 9.0 }
];

app.get('/api/filmes', (req, res) => {
    const { genero, titulo, nota_min, ordem, direcao, pagina = 1, limite = 5 } = req.query;

    let resultado = filmes;

    if (genero) {
        resultado = resultado.filter(f => f.genero.toLowerCase() === genero.toLowerCase());
    }
    if (titulo) {
        resultado = resultado.filter(f => f.titulo.toLowerCase().includes(titulo.toLowerCase()));
    }
    if (nota_min) {
        resultado = resultado.filter(f => f.nota >= parseFloat(nota_min));
    }
    if (ordem) {
        resultado = resultado.sort((a, b) => {
            if (ordem === 'titulo') {
                return direcao === 'desc'
                    ? b.titulo.localeCompare(a.titulo)
                    : a.titulo.localeCompare(b.titulo);
            }

            if (ordem === 'nota') {
                return direcao === 'desc'
                    ? b.nota - a.nota
                    : a.nota - b.nota;
            }
        });
    }

    const paginaNum = parseInt(pagina);
    const limiteNum = parseInt(limite);
    const inicio = (paginaNum - 1) * limiteNum;

    const paginado = resultado.slice(inicio, inicio + limiteNum);

    res.json({
        dados: paginado,
        paginacao: {
            pagina_atual: paginaNum,
            itens_por_pagina: limiteNum,
            total_itens: resultado.length,
            total_paginas: Math.ceil(resultado.length / limiteNum)
        }
    });
});

app.get('/api/filmes/:id', (req, res) => {
    const filme = filmes.find(f => f.id === parseInt(req.params.id));

    if (!filme) {
        return res.status(404).json({ erro: "Filme não encontrado" });
    }

    res.json(filme);
});

app.post('/api/filmes', (req, res) => {
    const { titulo, diretor, ano, genero, nota } = req.body;

    if (!titulo || !diretor || !ano || !genero || nota === undefined) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    if (typeof nota !== 'number' || nota < 0 || nota > 10) {
        return res.status(400).json({ erro: "Nota deve ser entre 0 e 10" });
    }

    const novoFilme = {
        id: filmes.length + 1,
        titulo,
        diretor,
        ano,
        genero,
        nota
    };

    filmes.push(novoFilme);

    res.status(201).json(novoFilme);
});

app.listen(3000, () => {
    console.log('API de filmes rodando em http://localhost:3000');
});