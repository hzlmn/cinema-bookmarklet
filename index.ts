const CDN_PROVIDER: string  = 'https://unpkg.com/'
const SOCKET_URI: string = 'ws://localhost:9001'

declare var io: any

const stylesList: Array<string> = [
  'sweetalert2@6.6.6/dist/sweetalert2.min.css',
]

const resourcesList: Array<string> = [
  'sweetalert2@6.6.6/dist/sweetalert2.min.js',
  'socket.io-client@2.0.3/dist/socket.io.js'
]

function createStyle(src: string): HTMLElement {
  var style: HTMLStyleElement = document.createElement('style')
  style.setAttribute('rel', 'stylesheet')
  style.setAttribute('href', src)
  return style
}

function createScript(src: string): HTMLElement {
  var script: HTMLScriptElement = document.createElement('script')
  script.setAttribute('src', src)
  return script
}

function boot(): void {
  stylesList
    .map(elem => createStyle(CDN_PROVIDER.concat(elem)))
      .forEach(elem => document.head.appendChild(elem))

  resourcesList
    .map(elem => createScript(CDN_PROVIDER.concat(elem)))
      .forEach(elem => document.body.appendChild(elem))

  setTimeout(() => {
    const socket = io(SOCKET_URI)
    window['$socket'] = socket
    socket.on('connected', () => {
      console.log('Connected established...')
    })
  })
}

boot()
