/**
 * Logo Component for Basedly AI
 * Renders the Watch logo with dark blue circle and white text
 */
class LogoComponent {
    constructor(options = {}) {
        this.size = options.size || 40;
        this.text = options.text || 'Watch';
        this.backgroundColor = options.backgroundColor || '#1e3a8a';
        this.textColor = options.textColor || '#ffffff';
        this.fontFamily = options.fontFamily || 'serif';
        this.fontWeight = options.fontWeight || 'bold';
        this.showText = options.showText !== false; // Default to true
        this.element = null;
    }

    /**
     * Create the logo element
     * @returns {HTMLElement} The logo element
     */
    create() {
        const logoContainer = document.createElement('div');
        logoContainer.className = 'logo-component';
        logoContainer.style.cssText = `
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: ${this.size}px;
            height: ${this.size}px;
            background: ${this.backgroundColor};
            border-radius: 50%;
            color: ${this.textColor};
            font-family: ${this.fontFamily};
            font-weight: ${this.fontWeight};
            font-size: ${Math.max(8, this.size * 0.3)}px;
            text-align: center;
            line-height: 1;
            user-select: none;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(30, 58, 138, 0.3);
        `;

        if (this.showText) {
            logoContainer.textContent = this.text;
        }

        // Add hover effects
        logoContainer.addEventListener('mouseenter', () => {
            logoContainer.style.transform = 'scale(1.05)';
            logoContainer.style.boxShadow = '0 4px 16px rgba(30, 58, 138, 0.4)';
        });

        logoContainer.addEventListener('mouseleave', () => {
            logoContainer.style.transform = 'scale(1)';
            logoContainer.style.boxShadow = '0 2px 8px rgba(30, 58, 138, 0.3)';
        });

        this.element = logoContainer;
        return logoContainer;
    }

    /**
     * Create a larger logo for headers
     * @returns {HTMLElement} The header logo element
     */
    createHeaderLogo() {
        const headerLogo = document.createElement('div');
        headerLogo.className = 'header-logo';
        headerLogo.style.cssText = `
            display: flex;
            align-items: center;
            gap: 12px;
            font-family: 'Space Grotesk', Arial, sans-serif;
            font-weight: 700;
            letter-spacing: 2px;
            color: var(--lux-hot-pink);
        `;

        // Create the logo circle
        const logoCircle = this.create();
        logoCircle.style.width = '48px';
        logoCircle.style.height = '48px';
        logoCircle.style.fontSize = '14px';

        // Add text next to logo
        const logoText = document.createElement('span');
        logoText.textContent = 'BASEDLY AI';
        logoText.style.fontSize = '24px';

        headerLogo.appendChild(logoCircle);
        headerLogo.appendChild(logoText);

        return headerLogo;
    }

    /**
     * Create a favicon-style logo
     * @returns {HTMLElement} The favicon logo element
     */
    createFaviconLogo() {
        const faviconLogo = document.createElement('div');
        faviconLogo.className = 'favicon-logo';
        faviconLogo.style.cssText = `
            display: inline-block;
            width: 32px;
            height: 32px;
            background: ${this.backgroundColor};
            border-radius: 50%;
            color: ${this.textColor};
            font-family: ${this.fontFamily};
            font-weight: ${this.fontWeight};
            font-size: 10px;
            text-align: center;
            line-height: 32px;
            user-select: none;
        `;

        if (this.showText) {
            faviconLogo.textContent = this.text;
        }

        return faviconLogo;
    }

    /**
     * Create a social media logo
     * @returns {HTMLElement} The social media logo element
     */
    createSocialLogo() {
        const socialLogo = document.createElement('div');
        socialLogo.className = 'social-logo';
        socialLogo.style.cssText = `
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 20px;
            background: var(--lux-black);
            border: 2px solid var(--lux-hot-pink);
            border-radius: 12px;
            max-width: 400px;
        `;

        // Create larger logo
        const logoCircle = this.create();
        logoCircle.style.width = '80px';
        logoCircle.style.height = '80px';
        logoCircle.style.fontSize = '24px';

        // Add text content
        const textContent = document.createElement('div');
        textContent.innerHTML = `
            <h3 style="color: var(--lux-hot-pink); margin: 0 0 8px 0; font-size: 20px;">Basedly AI</h3>
            <p style="color: var(--lux-beige); margin: 0; font-size: 14px; opacity: 0.8;">Luxury Shopping Community</p>
        `;

        socialLogo.appendChild(logoCircle);
        socialLogo.appendChild(textContent);

        return socialLogo;
    }

    /**
     * Render the logo to a canvas for image generation
     * @param {number} size - The size of the canvas
     * @returns {HTMLCanvasElement} The canvas with the logo
     */
    renderToCanvas(size = 1024) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // Draw background circle
        ctx.fillStyle = this.backgroundColor;
        ctx.beginPath();
        ctx.arc(size/2, size/2, size/2 - 10, 0, 2 * Math.PI);
        ctx.fill();

        // Draw text
        if (this.showText) {
            ctx.fillStyle = this.textColor;
            ctx.font = `${this.fontWeight} ${size * 0.15}px ${this.fontFamily}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.text, size/2, size/2);
        }

        return canvas;
    }

    /**
     * Get the logo as a data URL
     * @param {number} size - The size of the image
     * @returns {string} The data URL of the logo
     */
    getDataURL(size = 1024) {
        const canvas = this.renderToCanvas(size);
        return canvas.toDataURL('image/png');
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LogoComponent;
} else {
    window.LogoComponent = LogoComponent;
}

// Auto-initialize if script is loaded directly
document.addEventListener('DOMContentLoaded', function() {
    // Replace any elements with class 'logo-placeholder' with the actual logo
    const placeholders = document.querySelectorAll('.logo-placeholder');
    placeholders.forEach(placeholder => {
        const size = parseInt(placeholder.dataset.size) || 40;
        const logo = new LogoComponent({ size });
        const logoElement = logo.create();
        placeholder.parentNode.replaceChild(logoElement, placeholder);
    });
}); 