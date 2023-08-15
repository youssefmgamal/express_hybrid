const users = require('express').Router();


users.get('/', (req, res) => {
    res.send([
        {id: 1, name: 'John'},
        {id: 2, name: 'Jane'},
        {id: 3, name: 'Joe'}
])
});

module.exports = users;