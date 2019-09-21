module.exports = ({ media, podcast }) => `
<!DOCTYPE html>
<html>
<head>
  <title>${media.name} powered by Bethel</title>
  <script src="/app.js"></script>
  <style>
    #embedded.vjs-bethel-skin {
      background-image:url(${podcast.image}&blur=150);
      ${media.mime.split('/')[0] === 'video' && 'background: #000;'}
      ${podcast.embedSettings && podcast.embedSettings.backgroundColor && `background: ${podcast.embedSettings.backgroundColor};`}
    }

    ${podcast.embedSettings && podcast.embedSettings.textColor && `
    .meta,.meta small,.extras a {
      color: ${podcast.embedSettings.textColor};
    }
    `}

    ${podcast.embedSettings && podcast.embedSettings.controlColor && `
    .video-js.vjs-bethel-skin {
      color: ${podcast.embedSettings.controlColor};
    }
    .video-js.vjs-bethel-skin .vjs-progress-control .vjs-play-progress,.video-js.vjs-bethel-skin .vjs-volume-level,.video-js.vjs-bethel-skin .vjs-mouse-display,.video-js.vjs-bethel-skin .vjs-mouse-display:after {
      background: ${podcast.embedSettings.controlColor};
    }
    `}

    ${podcast.embedSettings && podcast.embedSettings.sliderColor && `
    .video-js.vjs-bethel-skin .vjs-progress-control .vjs-progress-holder {
      background: ${podcast.embedSettings.sliderColor};
    }
    `}
  </style>
</head>
<body>
  <${media.mime.split('/')[0]} id="embedded" class="video-js vjs-bethel-skin" uuid="${media._id}" controls poster="${media.thumbnail || podcast.image}" preload="none">
    ${!media.variants ? `
      <source src="${media.url.replace('http://', 'https://')}" type="${media.mime}" />
    ` : `
      ${media.variants.hls ? `<source src="${media.variants.hls}" type="application/x-mpegURL" />` : ''}
      <source src="${media.variants.sd}" type="video/mp4" />
    `}
    <p class="vjs-no-js">Please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
  </${media.mime.split('/')[0]}>

  ${media.mime.split('/')[0] === 'audio' ? `<div class="meta">
    <h1>${media.name}</h1>
    <h2>${podcast.name}${media.date ? `<br /><small>${new Date(media.date).toLocaleDateString()}</small>` : ''}</h2>
  </div>` : ''}
</body>
</html>
`
