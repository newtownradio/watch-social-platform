// SocialPageComponent.js - Social/Plan page component
class SocialPageComponent extends BaseComponent {
    constructor(dataManager) {
        super('SocialPage', dataManager);
    }

    createElement(data = {}) {
        const container = document.createElement('div');
        container.style.cssText = `
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
        `;

        // Page title
        const title = this.createStyledElement('h2', `
            color: var(--lux-hot-pink);
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 16px;
            text-align: center;
        `, 'PLAN');

        // Subtitle
        const subtitle = this.createStyledElement('p', `
            color: var(--lux-white);
            font-size: 16px;
            text-align: center;
            margin-bottom: 32px;
            opacity: 0.8;
        `, 'Plan your shopping trips and events');

        // Create trip section
        const createTripSection = this.createTripSection();
        
        // Events section
        const eventsSection = this.createEventsSection();
        
        // Active trips section
        const activeTripsSection = this.createActiveTripsSection();

        container.appendChild(title);
        container.appendChild(subtitle);
        container.appendChild(createTripSection);
        container.appendChild(eventsSection);
        container.appendChild(activeTripsSection);
        
        return container;
    }

    createTripSection() {
        const section = document.createElement('div');
        section.style.cssText = `
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--lux-hot-pink);
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 32px;
        `;

        const title = this.createStyledElement('h3', `
            color: var(--lux-beige);
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 16px;
            text-align: center;
        `, '👥 CREATE TRIP');

        const description = this.createStyledElement('p', `
            color: var(--lux-white);
            font-size: 16px;
            text-align: center;
            margin-bottom: 24px;
            opacity: 0.9;
        `, 'Plan shopping trips with friends and get AI-optimized routes');

        const createButton = this.createStyledElement('button', `
            background: var(--lux-hot-pink);
            color: var(--lux-white);
            border: none;
            padding: 16px 32px;
            font-size: 16px;
            font-weight: 700;
            letter-spacing: 1px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: block;
            margin: 0 auto;
        `, 'CREATE TRIP');

        createButton.addEventListener('click', () => {
            this.createShoppingTrip();
        });

        section.appendChild(title);
        section.appendChild(description);
        section.appendChild(createButton);
        
        return section;
    }

    createEventsSection() {
        const section = document.createElement('div');
        section.style.cssText = `
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--lux-beige);
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 32px;
        `;

        const title = this.createStyledElement('h3', `
            color: var(--lux-hot-pink);
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 16px;
            text-align: center;
        `, '📅 VIEW EVENTS');

        const description = this.createStyledElement('p', `
            color: var(--lux-white);
            font-size: 16px;
            text-align: center;
            margin-bottom: 24px;
            opacity: 0.9;
        `, 'Discover upcoming shopping events and exclusive experiences');

        const viewButton = this.createStyledElement('button', `
            background: transparent;
            color: var(--lux-white);
            border: 2px solid var(--lux-beige);
            padding: 16px 32px;
            font-size: 16px;
            font-weight: 700;
            letter-spacing: 1px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: block;
            margin: 0 auto;
        `, 'VIEW EVENTS');

        viewButton.addEventListener('click', () => {
            this.viewAllEvents();
        });

        section.appendChild(title);
        section.appendChild(description);
        section.appendChild(viewButton);
        
        return section;
    }

    createActiveTripsSection() {
        const section = document.createElement('div');
        section.style.cssText = `
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--lux-hot-pink);
            border-radius: 12px;
            padding: 24px;
        `;

        const title = this.createStyledElement('h3', `
            color: var(--lux-beige);
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 16px;
            text-align: center;
        `, '🎯 ACTIVE TRIPS');

        const tripsContainer = document.createElement('div');
        tripsContainer.id = 'active-trips-container';
        tripsContainer.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 16px;
        `;

        // Sample active trips
        const sampleTrips = [
            {
                id: 1,
                name: 'Luxury Shopping Spree',
                date: 'Jan 20, 2024',
                location: 'Beverly Hills',
                friends: ['Sarah', 'Mike', 'Emma'],
                isFavorite: true
            },
            {
                id: 2,
                name: 'Designer Outlet Hunt',
                date: 'Jan 25, 2024',
                location: 'Desert Hills Premium Outlets',
                friends: ['Alex', 'Lisa'],
                isFavorite: false
            }
        ];

        sampleTrips.forEach(trip => {
            const tripCard = this.createTripCard(trip);
            tripsContainer.appendChild(tripCard);
        });

        section.appendChild(title);
        section.appendChild(tripsContainer);
        
        return section;
    }

    createTripCard(trip) {
        const card = document.createElement('div');
        card.style.cssText = `
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid var(--lux-hot-pink);
            border-radius: 8px;
            padding: 16px;
            transition: all 0.3s ease;
        `;

        const tripName = this.createStyledElement('h4', `
            color: var(--lux-white);
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 8px;
        `, trip.name);

        const tripDetails = this.createStyledElement('p', `
            color: var(--lux-beige);
            font-size: 14px;
            margin-bottom: 12px;
        `, `${trip.date} • ${trip.location}`);

        const friendsInfo = this.createStyledElement('p', `
            color: var(--lux-white);
            font-size: 14px;
            opacity: 0.8;
        `, `👥 ${trip.friends.length} friends joining`);

        const actions = document.createElement('div');
        actions.style.cssText = `
            display: flex;
            gap: 12px;
            margin-top: 12px;
        `;

        const shareButton = this.createStyledElement('button', `
            background: var(--lux-hot-pink);
            color: var(--lux-white);
            border: none;
            padding: 8px 16px;
            font-size: 12px;
            font-weight: 600;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
        `, '📤 SHARE');

        const favoriteButton = this.createStyledElement('button', `
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            padding: 4px;
        `, trip.isFavorite ? '❤️' : '🤍');

        shareButton.addEventListener('click', () => {
            this.shareTrip(trip.id);
        });

        favoriteButton.addEventListener('click', () => {
            this.toggleFavorite(trip.id);
        });

        actions.appendChild(shareButton);
        actions.appendChild(favoriteButton);

        card.appendChild(tripName);
        card.appendChild(tripDetails);
        card.appendChild(friendsInfo);
        card.appendChild(actions);
        
        return card;
    }

    createShoppingTrip() {
        // Implementation for creating a shopping trip
        console.log('Creating shopping trip...');
        // Add your trip creation logic here
    }

    viewAllEvents() {
        // Implementation for viewing all events
        console.log('Viewing all events...');
        // Add your events viewing logic here
    }

    shareTrip(tripId) {
        // Implementation for sharing a trip
        console.log(`Sharing trip ${tripId}...`);
        // Add your sharing logic here
    }

    toggleFavorite(tripId) {
        // Implementation for toggling favorite status
        console.log(`Toggling favorite for trip ${tripId}...`);
        // Add your favorite toggle logic here
    }

    render(containerId, data = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const element = this.createElement(data);
        container.appendChild(element);
    }
} 