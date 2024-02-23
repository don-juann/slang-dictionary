document.addEventListener('DOMContentLoaded', function () {
    fetchSlangs();
});

function fetchSlangs() {
    document.getElementById('new-word-input').value = '';
    document.getElementById('new-meaning-input').value = '';
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
                slangCard.classList.add('slang-card-admin');
                slangCard.innerHTML = `
                    <h2>${slang.word}</h2>
                    <p>${slang.meaning}</p>
                    <hr>
                    <button class="modButton" type="button" onclick="deleteSlang('${slang._id}')">Удалить</button>
                    <button class="modButton" type="button" onclick="updateSlang('${slang._id}')">Изменить</button>
                `;
                slangContainer.appendChild(slangCard);
            });
        })
        .catch(error => {
            console.error('Error fetching slangs:', error);
        });
}

function addSlang() {
    const word = document.getElementById('new-word-input').value;
    const meaning = document.getElementById('new-meaning-input').value;

    if(word.length != 0 && meaning.length != 0){
        fetch('/slangs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ word, meaning })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add slang');
            }
            fetchSlangs();
        })
        .catch(error => {
            console.error('Error adding slang:', error);
        });
    }else{
        alert("Введите допустимое слово");
    }
}


function deleteSlang(id) {
    fetch(`/slangs/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete slang');
        }
        fetchSlangs();
    })
    .catch(error => {
        console.error('Error deleting slang:', error);
    });
}

function updateSlang(id) {
    const word = prompt('Enter new word:');
    const meaning = prompt('Enter new meaning:');

    fetch(`/slangs/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ word, meaning })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update slang');
        }
        fetchSlangs();
    })
    .catch(error => {
        console.error('Error updating slang:', error);
    });
}
