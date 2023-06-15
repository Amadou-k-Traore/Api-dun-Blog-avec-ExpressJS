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

        const params = [article.Titre, article.Résumé, article.Contenu, article.Auteur, article.Date_de_création, article.Date_de_mis_à_jour]

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


//Afficher une seule article 

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
                .json({ message: "l'article numero  "  + IDarticle +  " est", data: result })
        }
    })
})

//Modifier un article (Mis à jour)

app.put('/api/article/:id', (request, response) => {
    const IDarticle = request.params.id

    const article = {Titre, Résumé, Contenu, Auteur, Date_de_création, Date_de_mis_à_jour} = request.body

    if (!Titre || !Résumé || !Contenu || !Auteur || !Date_de_création || !Date_de_mis_à_jour) {
        response
            .json({ message: "Veillez remplir tous les champs" })
        return

    } else {

        const sql = 'UPDATE article SET Titre = ?, Résumé = ?, Contenu = ?, Auteur = ?, Date_de_création = ?, Date_de_mis_à_jour = ?'

        const params = [article.Titre, article.Résumé, article.Contenu, article.Auteur, article.Date_de_création, article.Date_de_mis_à_jour]

        Db.run(sql, params, (error, result) => {

            if (error) {
                response.status(400)
                console.error(error.message)
            } else {
                response.status(200).json({message:"Mis à jour de l'article numero "  + IDarticle  +  " réussit"})
            }
        })
    }  
} )

//Supression d'une article

app.delete('/api/article/:id', (request, response) => {
    const IDarticle = request.params.id
    const sql = 'DELETE FROM article WHERE id = ?'

    Db.run(sql, IDarticle, (error, result) => {
        if (error) {
            console.error(error.message)
            response
                .json({ error: "Veillez entrer un identifiant existant" })
            
        } else {
            response
                .status(200)
            .json({message:"article numéro " + IDarticle + " supprimer", data: this.changes})
        }
    })
})

app.listen(PORT, console.log("connexion sur le Port " + PORT))