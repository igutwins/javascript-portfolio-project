fetch("http://localhost:3000/players")
    .then(r => r.json())
    .then(r => console.log(r))