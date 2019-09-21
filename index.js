const { send } = require('micro')
const http = require('needle')

const template = require('./template')

module.exports = async (req, res) => {
  const id = req.url.split('/').pop()
  if (!id) return send(res, 404)

  try {
    const media = await api(`media/${id}`)
    const podcast = await api(`podcast/${media.podcast}`)
    send(res, 200, template({ media, podcast }))
  } catch (err) {
    console.error(err)
    send(res, 404, err)
  }
}

function api (endpoint) {
  return new Promise((resolve, reject) => {
    console.log(`https://api.bethel.io/${endpoint}`)
    http.get(`https://api.bethel.io/${endpoint}`, { json: true }, (err, response) => {
      if (err || response.statusCode !== 200) {
        console.error(err || response.statusMessage)
        return reject(err || response.statusMessage)
      }
      resolve(response.body.data || response.body)
    })
  })
}
