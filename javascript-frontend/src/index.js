//define our OOJS classes
class Game{
    constructor(date, time, location){
        this.date = date;
        this.time = time;
        this.location = location;
    }
};

class Player{
    constructor(name, email){
        this.name = name;
        this.email = email; 
    }
};

document.addEventListener("DOMContentLoaded", () => {

    
    //fetch games
    fetch("http://localhost:3000/games")
    .then(r => r.json())
    .then(r => console.log(r)
    );
    
    //fetch players
    fetch("http://localhost:3000/players")
    .then(r => r.json())
    .then(players => { 
        
        const playerArray = []
        for (let p of players){
            let x = new Player(p.name, p.email)
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
            let gameObj = new Game(newGameDate.value, newGameTime.value, newGameLocation.value)
            
            const configObj = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept":"application/json"
                },
                body: JSON.stringify(gameObj)
            };
            
            fetch("http://localhost:3000/games", configObj)
            
            
            //update the front end to show the change
            let game = document.createElement('div')
            game.className = "game-card"
            let date = document.createElement('p')
            date.innerText = `${gameObj.date}`
            let time = document.createElement('p') 
            time.innerText = `${gameObj.time}`
            let location = document.createElement('p')
            location.innerText = `${gameObj.location}`
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
            game.appendChild(button)

            document.getElementById('canvas').appendChild(game)
        };
        
        
        document.getElementById('create-game-form').addEventListener("submit", createGame);
        
    });
    

});
