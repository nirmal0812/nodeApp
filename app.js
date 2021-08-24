const express = require('express');
const app = express()
let { menu } = require('./data');

app.use(express.json());

//read
app.get('/getdata', (req, res)=>{
    res.send(menu)
})
//read a specific item
app.get('/getdata/:id',(req,res)=>{
    res.send(menu.find((food)=>food.id === Number(req.params.id)))
})

//create
app.post('/additem',(req,res)=>{
    const { id, name, price } = req.body;
    let toadd = {id, name, price};
    menu.push(toadd);
    res.send('data added')
})

//update
app.put('/updateitem', (req, res) => {
    const { id, name, price } = req.body;
    let toUpdate = menu.find((food) => food.id === Number(id));
    toUpdate.name = name;
    toUpdate.price = price;
  res.send('Data updated')
  })

//delete
app.delete('/deleteitem/:id', (req, res) => {
    let toDel = menu.find((food) => food.id === Number(req.params.id));
    menu = menu.filter((food) => food.id !== Number(req.params.id));
     res.send({ status: `Deleted food item is ${toDel.name} whose id is ${toDel.id}` });
  })

app.listen(5000, ()=>{
    console.log('server is listening on port 5000...')
})