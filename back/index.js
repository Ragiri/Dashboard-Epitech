const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const compression = require('compression')
const cookieParser = require('cookie-parser');
const cors = require('cors')
var ip = require("ip");

const passport = require('passport')
const lib = require('./lib/lib')
require('./passport/passport')(passport)
const app = express()
const port = 8080
const router = express.Router()

router.get('/about.json', function(req, res) {
    var time = (new Date).getTime()
    res.json({
        "client": {
            "host": ip.address()
        },
        "server": {
            "current_time": time,
            "services": [{
                "name": "weather",
                "widgets": [{
                    "name": "weatherWidget",
                    "description": "Display temperature for a city with small description.",
                    "params": [{
                        "name": "cityWeather",
                        "type": "string"
                    }]
                }]
            }, {
                "name": "youtube",
                "widgets": [{
                    "name": "loadVideo",
                    "description": "Load video by Id.",
                    "params": [{
                        "name": "videoId",
                        "type": "string"
                    }]
                }, {
                    "name": "getVideoViews",
                    "description": "Get video views by Id.",
                    "params": [{
                        "name": "videoId",
                        "type": "string"
                    }]
                }, {
                    "name": "getVideoLikesDislikes",
                    "description": "Get video likes & dislikes by Id.",
                    "params": [{
                        "name": "videoId",
                        "type": "string"
                    }]
                }]
            }, {
                "name": "steam",
                "widgets": [{
                    "name": "getPlayerInformation",
                    "description": "Get player information by Id.",
                    "params": [{
                        "name": "playerId",
                        "type": "string"
                    }]
                }]
            }, {
                "name": "cinema",
                "widgets": [{
                    "name": "getMovieInformation",
                    "description": "Get movie information by name.",
                    "params": [{
                        "name": "movieName",
                        "type": "string"
                    }]
                }]
            }, {
                "name": "github",
                "widgets": [{
                    "name": "github_repositories",
                    "description": "Displays the user's github repositories list",
                    "params": [{
                        "name": "account_name",
                        "type": "string"
                    }]
                }]
            }]
        }
    })
})

const createToken = (auth) => {
  return jwt.sign({
    id: auth.id
  }, 'my-secret',
  {
    expiresIn: 60 * 120
  })
}

const generateToken = (req, res, next) => {
  req.token = createToken(req.auth)
  return next()
}

const sendToken = (req, res) => {
  res.setHeader('x-auth-token', req.token)
  console.log("qsdqsd")
  return res.status(200).send(JSON.stringify(req.user))
}

router.get('/', (req, res) => res.json('welcome'));

const hasNotResponse = (req, res, next) => {
    if (res === undefined || res.response === undefined) {
        next()
    } else {
        next('route')
    }
}

router.post('/signup' , hasNotResponse ,  (req, res, next) => {
    let params = req.body
    lib.addUser(params).then(response =>{
        if( response === "Success" ){
            res.response = {
                status: 'OK'
            }
            if (params.types === "local") {
                lib.mailing.sendConfirmationMail(params.email);
            }
            next();
        }
    })
})

router.post('/addSteamWidget' , hasNotResponse ,  (req, res, next) => {
    let params = req.body
    lib.addSteamWidget(params).then(response =>{
        if( response === "Success" ){
            res.response = {
                status: 'OK'
            }
            next();
        }
    })
})

router.post('/addWeatherWidget' , hasNotResponse ,  (req, res, next) => {
    let params = req.body
    lib.addWeatherWidget(params).then(response =>{
        if( response === "Success" ){
            res.response = {
                status: 'OK'
            }
            next();
        }
    })
})

router.post('/addYoutubeAWidget' , hasNotResponse ,  (req, res, next) => {
    let params = req.body
    lib.addYoutubeAWidget(params).then(response =>{
        if( response === "Success" ){
            res.response = {
                status: 'OK'
            }
            next();
        }
    })
})

router.post('/checkExistance', hasNotResponse, (req, res, next) => {
    let params = req.body
    if (params.type === 'local') {
        lib.getAccount(params).then(response =>{
            if (response === "Not exist") {
                res.response = {
                    status: 'Not Exist'
                }
            } else {
            res.response = {
                status: 'OK',
                name: response,
            }
        }
            next();
        })
    } else if (params.type === 'facebook') {
        lib.getAccountF(params.fbId).then(response =>{
            if (response === "Not exist") {
                res.response = {
                    status: 'Not Exist'
                }
            } else {
            res.response = {
                status: 'OK',
                name: response,
            }
        }
            next();
        })
    } else {
        lib.getAccountG(params.googleId).then(response =>{
            console.log(response);
            if (response === "Not exist") {
                res.response = {
                    status: 'Not Exist'
                }
            } else {
            res.response = {
                status: 'OK',
                name: response,
            }
        }
            next();
        })
    }
})

router.route('/google').post((req, res, next) => {
    console.log("hac")
    passport.authenticate('google-token', {session: false}, (err, user, info) => {
      console.log("abc", user, info)
      if (!req.user) {
          console.log("Not auth")
          return res.status(401).send('User Not Authenticated')
      }
      req.auth = {
          id: req.user.id
      }
      console.log("OK")
      next()
    })(req, res, next)
  }, generateToken, sendToken)

app.use(helmet())
console.log(router.stack[3]);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(compression())

app.use((req, res, next) => {
    res.header('Access-control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
    app.options('*', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

app.use(cookieParser());

app.use( router )

app.use(lib.response.handleResponse)

app.use(lib.errorManager.handleError)

app.listen(port, () => {
    console.log(`> API is running on port ${port} 🚀`)
})