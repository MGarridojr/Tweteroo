import express from 'express';
import cors from 'cors'

const app = express();
app.use(cors());

const teste = "foi agora"

app.get('/', (req, res)=>{
    res.send(teste)
})

app.listen(5000);