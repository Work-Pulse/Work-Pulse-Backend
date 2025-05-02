// exports.validateLogin = async (req, res) => {
//     const { username, password } = req.body;
  
//     if (!username || username.trim() === "") {
//       return res.status(400).json({ message: "Username cannot be empty" });
//     }
  
//     if (!password || password.trim() === "") {
//       return res.status(400).json({ message: "Password cannot be empty" });
//     }
//     const validUsername = "admin";
//     const validPassword = "admin123";
  
//     if (username !== validUsername || password !== validPassword) {
//       return res.status(401).json({ message: "Invalid username or password" });
//     }
  
//     return res.status(200).json({ message: "Login successful" });
// };