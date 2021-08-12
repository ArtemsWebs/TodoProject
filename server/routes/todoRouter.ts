const Router=require('express')
const router=new Router()
const funcObj=require('../controller/todoControl')

router.post('/delete_todo',funcObj.deleteTodo)
router.post('/delete_all',funcObj.deleteAll)
router.post('/add_todo',funcObj.addTodo)
router.put('/update_todo',funcObj.updateTodo)
router.get('/get_todo', funcObj.getTodo)

module.exports=router
