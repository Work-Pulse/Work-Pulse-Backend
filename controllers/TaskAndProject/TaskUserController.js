const User = require("../../models/TaskAndProjectModels/TaskUser");

// Add User
exports.addUser = async (req, res) => {
    try {
        const { id, name } = req.body;
        if (!id || !name) return res.status(400).json({ error: "User ID and name required" });

        const newUser = new User({ id, name });
        await newUser.save();
        res.status(201).json({ message: "User added successfully", user: newUser });
    } catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
};

// Get Users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
