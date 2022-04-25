import express from 'express';
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json())

const users = []
const tweets = []
const error = []

function validateUser(data){
    const { username, avatar } = data
    if(!username){
        error.push("Usuário Inválido")
    }
    if(!avatar){
        error.push("Foto Inválida")
    }
}

app.post('/sign-up', (req, res)=>{
    const user = req.body
    validateUser(user)
    if(error.length == 0){
        users.push(user)
        res.sendStatus(201)
    }
    else{
        error.splice(0, error.length)
        res.sendStatus(400)
    }
})

app.post('/tweets', (req, res)=>{
    const tweet  = req.body
    tweets.push(tweet)
    res.send("OK")
})

app.get('/tweets', (req, res) =>{
    res.send(tweets)
})

app.listen(5000);