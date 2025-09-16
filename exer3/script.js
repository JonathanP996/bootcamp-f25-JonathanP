const presetResults = {
    "galaxies": [
        {
            title: "Galaxy Formation and Evolution",
            url: "https://hubblesite.org/science/galaxies",
            description: "Galaxies are vast cosmic islands of stars, gas, dust, and dark matter held together by gravity. Hubble's observations help us understand how they form and evolve."
        },
        {
            title: "Types of Galaxies",
            url: "https://www.nasa.gov/audience/forstudents/k-4/stories/nasa-knows/what-is-a-galaxy-k4.html",
            description: "There are three main types of galaxies: spiral, elliptical, and irregular. Each type has unique characteristics and formation processes."
        }
    ],
    "mars": [
        {
            title: "Mars Exploration Program",
            url: "https://mars.nasa.gov",
            description: "NASA's Mars Exploration Program is a science-driven program that seeks to understand whether Mars was, is, or can be a habitable world."
        },
        {
            title: "Mars Rover Missions",
            url: "https://mars.nasa.gov/mars-exploration/missions/",
            description: "Learn about NASA's Mars rovers including Perseverance, Curiosity, and the upcoming missions to explore the Red Planet."
        }
    ],
    "black holes": [
        {
            title: "Black Holes - NASA Science",
            url: "https://science.nasa.gov/black-holes",
            description: "Black holes are among the most mysterious cosmic objects, much studied but not fully understood. These objects aren't really holes."
        },
        {
            title: "Event Horizon Telescope",
            url: "https://eventhorizontelescope.org",
            description: "The Event Horizon Telescope captured the first image of a black hole, revealing the shadow of the supermassive black hole in galaxy M87."
        }
    ]
};

function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (searchTerm) {
        if (presetResults[searchTerm]) {
            localStorage.setItem('searchTerm', searchTerm);
            localStorage.setItem('searchResults', JSON.stringify(presetResults[searchTerm]));
            window.location.href = 'search.html';
        } else {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`, '_blank');
        }
    } else {
        alert('Please enter a search term');
    }
}

function searchWithSuggestion(term) {
    document.getElementById('searchInput').value = term;
    performSearch();
}

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.search-button');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    document.querySelectorAll('.suggestion').forEach(suggestion => {
        suggestion.addEventListener('click', function() {
            searchWithSuggestion(this.textContent);
        });
    });
});
