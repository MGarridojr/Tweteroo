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
    const { username, avatar } = req.body
    const user = {
        ID: users.length +1,
        username,
        avatar
    }
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
    const data = req.body
    const findUser = users.find(userData=> userData.username == data.username)
    const tweetData = {
        username: data.username,
        avatar: findUser.avatar,
        tweet: data.tweet
    }
    tweets.unshift(tweetData)
    res.send("OK")
})

app.get('/tweets/:USERNAME', (req, res) => {
    const name = req.params.USERNAME
    const findTweets = tweets.filter(userdata => userdata.username == name)
    res.send(findTweets)
})

app.get('/tweets', (req, res) =>{
    res.send(tweets)
})

app.listen(5000);