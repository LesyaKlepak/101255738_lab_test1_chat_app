const express = require('express')
var users = require('..model/users')
const router = express()

router.post('/createuser', (req,res)=>{

    let users = {
        name: 'test',
        message: 'hello'
    }
    users.create(users).then(function(userData){
        res.send(userData)
    })
})

router.get('/test', (req,res)=>{
    res.send('test')
})

router.post("/users", (req, res) => {
    var userData = new usersModel(req.body);
    userData.save()
      .then(item => {
        res.send("item saved to database");
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  });


router.use(usersRoutes);
module.exports = router;