const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// In-memory user store (replace with database in production)
const users = new Map();
const resetTokens = new Map();

// JWT secret (use environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Email configuration
const emailConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER || 'your-email@gmail.com',
        pass: process.env.SMTP_PASS || 'your-app-password'
    }
};

// For development, if no email credentials are set, use a mock transporter
const createTransporter = () => {
    if (!process.env.SMTP_USER || process.env.SMTP_USER === 'your-email@gmail.com') {
        console.log('⚠️ No email credentials configured. Using mock transporter for development.');
        return {
            sendMail: async (mailOptions) => {
                console.log('📧 Mock email sent:', {
                    to: mailOptions.to,
                    subject: mailOptions.subject,
                    resetUrl: mailOptions.html.match(/http:\/\/[^"]+/)?.[0] || 'No URL found'
                });
                return { messageId: 'mock-message-id' };
            }
        };
    }
    return nodemailer.createTransport(emailConfig);
};

// Create email transporter
const transporter = createTransporter();

// Initialize with demo user
const initializeDemoUser = async () => {
    const hashedPassword = await bcrypt.hash('pw123', 10);
    users.set('demo@watch.com', {
        email: 'demo@watch.com',
        password: hashedPassword,
        name: 'Demo User',
        createdAt: new Date(),
        verified: true
    });
    console.log('✅ Demo user initialized with password: pw123');
};

// Get all users (for debugging)
const getAllUsers = () => {
    const userList = [];
    for (const [email, user] of users.entries()) {
        userList.push({
            email: user.email,
            name: user.name,
            verified: user.verified,
            createdAt: user.createdAt
        });
    }
    return userList;
};

// Get user count
const getUserCount = () => {
    return users.size;
};

// User registration
const registerUser = async (email, password, name) => {
    try {
        if (users.has(email)) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            email,
            password: hashedPassword,
            name,
            createdAt: new Date(),
            verified: false
        };

        users.set(email, user);
        
        // Send verification email
        await sendVerificationEmail(email, name);
        
        return { success: true, message: 'User registered successfully. Please check your email to verify your account.' };
    } catch (error) {
        throw new Error(`Registration failed: ${error.message}`);
    }
};

// User login
const loginUser = async (email, password) => {
    try {
        const user = users.get(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid credentials');
        }

        if (!user.verified) {
            throw new Error('Please verify your email before logging in');
        }

        const token = jwt.sign(
            { email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return {
            success: true,
            token,
            user: {
                email: user.email,
                name: user.name
            }
        };
    } catch (error) {
        throw new Error(`Login failed: ${error.message}`);
    }
};

// Password reset request
const requestPasswordReset = async (email) => {
    try {
        const user = users.get(email);
        if (!user) {
            // Don't reveal if user exists for security
            return { success: true, message: 'If the email exists, a reset link has been sent.' };
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetExpiry = new Date(Date.now() + 3600000); // 1 hour

        resetTokens.set(resetToken, {
            email,
            expiry: resetExpiry
        });

        await sendPasswordResetEmail(email, user.name, resetToken);

        return { success: true, message: 'Password reset email sent successfully.' };
    } catch (error) {
        throw new Error(`Password reset request failed: ${error.message}`);
    }
};

// Reset password with token
const resetPassword = async (resetToken, newPassword) => {
    try {
        const resetData = resetTokens.get(resetToken);
        if (!resetData || resetData.expiry < new Date()) {
            throw new Error('Invalid or expired reset token');
        }

        const user = users.get(resetData.email);
        if (!user) {
            throw new Error('User not found');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        users.set(resetData.email, user);

        // Remove used token
        resetTokens.delete(resetToken);

        return { success: true, message: 'Password reset successfully.' };
    } catch (error) {
        throw new Error(`Password reset failed: ${error.message}`);
    }
};

// Verify JWT token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

// Send verification email
const sendVerificationEmail = async (email, name) => {
    try {
        const verificationToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '24h' });
        const verificationUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/verify?token=${verificationToken}`;

        const mailOptions = {
            from: emailConfig.auth.user,
            to: email,
            subject: 'Welcome to Watch - Verify Your Email',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #FF4500;">🎮 Welcome to Watch!</h2>
                    <p>Hi ${name},</p>
                    <p>Welcome to Watch - the ultimate social platform to level up your social game!</p>
                    <p>Please verify your email address by clicking the button below:</p>
                    <a href="${verificationUrl}" style="
                        display: inline-block;
                        background: #FF4500;
                        color: white;
                        padding: 12px 24px;
                        text-decoration: none;
                        border-radius: 8px;
                        margin: 20px 0;
                    ">Verify Email</a>
                    <p>If the button doesn't work, copy and paste this link into your browser:</p>
                    <p>${verificationUrl}</p>
                    <p>This link will expire in 24 hours.</p>
                    <p>Thanks,<br>The Watch Team</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Verification email sent to ${email}`);
    } catch (error) {
        console.error('❌ Failed to send verification email:', error);
        throw new Error('Failed to send verification email');
    }
};

// Send password reset email
const sendPasswordResetEmail = async (email, name, resetToken) => {
    try {
        const resetUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

        const mailOptions = {
            from: emailConfig.auth.user,
            to: email,
            subject: 'Watch - Password Reset Request',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #FF4500;">🔐 Password Reset Request</h2>
                    <p>Hi ${name},</p>
                    <p>You requested a password reset for your Watch account.</p>
                    <p>Click the button below to reset your password:</p>
                    <a href="${resetUrl}" style="
                        display: inline-block;
                        background: #FF4500;
                        color: white;
                        padding: 12px 24px;
                        text-decoration: none;
                        border-radius: 8px;
                        margin: 20px 0;
                    ">Reset Password</a>
                    <p>If the button doesn't work, copy and paste this link into your browser:</p>
                    <p>${resetUrl}</p>
                    <p>This link will expire in 1 hour.</p>
                    <p>If you didn't request this reset, please ignore this email.</p>
                    <p>Thanks,<br>The Watch Team</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Password reset email sent to ${email}`);
    } catch (error) {
        console.error('❌ Failed to send password reset email:', error);
        throw new Error('Failed to send password reset email');
    }
};

// Verify email with token
const verifyEmail = async (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = users.get(decoded.email);
        
        if (!user) {
            throw new Error('User not found');
        }

        user.verified = true;
        users.set(decoded.email, user);

        return { success: true, message: 'Email verified successfully.' };
    } catch (error) {
        throw new Error('Invalid or expired verification token');
    }
};

// Initialize demo user on module load
initializeDemoUser();

module.exports = {
    registerUser,
    loginUser,
    requestPasswordReset,
    resetPassword,
    verifyToken,
    verifyEmail,
    getAllUsers,
    getUserCount,
    users: () => users.size // Return count for monitoring
}; 