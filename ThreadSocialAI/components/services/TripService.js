// TripService.js - OOP service for trip management
class TripService {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.trips = [];
        this.friends = [];
        this.initializeData();
    }

    initializeData() {
        // Initialize with sample data
        this.friends = [
            { id: 1, name: "Sarah", avatar: "S" },
            { id: 2, name: "Mike", avatar: "M" },
            { id: 3, name: "Emma", avatar: "E" },
            { id: 4, name: "Alex", avatar: "A" },
            { id: 5, name: "Lisa", avatar: "L" },
            { id: 6, name: "Test Friend", avatar: "T" }
        ];

        this.trips = [
            {
                id: 1,
                name: "Chanel VIP Shopping",
                date: "2024-01-15",
                location: "SoHo, NYC",
                description: "Exclusive access to new collection",
                friends: [1, 2, 3],
                status: "active",
                stores: ["Chanel Boutique", "Balenciaga"],
                isFavorite: false
            },
            {
                id: 2,
                name: "Balenciaga Private Sale",
                date: "2024-01-18",
                location: "Beverly Hills",
                description: "Invitation-only seasonal sale",
                friends: [2, 4, 5],
                status: "active",
                stores: ["Balenciaga"],
                isFavorite: false
            }
        ];
    }

    // Create a new trip
    createTrip(tripData) {
        const trip = {
            id: Date.now(),
            name: tripData.name,
            date: tripData.date,
            location: tripData.location,
            description: tripData.description || '',
            stores: tripData.stores || [],
            friends: tripData.friends || [],
            friendNames: tripData.friendNames || [],
            status: 'upcoming',
            isFavorite: false,
            createdAt: new Date().toISOString()
        };

        this.trips.unshift(trip);
        this.saveToStorage();
        this.notifyTripCreated(trip);
        
        return trip;
    }

    // Get all trips
    getAllTrips() {
        return this.trips;
    }

    // Get trip by ID
    getTripById(tripId) {
        return this.trips.find(trip => trip.id === tripId);
    }

    // Update trip
    updateTrip(tripId, updates) {
        const tripIndex = this.trips.findIndex(trip => trip.id === tripId);
        if (tripIndex !== -1) {
            this.trips[tripIndex] = { ...this.trips[tripIndex], ...updates };
            this.saveToStorage();
            this.notifyTripUpdated(this.trips[tripIndex]);
            return this.trips[tripIndex];
        }
        return null;
    }

    // Delete trip
    deleteTrip(tripId) {
        const tripIndex = this.trips.findIndex(trip => trip.id === tripId);
        if (tripIndex !== -1) {
            const deletedTrip = this.trips.splice(tripIndex, 1)[0];
            this.saveToStorage();
            this.notifyTripDeleted(deletedTrip);
            return deletedTrip;
        }
        return null;
    }

    // Get all friends
    getAllFriends() {
        return this.friends;
    }

    // Add friend
    addFriend(friendData) {
        const friend = {
            id: Date.now(),
            name: friendData.name,
            avatar: friendData.avatar || friendData.name.charAt(0).toUpperCase(),
            email: friendData.email
        };
        this.friends.push(friend);
        this.saveToStorage();
        return friend;
    }

    // Invite friends to trip
    inviteFriendsToTrip(tripId, friendIds) {
        const trip = this.getTripById(tripId);
        if (!trip) {
            throw new Error('Trip not found');
        }

        const invitedFriends = this.friends.filter(friend => friendIds.includes(friend.id));
        const friendNames = invitedFriends.map(friend => friend.name);

        // Update trip with invited friends
        this.updateTrip(tripId, {
            friends: [...new Set([...trip.friends, ...friendIds])],
            friendNames: [...new Set([...trip.friendNames, ...friendNames])]
        });

        this.notifyFriendsInvited(trip, invitedFriends);
        return invitedFriends;
    }

    // Share trip
    shareTrip(tripId) {
        const trip = this.getTripById(tripId);
        if (!trip) {
            throw new Error('Trip not found');
        }

        const shareData = {
            title: `Join my shopping trip: ${trip.name}`,
            text: `Join me for ${trip.name} on ${trip.date} in ${trip.location}! ${trip.stores.length > 0 ? `Stores: ${trip.stores.join(', ')}` : ''}`,
            url: `${window.location.origin}${window.location.pathname}?trip=${tripId}`
        };

        if (navigator.share && navigator.canShare(shareData)) {
            return navigator.share(shareData);
        } else {
            // Fallback
            this.fallbackShareTrip(trip);
            return Promise.resolve();
        }
    }

    // Fallback share method
    fallbackShareTrip(trip) {
        const shareText = `Trip: ${trip.name}\nDate: ${trip.date}\nLocation: ${trip.location}\nDescription: ${trip.description}\nStores: ${trip.stores.join(', ')}\nFriends: ${trip.friendNames.join(', ')}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText);
            this.showNotification('Trip details copied to clipboard! 📋', 'success');
        } else {
            alert(shareText);
        }
    }

    // Storage methods
    saveToStorage() {
        try {
            localStorage.setItem('basedlyTrips', JSON.stringify(this.trips));
            localStorage.setItem('basedlyFriends', JSON.stringify(this.friends));
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
    }

    loadFromStorage() {
        try {
            const savedTrips = localStorage.getItem('basedlyTrips');
            const savedFriends = localStorage.getItem('basedlyFriends');
            
            if (savedTrips) {
                this.trips = JSON.parse(savedTrips);
            }
            if (savedFriends) {
                this.friends = JSON.parse(savedFriends);
            }
        } catch (error) {
            console.error('Error loading from storage:', error);
        }
    }

    // Notification methods
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? 'var(--lux-hot-pink)' : type === 'success' ? '#4CAF50' : 'var(--lux-beige)'};
            color: var(--lux-white);
            padding: 16px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            z-index: 10000;
            max-width: 300px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Event notification methods
    notifyTripCreated(trip) {
        this.showNotification(`Trip "${trip.name}" created successfully! ✨`, 'success');
    }

    notifyTripUpdated(trip) {
        this.showNotification(`Trip "${trip.name}" updated successfully! ✨`, 'success');
    }

    notifyTripDeleted(trip) {
        this.showNotification(`Trip "${trip.name}" deleted successfully! ✨`, 'success');
    }

    notifyFriendsInvited(trip, friends) {
        this.showNotification(`Invited ${friends.length} friends to "${trip.name}"! ✨`, 'success');
    }

    // Utility methods
    static formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    static validateTripData(tripData) {
        const errors = [];
        
        if (!tripData.name || tripData.name.trim().length === 0) {
            errors.push('Trip name is required');
        }
        
        if (!tripData.date) {
            errors.push('Trip date is required');
        }
        
        if (!tripData.location || tripData.location.trim().length === 0) {
            errors.push('Trip location is required');
        }
        
        return errors;
    }
}

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TripService;
} else {
    window.TripService = TripService;
} 