let pokemonArray = [];

        function addPokemon() {
            const pokemonName = document.getElementById('pokemonInput').value.toLowerCase();
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Pokemon no encontrado!');
                    }
                    return response.json();
                })
                .then(data => {
                    const pokemonInfo = {
                        name: data.name,
                        id: data.id,
                        types: data.types.map(type => type.type.name),
                        imageUrl: data.sprites.front_default
                    };
                    pokemonArray.push(pokemonInfo);
                })
                .catch(error => {
                    alert(error.message);
                });
        }

        function displayPokemon() {
            let pokemonListLabel = document.getElementById('pokemonList');
            let pokemonInfoDiv = document.getElementById('pokemonInfo');
            pokemonListLabel.textContent = '   ';
            pokemonInfoDiv.innerHTML = '   ';

            pokemonArray.forEach(pokemon => {
                let pokemonLabel = document.createElement('label');
                pokemonLabel.textContent = ` Name:  ${pokemon.name}, ID: ${pokemon.id}, Type: ${pokemon.types.join(', ')}        `;
            
                pokemonListLabel.appendChild(pokemonLabel);

                let pokemonImage = document.createElement('img');
                pokemonImage.src = pokemon.imageUrl;
                pokemonImage.style.width = '200px';
                pokemonImage.style.margin = '10px'
            
    
                pokemonInfoDiv.appendChild(pokemonImage);
            });
        }