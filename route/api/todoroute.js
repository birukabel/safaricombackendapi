
const express = require('express')
const router = express.Router()

let todos = require('../../todo')

//get all todos
router.get('/',(req,res)=>{
    res.json(todos)
})

//get todo by id
router.get('/:id',(req,res)=>{
    const found = todos.some(todo=>todo.id ===parseInt(req.params.id))

    if(found){
        res.json(todos.filter(todo=>todo.id === parseInt(req.params.id)))
    }
    else{
        res.sendStatus(400)
    }
})

//create todo
router.post('/',(req,res)=>{
    const newToDo = {
        id:(todos.length+1),
        name:req.body.name
    }

    if(!newToDo.name){
        return res.sendStatus(400)
    }
    todos.push(newToDo)
    res.json(newToDo)
})

//update todo
router.put('/:id',(req,res)=>{
    const found = todos.some(todo=>todo.id === parseInt(req.params.id))
    if(found){
        let todoForUpdate = req.body
        todos.forEach(todo => {
            if(todo.id === parseInt(req.params.id)){
                todo.name = todoForUpdate.name?todo.name:todoForUpdate.name
                res.json({msg: 'TODO updated',todo})
            }
        })
    }
    else{
        return res.sendStatus(400)
    }
})

//delete TODO
router.delete('/:id',(req,res)=>{
    const found = todos.some(todo=>todo.id === parseInt(req.params.id))
    if(found){
        todos = todos.filter(todo=>todo.id !== parseInt(req.params.id))
        res.json({msg:'TODO deleted',todos})
    }
    else{
        return res.sendStatus(400)
    }
})

module.exports = router