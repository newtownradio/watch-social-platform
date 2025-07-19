// AIService.js - Functional AI service that integrates with OOP
const AIService = {
    // Configuration
    config: {
        apiEndpoint: '/api/ai',
        timeout: 10000,
        retryAttempts: 3,
        cacheEnabled: true,
        cacheTimeout: 300000 // 5 minutes
    },

    // Cache for AI responses
    cache: new Map(),

    // Event listeners for OOP integration
    eventListeners: new Map(),

    // ========================================
    // CORE AI FUNCTIONS (Pure Functions)
    // ========================================

    // Get personalized recommendations
    async getRecommendations(userData) {
        const cacheKey = `recommendations_${JSON.stringify(userData)}`;
        
        if (this.config.cacheEnabled && this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.config.cacheTimeout) {
                return cached.data;
            }
        }

        try {
            const response = await this.makeRequest('/recommendations', {
                method: 'POST',
                body: JSON.stringify({
                    userProfile: userData.userProfile,
                    preferences: userData.preferences,
                    behavior: userData.behavior,
                    context: userData.context
                })
            });

            const recommendations = await response.json();
            
            if (this.config.cacheEnabled) {
                this.cache.set(cacheKey, {
                    data: recommendations,
                    timestamp: Date.now()
                });
            }

            // Emit event for OOP services
            this.emit('ai:recommendations_generated', {
                userData,
                recommendations,
                timestamp: new Date()
            });

            return recommendations;
        } catch (error) {
            console.error('AI recommendation error:', error);
            return this.getFallbackRecommendations(userData);
        }
    },

    // Analyze user behavior
    async analyzeUserBehavior(behaviorData) {
        const cacheKey = `behavior_${JSON.stringify(behaviorData)}`;
        
        if (this.config.cacheEnabled && this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.config.cacheTimeout) {
                return cached.data;
            }
        }

        try {
            const response = await this.makeRequest('/analyze-behavior', {
                method: 'POST',
                body: JSON.stringify({
                    actions: behaviorData.actions,
                    patterns: behaviorData.patterns,
                    preferences: behaviorData.preferences,
                    timeframe: behaviorData.timeframe
                })
            });

            const analysis = await response.json();
            
            if (this.config.cacheEnabled) {
                this.cache.set(cacheKey, {
                    data: analysis,
                    timestamp: Date.now()
                });
            }

            // Emit event for OOP services
            this.emit('ai:behavior_analyzed', {
                behaviorData,
                analysis,
                timestamp: new Date()
            });

            return analysis;
        } catch (error) {
            console.error('AI behavior analysis error:', error);
            return this.getFallbackBehaviorAnalysis(behaviorData);
        }
    },

    // Analyze message sentiment
    async analyzeSentiment(messageData) {
        try {
            const response = await this.makeRequest('/analyze-sentiment', {
                method: 'POST',
                body: JSON.stringify({
                    text: messageData.text,
                    context: messageData.context,
                    userId: messageData.userId
                })
            });

            const sentiment = await response.json();

            // Emit event for OOP services
            this.emit('ai:sentiment_analyzed', {
                messageData,
                sentiment,
                timestamp: new Date()
            });

            return sentiment;
        } catch (error) {
            console.error('AI sentiment analysis error:', error);
            return this.getFallbackSentimentAnalysis(messageData);
        }
    },

    // Generate trip recommendations
    async generateTripRecommendations(tripData) {
        try {
            const response = await this.makeRequest('/trip-recommendations', {
                method: 'POST',
                body: JSON.stringify({
                    userPreferences: tripData.userPreferences,
                    location: tripData.location,
                    budget: tripData.budget,
                    companions: tripData.companions,
                    duration: tripData.duration
                })
            });

            const recommendations = await response.json();

            // Emit event for OOP services
            this.emit('ai:trip_recommendations_generated', {
                tripData,
                recommendations,
                timestamp: new Date()
            });

            return recommendations;
        } catch (error) {
            console.error('AI trip recommendations error:', error);
            return this.getFallbackTripRecommendations(tripData);
        }
    },

    // Optimize shopping routes
    async optimizeShoppingRoutes(routeData) {
        try {
            const response = await this.makeRequest('/optimize-routes', {
                method: 'POST',
                body: JSON.stringify({
                    stores: routeData.stores,
                    location: routeData.location,
                    preferences: routeData.preferences,
                    timeConstraints: routeData.timeConstraints
                })
            });

            const optimizedRoutes = await response.json();

            // Emit event for OOP services
            this.emit('ai:routes_optimized', {
                routeData,
                optimizedRoutes,
                timestamp: new Date()
            });

            return optimizedRoutes;
        } catch (error) {
            console.error('AI route optimization error:', error);
            return this.getFallbackRouteOptimization(routeData);
        }
    },

    // ========================================
    // UTILITY FUNCTIONS (Pure Functions)
    // ========================================

    // Make HTTP request with retry logic
    async makeRequest(endpoint, options = {}) {
        let lastError;
        
        for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
            try {
                const response = await fetch(`${this.config.apiEndpoint}${endpoint}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    },
                    timeout: this.config.timeout,
                    ...options
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                return response;
            } catch (error) {
                lastError = error;
                console.warn(`AI request attempt ${attempt} failed:`, error);
                
                if (attempt < this.config.retryAttempts) {
                    await this.delay(1000 * attempt); // Exponential backoff
                }
            }
        }

        throw lastError;
    },

    // Delay utility
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // Clear cache
    clearCache() {
        this.cache.clear();
    },

    // Get cache statistics
    getCacheStats() {
        const now = Date.now();
        let validEntries = 0;
        let expiredEntries = 0;

        this.cache.forEach((value, key) => {
            if (now - value.timestamp < this.config.cacheTimeout) {
                validEntries++;
            } else {
                expiredEntries++;
            }
        });

        return {
            total: this.cache.size,
            valid: validEntries,
            expired: expiredEntries,
            hitRate: this.calculateHitRate()
        };
    },

    // Calculate cache hit rate
    calculateHitRate() {
        return 0.85; // Placeholder
    },

    // ========================================
    // FALLBACK FUNCTIONS (Pure Functions)
    // ========================================

    // Fallback recommendations when AI is unavailable
    getFallbackRecommendations(userData) {
        const { preferences = {} } = userData;
        const categories = preferences.categories || ['luxury', 'fashion'];
        const budget = preferences.budget || '1000-5000';

        return {
            recommendations: [
                {
                    type: 'deal',
                    confidence: 0.8,
                    reason: 'Based on your preferences',
                    items: this.generateFallbackDeals(categories, budget)
                },
                {
                    type: 'event',
                    confidence: 0.7,
                    reason: 'Popular in your area',
                    items: this.generateFallbackEvents(categories)
                }
            ],
            fallback: true
        };
    },

    // Fallback behavior analysis
    getFallbackBehaviorAnalysis(behaviorData) {
        return {
            patterns: {
                shoppingFrequency: 'monthly',
                preferredCategories: ['luxury', 'fashion'],
                budgetRange: '1000-5000',
                timeOfDay: 'afternoon'
            },
            insights: [
                'You prefer luxury brands',
                'You shop monthly',
                'You favor afternoon shopping'
            ],
            fallback: true
        };
    },

    // Fallback sentiment analysis
    getFallbackSentimentAnalysis(messageData) {
        const text = messageData.text.toLowerCase();
        let sentiment = 'neutral';
        let confidence = 0.5;

        if (text.includes('love') || text.includes('amazing') || text.includes('great')) {
            sentiment = 'positive';
            confidence = 0.8;
        } else if (text.includes('hate') || text.includes('terrible') || text.includes('bad')) {
            sentiment = 'negative';
            confidence = 0.8;
        }

        return {
            sentiment,
            confidence,
            keywords: this.extractKeywords(text),
            fallback: true
        };
    },

    // Fallback trip recommendations
    getFallbackTripRecommendations(tripData) {
        return {
            stores: [
                'Chanel Boutique',
                'Balenciaga Store',
                'Saint Laurent',
                'Hermès'
            ],
            route: {
                optimized: false,
                estimatedTime: '4 hours',
                distance: '2.5 miles'
            },
            suggestions: [
                'Visit during weekday afternoons for fewer crowds',
                'Book appointments for luxury stores',
                'Consider lunch at nearby restaurants'
            ],
            fallback: true
        };
    },

    // Fallback route optimization
    getFallbackRouteOptimization(routeData) {
        return {
            routes: [
                {
                    name: 'Luxury Route',
                    stores: routeData.stores,
                    estimatedTime: '3-4 hours',
                    distance: '2.1 miles',
                    optimized: false
                }
            ],
            fallback: true
        };
    },

    // ========================================
    // HELPER FUNCTIONS (Pure Functions)
    // ========================================

    // Generate fallback deals
    generateFallbackDeals(categories, budget) {
        const brands = ['Chanel', 'Balenciaga', 'Saint Laurent', 'Hermès'];
        const deals = [];

        categories.forEach(category => {
            brands.forEach(brand => {
                deals.push({
                    brand,
                    category,
                    discount: Math.floor(Math.random() * 30) + 10,
                    price: Math.floor(Math.random() * 2000) + 500,
                    description: `${brand} ${category} on sale`
                });
            });
        });

        return deals.slice(0, 6);
    },

    // Generate fallback events
    generateFallbackEvents(categories) {
        const events = [
            {
                name: 'Luxury Fashion Week',
                date: '2024-03-15',
                location: 'New York',
                category: 'fashion'
            },
            {
                name: 'Designer Sample Sale',
                date: '2024-03-20',
                location: 'Los Angeles',
                category: 'luxury'
            }
        ];

        return events.filter(event => categories.includes(event.category));
    },

    // Extract keywords from text
    extractKeywords(text) {
        const words = text.toLowerCase().split(/\s+/);
        const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
        return words.filter(word => word.length > 3 && !stopWords.includes(word));
    },

    // ========================================
    // EVENT SYSTEM (For OOP Integration)
    // ========================================

    // Add event listener
    on(eventName, callback) {
        if (!this.eventListeners.has(eventName)) {
            this.eventListeners.set(eventName, []);
        }
        this.eventListeners.get(eventName).push(callback);
    },

    // Remove event listener
    off(eventName, callback) {
        if (this.eventListeners.has(eventName)) {
            const listeners = this.eventListeners.get(eventName);
            const index = listeners.indexOf(callback);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    },

    // Emit event
    emit(eventName, data) {
        if (this.eventListeners.has(eventName)) {
            this.eventListeners.get(eventName).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in AI event listener for ${eventName}:`, error);
                }
            });
        }
    },

    // ========================================
    // CONFIGURATION (Pure Functions)
    // ========================================

    // Update configuration
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
    },

    // Get configuration
    getConfig() {
        return { ...this.config };
    },

    // Reset to default configuration
    resetConfig() {
        this.config = {
            apiEndpoint: '/api/ai',
            timeout: 10000,
            retryAttempts: 3,
            cacheEnabled: true,
            cacheTimeout: 300000
        };
    }
};

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIService;
} else {
    window.AIService = AIService;
} 