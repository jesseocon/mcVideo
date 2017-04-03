/*
  Automatically instantiates modules based on data-attrubiutes
  specifying module file-names.
*/
import $ from 'jquery';
const VideoSettings = require('./videoSetting').default
const moduleElements = document.querySelectorAll('[data-module]')

for (var i = 0; i < moduleElements.length; i++) {
  const el = moduleElements[i]
  const name = el.getAttribute('data-module')
  const Module = require(`./${name}`).default
  new Module(el)
}

// $(document).ready(function(){
//   var video = new VideoSettings('b9oes7jq9f').initialize().play()
//   function onReadyHandler() {
//     console.log('this is the video: ', video)
//   }
//   function onPlayHandler() {
//     console.log('the video play event has fired: ')
//   }
//   function onPauseHandler() {
//     console.log('the video pause event has been fired: ')
//   }
//   function onEndHandler() {
//     console.log('the video end event has fired: ')
//   }
//   video.onReady.subscribe(onReadyHandler) 
//   video.onPlay.subscribe(onPlayHandler)
//   video.onPause.subscribe(onPauseHandler)
//   video.onEnd.subscribe(onEndHandler)
// })

/*
  Usage:
  ======

  html
  ----
  <button data-module="disappear">disappear!</button>

  js
  --
  // modules/disappear.js
  export default class Disappear {
    constructor(el) {
      el.style.display = none
    }
  }
*/
