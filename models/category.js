const mongoos = require('mongoose');
const CategorySchema = new mongoos.Schema({
    name: {
        type: String,
        required: true
    },
    desciption: {
        type: String
    },
    child_categories: [
        { type: mongoos.Schema.Types.ObjectId, ref: 'Category' }
    ],
    products: [
        { type: mongoos.Schema.Types.ObjectId, ref: 'Product' }
    ]
})

module.exports = mongoos.model('Category', CategorySchema)