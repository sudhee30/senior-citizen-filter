// script.js

document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('fileInput');
    const nameInput = document.getElementById('nameInput');
    const ageInput = document.getElementById('ageInput');
    const addButton = document.getElementById('addButton');
    const filterButton = document.getElementById('filterButton');
    const displayAllButton = document.getElementById('displayAllButton');
    const resultList = document.getElementById('resultList');

    let data = [];

    // Function to add data manually
    addButton.addEventListener('click', () => {
        const name = nameInput.value;
        const age = parseInt(ageInput.value, 10);
        if (name && !isNaN(age)) {
            data.push({ name, age });
            console.log(`Added manually: ${name}, ${age}`);
            nameInput.value = '';
            ageInput.value = '';
        } else {
            alert("Please enter a valid name and age.");
        }
    });

    // Function to read data from uploaded file
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const content = e.target.result;
                parseCSV(content);
            };
            reader.readAsText(file);
        }
    });

    // Function to parse CSV content
    function parseCSV(content) {
        const lines = content.split('\n');
        if (lines.length > 1) {
            const headers = lines[0].split(',').map(header => header.trim().toLowerCase());
            const nameIndex = headers.indexOf('name');
            const ageIndex = headers.indexOf('age');

            if (nameIndex === -1 || ageIndex === -1) {
                alert("CSV file must contain 'name' and 'age' columns.");
                return;
            }

            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].split(',').map(item => item.trim());
                if (line.length > 1) {
                    const name = line[nameIndex];
                    const age = parseInt(line[ageIndex], 10);
                    if (name && !isNaN(age)) {
                        data.push({ name, age });
                        console.log(`Added from file: ${name}, ${age}`);
                    }
                }
            }
        } else {
            alert("CSV file is empty or improperly formatted.");
        }
    }

    // Function to filter and display senior citizens
    filterButton.addEventListener('click', () => {
        const seniors = data.filter(person => person.age >= 60);
        resultList.innerHTML = '';
        seniors.forEach(person => {
            const listItem = document.createElement('li');
            listItem.textContent = `${person.name} (${person.age} years old)`;
            resultList.appendChild(listItem);
        });
        console.log('Filtered seniors:', seniors);
    });

    // Function to display all added entries
    displayAllButton.addEventListener('click', () => {
        resultList.innerHTML = '';
        data.forEach(person => {
            const listItem = document.createElement('li');
            listItem.textContent = `${person.name} (${person.age} years old)`;
            resultList.appendChild(listItem);
        });
        console.log('All entries:', data);
    });
});

