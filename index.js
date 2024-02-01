const express = require('express');
const { Sequelize } = require('sequelize');
const PORT = 3000;
const server = express();
const filme = require ('./models/filme');

server.use(express.json());


server.get('/', (req, res) => {
    res.send('Bem-vindo!!!');
});

server.post("/filmes", async (req, res) => {
    try {
        const novoFilme = await Filme.create(req.body);
        res.status(201).json(novoFilme);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao cadastrar filme.' });
    }
});

server.get('/filmes', async(req, res) =>{
    try {
        const filmes = await Filme.findAll();
        res.json(filmes);
    } catch {
        res.status(500).json({ error: 'Erro ao obter filmes.' });
    }
});

server.put('/filmes/:id', async(req, res) => {
    const filmeId = req.params.id;
    try {
        const [rowsUpdated, [updatedFilme]] = await Filme.update(req.body, {
            where: { id: filmeId },
            returning: true,
        });
        if (rowsUpdated > 0) {
            res.json(updatedFilme);
        } else {
            res.status(404).json({ error: 'Filme não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar filme.' });
    }
})

server.delete('filmes/:id', async(req, res) => {
    const filmeId = req.params.id;
    try {
        const rowsDeleted = await Filme.destroy({ where: { id: filmeId } });
        if (rowsDeleted > 0) {
            res.json({ mensagem: 'Filme deletado com sucesso.' });
        } else {
            res.status(404).json({ error: 'Filme não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar filme.' });
    }
});

server.post('/avaliar/:filmeId', async (req, res) => {
    const filmeId = req.params.filmeId;
    const novaAvaliacao = req.body.assessment;

    try {
        const filme = await filme.findByPk(filmeId);

        if (!filme) {
            return res.status(404).json({ erro: 'Filme não encontrado.' });
        }

        // Atualiza a avaliação do filme
        await filme.update({ assessment: novaAvaliacao });

        res.json({ mensagem: 'Filme avaliado com sucesso.' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao avaliar o filme.' });
    }
});

server.get('/indicarFilmeNaoAvaliado', async (req, res) => {
    try {
        const filmeNaoAvaliado = await Filme.findOne({
            where: {
                assessment: 0
            }
        });

        if (!filmeNaoAvaliado) {
            return res.status(404).json({ erro: 'Não há filmes não avaliados disponíveis.' });
        }

        res.json(filmeNaoAvaliado);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar filme não avaliado.' });
    }
});

server.listen(PORT, () => {
    console.log(`Servidor online na porta ${PORT}`);
});