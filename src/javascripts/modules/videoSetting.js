import $ from 'jquery';
const Observer = require('./observer').default

export default class VideoSetting {
  constructor(id, options) {
    if (id === null || id === undefined) {
      throw new Error('An id must be passed in. The hashed id of the wistia video')
    }
    this.id = id
    var opts = options || {}
    this.settings = {
      id: this.id,
      onReady: this.onReadyHandler,
      options: {
        playButton: false,
        videoFoam: true,
        playerColor: '292929',
        ssl_option: false,
        plugin: {
          captions: {
            onByDefault: false
          }
        }
      }
    }
    $.extend(this.settings.options, opts)
    this.onReady = new Observer
    this.onPlay = new Observer
    this.onEnd = new Observer
    this.onPause = new Observer
    this.onTimeChange = new Observer
    this.onPopoverHide = new Observer
    this.onPopoverShow = new Observer
    return this
  }

  onReadyHandler = (video) => {
    video.bind('play', this.playHandler.bind(this))
    video.bind('pause', this.pauseHandler.bind(this))
    video.bind('end', this.endHandler.bind(this))
    video.bind('secondchange', this.timeChangeHandler.bind(this))
    video.bind('popovershow', this.popoverShowHandler.bind(this))
    video.bind('popovershow', this.popoverHideHandler.bind(this))
    this.video = video
    this.onReady.fire(video)
    if (this.playHasBeenRequested()) {
      this.play()
    }
  }

  requestPlay() {
    return this.requestPlay = true
  }

  playHasBeenRequested() {
    return this.requestPlay == true
  }

  videoIsLoaded() {
    return this.video !== null && this.video != undefined
  }

  play() {
    if(this.videoIsLoaded()) {
      this.video.play()
    } else {
      this.requestPlay()
    }
    return this
  }

  pause() {
    if(this.videoIsLoaded()) {
      this.video.pause()
    }
    return this
  }

  playHandler() {
    this.onPlay.fire()
  }

  endHandler() {
    this.onEnd.fire()
  }

  pauseHandler() {
    this.onPause.fire()
  }

  timeChangeHandler(s) {
    this.onTimeChange.fire(s)
  }

  popoverShowHandler() {
    this.onPopoverShow.fire()
  }

  popoverHideHandler() {
    this.onPopoverHide.fire()
  }

  setWistiaSourceLoaded() {
    window.wistiaSourceSet = true
  }

  setWistiaLoaded() {
    window.wistiaLoaded = true
  }

  setWistiaLoadedError() {
    window.wistiaSourceError = true
  }

  createWistiaSourceEl() {
    var s = document.createElement('script')
    var h = document.getElementsByTagName('head')[0]
    var u = '//fast.wistia.com/assets/external/E-v1.js' 

    s.async = true
    s.src = u
    h.appendChild(s)

    // handlers
    s.onload = this.setWistiaLoaded 
    s.onerror = this.setWistiaLoadedError
  }

  initialize() {
    window._wq = window._wq || []
    window._wq.push(this.settings)
    this.createWistiaSourceEl()
    return this
  }
}