import {Todo} from '../Type/Types';
const todoModel=require('../models/todos')

const getTodo=async (req:any,res:any)=>{
  const result:object=await todoModel.findAll()
  return res.json(result)
}
const  deleteTodo=async (req:any,res:any)=>{
  const id:number=req.body.id
  await todoModel.destroy({where:{id:id}})
  return res.json(await todoModel.findAll())
}
const deleteAll=async (req:any,res:any)=>{
  await todoModel.destroy({truncate:true})
  return res.json(await todoModel.findAll())
}
const updateTodo= async (req:any,res:any)=>{
  const [id,content,date]=[req.body.id,req.body.content,req.body.date]
  await todoModel.update({content:content, date:date}, {where:{id:id}})
  return res.json(await todoModel.findOne({where:{id:id}}))
}
const addTodo=async (req:any,res:any)=>{
  const todo: Todo=req.body
  await todoModel.create(todo)
  return res.json(await todoModel.findOne(todo.id))
}

module.exports={
  getTodo:getTodo,
  deleteTodo:deleteTodo,
  deleteAll:deleteAll,
  updateTodo:updateTodo,
  addTodo:addTodo
}
