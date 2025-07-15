// DataManager.js - Centralized data management for BubliAI
// This component can be easily translated to iOS using Core Data or similar

class DataManager {
    constructor() {
        this.deals = [];
        this.activityFeed = [];
        this.userPreferences = {};
        this.brandLogos = {};
        this.brandCategories = {};
        this.initializeData();
    }

    // Initialize all data structures
    initializeData() {
        this.initializeBrandLogos();
        this.initializeBrandCategories();
        this.initializeDeals();
        this.initializeActivityFeed();
        this.initializeUserPreferences();
    }

    // Brand Logos Dictionary - Centralized brand assets
    initializeBrandLogos() {
        this.brandLogos = {
            // Luxury Fashion Houses
            "CHANEL": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Chanel_logo.svg/2560px-Chanel_logo.svg.png",
            "LOUIS VUITTON": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Louis_Vuitton_logo_and_wordmark.svg/2560px-Louis_Vuitton_logo_and_wordmark.svg.png",
            "GUCCI": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/1960s_Gucci_Logo.svg/2560px-1960s_Gucci_Logo.svg.png",
            "HERMÈS": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Herm%C3%A8s_logo.svg/2560px-Herm%C3%A8s_logo.svg.png",
            "PRADA": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Prada_logo.svg/2560px-Prada_logo.svg.png",
            "BALENCIAGA": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Balenciaga_logo.svg/2560px-Balenciaga_logo.svg.png",
            "SAINT LAURENT": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Saint_Laurent_logo.svg/2560px-Saint_Laurent_logo.svg.png",
            "CELINE": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Celine_logo.svg/2560px-Celine_logo.svg.png",
            "FENDI": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Fendi_logo.svg/2560px-Fendi_logo.svg.png",
            "BOTTEGA VENETA": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bottega_Veneta_logo.svg/2560px-Bottega_Veneta_logo.svg.png",
            
            // Luxury Jewelry & Watches
            "CARTIER": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Cartier_logo.svg/2560px-Cartier_logo.svg.png",
            "ROLEX": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Rolex_logo.svg/2560px-Rolex_logo.svg.png",
            "TIFFANY & CO.": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Tiffany_%26_Co_logo.svg/2560px-Tiffany_%26_Co_logo.svg.png",
            "VAN CLEEF & ARPELS": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Van_Cleef_%26_Arpels_logo.svg/2560px-Van_Cleef_%26_Arpels_logo.svg.png",
            "BULGARI": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bulgari_logo.svg/2560px-Bulgari_logo.svg.png",
            "PATEK PHILIPPE": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Patek_Philippe_logo.svg/2560px-Patek_Philippe_logo.svg.png",
            "AUDEMARS PIGUET": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Audemars_Piguet_logo.svg/2560px-Audemars_Piguet_logo.svg.png",
            "VACHERON CONSTANTIN": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Vacheron_Constantin_logo.svg/2560px-Vacheron_Constantin_logo.svg.png",
            
            // Streetwear & Sneakers
            "NIKE": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Nike_Logo.svg/2560px-Nike_Logo.svg.png",
            "ADIDAS": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/2560px-Adidas_Logo.svg.png",
            "OFF-WHITE": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Off-White_logo.svg/2560px-Off-White_logo.svg.png",
            "SUPREME": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Supreme_logo.svg/2560px-Supreme_logo.svg.png",
            "PALACE": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Palace_logo.svg/2560px-Palace_logo.svg.png",
            "STONE ISLAND": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Stone_Island_logo.svg/2560px-Stone_Island_logo.svg.png",
            "COMME DES GARÇONS": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Comme_des_Garcons_logo.svg/2560px-Comme_des_Garcons_logo.svg.png",
            
            // Contemporary Luxury
            "ACNE STUDIOS": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Acne_Studios_logo.svg/2560px-Acne_Studios_logo.svg.png",
            "ISABEL MARANT": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Isabel_Marant_logo.svg/2560px-Isabel_Marant_logo.svg.png",
            "MAISON MARGIELA": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Maison_Margiela_logo.svg/2560px-Maison_Margiela_logo.svg.png",
            "JIL SANDER": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Jil_Sander_logo.svg/2560px-Jil_Sander_logo.svg.png",
            "THE ROW": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/The_Row_logo.svg/2560px-The_Row_logo.svg.png",
            
            // Beauty & Fragrance
            "DIOR": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Dior_logo.svg/2560px-Dior_logo.svg.png",
            "CHANEL BEAUTY": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Chanel_Beauty_logo.svg/2560px-Chanel_Beauty_logo.svg.png",
            "TOM FORD": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Tom_Ford_logo.svg/2560px-Tom_Ford_logo.svg.png",
            "BYREDO": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Byredo_logo.svg/2560px-Byredo_logo.svg.png",
            "LE LABO": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Le_Labo_logo.svg/2560px-Le_Labo_logo.svg.png",
            
            // Outdoor & Performance
            "ARC'TERYX": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Arcteryx_logo.svg/2560px-Arcteryx_logo.svg.png",
            "PATAGONIA": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Patagonia_logo.svg/2560px-Patagonia_logo.svg.png",
            "THE NORTH FACE": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/The_North_Face_logo.svg/2560px-The_North_Face_logo.svg.png",
            "MONCLER": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Moncler_logo.svg/2560px-Moncler_logo.svg.png",
            "CANADA GOOSE": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Canada_Goose_logo.svg/2560px-Canada_Goose_logo.svg.png",
            
            // Tech & Lifestyle
            "APPLE": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Apple_logo.svg/2560px-Apple_logo.svg.png",
            "SAMSUNG": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Samsung_logo.svg/2560px-Samsung_logo.svg.png",
            "SONY": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Sony_logo.svg/2560px-Sony_logo.svg.png",
            "BOSE": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bose_logo.svg/2560px-Bose_logo.svg.png",
            "BANG & OLUFSEN": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bang_%26_Olufsen_logo.svg/2560px-Bang_%26_Olufsen_logo.svg.png"
        };
    }

    // Brand Categories Dictionary
    initializeBrandCategories() {
        this.brandCategories = {
            "luxury_fashion": ["CHANEL", "LOUIS VUITTON", "GUCCI", "HERMÈS", "PRADA", "BALENCIAGA", "SAINT LAURENT", "CELINE", "FENDI", "BOTTEGA VENETA"],
            "jewelry_watches": ["CARTIER", "ROLEX", "TIFFANY & CO.", "VAN CLEEF & ARPELS", "BULGARI", "PATEK PHILIPPE", "AUDEMARS PIGUET", "VACHERON CONSTANTIN"],
            "streetwear": ["NIKE", "ADIDAS", "OFF-WHITE", "SUPREME", "PALACE", "STONE ISLAND", "COMME DES GARÇONS"],
            "contemporary": ["ACNE STUDIOS", "ISABEL MARANT", "MAISON MARGIELA", "JIL SANDER", "THE ROW"],
            "beauty": ["DIOR", "CHANEL BEAUTY", "TOM FORD", "BYREDO", "LE LABO"],
            "outdoor": ["ARC'TERYX", "PATAGONIA", "THE NORTH FACE", "MONCLER", "CANADA GOOSE"],
            "tech": ["APPLE", "SAMSUNG", "SONY", "BOSE", "BANG & OLUFSEN"]
        };
    }

    // Initialize deals data
    initializeDeals() {
        this.deals = [
            {
                id: 1,
                brand: "CHANEL",
                description: "Exclusive Classic Flap Collection Drop",
                price: 8800,
                originalPrice: 11000,
                logo: this.getBrandLogo("CHANEL"),
                category: "luxury_fashion",
                trending: true,
                store: "Chanel Boutique",
                location: "SoHo, NYC",
                dealType: "Exclusive Drop",
                availableUntil: "2024-01-15",
                realTimeLink: "https://www.chanel.com/us/fashion/p/AS1234Y12345/classic-flap-bag-black-caviar-leather-gold-tone-metal.html"
            },
            {
                id: 2,
                brand: "NIKE",
                description: "Air Jordan 1 Retro Restock Event",
                price: 180,
                originalPrice: 220,
                logo: this.getBrandLogo("NIKE"),
                category: "streetwear",
                trending: true,
                store: "Nike Store",
                location: "Multiple Locations",
                dealType: "Flash Sale",
                availableUntil: "2024-01-10",
                realTimeLink: "https://www.nike.com/t/air-jordan-1-retro-high-og-shoes-Pz6fZ9"
            },
            {
                id: 3,
                brand: "BALENCIAGA",
                description: "Triple S Sneakers Seasonal Collection",
                price: 1200,
                originalPrice: 1500,
                logo: this.getBrandLogo("BALENCIAGA"),
                category: "luxury_fashion",
                trending: false,
                store: "Balenciaga",
                location: "Beverly Hills",
                dealType: "Seasonal Sale",
                availableUntil: "2024-01-20",
                realTimeLink: "https://www.balenciaga.com/en-us/triple-s-sneaker_cod1161x05.html"
            },
            {
                id: 4,
                brand: "CARTIER",
                description: "Love Collection VIP Access Event",
                price: 6500,
                originalPrice: 8000,
                logo: this.getBrandLogo("CARTIER"),
                category: "jewelry_watches",
                trending: true,
                store: "Cartier",
                location: "Madison Avenue",
                dealType: "VIP Exclusive",
                availableUntil: "2024-01-12",
                realTimeLink: "https://www.cartier.com/en-us/collections/jewelry/collections/love/love-bracelet.html"
            },
            {
                id: 5,
                brand: "GUCCI",
                description: "Dionysus Limited Edition Release",
                price: 2200,
                originalPrice: 2800,
                logo: this.getBrandLogo("GUCCI"),
                category: "luxury_fashion",
                trending: false,
                store: "Gucci",
                location: "Rodeo Drive",
                dealType: "Limited Edition",
                availableUntil: "2024-01-18",
                realTimeLink: "https://www.gucci.com/us/en/pr/women/for-women/handbags-for-women/shoulder-bags-for-women/dionysus-small-shoulder-bag-p-476195I9X0N1000"
            },
            {
                id: 6,
                brand: "ADIDAS",
                description: "Yeezy Boost 350 Restock Alert",
                price: 220,
                originalPrice: 250,
                logo: this.getBrandLogo("ADIDAS"),
                category: "streetwear",
                trending: true,
                store: "Adidas Originals",
                location: "Downtown LA",
                dealType: "Restock Alert",
                availableUntil: "2024-01-08",
                realTimeLink: "https://www.adidas.com/us/yeezy-boost-350-v2-shoes/CP9366.html"
            }
        ];
    }

    // Initialize activity feed
    initializeActivityFeed() {
        this.activityFeed = [
            "Sarah discovered 30% off Louis Vuitton collection",
            "Mike found exclusive Rolex VIP access",
            "Emma shared Hermès exclusive event",
            "Alex discovered new Off-White collaboration",
            "Lisa found limited Tiffany & Co. showcase"
        ];
    }

    // Initialize user preferences
    initializeUserPreferences() {
        this.userPreferences = {
            favoriteBrands: [],
            preferredCategories: [],
            priceRange: { min: 0, max: 10000 },
            location: "All",
            notifications: true
        };
    }

    // Public methods for data access
    getDeals() {
        return this.deals;
    }

    getTrendingDeals() {
        return this.deals.filter(deal => deal.trending);
    }

    getDealsByCategory(category) {
        return this.deals.filter(deal => deal.category === category);
    }

    getDealsByBrand(brand) {
        return this.deals.filter(deal => deal.brand.toUpperCase() === brand.toUpperCase());
    }

    getActivityFeed() {
        return this.activityFeed;
    }

    getBrandLogo(brandName) {
        return this.brandLogos[brandName.toUpperCase()] || "https://via.placeholder.com/120x80/333/fff?text=" + encodeURIComponent(brandName);
    }

    getBrandsByCategory(category) {
        return this.brandCategories[category] || [];
    }

    getAllBrands() {
        return Object.keys(this.brandLogos);
    }

    // Data manipulation methods
    addDeal(deal) {
        deal.id = this.deals.length + 1;
        this.deals.push(deal);
        return deal;
    }

    updateDeal(id, updates) {
        const index = this.deals.findIndex(deal => deal.id === id);
        if (index !== -1) {
            this.deals[index] = { ...this.deals[index], ...updates };
            return this.deals[index];
        }
        return null;
    }

    removeDeal(id) {
        const index = this.deals.findIndex(deal => deal.id === id);
        if (index !== -1) {
            return this.deals.splice(index, 1)[0];
        }
        return null;
    }

    addActivity(activity) {
        this.activityFeed.unshift(activity);
        this.activityFeed = this.activityFeed.slice(0, 10); // Keep only 10 items
        return activity;
    }

    // Real-time update simulation
    simulateRealTimeUpdates() {
        const newActivities = [
            "Sarah discovered 30% off Louis Vuitton collection",
            "Mike found exclusive Rolex VIP access",
            "Emma shared Hermès exclusive event",
            "Alex discovered new Off-White collaboration",
            "Lisa found limited Tiffany & Co. showcase",
            "VIP access granted to Chanel exclusive drop",
            "Flash sale started on Balenciaga seasonal collection",
            "Limited edition Gucci release in 5 minutes",
            "New Prada collection spotted",
            "Cartier VIP event alert"
        ];
        
        const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)];
        this.addActivity(randomActivity);
        
        // Update trending status and prices dynamically
        this.deals.forEach(deal => {
            if (Math.random() > 0.7) {
                deal.trending = !deal.trending;
            }
            // Occasionally update prices to simulate real-time changes
            if (Math.random() > 0.9) {
                const priceChange = Math.floor(Math.random() * 100) - 50; // -50 to +50
                deal.price = Math.max(deal.price + priceChange, deal.price * 0.8); // Don't go below 80% of original
            }
        });
    }

    // Export data for iOS compatibility
    exportForIOS() {
        return {
            deals: this.deals,
            activityFeed: this.activityFeed,
            userPreferences: this.userPreferences,
            brandLogos: this.brandLogos,
            brandCategories: this.brandCategories
        };
    }
}

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataManager;
} else {
    window.DataManager = DataManager;
} 