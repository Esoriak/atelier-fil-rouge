const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const connection = require('./conf')

const app = express()
const port = 3000

app.use(morgan('dev'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.get('/connard', (req, res) => {
   connection.query('SELECT * FROM connard', (err, results) => {
       if(err) {
           res.status(500).send('erreur lors de la recu des connards')
       } else {
           res.json(results)
       }
   })
})

app.get('/connard/liste', (req, res) => {
   connection.query('SELECT firstname, bastard, level FROM connard', (err, results) => {
       if(err) {
           res.status(500).send('erreur lors recup liste connard')
       } else {
           res.json(results)
       }
   })
})

app.get('/connard/content', (req, res) => {
   connection.query('SELECT * FROM connard WHERE bastard = true', (err, results) => {
       if(err) {
           res.status(500).send('erreur lors recup des batards')
       } else {
           res.json(results)
       }
   })
})

app.get('/connard/start', (req, res) => {
   connection.query('SELECT * FROM connard WHERE firstname LIKE "s%"', (err, results) => {
       if(err) {
           res.status(500).send('erreur lors recup des s connard')
       } else {
           res.json(results)
       }
   })
})

app.get('/connard/sup', (req, res) => {
   connection.query('SELECT * FROM connard WHERE birthday > "1990-01-01" ', (err, results) => {
       if(err) {
           res.status(500).send('erreur lors recup anniv connard')
       } else {
           res.json(results)
       }
   })
})

app.get('/connard/level/:ass', (req, res) => {
   const enculer = req.params.ass
   connection.query(`SELECT * FROM connard ORDER BY level ${enculer}` , (err, results) => {
       if(err) {
           res.status(500).send('erreur lors recup des enculer')
       } else {
           res.json(results)
       }
   })
})

app.post('/connard/add', (req, res) => {
   const formData = req.body;
   connection.query('INSERT INTO connard SET ? ', formData , (err, results) => {
       if(err) {
           res.status(500).send('erreur lors insertion connard')
       } else {
           res.sendStatus(200)
       }
   })
})

app.put('/connard/modif', (req, res) => {
   const formData = req.body;
   connection.query('UPDATE connard SET ?', formData , (err, results) => {
       if(err) {
           res.status(500).send('erreur lors de la modif connard')
       } else {
           res.sendStatus(200)
       }
   })
})

app.put('/connard/toggle', (req, res) => {
   const formData = req.body;
   connection.query('UPDATE connard SET bastard = true OR false', formData , (err, results) => {
       if(err) {
           res.status(500).send('erreur lors de la modif de bastard')
       } else {
           res.sendStatus(200)
       }
   })
})

app.delete('/connard/delete/:id', (req, res) => {
   const formData = req.params.id
   connection.query('DELETE FROM connard WHERE id = ?', formData , (err, results) => {
       if(err) {
           res.status(500).send('erreur lors de la delete connard')
       } else {
           res.sendStatus(200)
       }
   })
})

app.delete('/connard/delete', (req, res) => {
   const formData = req.params.id
   connection.query('DELETE FROM connard WHERE bastard = false', formData , (err, results) => {
       if(err) {
           res.status(500).send('erreur lors de la suppr bastard')
       } else {
           res.sendStatus(200)
       }
   })
})



app.listen(port, console.log(`hhtp://localhost ${port}`))