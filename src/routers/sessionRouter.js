const { Router } = require('express');
const router = new Router();
const passport = require('passport');
const { generateToken } = require('../utils/jwt');

router.post('/register', passport.authenticate('register', { failureRedirect: '/register' }), async (req, res) => {
    
    return res.redirect('/api/sessions/current');

});

router.post('/login', passport.authenticate('login', { failureRedirect: '/login', failureFlash: true }), async (req, res) => {
    const token = generateToken({
        name: req.user.name,
        email: req.user.email,
        role: 'USER'
    })

    // console.log({ token })
    
    // return res.send(req.user)
    
    return res.cookie('authToken', token, {
        maxAge: 60 * 60 * 1000
    }).redirect('/api/sessions/current');
});

const passportCall = (strategy) => {
    return (req, res, next) => {
      passport.authenticate(strategy, (err, user, info) => {
        if (err) {
          return next(err)
        }
  
        if (!user) {
          return res.status(401).json({
            error: info.messages ? info.messages : info.toString()
          })
        }
  
        req.user = user
  
        return next()
      })(req, res, next)
    }
  }

router.get('/current', passportCall('jwt'), (req, res) => {
    return res.json({
        user: req.user,
        session: req.session
    })
})





module.exports = router;