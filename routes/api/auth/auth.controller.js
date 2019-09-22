const jwt = require('jsonwebtoken')
const User = require('../../../modules/user')

/*
    POST /api/auth/register
    {
        username,
        password
    }
*/

// exports.login = (req, res) => {
//     const {username, password} = req.body
//     const secret = req.app.get('jwt-secret')

//     //check the user info & generate the jwt
    
//     const check = (user) => {
//         if(!user){
//             // user does not exist
//             throw new Error('login failed')
//         } else {
//         if(user.verify(password)){
//             // create a promise that generates jwt asynchronously

//             const p = new Promise((resolve, reject) => {
//                 jwt.sign(
//                     {
//                         _
//                     }
//                 )
//             })

//         }
//     }


    res.send('login api is working')
}

exports.register = (req, res) => {
    const { username, password } = req.body
    let newUser = null


    // create a new user if does not exist
    const create = (user) => {
        if(user) {
            throw new Error('username exist')
        } else {
            return User.create (username, password)
        }
    }

    // count the number of the user
    const count = (user) => {
        newUser = user
        return User.count({}).exec()
    }

    // assign admin if count is 1
    const assign = (count) => {
        if(count === 1){
            return newUser.assignAdmin()
        } else {
            //if not, reutnr a promise that returns false
            return Promise.resolve(fasle)
        }
    }

    // respond to the client
    const respond = (isAdmin) => {
        res.json({
            message: 'registered successfully',
            admin: isAdmin ? true : false
        })
    }

    //return when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    User.findOneByUsername(username)
    .then(create)
    .then(count)
    .then(assign)
    .then(respond)
    .then(onError)


    res.send('this router is working')
}
