class LegalComponent {
    constructor() {
        this.apiBase = '/api/legal';
        this.agreements = new Map();
        this.userAgreements = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkCompliance();
    }

    setupEventListeners() {
        // Agreement signing buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-sign-agreement]')) {
                const agreementId = e.target.getAttribute('data-sign-agreement');
                this.signAgreement(agreementId);
            }

            if (e.target.matches('[data-view-agreement]')) {
                const agreementId = e.target.getAttribute('data-view-agreement');
                this.viewAgreement(agreementId);
            }

            if (e.target.matches('[data-generate-agreements]')) {
                this.generateAgreementPackage();
            }

            if (e.target.matches('[data-bulk-sign]')) {
                this.bulkSignAgreements();
            }
        });
    }

    // Check if user has signed required agreements
    async checkCompliance() {
        try {
            const token = localStorage.getItem('watch_token');
            if (!token) return;

            const response = await fetch(`${this.apiBase}/compliance-check`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            
            if (data.success) {
                if (!data.hasSignedRequiredAgreements) {
                    this.showComplianceModal();
                }
            }
        } catch (error) {
            console.error('Error checking compliance:', error);
        }
    }

    // Show compliance modal for unsigned agreements
    showComplianceModal() {
        const modal = document.getElementById('compliance-modal');
        if (modal) {
            modal.style.display = 'block';
            this.loadUserAgreements();
        }
    }

    // Load user's agreements
    async loadUserAgreements() {
        try {
            const token = localStorage.getItem('watch_token');
            if (!token) return;

            const response = await fetch(`${this.apiBase}/user-agreements`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            
            if (data.success) {
                this.userAgreements = data.agreements;
                this.renderAgreements();
            }
        } catch (error) {
            console.error('Error loading agreements:', error);
        }
    }

    // Render agreements in the UI
    renderAgreements() {
        const container = document.getElementById('agreements-container');
        if (!container) return;

        if (this.userAgreements.length === 0) {
            container.innerHTML = `
                <div class="no-agreements">
                    <h3>No agreements found</h3>
                    <p>Click the button below to generate your agreement package.</p>
                    <button class="generate-btn" data-generate-agreements>Generate Agreements</button>
                </div>
            `;
            return;
        }

        container.innerHTML = this.userAgreements.map(agreement => `
            <div class="agreement-item ${agreement.status}" data-agreement-id="${agreement.id}">
                <div class="agreement-header">
                    <h3>${agreement.title}</h3>
                    <span class="agreement-status ${agreement.status}">${agreement.status.toUpperCase()}</span>
                </div>
                <div class="agreement-meta">
                    <span class="agreement-type">${this.formatAgreementType(agreement.type)}</span>
                    <span class="agreement-date">Generated: ${new Date(agreement.generatedDate).toLocaleDateString()}</span>
                </div>
                <div class="agreement-actions">
                    <button class="view-btn" data-view-agreement="${agreement.id}">View</button>
                    ${agreement.status === 'pending' ? 
                        `<button class="sign-btn" data-sign-agreement="${agreement.id}">Sign</button>` : 
                        `<span class="signed-date">Signed: ${new Date(agreement.signedDate).toLocaleDateString()}</span>`
                    }
                </div>
            </div>
        `).join('');
    }

    // Format agreement type for display
    formatAgreementType(type) {
        const typeMap = {
            'termsOfService': 'Terms of Service',
            'privacyPolicy': 'Privacy Policy',
            'marketplaceAgreement': 'Marketplace Agreement',
            'sellerAgreement': 'Seller Agreement',
            'buyerAgreement': 'Buyer Agreement',
            'tradeAgreement': 'Trade Agreement',
            'disputeResolution': 'Dispute Resolution',
            'feeAgreement': 'Fee Agreement'
        };
        return typeMap[type] || type;
    }

    // Generate agreement package for user
    async generateAgreementPackage() {
        try {
            const token = localStorage.getItem('watch_token');
            if (!token) {
                alert('Please log in to generate agreements');
                return;
            }

            const response = await fetch(`${this.apiBase}/generate-package`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    customData: {
                        generatedAt: new Date().toISOString(),
                        userAgent: navigator.userAgent
                    }
                })
            });

            const data = await response.json();
            
            if (data.success) {
                alert('Agreement package generated successfully!');
                this.loadUserAgreements();
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error generating agreements:', error);
            alert('Error generating agreements');
        }
    }

    // View specific agreement
    async viewAgreement(agreementId) {
        try {
            const token = localStorage.getItem('watch_token');
            if (!token) return;

            const response = await fetch(`${this.apiBase}/agreements/${agreementId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            
            if (data.success) {
                this.showAgreementModal(data.agreement);
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error viewing agreement:', error);
            alert('Error loading agreement');
        }
    }

    // Show agreement modal
    showAgreementModal(agreement) {
        const modal = document.getElementById('agreement-modal');
        if (!modal) return;

        const content = document.getElementById('agreement-modal-content');
        if (content) {
            content.innerHTML = `
                <div class="agreement-details">
                    <h2>${agreement.title}</h2>
                    <div class="agreement-info">
                        <p><strong>Version:</strong> ${agreement.version}</p>
                        <p><strong>Effective Date:</strong> ${new Date(agreement.effectiveDate).toLocaleDateString()}</p>
                        <p><strong>Generated:</strong> ${new Date(agreement.generatedDate).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> <span class="status ${agreement.status}">${agreement.status.toUpperCase()}</span></p>
                    </div>
                    
                    <div class="agreement-sections">
                        ${agreement.sections.map(section => `
                            <div class="agreement-section">
                                <h3>${section.title}</h3>
                                <p>${section.content}</p>
                            </div>
                        `).join('')}
                    </div>
                    
                    ${agreement.signature ? `
                        <div class="agreement-signature">
                            <h3>Digital Signature</h3>
                            <p><strong>Signed:</strong> ${new Date(agreement.signature.timestamp).toLocaleString()}</p>
                            <p><strong>IP Address:</strong> ${agreement.signature.ipAddress}</p>
                            <p><strong>Signature Hash:</strong> <code>${agreement.signature.digitalSignature.substring(0, 16)}...</code></p>
                        </div>
                    ` : ''}
                </div>
            `;
        }

        modal.style.display = 'block';
    }

    // Sign an agreement
    async signAgreement(agreementId) {
        try {
            const token = localStorage.getItem('watch_token');
            if (!token) {
                alert('Please log in to sign agreements');
                return;
            }

            // Show confirmation dialog
            const confirmed = confirm('Are you sure you want to sign this agreement? This action cannot be undone.');
            if (!confirmed) return;

            const response = await fetch(`${this.apiBase}/sign/${agreementId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            
            if (data.success) {
                alert('Agreement signed successfully!');
                this.loadUserAgreements();
                this.checkCompliance();
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error signing agreement:', error);
            alert('Error signing agreement');
        }
    }

    // Bulk sign agreements
    async bulkSignAgreements() {
        try {
            const token = localStorage.getItem('watch_token');
            if (!token) {
                alert('Please log in to sign agreements');
                return;
            }

            const pendingAgreements = this.userAgreements.filter(agreement => agreement.status === 'pending');
            if (pendingAgreements.length === 0) {
                alert('No pending agreements to sign');
                return;
            }

            const confirmed = confirm(`Are you sure you want to sign all ${pendingAgreements.length} pending agreements?`);
            if (!confirmed) return;

            const agreementIds = pendingAgreements.map(agreement => agreement.id);

            const response = await fetch(`${this.apiBase}/bulk-sign`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ agreementIds })
            });

            const data = await response.json();
            
            if (data.success) {
                alert(`Successfully signed ${data.signedAgreements.length} agreements!`);
                this.loadUserAgreements();
                this.checkCompliance();
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error bulk signing agreements:', error);
            alert('Error signing agreements');
        }
    }

    // Generate transaction-specific agreements
    async generateTransactionAgreements(transactionType, transactionData) {
        try {
            const token = localStorage.getItem('watch_token');
            if (!token) {
                alert('Please log in to generate transaction agreements');
                return;
            }

            const response = await fetch(`${this.apiBase}/transaction-agreements`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    transactionType,
                    transactionData
                })
            });

            const data = await response.json();
            
            if (data.success) {
                return data.agreements;
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error('Error generating transaction agreements:', error);
            throw error;
        }
    }

    // Export agreement as PDF
    async exportAgreement(agreementId) {
        try {
            const token = localStorage.getItem('watch_token');
            if (!token) {
                alert('Please log in to export agreements');
                return;
            }

            const response = await fetch(`${this.apiBase}/export/${agreementId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            
            if (data.success) {
                // In a real implementation, this would download the PDF
                alert('PDF export generated successfully!');
                return data.export;
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error exporting agreement:', error);
            alert('Error exporting agreement');
        }
    }

    // Verify agreement signature
    async verifySignature(agreementId, digitalSignature) {
        try {
            const response = await fetch(`${this.apiBase}/verify-signature`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    agreementId,
                    digitalSignature
                })
            });

            const data = await response.json();
            
            if (data.success) {
                return data.isValid;
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error('Error verifying signature:', error);
            throw error;
        }
    }

    // Close modals
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Get agreement statistics (for admin)
    async getAgreementStats() {
        try {
            const token = localStorage.getItem('watch_token');
            if (!token) return null;

            const response = await fetch(`${this.apiBase}/stats`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            
            if (data.success) {
                return data.stats;
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error('Error getting agreement stats:', error);
            return null;
        }
    }
}

// Initialize legal component
const legalComponent = new LegalComponent();

// Global functions for HTML onclick handlers
window.legalComponent = legalComponent; 