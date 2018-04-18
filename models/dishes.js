// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
	author:  {
        type: String,
        required: true
    },
	date:	{
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

var descriptionSchema = new Schema({
    passengers:  {
        type: String,
        required: true
    },
    baggage:  {
        type: String,
        required: true
    },
    transmission:  {
        type: String,
        required: true
    },
	conditioning:	{
        type: String,
        required: true
    },
	fuel:	{
        type: String,
        required: true
    },
	co2:	{
        type: String,
        required: true
    }	
}, {
    timestamps: true
});
// create a schema
var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
      type: String
    },
    category: {
      type: String
    },
    label: {
      type: String,
      required: true,
      default: ''
    },
    price: {
      type: Currency,
      required: true
	},
		featured: {
        type: Boolean,
        default:false
    },
	description:[descriptionSchema],
    comments:[commentSchema]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Dishes = mongoose.model('Dish', dishSchema);

// make this available to our Node applications
module.exports = Dishes;