function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchTerm === 'mars' || searchTerm === 'galaxies' || searchTerm === 'black holes') {
        window.location.href = 'search.html';
    } else {
        window.location.href = 'about.html';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('.search-button');
    searchButton.addEventListener('click', performSearch);
    
    document.querySelectorAll('.suggestion').forEach(suggestion => {
        suggestion.addEventListener('click', function() {
            document.getElementById('searchInput').value = this.textContent;
            performSearch();
        });
    });
});
