const requestCharactersUrl = "https://dragonball-api.com/api/characters" ;
const requestPlanetsUrl = "https://dragonball-api.com/api/planets" ;

async function fetchApiDragonBallCard(requestUrl) {
    try{
        const response = await fetch(requestUrl);
        if(!response.ok){
            throw new Error(`An error has occured. Json request failed ${response.status}.`)
        }
        return await response.json();
    }
    catch(error){
        console.error("An error has occured. Null json", error)
        return null;
    }
}

function createDragonBallCharacter({name, ki, maxKi, gender, affiliation, race, description, image}){
    return `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${image}" class="img-fluid rounded-start" alt="${name}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <h6 class="card-title">${ki}, ${maxKi}</h6>
                        <p class="card-text">${description}</p>
                        <p class="card-text"><small class="text-body-secondary">${race}</small></p>
                        <p class="card-text"><small class="text-body-secondary">${gender}</small></p>
                        <p class="card-text"><small class="text-body-secondary">${affiliation}</small></p>
                    </div>
                </div>
            </div>
        </div>
    `
}

async function displayCharacters(){
    const displayCharacterSection = document.getElementById('displayCharacterSection');
    const characterInfo = await fetchApiDragonBallCard(requestCharactersUrl);

    if(characterInfo && characterInfo.items){
        const characterCard = characterInfo.items.map(createDragonBallCharacter);
        displayCharacterSection.innerHTML = characterCard;

    }
    else{
        displayCharacterSection.innerHTML = `<p> An error has occured with the load of Json characters</p>`;

    }
}

displayCharacters();



function createDragonBallPlanet({name, isDestroyed, description, image}){
    return `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${image}" class="img-fluid rounded-start" alt="${name}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <h6 class="card-title">${isDestroyed}</h6>
                        <p class="card-text">${description}</p>
                    </div>
                </div>
            </div>
        </div>
    `
}

async function displayPlanets(){
    const displayPlanetSection = document.getElementById('displayPlanetSection');
    const planetInfo = await fetchApiDragonBallCard(requestPlanetsUrl);

    if(planetInfo && planetInfo.items){
        const planetCard = planetInfo.items.map(createDragonBallPlanet);
        displayPlanetSection.innerHTML = planetCard;

    }
    else{
        displayPlanetSection.innerHTML = `<p> An error has occured with the load of Json characters</p>`;

    }
}
displayPlanets();