// Simple search functionality - redirects to Google

function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    
    if (searchTerm) {
        // Redirect to Google search with the search term
        window.open(`https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`, '_blank');
    } else {
        alert('Please enter a search term');
    }
}

// Search with suggestions
function searchWithSuggestion(term) {
    document.getElementById('searchInput').value = term;
    performSearch();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.search-button');
    
    if (searchInput) {
        // Enter key search
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    if (searchButton) {
        // Button click search
        searchButton.addEventListener('click', performSearch);
    }
    
    // Add click functionality to suggestion badges
    document.querySelectorAll('.suggestion').forEach(suggestion => {
        suggestion.addEventListener('click', function() {
            searchWithSuggestion(this.textContent);
        });
    });
});
