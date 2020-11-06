const mongoose = require("mongoose");

const schema = mongoose.Schema;

const mySchema = new schema({
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    data: {
      username: {
        type: String,
        required: true
      },
      joinDate: {
        type: Date,
        default: new Date().toGMTString()
      },
      organization: {
        type: String,
        required: true
      },
      friends: [
        {
          type: String
        }
      ],
      location: {
        city: {
          type: String,
          required: true
        },
        state: {
          type: String,
          required: true
        },
        country: {
          type: String,
          required: true
        }
      }
    }
  });

module.exports = data = mongoose.model('User', mySchema);