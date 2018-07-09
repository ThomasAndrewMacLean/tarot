var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors')
import _ from 'lodash'

var app = express();

app.use(bodyParser.json());
app.use(cors());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
app.get('/ping', function (req, res) {
  res.status(200).json('pong')
})
app.get('/card', function (req, res) {
  const {
    cards
  } = res.locals.rawData
  let n = 1
  if (req.query.n && _.inRange(req.query.n, 1, 79)) {
    n = req.query.n
  }
  let cardPool = _.cloneDeep(cards)
  let returnCards = []
  for (let i = 0; i < n; i++) {
    let id = Math.floor(Math.random() * (78 - i))
    let card = cardPool[id]
    returnCards = _.concat(returnCards, _.remove(cardPool, (c) => (c.name_short === card.name_short)))
  }
  return res.json({
    nhits: returnCards.length,
    cards: returnCards
  })
})

app.listen(process.env.PORT || 8080, () => {
  console.log('up and running');
})