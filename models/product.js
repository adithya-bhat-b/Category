const mongoos = require('mongoose');
const ProductSchema = new mongoos.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: String
    },
    child_categories: [
        { type: mongoos.Schema.Types.ObjectId, ref: 'Category' }
    ]
})

module.exports = mongoos.model('Product', ProductSchema)