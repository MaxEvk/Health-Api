const express = require('express');
const app = express();

const db = require('./database/connection');
const port = 3000;

app.use(express.json())

/* POST * GET * PUT * DELETE */

//capturando os dados da requisição
app.post('/create', async (req, res) => {
  const { medic_name, exam_request, hospital_medic_requesting, date, note } = req.body
  await db('exam').insert({
    medic_name, exam_request, hospital_medic_requesting, date, note
  })
  return res.status(200).send({ msg: 'Exame cadastrado com sucesso' })
})

app.get('/list_exams', async (req, res) => {
  const exams = await db('exam').select('*')
  return res.json(exams)
})

app.put('/update/:id', async (req, res) => {
  const data = req.body
  const { id } = req.params

  await db('exam').where({ id }).update(data)

  return res.status(200).send({ msg: 'Exame atualizado com sucesso!' })

})

app.delete('/remove/:id', async (req, res) => {
  const data = req.body
  const { id } = req.params

  await db('exam').where({ id }).first().delete()

  return res.status(200).send({ msg: `Exame de id ${id}, excluído com sucesso!` })
})

app.listen(port, () => {
  console.log(`Project runnig in port ${port}`)
});

//module.exports = { app }
