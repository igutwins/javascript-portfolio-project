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

//scripts to run once content loaded
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
            if (g.date < currentTime){
                let x = new Game(g.id, g.date, g.time, g.location)
                pastGames.push(x)
            } else {
                let y = new Game(g.id, g.date, g.time, g.location)
                upcomingGames.push(y)
            }
        }
        //create upcoming game cards
        for (let p of upcomingGames){
            createUpcomingGame(p)
        }

        function createUpcomingGame(game){
            let upcomingGame = document.createElement('div')
            upcomingGame.className = "game-card"
            let date = document.createElement('p')
            date.innerText = `Date: ${game.date}`
            let time = document.createElement('p') 
            time.innerText = `Time: ${game.time}`
            let location = document.createElement('p')
            location.innerText = `Location: ${game.location}`
            upcomingGame.appendChild(date)
            upcomingGame.appendChild(time)
            upcomingGame.appendChild(location)
            let playersList = document.createElement('ul')
            upcomingGame.appendChild(playersList)
            let configObj4 = {

                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept":"application/json"
                    },
                    body: JSON.stringify({
                        game_id: game.id
                    })

            }
            fetch("http://localhost:3000/showgameplayers", configObj4)
            .then(r => r.json())
            .then(players => {
                
                            for (let i of players){
                                let playerName = document.createElement('li')
                                playerName.innerText = i.name
                                playersList.appendChild(playerName)
                            }

            })

            document.getElementById('canvas').appendChild(upcomingGame)
        }
        
        
        
        //create past games game cards
        for (let p of pastGames){
            createPastGame(p)
        }
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
            let playersList = document.createElement('ul')
            pastGame.appendChild(playersList)
            let playersArray = []
            let configObj3 = {

                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept":"application/json"
                    },
                    body: JSON.stringify({
                        game_id: game.id
                    })

            }
            fetch("http://localhost:3000/showgameplayers", configObj3)
            .then(r => r.json())
            .then(players => {
                
                            for (let i of players){
                                let playerName = document.createElement('li')
                                playerName.innerText = i.name
                                playersList.appendChild(playerName)
                            }

            })

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
                    option.setAttribute('value', p.id )
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
                    let playerId = game.querySelector('select').value
                    let playerObj = playerArray.find( x => x.id == playerId)
                    newPlayer.innerText = playerObj.name
                    playersList.appendChild(newPlayer)
                    //need to now associate those games and players here
                    let newConfigObj = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept":"application/json"
                        },
                        body: JSON.stringify({
                            game_id: gameInstance.id,
                            player_id: playerObj.id //make dynamic
                        })
                    }

                    fetch("http://localhost:3000/addplayer", newConfigObj)
                })
            })
        };
        
        document.getElementById('create-game-form').addEventListener("submit", createGame);
        
    });
    

});
