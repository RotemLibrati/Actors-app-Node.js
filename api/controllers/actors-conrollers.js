const axios = require('axios');
const client = require('../../redis/redis');
const config = require('config');


async function cache(req, res) {
    var keys;
    await client.keys('*')
        .then(result => {
            keys = result;
        })
        .catch(err => {
            console.log("error:", err.message);
        });
    return keys;
}

const getActors = async (req, res) => {
    const expiration = config.get('EXPIRATION');
    const data = [];
    try {
        const keys = await cache();
        if (keys.length > 0) {
            keys.map(key => {
                client.get(key)
                    .then((result) => {
                        data.push(JSON.parse(result));    
                    })
                    .catch((err) => {
                        console.error("error:", err.message);
                    })
            });
            console.log("redis");
            setTimeout(() => {
                res.json(data);
            }, 3000);

        } else {
            const actors = await axios.get('https://api.tvmaze.com/shows/1/cast');
            actors.data.map(actor => {
                client.setEx(JSON.stringify(actor.person.id), expiration, JSON.stringify({
                    "id": actor.person.id,
                    "name": actor.person.name,
                    "birthday": actor.person.birthday,
                    "gender": actor.person.gender
                }))
            });
            console.log("api");
            actors.data.map(actor => {
                data.push({
                    "id": actor.person.id,
                    "name": actor.person.name,
                    "birthday": actor.person.birthday,
                    "gender": actor.person.gender
                })
            })
            res.json(data);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
exports.getActors = getActors;