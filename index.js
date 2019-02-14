const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');



const PORT = process.env.PORT || 3000

// users array
const users = [{
       
        username: "admin",
        email: "admina@yahoo.com"
    },
    {
       
        username: "user",
        email: "user@yahoo.com"
    }
]
const app = express()


app.use(logger('dev'))
app.use(errorhandler())
app.use(bodyParser.json())



app.post('/login', (req, res) => {
        //check if any missing req body paramters

        if(!req.body.username || !req.body.email) {
           return res.status(400).send('email and user name are required')
        }

        // check if users  in our database

        const user = users.find((user)=>{

            return user.username == req.body.username && user.email === req.body.email
        })

        if(!user) {
            res.status(401)
            res.send('User not found')
        }

        
        const token = jwt.sign({
            sub:user.email,
            username:user.username
        },"secret",{ expiresIn:"10h" ,algorithm:"HS384",noTimestamp:true});
        
        res.status(200).json({access_token:token})
})



app.listen(PORT, (req, res) => {
    console.log(`Running on port ${PORT}`)
})