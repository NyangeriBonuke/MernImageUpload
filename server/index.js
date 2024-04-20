const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const Image = require('./model/imageModel')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

app.post('/upload', upload.single('file'), (req, res) => {
    Image.create({image: req.file.filename})
    .then((result) => {res.json(result)})
    .catch((error) => {console.log(error)})
})

app.get('/image', (req, res) => {
    Image.find({})
    .then((result) => {res.json(result)})
    .catch((error) => {res.json(error)})
})

mongoose.connect('mongodb://127.0.0.1:27017/imageupload')
.then(() => {
    console.log("Mogodb connected")
})
.catch((error) => {
    console.log(`Mongodb error ${error}`)
})

app.listen('8000', () => {
    console.log('Sever started')
})