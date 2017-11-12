const   express = require('express'),
        connection = require('./config/mysql-connection'),
        o2x = require('object-to-xml'),
        bodyParser = require('body-parser'),
        cors = require('cors'),
        port = 3001;

const app = express();

app.use(cors())
app.use(bodyParser.json())

const all = () => {
    return new Promise(( resolve, reject ) => {
        connection.query('SELECT * FROM users', (error, rows) => 
            error ? reject(error) : resolve(rows))
    })
}

const create = user => {
    return new Promise( (resolve, reject) => {
        connection.query('INSERT INTO users SET ?', [user], (error, result) =>
            error ? reject(error) : resolve(result))
    })
}

// Send user data in XML format
app.get('/user', async ( req, res ) => {
    
    res.set('Content-Type', 'text/xml')    

    try {
        const users = await all()
        res.send(o2x({
            '?xml version="1.0" encoding="utf-8"?' : null,
            users: { user: users }
        }))
    } catch ( error ) {
        res.send(o2x({
            '?xml version="1.0" encoding="utf-8"?' : null,
            errors: { error }
        }))
    }

});

// Get the data from client and inserts on database
app.post('/user', async (req, res) => {
    res.set('Content-Type', 'text/xml')
    
    const user = req.body
    try {
        const response = await create( user )
        user.user_id = response.insertId;
        res.send(o2x({
            '?xml version="1.0" encoding="utf-8"?' : null,
            user: user
        }))
    } catch (error) {
        res.send(o2x({
            '?xml version="1.0" encoding="utf-8"?' : null,
            errors: { error }
        }))
    }
})

app.listen(port, () => console.log(`Listen on port ${port}`))