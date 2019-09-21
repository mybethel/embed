import videojs from 'video.js'

var VJSButton = videojs.getComponent('Button')

var DownloadButton = videojs.extend(VJSButton, {
  uuid: '',
  constructor: function (player, options) {
    if (!player.options().uuid) return
    this.uuid = player.options().uuid
    VJSButton.call(this, player, options)
    this.controlText('Download')
    this.addClass('vjs-download-button')
  },
  handleClick: function () {
    window.location.href = 'https://my.bethel.io/podcastmedia/download/' + this.uuid
  }
})

var FeedButton = videojs.extend(VJSButton, {
  feedUrl: '',
  constructor: function (player, options) {
    if (!player.options().feed) return
    this.feedUrl = player.options().feed
    VJSButton.call(this, player, options)
    this.controlText('Subscribe')
    this.addClass('vjs-subscribe-button')
  },
  handleClick: function () {
    window.open(this.feedUrl, '_blank')
  }
})

videojs.registerComponent('FeedButton', FeedButton)
videojs.registerComponent('DownloadButton', DownloadButton)

window.onload = function () {
  videojs('embedded', {
    controlBar: {
      fullscreenToggle: false
    }
  }, function () {
    this.controlBar.addChild('DownloadButton')
    this.controlBar.addChild('FeedButton')
  })
}
