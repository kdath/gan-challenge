const { City } = require('./models')


const getByTag = async (req, res, next) => {
  try {
    const tag = req.query.tag;
    if (!tag) {
      // throw
    }

    const cities = await City.find({
          tag: tag
    })
    res.json({
      success: true,
      data: cities
    })
  } catch (e) {
    next(e)
  }
}