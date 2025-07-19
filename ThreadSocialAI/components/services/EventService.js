// EventService.js - OOP service for event management
class EventService {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.events = new Map();
        this.userEvents = new Map();
        this.notifications = [];
        this.preferences = {
            notifications: true,
            emailUpdates: true,
            pushNotifications: true,
            categories: ['luxury', 'fashion', 'jewelry', 'sale'],
            locations: ['NYC', 'LA', 'Miami', 'Paris'],
            priceRange: 'all'
        };
        this.initializeData();
    }

    initializeData() {
        // Initialize with sample events
        const sampleEvents = [
            {
                id: 1,
                name: "Chanel Spring Collection Launch",
                date: "2024-03-15",
                time: "6:00 PM",
                location: "Chanel Boutique, SoHo",
                description: "Exclusive preview of the new spring collection with champagne reception",
                category: "luxury",
                price: "$500",
                maxAttendees: 50,
                attendees: 23,
                organizer: "Chanel",
                image: "https://example.com/chanel-event.jpg"
            },
            {
                id: 2,
                name: "Balenciaga Private Sale",
                date: "2024-03-18",
                time: "10:00 AM",
                location: "Balenciaga Store, Beverly Hills",
                description: "Invitation-only seasonal sale with up to 70% off",
                category: "sale",
                price: "Free",
                maxAttendees: 100,
                attendees: 67,
                organizer: "Balenciaga",
                image: "https://example.com/balenciaga-sale.jpg"
            },
            {
                id: 3,
                name: "Luxury Watch Exhibition",
                date: "2024-03-20",
                time: "7:00 PM",
                location: "The Plaza Hotel, NYC",
                description: "Exclusive showcase of rare timepieces from top brands",
                category: "luxury",
                price: "$200",
                maxAttendees: 75,
                attendees: 45,
                organizer: "Luxury Timepieces Inc",
                image: "https://example.com/watch-exhibition.jpg"
            },
            {
                id: 4,
                name: "Fashion Week After Party",
                date: "2024-03-22",
                time: "9:00 PM",
                location: "The Standard Hotel, LA",
                description: "Celebrate fashion week with industry insiders and celebrities",
                category: "fashion",
                price: "$150",
                maxAttendees: 200,
                attendees: 189,
                organizer: "Fashion Week LA",
                image: "https://example.com/fashion-party.jpg"
            },
            {
                id: 5,
                name: "Jewelry Design Workshop",
                date: "2024-03-25",
                time: "2:00 PM",
                location: "Cartier Boutique, Miami",
                description: "Learn jewelry design from master craftsmen",
                category: "jewelry",
                price: "$300",
                maxAttendees: 25,
                attendees: 18,
                organizer: "Cartier",
                image: "https://example.com/jewelry-workshop.jpg"
            }
        ];

        sampleEvents.forEach(eventData => {
            const event = new Event(eventData);
            this.events.set(event.id, event);
        });

        this.loadFromStorage();
        console.log('EventService initialized with', this.events.size, 'events');
    }

    // Create new event
    createEvent(eventData) {
        try {
            const event = new Event(eventData);
            
            if (!event.name || !event.date || !event.location) {
                throw new Error('Missing required event information');
            }
            
            this.events.set(event.id, event);
            this.saveToStorage();
            this.notifyEventCreated(event);
            
            return event;
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    }

    // Get all events
    getAllEvents() {
        return Array.from(this.events.values());
    }

    // Get event by ID
    getEvent(eventId) {
        return this.events.get(eventId);
    }

    // Update event
    updateEvent(eventId, updates) {
        const event = this.getEvent(eventId);
        if (event) {
            Object.assign(event, updates);
            this.saveToStorage();
            this.notifyEventUpdated(event);
            return event;
        }
        return null;
    }

    // Delete event
    deleteEvent(eventId) {
        const event = this.getEvent(eventId);
        if (event) {
            this.events.delete(eventId);
            this.saveToStorage();
            this.notifyEventDeleted(event);
            return event;
        }
        return null;
    }

    // Join event
    joinEvent(eventId) {
        const event = this.getEvent(eventId);
        if (!event) {
            throw new Error('Event not found');
        }

        if (event.isFull()) {
            throw new Error('Event is full');
        }

        if (this.isUserJoined(eventId)) {
            throw new Error('Already joined this event');
        }

        const userEvent = new UserEvent({
            eventId: eventId,
            eventName: event.name,
            status: 'confirmed'
        });

        this.userEvents.set(userEvent.id, userEvent);
        event.addAttendee();
        this.setupEventReminders(userEvent, event);
        this.saveToStorage();

        this.addNotification(new EventNotification({
            type: 'event_joined',
            title: 'Event Joined Successfully',
            message: `You've successfully joined "${event.name}"!`,
            eventId: eventId,
            priority: 'high'
        }));

        this.notifyEventJoined(event);
        return userEvent;
    }

    // Leave event
    leaveEvent(eventId) {
        const userEvent = this.getUserEvent(eventId);
        if (!userEvent) {
            throw new Error('Not joined to this event');
        }

        const event = this.getEvent(eventId);
        if (event) {
            event.removeAttendee();
        }

        this.userEvents.delete(userEvent.id);
        this.saveToStorage();

        this.addNotification(new EventNotification({
            type: 'event_left',
            title: 'Event Left',
            message: `You've left "${event ? event.name : 'the event'}"`,
            eventId: eventId,
            priority: 'medium'
        }));

        this.notifyEventLeft(event);
        return userEvent;
    }

    // Get user events
    getUserEvents() {
        return Array.from(this.userEvents.values());
    }

    // Get user event by event ID
    getUserEvent(eventId) {
        return Array.from(this.userEvents.values()).find(ue => ue.eventId === eventId);
    }

    // Check if user is joined to event
    isUserJoined(eventId) {
        return this.getUserEvent(eventId) !== undefined;
    }

    // Share event
    shareEvent(eventId) {
        const event = this.getEvent(eventId);
        if (!event) {
            throw new Error('Event not found');
        }

        const shareData = {
            title: `Join this exclusive event: ${event.name}`,
            text: `Join us for ${event.name} on ${event.date} at ${event.time} in ${event.location}! ${event.description}`,
            url: `${window.location.origin}${window.location.pathname}?event=${eventId}`
        };

        if (navigator.share && navigator.canShare(shareData)) {
            return navigator.share(shareData);
        } else {
            this.fallbackShareEvent(event);
            return Promise.resolve();
        }
    }

    // Fallback share method
    fallbackShareEvent(event) {
        const shareText = `Event: ${event.name}\nDate: ${event.date}\nTime: ${event.time}\nLocation: ${event.location}\nDescription: ${event.description}\nPrice: ${event.price}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText);
            this.showNotification('Event details copied to clipboard! 📋', 'success');
        } else {
            alert(shareText);
        }
    }

    // Setup event reminders
    setupEventReminders(userEvent, event) {
        const eventDate = new Date(event.date);
        const dayBefore = new Date(eventDate.getTime() - 24 * 60 * 60 * 1000);
        const hourBefore = new Date(eventDate.getTime() - 60 * 60 * 1000);

        userEvent.addReminder({
            type: 'day_before',
            time: dayBefore.toISOString(),
            message: `${event.name} is tomorrow! Don't forget to attend.`
        });

        userEvent.addReminder({
            type: 'hour_before',
            time: hourBefore.toISOString(),
            message: `${event.name} starts in 1 hour! Get ready to go.`
        });
    }

    // Notification methods
    addNotification(notification) {
        this.notifications.unshift(notification);
        if (this.notifications.length > 50) {
            this.notifications = this.notifications.slice(0, 50);
        }
        this.saveToStorage();
    }

    getNotifications() {
        return this.notifications;
    }

    markNotificationAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.isRead = true;
            this.saveToStorage();
        }
    }

    // Storage methods
    saveToStorage() {
        try {
            const eventsData = Array.from(this.events.entries());
            const userEventsData = Array.from(this.userEvents.entries());
            
            localStorage.setItem('basedlyEvents', JSON.stringify(eventsData));
            localStorage.setItem('basedlyUserEvents', JSON.stringify(userEventsData));
            localStorage.setItem('basedlyNotifications', JSON.stringify(this.notifications));
            localStorage.setItem('basedlyEventPreferences', JSON.stringify(this.preferences));
        } catch (error) {
            console.error('Error saving events to storage:', error);
        }
    }

    loadFromStorage() {
        try {
            const savedEvents = localStorage.getItem('basedlyEvents');
            const savedUserEvents = localStorage.getItem('basedlyUserEvents');
            const savedNotifications = localStorage.getItem('basedlyNotifications');
            const savedPreferences = localStorage.getItem('basedlyEventPreferences');
            
            if (savedEvents) {
                const eventsData = JSON.parse(savedEvents);
                this.events = new Map(eventsData);
            }
            if (savedUserEvents) {
                const userEventsData = JSON.parse(savedUserEvents);
                this.userEvents = new Map(userEventsData);
            }
            if (savedNotifications) {
                this.notifications = JSON.parse(savedNotifications);
            }
            if (savedPreferences) {
                this.preferences = JSON.parse(savedPreferences);
            }
        } catch (error) {
            console.error('Error loading events from storage:', error);
        }
    }

    // Notification display methods
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
    notifyEventCreated(event) {
        this.showNotification(`Event "${event.name}" created successfully! ✨`, 'success');
    }

    notifyEventUpdated(event) {
        this.showNotification(`Event "${event.name}" updated successfully! ✨`, 'success');
    }

    notifyEventDeleted(event) {
        this.showNotification(`Event "${event.name}" deleted successfully! ✨`, 'success');
    }

    notifyEventJoined(event) {
        this.showNotification(`Successfully joined "${event.name}"! ✨`, 'success');
    }

    notifyEventLeft(event) {
        this.showNotification(`Left "${event.name}" successfully! ✨`, 'success');
    }

    // Utility methods
    static formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    static validateEventData(eventData) {
        const errors = [];
        
        if (!eventData.name || eventData.name.trim().length === 0) {
            errors.push('Event name is required');
        }
        
        if (!eventData.date) {
            errors.push('Event date is required');
        }
        
        if (!eventData.location || eventData.location.trim().length === 0) {
            errors.push('Event location is required');
        }
        
        if (!eventData.time) {
            errors.push('Event time is required');
        }
        
        return errors;
    }
}

// Event class
class Event {
    constructor(data) {
        this.id = data.id || Date.now();
        this.name = data.name;
        this.date = data.date;
        this.time = data.time;
        this.location = data.location;
        this.description = data.description || '';
        this.category = data.category || 'general';
        this.price = data.price || 'Free';
        this.maxAttendees = data.maxAttendees || 100;
        this.attendees = data.attendees || 0;
        this.organizer = data.organizer || 'Unknown';
        this.image = data.image || null;
        this.createdAt = data.createdAt || new Date().toISOString();
    }

    addAttendee() {
        if (this.attendees < this.maxAttendees) {
            this.attendees++;
            return true;
        }
        return false;
    }

    removeAttendee() {
        if (this.attendees > 0) {
            this.attendees--;
            return true;
        }
        return false;
    }

    isFull() {
        return this.attendees >= this.maxAttendees;
    }

    getAvailability() {
        return this.maxAttendees - this.attendees;
    }
}

// UserEvent class
class UserEvent {
    constructor(data) {
        this.id = data.id || Date.now();
        this.eventId = data.eventId;
        this.eventName = data.eventName;
        this.status = data.status || 'pending';
        this.reminders = data.reminders || [];
        this.createdAt = data.createdAt || new Date().toISOString();
    }

    addReminder(reminder) {
        this.reminders.push({
            id: Date.now(),
            ...reminder,
            isTriggered: false
        });
    }

    getReminders() {
        return this.reminders;
    }
}

// EventNotification class
class EventNotification {
    constructor(data) {
        this.id = data.id || Date.now();
        this.type = data.type;
        this.title = data.title;
        this.message = data.message;
        this.eventId = data.eventId;
        this.priority = data.priority || 'medium';
        this.isRead = data.isRead || false;
        this.createdAt = data.createdAt || new Date().toISOString();
    }
}

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EventService, Event, UserEvent, EventNotification };
} else {
    window.EventService = EventService;
    window.Event = Event;
    window.UserEvent = UserEvent;
    window.EventNotification = EventNotification;
} 