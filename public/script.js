document.addEventListener('DOMContentLoaded', function () {
    fetchSlangs();
});

function fetchSlangs() {
    fetch('/slangs')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch slangs');
            }
            return response.json();
        })
        .then(slangs => {
            const slangContainer = document.querySelector('.slang-container');
            slangContainer.innerHTML = '';
            slangs.reverse().forEach(slang => {
                const slangCard = document.createElement('div');
                slangCard.classList.add('slang-card');
                slangCard.innerHTML = `
                    <h2>${slang.word}</h2>
                    <hr>
                    <p>${slang.meaning}</p>
                `;
                slangContainer.appendChild(slangCard);
            });
        })
        .catch(error => {
            console.error('Error fetching slangs:', error);
        });
}

function searchSlang() {
    const searchValue = document.getElementById("search-input").value;

    if(searchValue.length != 0){
        document.getElementById('clearButton').style.display = 'inline-block';
        document.getElementById('searched-word').style.display = 'grid';
        document.getElementById('allSlangs').style.display = 'none';
        document.getElementById('footer').style.display = 'none';

        
        fetch(`/slang-search?search=${searchValue}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to search slangs');
                }
                return response.json();
            })
            .then(slangs => {
                const searchedWord = document.getElementById('searched-word');
                searchedWord.innerHTML = '';
                slangs.forEach(slang => {
                    const slangResult = document.createElement('div');
                    slangResult.classList.add('slang-card');
                    slangResult.innerHTML = `
                        <h2>${slang.word}</h2>
                        <hr>
                        <p>${slang.meaning}</p>
                    `;
                    searchedWord.appendChild(slangResult);
                });
            })
            .catch(error => {
                console.error('Error searching slangs:', error);
            });
    }else{
        alert("Пожалуйста, введите допустимое слово.")
    }
}

function clearSearchBar(){
    document.getElementById('searched-word').innerHTML = '';
    document.getElementById('search-input').value = '';

    document.getElementById('footer').style.display = 'flex';
    document.getElementById('allSlangs').style.display = 'grid';
    document.getElementById('clearButton').style.display = 'none';
    document.getElementById('searched-word').style.display = 'none';
}
