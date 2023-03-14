const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/todos',require('./route/api/todoroute'))

app.listen(3000,()=>{
    console.log('Server started listening on port 3000')
})
