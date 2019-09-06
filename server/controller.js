const bcrypt = require('bcrypt')
module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const {email, password} = req.body
        const user = await db.find_email([email])
        if (user.length > 0 ) {
            return res.status(400).send({message: `Email in use.`})
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        console.log(hash)
        const newUser = await db.insert_user_info({email})
        console.log(newUser[0].user_id)
        db.insert_hash({hash, user_id: newUser[0].user_id })
        .then((result) => {
            console.log(result)
            req.session.user = result[0]
            res.status(200).send({message: 'Logged in', user: req.session.user, loggedIn: true})
        })
        .catch(err => {
            res.status(500).send({message: 'Failed to register.'})
        })
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const {email, password} = req.body
        const user = await db.find_email_and_hash([email])
        if (user.length === 0) {
            return res.status(400).send({message: 'Email not found.'})
        }
        const result = bcrypt.compareSync(password, user[0].hash)
        if (result) {
            delete user[0].hash
            req.session.user = user[0]
            return res.status(200).send({message: 'Logged in', user: req.session.user, loggedIn: true})
        } else {
            return res.status(401).send({message: 'Failed to login.'})
        }
    },
    update: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        const {image_url} = req.body
        db.update_treasures({image_url, id}).then(result => {
            res.status(200).send(result)
        })
    },
    title: (req,res) => {
        const db = req.app.get('db')
        const search = req.query.search
        db.find_title([search]).then(result => {
            res.status(200).send(result)
        })
    }

}

