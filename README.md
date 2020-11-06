#### RESTful API designed to handle users data

#####  Endpoints            Purpose                     Method
-----------------------------------------------------------------------
##### /api/users      ->    get all users data          GET
##### /api/users      ->    add a new user              POST
##### /api/users/_id  ->    get a specific user's data  GET
##### /api/users/_id  ->    update an user              PUT
##### /api/users/_id  ->    delete an user              DELETE

##### Strictness to follow while sending data in body

* Content-Type : application/json
* Data Schema Pattern :

{
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
  }

---------------------------------
##### How to use:
---------------------------------
* clone the project | (git clone)
* change directory to make the project dir, current dir
* npm install
* nodemon app