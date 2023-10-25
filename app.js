const express = require('express');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());

// Listar todos os currículos
app.get('/curriculos', async (req, res) => {
  try {
    const curriculos = await prisma.curriculo.findMany();
    res.json(curriculos);
  } catch (error) {
    console.error('Erro ao buscar currículos:', error);
    res.status(500).json({ error: 'Erro ao buscar currículos' });
  }
});

// Criar um novo currículo
app.post('/curriculos', async (req, res) => {
  const { nome, email, telefone, endereco } = req.body;
  try {
    const curriculo = await prisma.curriculo.create({
      data: {
        nome,
        email,
        telefone,
        endereco,
      },
    });
    res.status(201).json(curriculo);
  } catch (error) {
    console.error('Erro ao criar currículo:', error);
    res.status(500).json({ error: 'Erro ao criar currículo' });
  }
});

// Atualizar um currículo
app.put('/curriculos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, email, telefone, endereco } = req.body;
  try {
    const curriculo = await prisma.curriculo.update({
      where: { id },
      data: { nome, email, telefone, endereco },
    });
    res.json(curriculo);
  } catch (error) {
    console.error('Erro ao atualizar currículo:', error);
    res.status(500).json({ error: 'Erro ao atualizar currículo' });
  }
});

// Deletar um currículo
app.delete('/curriculos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.curriculo.delete({
      where: { id },
    });
    res.json({ message: 'Currículo excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir currículo:', error);
    res.status(500).json({ error: 'Erro ao excluir currículo' });
  }
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});