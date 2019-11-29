const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  let data = {layout: false}
  res.render('index', data)
}
  );
// router.use((req, res, next) => {
//   console.log(req.session)
//   req.session.currentUser ? next() : res.redirect("/login")
// })

// router.get('/welcome', (req, res) => res.render('welcome', {
//   user: req.session.currentUser
// }));

module.exports = router;