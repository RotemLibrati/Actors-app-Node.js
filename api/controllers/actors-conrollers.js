const axios = require('axios');

const getActors = async (req, res) => {
    try {
        const actors = await axios.get('https://api.tvmaze.com/shows/1/cast');
        res.json(actors.data);
    } catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getActors = getActors;