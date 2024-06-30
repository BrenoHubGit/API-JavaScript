//Integrantes: Breno Garcia 755103; Bianca Gomes754393; jackeline 754344



import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app  = express()
const port = 3000
app.use(express.json())

let users = []


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

  app.get('/', (req, res) => {
    res.send('')
  })

app.post('/usuarios', async (req,res) => {

    const user = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      })
    
    if (user == null){
        await prisma.user.create({
            data: {
                name : req.body.name,
                email: req.body.email,
                age : req.body.age
            }
        })
       
        res.status(201).json(req.body)
    }   
    res.status(409).json({message: 'Esse email ja esta cadastrado!'})
})

app.get('/usuarios', async (req, res) => {

    users = await prisma.user.findMany()

    res.status(200).json(users)
})

app.put('/usuarios/:id', async (req,res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name : req.body.name,
            email: req.body.email,
            age : req.body.age
       }
    })

    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req,res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id,
        },
    })
    res.status(200).json({ message: 'usuario deletado com sucesso!' })
})




/*

Criar nossa API de usuarios

- Criar um usuario
- Listar todos os usuarios 
- Editar um usuario
- Deletar um usuario

/*
Usuario: UserMac
Senha: S1heU9PreiYGbTEi
*/
