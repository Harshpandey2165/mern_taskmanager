const Task = require("../models/Task");
 const User = require("../models/User");
//  const asyncHandler = require("express-async-handler");
 const bcrypt = require("bcrypt");

//  @desc   Get all users[Admin Only]
//  @route  GET /api/users
//  @access Private (Requires JWT)

const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role:'member'}).select("-password");

        // Add task count to each user
        const usersWithTaskCount = await Promise.all(
            users.map(async (user) => {
                const pendingTasks = await Task.countDocuments({ assignedTo: user._id, status: 'Pending'  });
                const inProgressTasks = await Task.countDocuments({ assignedTo: user._id, status: 'In Progress' });
                const completedTasks = await Task.countDocuments({ assignedTo: user._id, status: 'Completed' });
                return { 
                    ...user._doc, 
                    pendingTasks, 
                    inProgressTasks, 
                    completedTasks
                };
            })
        );

        res.json(usersWithTaskCount);
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
};

// @desc   Get user by ID
// @route  GET /api/users/:id
// @access Private (Requires JWT)

const getUserById = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
};

// @desc   Delete user [ Admin Only ]
// @route  DELETE /api/users/:id
// @access Private (Requires JWT)

// const deleteUser = async (req, res) => {
//     try {
//     } catch (error) {
//         res.status(500).json({message: "Server Error", error: error.message})
//     }
// };

module.exports = {getUsers, getUserById}