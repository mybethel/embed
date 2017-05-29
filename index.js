const express = require('express');
const http = require('needle');
const JTS = require('jts');

var app = express();
var engine = new JTS();

app.engine('jts', engine.render);
app.use(express.static('dist'));

// Ensure that visitor IP addresses are not the reverse proxy to ensure we get
// the most accurate data before logging performance data to the API.
app.enable('trust proxy');

app.get('/:id', (req, res) => {
  api(`media/${req.params.id}`).then(media => {
    api(`podcast/${media.podcast}`).then(podcast => {
      res.render('embed.jts', { podcast, media });
    });
  }).catch(err => {
    res.status(404).send(err);
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log(`Server running on port ${this.address().port}.`)
});

function api(endpoint) {
  return new Promise((resolve, reject) => {
    http.get(`https://api.bethel.io/${endpoint}`, { json: true }, (err, response) => {
      if (err || response.statusCode !== 200) {
        console.error(err || response.statusMessage);
        return reject(err || response.statusMessage);
      }
      resolve(response.body.data || response.body);
    });
  });
}
