const crypto = require('crypto');

// Session Information
class UserSession {
    constructor(userId, ipAddress, userAgent, location) {
        this.userId = userId;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
        this.location = location;
    }
}

function generateToken(userSession, amount) {
    const timestamp = Date.now().toString();
    const rawToken = `${userSession.userId}:${amount}:${timestamp}:${userSession.ipAddress}:${userSession.userAgent}`;
    
    // Encrypt token using SHA256 to simulate real-world cryptographic token
    const token = crypto.createHash('sha256').update(rawToken).digest('hex');
    return { token, timestamp };
}

function detectAnomalousToken(userSession, tokenTimestamp) {
    const currentTime = Date.now();
    

    // Time for the token 
    const timeDiff = (currentTime - parseInt(tokenTimestamp)) / 1000;
    if (timeDiff > 300) {  
        console.log("Alert: Token expired! Time-based anomaly detected.");
        return false;
    }
    
    const normalLocation = "INDIA";
    if (userSession.location !== normalLocation) {
        console.log(`Alert: Location anomaly detected! User is accessing from ${userSession.location}, not ${normalLocation}.`);
        return false;
    }

    
    return true; 
}

(function() {
    const userSession = new UserSession("12345", "192.168.1.1", "Chrome", "INDIA");
    // const userSession = new UserSession("12345", "192.168.1.1", "Chrome", "USA");

    
    const { token, timestamp } = generateToken(userSession, 100);
    console.log(`Generated Token: ${token}`);
    
    const isValid = detectAnomalousToken(userSession, timestamp);
    
    if (isValid) {
        console.log("Transaction approved!");
    } else {
        console.log("Transaction blocked due to suspicious activity!");
    }
})();
