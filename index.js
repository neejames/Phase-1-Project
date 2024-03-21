const form = document.getElementById("rick-and-morty-search");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("character-name").value;
        const status = document.getElementById("status-filter").value;

        let url = `https://rickandmortyapi.com/api/character/?name=${name}&status=${status}`;
        if (status) {
            url += `&status=${status}`;
        }
    fetch(`https://rickandmortyapi.com/api/character/?name=${name}&status=${status}`)
.then((resp) => resp.json())
.then((characterData) => showCharacters(characterData.results))
.catch((error) => console.log(error));
    });

function showCharacters(characterData) {
    const characterDiv = document.querySelector('#character-container');
    characterDiv.innerHTML = '';
    characterData.forEach((character) => {
        let card = document.createElement('div');
        card.classList.add('card');
        
        let name = document.createElement('h4');
        let image = document.createElement('img');
        let episodeList = document.createElement('ul');

        name.innerText = character.name;
        image.src = character.image;

        Promise.all(character.episode.map(url => fetch(url)
        .then(resp => resp.json())))
        .then(episodes => {
        episodes.forEach((episode) => {
           let episodeItem = document.createElement('li');
           episodeItem.textContent = episode.name;
           episodeList.appendChild(episodeItem); 
            });
        })
        .catch((error) => console.log(error));
        
        
        card.append(name, image, episodeList);
        characterDiv.append(card);
    });
}