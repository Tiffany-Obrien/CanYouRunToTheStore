const db = require('../config/connection');
const { User, List } = require('../models');
const userSeeds = require('./userSeeds.json');
const listSeeds = require('./listSeeds.json');

db.once('open', async () => {
  try {
    await List.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < listSeeds.length; i++) {
      const { _id, listAuthor } = await List.create(listSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: listAuthor },
        {
          $addToSet: {
            lists: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
