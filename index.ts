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
  var style: HTMLStyleElement = document.createElement('link')
  style.setAttribute('rel', 'stylesheet')
  style.setAttribute('href', src)
  return style
}

function asyncScript(src: string): Promise<any> {
  return new Promise((resolve, reject) => {
    var script: HTMLScriptElement = document.createElement('script')
    script.setAttribute('src', src)
    script.addEventListener('load', (event) => {
      resolve(event)
    })
    script.addEventListener('error', (event) => {
      reject(event)
    })
  })
}

function boot(): void {
  stylesList
    .map(elem => createStyle(CDN_PROVIDER.concat(elem)))
      .forEach(elem => document.head.appendChild(elem))

  const pool = resourcesList.map(elem => asyncScript(CDN_PROVIDER.concat(elem)))

  Promise.all(pool).then(() => {
    const socket = io(SOCKET_URI)
    window['$socket'] = socket

    socket.on('connected', () => {
      window['swal']({
        type: 'success',
        title: 'Connection established'
      })
    })

    const videoPlayer = document.querySelector('.fp-engine')
    const playerUI = document.querySelector('.fp-ui')

    playerUI.addEventListener('click', (event) => {
      event.stopPropagation()
      console.info('Player selected')
    })

    playerUI.addEventListener('mouseenter', () => {
      var styles = String((<HTMLStyleElement>playerUI).style).concat(' border: 3px solid lightblue')
      playerUI.setAttribute('style', styles)
    })

    playerUI.addEventListener('mouseleave', () => {
      playerUI.setAttribute('style', '')
    })

  }).catch((error) => {
    console.error('Error while fetching resources', error)
  })
}

boot()
