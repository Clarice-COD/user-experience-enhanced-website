


// Basis instellingen
import express, {json, response, text} from 'express'
import { Liquid } from 'liquidjs';

const app = express()

app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express());

app.set('views', './views')

// web pagina's

app.get('/', async function (req, res) {
    const programmaUrl = "https://fdnd-agency.directus.app/items/mh_day?fields=date,shows.mh_shows_id.from,shows.mh_shows_id.until,shows.mh_shows_id.show.name,shows.mh_shows_id.show.radiostation.name,shows.mh_shows_id.show.radiostation.logo,shows.mh_shows_id.show.users.mh_users_id.full_name,shows.mh_shows_id.show.id"
    const programmaResponse = await fetch (programmaUrl)
    const {data: programmaResponseJSON} = await programmaResponse.json()
  
    // LIKE interactie
      const likesForShows = await fetch (`https://fdnd-agency.directus.app/items/mh_messages?filter=%7B%22from%22:%22Duck%22%7D`) // Haakt de link op met likes die is gefilterd op mijn naam 
      const likesForShowsJSON = await likesForShows.json() // 
      let newArray = [] //lege erray, zitten momenteel geen waarde aan
      const idsOflikesForShows = likesForShowsJSON.data.map(like => { 
        if (like.for != null && like.for != "" && like.for != undefined) {
          newArray.push(like.for)
        }
        
      })
      console.log(newArray);
      res.render('index.liquid', 
        {programmas: programmaResponseJSON[0].shows, 
          likes:newArray})
      });
  
  // Like interactie
  app.post ('/like', async function (req, res){
  
    let showId = req.body.showId
  
    const postLike = await fetch ('https://fdnd-agency.directus.app/items/mh_messages', {
      method: 'POST',
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        text: "LIKE",
        for: req.body.showId,
        from: "Duck"
      })
    })
  
    res.redirect(303, '/')
  })
  
  // Unlike interactie
  app.post('/unlike', async function (req, res) {
    let itemtodeleteIDRequest = await fetch(`https://fdnd-agency.directus.app/items/mh_messages?filter={"_and":[{"for":"${req.body.showId}"},{"from":"Duck"}]}`)
    let itemtodeleteIDResponse = await itemtodeleteIDRequest.json()
    let itemtodeleteID = itemtodeleteIDResponse.data[0].id;
    console.log(itemtodeleteID);
    await fetch(`https://fdnd-agency.directus.app/items/mh_messages/${itemtodeleteID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  
    res.redirect(303, '/')
  })

app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
})