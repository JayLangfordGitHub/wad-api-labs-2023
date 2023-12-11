import express from 'express';
import User from './userModel';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// Register (Create) / Authenticate User with direct error handling
router.post('/', async (req, res) => {
    if (req.query.action === 'register') {
        try {
            const user = new User(req.body);
            await user.save();
            res.status(201).json({
                code: 201,
                msg: 'Successfully created new user.',
                user
            });
        } catch (error) {
            if (error.name === 'ValidationError') {
                res.status(400).json({
                    code: 400,
                    msg: 'Validation error: ' + error.message
                });
            } else {
                res.status(500).json({
                    code: 500,
                    msg: 'Internal server error: ' + error.message
                });
            }
        }
    } else { //Must be an authenticate then!!! Query the DB and check if there's a match
        const user = await User.findOne(req.body);
        if (!user) {
            return res.status(401).json({ code: 401, msg: 'Authentication failed' });
        }else{
            return res.status(200).json({ code: 200, msg: "Authentication Successful", token: 'TEMPORARY_TOKEN' });
        }
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});
export default router;