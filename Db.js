const sqlite3 = require('sqlite3')
const dbFile = "Db.sqlite" 

const Db = new sqlite3.Database(dbFile, (error) => {
    if (error) {
        console.error(error.message)
        return
    } else {
        console.log("connexion à la base de donnée . . . . . . .")
        
        const sql = `CREATE TABLE article (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      Titre text,
      Résumé text,
      Contenu text,
      Auteur text,
      Date_de_création text,
      Date_de_mis_à_jour text
    )`
        Db.run(sql, (error) => {
            if (error) {
                console.error(error.message)
                Response
                    .json({ error: "les informations saisis existe deja" })
            } else {
                Response
                    .status(200)
                    .json({ message: "Opération reussi" })
                
            }
        })
    }
})
module.exports = Db