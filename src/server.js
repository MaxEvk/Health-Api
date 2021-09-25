const express = require('express');
const app = express();

const db = require('./database/connection');

const port = 3000;

app.post('/create', async (req, res) => {
    const { id, medic_name, exam_request, hospital_medic_requesting, date, note, created_at } = req.body
    await db('exam').insert({
      id, medic_name, exam_request, hospital_medic_requesting, date, note, created_at
    })
    return res.status(200).send({ msg: 'Exame cadastrado com sucesso' })
  })

app.listen(port, () => {
    console.log(`Project runnig in port ${port}`)
});
