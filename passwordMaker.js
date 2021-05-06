/* TODO
x  make command line version first
x    get data from old program, into typed arrays <-- too easy to just make plain arrays
x    get algorithm from old code
x    modify as needed to run
  convert to deno-deploy server
  test locally
  open account
  deploy to deno service

*/

const decoder = new TextDecoder('utf-8')

function loadList(filename) {
  const raw = Deno.readFileSync(filename)
  const data = decoder.decode(raw)
  return data.split('\n')  
}

function capitalize(w) {
  return w.charAt(0).toUpperCase() + w.substring(1)
}

function getPass() {
  const adjs = loadList('adjectives.csv')
  const nouns = loadList('nouns.csv')
  // console.log('adjs', adjs.length,'nouns', nouns.length)
  const adj = adjs[Math.floor(Math.random() * adjs.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  const suffix = Math.floor(Math.random() * 1000)
  return `${adj}${capitalize(noun)};${suffix}`
}

console.log(getPass())
addEventListener('fetch', evt => {
  const resp = new Response(getPass(), {headers: {'content-type': 'text/plain'}})
  evt.respondWith(resp)
})
