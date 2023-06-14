const { request, response } = require('express')
const express = require('express')
const app = express()
const PORT = 3000
const Db = require('./Db.js')

app.use(express.urlencoded({extended:false}))
app.use(express.json())

//Ajouter une article

app.post('/api/article', (request, response) => {
    const { Titre, Résumé, Contenu, Auteur, Date_de_création, Date_de_mis_à_jour } = request.body
    if (!Titre || !Résumé || !Contenu || !Date_de_création || !Date_de_mis_à_jour) {
        response.json({ message: "Veillez remplir tous les champs" })

    } else {
        const article = { Titre, Résumé, Contenu, Auteur, Date_de_création, Date_de_mis_à_jour }
        
        const sql = 'INSERT INTO article (Titre, Résumé, Contenu, Auteur, Date_de_création, Date_de_mis_à_jour) VALUES (?, ?, ?, ?, ?, ?)'

        const params = [Titre.article, Résumé.article, Contenu.article, Date_de_création.article, Date_de_mis_à_jour.article]

        Db.run(sql, params, (error, rows) => {

            if (error) {                
                console.error(error.message)
                response
                    .status(400)
                    .json({ message: "Oups! Une erreur est survenu" })
            } else {

                response
                    .status(200)
                    .json({ message: "Donnée envoiyer sur la base reussit"})
            }
        })

    }
})

//Afficher la liste de tous les articles

app.get('/api/article', (request, response) => {

    const sql = "SELECT * FROM  article"

        Db.all(sql, (error, row) => {
            if (error) {
                response
                    .status(400)
                    .json({ error: "Une erreur est survenu" })
            } else {
                response
                    .status(200)
                    .json({ message: "La liste des articles est: ", data:row })
            }
        })
})


//Afficher une article 

app.get('/api/article/:id', (request, response) => {

    const IDarticle = request.params.id

    const sql = 'SELECT * FROM article WHERE id = ?'

    const params = [IDarticle]

    Db.get(sql, params, (error, result) => {
        
        if (error) {
            console.error(eror.message)
            response
                .status(400)
                .json({ message: "Ereur de recuperation" })          
        } else {
            response
                .status(200)
                .json({ message: "Votre article est: ", data: result })
        }
    })
})

//Modifier un article (Mis à jour)

app.put('/api/article/:id', (request, response) => {
    const IDarticle = request.params.id

    const article = { Titre, Résumé, Contenu, Auteur, Date_de_création, Date_de_mis_à_jour } = request.body

    if (!Titre || !Résumé || !Contenu || !Date_de_création || !Date_de_mis_à_jour) {
        response.json({ message: "Veillez remplir tous les champs" })
        return

    } else {

        const sql = 'UPDATE article SET Titre = ?, Résume = ?, Contenu = ?, Auteur = ?, Date_de_création = ?, Date_de_mis_à_jour = ?'

        const params = [Titre.article, Résumé.article, Contenu.Auteur, Date_de_création.article, Date_de_mis_à_jour.article]

        Db.run(sql, params, (error, resultat) => {

            if (error) {
                response.status(400)
                console.error(error.message)
            } else {
                response.status(200).json({message:"Mis à jour réussit"})
            }
        })
    }
} )


app.listen(PORT, console.log("connexion sur le Port " + PORT))