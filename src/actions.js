const { Cities } = require('./models')


const getByTag = async (req, res, next) => {
  try {
    const tag = req.query.tag;
    const isActive = req.query.isActive;
    if (!tag) {
      throw Error('Missing required parameter')
    }

    let query = {
      tags: tag
    };

    if(isActive !== undefined) {
      query.isActive = isActive
    }

    const cities = await Cities.find(query).exec()
    res.json({
      success: true,
      cities: cities
    })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  getByTag
}