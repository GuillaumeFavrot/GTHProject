const express = require('express')
const app = express()
const pageRouter = require('./routes/routes')


//pour utiliser des stylesheet custom ou des images grâce à ejs et express il faut réaliser trois opérations :
// 1) créer un dossier "public" à la racine du dossier site puis créer un sous dossier "assets" et y mettre la stylesheet et le dossier images
// 2) dans les pages ejs il faut modifier le lien et le remplacer par /public/assets/style.ccs , pour les immages il faut juste copmpéter le chemin d'accès.
// 3) dans le fichier server.js il faut ajouter la fonction middleware ci-dessous.
app.use('/public', express.static('public'))

app.use('/', pageRouter)

app.set('view engine', 'ejs')

app.get('/', (req, res) =>{
    res.render('index')
})



app.listen(5500)