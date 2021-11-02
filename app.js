// Section 1

// const numUrl = 'http://numbersapi.com/'

// async function getNum(faveNum) {
//     const res = await axios.get(`${numUrl}${faveNum}`)
//     console.log(res.data)
// }

// getNum(5)

// async function getMultNum(lowBound, highBound) {
//     const resArr = await axios.get(`${numUrl}${lowBound}..${highBound}`)
//     console.log(resArr.data)
//     for (let i = lowBound; i <= highBound; i++) {
//         console.log(resArr.data[i])
//     }
// }

// getMultNum(3, 7)

// async function getMultFacts(faveNum) {
//     for (let i = 0; i < 4; i++) {
//         const res = await axios.get(`${numUrl}${faveNum}`)
//         console.log(res.data)
//     }
// }

// getMultFacts(56)

// Section 2

const cardUrl = 'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'

class Deck {
    constructor() {
        this.deck = {};
        this.shuffleDeck()
    }
    async shuffleDeck() {
        const deck = await axios.get(cardUrl)
        this.deckId = deck.data.deck_id
    }

    async getCard() {
        const cardList = document.querySelector('#deck-list')
        const res = await axios.get(`http://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`)
        const value = res.data.cards[0].value
        const suit = res.data.cards[0].suit
        const li = document.createElement('li')
        li.innerText = `${value} of ${suit}`
        cardList.append(li)
        const remainingPara = document.querySelector('#remaining-para');
        remainingPara.innerText = `${res.data.remaining} remaining in deck`
    }
}

let myDeck = new Deck()

const cardButton = document.querySelector('#card-button')
cardButton.addEventListener('click', function () {
    myDeck.getCard()
})

// Section 3 

const pokemonPromises = [];
const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/'
const finalArr = []

async function getAllPokemon(){
    for (let i = 1; i < 21; i++) {
        pokemonPromises.push(
           await axios.get(`${pokemonUrl}${i}`)
        );
    }

    const pokemonArr = await Promise.all(pokemonPromises)

    const urlArr = [];
    for (let i = 0; i < 3; i++) {
        urlArr.push(await axios.get(`${pokemonArr[Math.floor(Math.random() * 20)].data.species.url}`))
    }
    for (let i = 0; i < urlArr.length; i++){
        finalArr.push(await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${urlArr[i].data.name}`))
    }
    for (let i = 0; i < finalArr.length; i++){
        console.log(finalArr[i].data.name)
        console.log(finalArr[i].data.flavor_text_entries[0].flavor_text)
    }
}

getAllPokemon()



