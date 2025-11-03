const API = 'http://localhost:3000/api'
async function fetchListings(){
  const res = await fetch(API + '/properties')
  const data = await res.json()
  const cards = document.getElementById('cards')
  cards.innerHTML = ''
  data.forEach(p => {
    const el = document.createElement('div')
    el.className = 'card'
    el.innerHTML = `<h3>${p.title}</h3><p><strong>${p.type}</strong> • ${p.location}</p><p>₹ ${p.price}</p><p>${p.description || ''}</p>`
    cards.appendChild(el)
  })
}
document.getElementById('show-add').addEventListener('click', ()=>{
  document.getElementById('add-form').classList.toggle('hidden')
})
document.getElementById('property-form').addEventListener('submit', async (e)=>{
  e.preventDefault()
  const form = e.target
  const payload = Object.fromEntries(new FormData(form))
  payload.price = Number(payload.price)
  const res = await fetch(API + '/properties',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)})
  if(res.ok){ form.reset(); document.getElementById('add-form').classList.add('hidden'); fetchListings() }
  else alert('Failed to create')
})
fetchListings()