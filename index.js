const express = require('express');
const cors = require('cors');
const users = require('./routes/users');
const { get } = require('http');
const app = express();

app.use(cors());

app.use(express.json());

app.set('view engine', 'ejs');

app.set('views', './views');

app.use(express.static('public'));

const middleware2 = (req, res, next) => {
    const today = new Date();
    const start = 9;
    const end = 17;

    const weekday = today.getDay();

    if (today >= start && today <= end && weekday!= 1 && weekday!=6) {
        next();
    } else {
        res.send('The site is currently unavailable. Please try again at a different day.');
    }

}


const middleware = (req, res, next) => {
    const today = new Date();
    const start = 9;
    const end = 23;

    if (today.getHours() >= start && today.getHours() <= end) {
        next();
    } else {
        res.send('The site is currently unavailable. Please try again at a different time.');
    }
   
}


app.use(middleware2);
app.use(middleware);

app.get('/', (req, res) => {
    res.render('home' , {title: 'home'});
});

app.get('/contact-us', (req, res) => {
    res.render('contact-us' , {title: 'contact-us'})
});

app.get('/our-services', (req, res) => {
    res.render('our-services', {title: 'our-services'})
});

app.use('/users', users);







app.listen(3000, () => {
  console.log('server started');
});
