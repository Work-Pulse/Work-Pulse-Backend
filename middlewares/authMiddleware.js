const firebaseAdmin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin SDK with the service account credentials
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(path.join('D:', 'WorkPulse', 'firebase-service-account.json')), // Absolute path to the service account JSON
});

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Extract token from the Authorization header
  
  if (!token) {
    return res.status(401).json({ error: "No token provided" }); // Return error if token is missing
  }

  try {
    // Verify the Firebase ID token
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    req.user = decodedToken;  // Attach decoded token to the request object
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    return res.status(401).json({ error: "Unauthorized" });  // Return error if token is invalid
  }
};

module.exports = verifyToken;
