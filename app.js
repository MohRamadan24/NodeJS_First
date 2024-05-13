const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

const dbURI = 'mongodb+srv://Trinity_First:GjHPnDIV1a2nid7I@clustermiza.ogpykm2.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=ClusterMiza';
mongoose.connect(dbURI).then((result) => {
    app.listen(3000);
    console.log('Connected to the database (Cluster Miza)');
}).catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// listen for requests

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));

// app.use((req, res, next) => {
//     console.log('new request made');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// })

// app.use((req, res, next) => {
//     console.log('in the next middleware');
//     next();
// })

// mongoose adnd mongo sanbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         }).catch((err) => {
//             console.log(err);
//         })
// });

// app.get('/single-blog', (req, res) => {
//     Blog.findById('66398d68b143c5dce9455e37')
//         .then((result) => {
//             res.send(result);
//         }).catch((err) => {
//             console.log(err);
//         })
// })


// routes

app.get('/', (req, res) => {
    res.redirect('/blogs')
});

app.get('/about', (req, res) => {
    //res.send('<p>about page</p>');
    res.render('about', { title: 'About' });
});

// redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
