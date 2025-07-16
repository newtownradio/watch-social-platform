// SearchBarComponent.js - Search bar component
class SearchBarComponent extends BaseComponent {
    constructor(dataManager) {
        super('SearchBar', dataManager);
    }

    createElement(data = {}) {
        const searchContainer = document.createElement('div');
        searchContainer.style.cssText = `
            margin: 20px 0;
            padding: 0 20px;
        `;

        const searchForm = document.createElement('form');
        searchForm.setAttribute('data-search-form', '');
        searchForm.style.cssText = `
            display: flex;
            gap: 12px;
            align-items: center;
        `;

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.name = 'search';
        searchInput.placeholder = data.placeholder || 'Search for deals, brands, or products...';
        searchInput.style.cssText = `
            flex: 1;
            padding: 12px 16px;
            background: var(--lux-dark-gray);
            border: 2px solid var(--lux-hot-pink);
            color: var(--lux-white);
            font-size: 16px;
            border-radius: 0;
            outline: none;
            transition: all 0.3s ease;
        `;

        const searchButton = this.createStyledElement('button', `
            padding: 12px 24px;
            background: var(--lux-hot-pink);
            color: var(--lux-black);
            border: none;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.3s ease;
        `, 'SEARCH');

        // Add event listeners
        this.addEventListeners(searchInput, {
            'focus': () => {
                searchInput.style.borderColor = '#FF69B4';
                searchInput.style.boxShadow = '0 0 10px rgba(255, 171, 223, 0.3)';
            },
            'blur': () => {
                searchInput.style.borderColor = 'var(--lux-hot-pink)';
                searchInput.style.boxShadow = 'none';
            }
        });

        this.addEventListeners(searchButton, {
            'mouseenter': () => {
                searchButton.style.background = '#FF69B4';
                searchButton.style.transform = 'translateY(-1px)';
            },
            'mouseleave': () => {
                searchButton.style.background = 'var(--lux-hot-pink)';
                searchButton.style.transform = 'translateY(0)';
            }
        });

        this.addEventListeners(searchForm, {
            'submit': (e) => {
                e.preventDefault();
                this.handleSearch(new FormData(searchForm));
            }
        });

        searchForm.appendChild(searchInput);
        searchForm.appendChild(searchButton);
        searchContainer.appendChild(searchForm);
        
        return searchContainer;
    }

    handleSearch(formData) {
        const query = formData.get('search');
        console.log('Search query:', query);
        if (window.appController) {
            window.appController.handleSearch(query);
        }
    }

    getIOSEquivalent() {
        return {
            type: 'UISearchBar',
            placeholder: 'Search for deals...',
            searchBarStyle: 'minimal',
            backgroundColor: '#111111',
            tintColor: '#FFABDF'
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SearchBarComponent;
} 