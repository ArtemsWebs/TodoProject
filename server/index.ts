require('dotenv').config()


const bodyParser = require( 'body-parser' );
const express=require("express")
const sequlize=require('./db')
const cors=require('cors')
const router1=require('./routes/todoRouter')

const app=express()
const port=process.env.PORT

app.use(cors())
app.use(express.json())
app.use('/todo',router1)

const  startDB=async ()=>{
  try{
    await sequlize.authenticate()
    await sequlize.sync()
    app.listen(port,()=>console.log(`Сервер стартовал: на хосте ${port}`))
  }
  catch (e){
    console.log("Ошибка")
  }

}
startDB()

