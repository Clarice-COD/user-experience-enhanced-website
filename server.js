


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

app.get('/', (req, res) => {
    res.render('index.liquid')
})

app.get('/', (req, res) => {
    res.render('about.liquid')
})

app.get('/', (req, res) => {
    // connectie maken directus
    // query uitvoeren voor het ophalen van de laatste 10 blogs gesorteerd
    // data controleren en filteren op volledigheid
    // bewerking uitvoeren op de data
    // data doorgeven aan de template
    res.render('blog.liquid')
})

app.get('/', (req, res) => {
    // connectie maken directus
    // voer de post actie uit
    // query uitvoeren voor het ophalen van de laatste 5 projecten gesorteerd
    // data controleren en filteren op volledigheid
    // bewerking uitvoeren op de data
    // data doorgeven aan de template
    res.redirect('/blog')
})

app.get('/', (req, res) => {
    res.render('contact.liquid')
})

app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
})