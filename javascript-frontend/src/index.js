//define our OOJS classes
class Game{
    constructor(id, date, time, location){
        this.id = id;
        this.date = date;
        this.time = time;
        this.location = location;
    }
};

class Player{
    constructor(id, name, email){
        this.id = id;
        this.name = name;
        this.email = email; 
    }
};




document.addEventListener("DOMContentLoaded", () => {

    
    //fetch games
    fetch("http://localhost:3000/games")
    .then(r => r.json())
    .then(games => {
        let upcomingGames = []
        let pastGames = []
        let today = new Date()
        let currentTime = `${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2, "0")}-${today.getDate()}`

        for (let g of games){
            if (g.time < currentTime){
                let x = new Game(g.id, g.date, g.time, g.location)
                pastGames.push(x)
            } else {
                let y = new Game(g.id, g.date, g.time, g.location)
                upcomingGames.push(y)
            }
        }
        for (let p of pastGames){
            console.log(p)
            createPastGame(p)
        }
        //separate the game card
        function createPastGame(game){
            let pastGame = document.createElement('div')
            pastGame.className = "game-card"
            let date = document.createElement('p')
            date.innerText = `Date: ${game.date}`
            let time = document.createElement('p') 
            time.innerText = `Time: ${game.time}`
            let location = document.createElement('p')
            location.innerText = `Location: ${game.location}`
            pastGame.appendChild(date)
            pastGame.appendChild(time)
            pastGame.appendChild(location)
            document.getElementById('canvas2').appendChild(pastGame)
        }

        
    })
//    );
    
    //fetch players
    fetch("http://localhost:3000/players")
    .then(r => r.json())
    .then(players => { 
        
        const playerArray = []
        for (let p of players){
            let x = new Player(p.id, p.name, p.email)
            playerArray.push(x)
        };
        
        //create a new game through form
        function createGame(e) {
            e.preventDefault()
            
            //define form fields
            const newGameDate = document.getElementById('game-date')
            const newGameTime = document.getElementById('game-time')
            const newGameLocation = document.getElementById('game-location')
            
            //create new game object and save to db
            let gameObj = {
                date: newGameDate.value, 
                time: newGameTime.value, 
                location: newGameLocation.value
            }
            
            const configObj = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept":"application/json"
                },
                body: JSON.stringify(gameObj)
            };
            
            fetch("http://localhost:3000/games", configObj)
            .then(r => r.json())
            .then(r => {
                let gameInstance = new Game(r.id, r.date, r.time, r.location)
                
                
                //update the front end to show the change
                let game = document.createElement('div')
                game.className = "game-card"
                let date = document.createElement('p')
                date.innerText = `Date: ${gameInstance.date}`
                let time = document.createElement('p') 
                time.innerText = `Time: ${gameInstance.time}`
                let location = document.createElement('p')
                location.innerText = `Location: ${gameInstance.location}`
                game.appendChild(date)
                game.appendChild(time)
                game.appendChild(location)
                
                
                //collection select on all the players
                let addPlayers = document.createElement('p')
                addPlayers.innerText = "Add Players Using Dropdown:"
                game.appendChild(addPlayers)
                let dropDown = document.createElement('select')
                dropDown.setAttribute('name','players')
                for (let p of playerArray){
                    let option = document.createElement('option')
                    option.setAttribute('value', p.name )
                    option.innerText = p.name
                    dropDown.appendChild(option)
                }
                                
                game.appendChild(dropDown)
                let button = document.createElement('button')
                button.innerText = "Add Player"
                button.id = `game-${gameInstance.id}`
                game.appendChild(button)
                let playersList = document.createElement('ul')
                game.appendChild(playersList)
                document.getElementById('canvas').appendChild(game)

                button.addEventListener('click', () => {
                    let newPlayer = document.createElement('li')
                    newPlayer.innerText = game.querySelector('select').value
                    playersList.appendChild(newPlayer)
                    //need to now associate those games and players here
                })
            })
        };
        
        
        document.getElementById('create-game-form').addEventListener("submit", createGame);
        
    });
    

});
