const isNode = typeof module !== 'undefined' && module.exports;
class EasyValidator {
    constructor(options = {}) {
        this.rules = {
            usernameMin: options.usernameMin || 3,
            passwordMin: options.passwordMin || 6,
            strictPassword: options.strictPassword || false,
            allowedEmails: options.allowedEmails || []
        };
        this.regexCache = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            specialChar: /[!@#$%^&*]/,
            number: /\d/
        };
    }

    checkField(value, type, fieldName) {
        if (!value || typeof value !== 'string') {
            return { valid: false, message: `${fieldName} est requis.` };
        }
        const { usernameMin, passwordMin, strictPassword, allowedEmails } = this.rules;
        const { email, specialChar, number } = this.regexCache;
        switch (type) {
            case 'username':
                return value.length < usernameMin
                    ? { valid: false, message: `${fieldName} doit avoir au moins ${usernameMin} caractères.` }
                    : { valid: true, message: 'OK' };

            case 'email':
                if (!email.test(value)) {
                    return { valid: false, message: "L'email n'est pas valide." };
                }
                if (allowedEmails.length > 0) {
                    const domain = value.split('@')[1];
                    if (!allowedEmails.includes(domain)) {
                        return { valid: false, message: "Domaine email non autorisé." };
                    }
                }
                return { valid: true, message: 'OK' };

            case 'password':
                if (value.length < passwordMin) {
                    return { valid: false, message: `Le mot de passe doit avoir au moins ${passwordMin} caractères.` };
                }
                if (strictPassword) {
                    if (!specialChar.test(value)) {
                        return { valid: false, message: "Un caractère spécial (!@#$%^&*) est requis." };
                    }
                    if (!number.test(value)) {
                        return { valid: false, message: "Un chiffre est requis." };
                    }
                }
                return { valid: true, message: 'OK' };

            default:
                return { valid: true, message: 'OK' };
        }
    }
    register(data = {}) {
        const results = {
            username: this.checkField(data.username, 'username', 'Nom d’utilisateur'),
            email: this.checkField(data.email, 'email', 'Email'),
            password: this.checkField(data.password, 'password', 'Mot de passe')
        };
        return {
            valid: Object.values(results).every(r => r.valid),
            fields: results
        };
    }
    login(data = {}) {
        const results = {
            email: this.checkField(data.email, 'email', 'Email'),
            password: this.checkField(data.password, 'password', 'Mot de passe')
        };
        return {
            valid: Object.values(results).every(r => r.valid),
            fields: results
        };
    }
}
if (isNode) {
    module.exports = EasyValidator;
} else {
    window.EasyValidator = EasyValidator; 
}