const express = require('express');
const Soilprofile = require('../models/Soilprofile');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// ROUTE-1: Get all profiles using: GET "/api/notes/fetchallnotes". login required
router.get('/soilprofiles', fetchuser, async (req, res) => {
    try {
        // Fetch all profiles from the database where the user field matches the user's ID.
        const soilprofiles = await Soilprofile.find({ user: req.user.id });

        // Respond with the profiles in JSON format.
        res.json(soilprofiles);
    } catch (error) {
        // If an error occurs during fetching the profiles, respond with an error message.
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
})

// ROUTE-2: Add a new profile using: POST "/api/notes/addprofile". login required
router.post('/addsoilprofile', fetchuser, async (req, res) => {
    try {
        // Destructure fields from req.body
        const { name, nitrogen, potasium, phosphorous, tempreature, humidity, ph, rainfall, moisture, soiltype } = req.body;

        // Create a new instance of Soilprofile model
        const soilprofile = new Soilprofile({
            name,
            nitrogen,
            potasium,
            phosphorous,
            tempreature,
            humidity,
            ph,
            rainfall,
            moisture,
            soiltype,
            user: req.user.id // Assuming user ID is required
        });

        // Save the profile to the database
        const savedprofile = await soilprofile.save();

        // Respond with the saved profile
        res.json(savedprofile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});


// ROUTE-3: update an existing profile using: PUT "/api/notes/updateprofile". login required

router.put('/updateprofile/:id', fetchuser, async (req, res) => {   // for updation we use put
    try {
        const { title, description, tag } = req.body
        //create a new profileobject
        const newprofile = {};

        if (title) {
            newprofile.title = title;
        }
        if (nitrogen) {
            newprofile.nitrogen = nitrogen;
        }
        if (potasium) {
            newprofile.potassium = potassium;
        }
        if (phosphorus) {
            newprofile.phosphorus = phosphorus;
        }
        if (tempreature) {
            newprofile.tempreature = tempreature;
        }
        if (humidity) {
            newprofile.humidity = humidity;
        }
        if (ph) {
            newprofile.ph = ph;
        }
        if (rainfall) {
            newprofile.rainfall = rainfall;
        }
        if (moisture) {
            newprofile.moisture = moisture;
        }
        if (soiltype) {
            newprofile.soiltype = soiltype;
        }

        //find the profile to be updated and update it
        let profile = await Soilprofile.findById(req.params.id);
        if (!profile) { return req.status(404).send("Not Found") }
        //Allow updation only if user own's this profile
        if (profile.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }
        profile = await Soilprofile.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
        res.json({ profile });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to update the profile' });

    }

})

// ROUTE-4: deleting profile using: DELETE "/api/notes/deleteprofile". login required

router.delete('/deleteprofile/:id', fetchuser, async (req, res) => {
    //taking out from body
    try {
        //find the profile to be deleted and delete it
        let profile = await Soilprofile.findById(req.params.id);
        if (!profile) {
            return res.status(404).send("Not Found");
        }

        //Allow deletion only if user own's this profile
        if (profile.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }
        profile = await Soilprofile.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", profile: profile })
    } catch (error) {
        // If an error occurs during fetching the notes, respond with an error message.
        console.log(error)
        res.status(500).json({ error: 'Failed to delete the profile', });
    }
})

module.exports = router;