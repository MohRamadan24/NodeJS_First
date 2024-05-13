const monggose = require('mongoose');
const Schema = monggose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true});

const Blog = monggose.model('Blog', blogSchema);
module.exports = Blog;