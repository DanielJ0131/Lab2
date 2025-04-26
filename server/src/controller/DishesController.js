import dishesModel from '../model/DishesModel.js'
/**
 * Controller to perform CRUD for the dishes collection.
 *
 * @class
 */
class DishesController {
  /**
     * Get a dish by identifier (ID or name).
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     */
  async getDishByIdentifier(req, res, next) {
    try {
      const { identifier } = req.params

      // Check if the identifier is numeric (IDs are numbers)
      // else, assume it is a name!
      const dish = /^\d+$/.test(identifier)
        ? await dishesModel.getDishById(identifier)
        : await dishesModel.getDishByName(identifier)

      if (!dish) {
        return res.status(404).json({ message: 'Dish not found' })
      }
      res.status(200).json(dish)
    } catch (error) {
      next(error)
    }
  }

  /**
     * Get all dishes.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     */
  async getAllDishes(req, res, next) {
    try {
      const dishes = await dishesModel.getAllDishes()
      res.status(200).json(dishes)
    } catch (error) {
      next(error)
    }
  }

  /**
     * Add a new dish.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     */
  async addDish(req, res, next) {
    try {
      const newDish = req.body
      const existingDish = await dishesModel.getDishByName(newDish.name)
      if (existingDish) {
        return res.status(409).json({ message: 'Dish already exists' })
      }
      const createdDish = await dishesModel.addDish(newDish)
      
      if (!createdDish) {
        return res.status(400).json({ message: 'Failed to create dish' })
      }

      res.status(201).json(createdDish)
    } catch (error) {
      next(error)
    }
  }

  /**
     * Update an existing dish.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     */
  async updateDish(req, res, next) {
    try {
      const { id } = req.params
      const updatedData = req.body
      const updatedDish = await dishesModel.updateDish(id, updatedData)
      
      if (!updatedDish) {
        return res.status(404).json({ message: 'Dish not found' })
      }

      res.status(200).json(updatedDish)
    } catch (error) {
      next(error)
    }
  }

  /**
     * Delete a dish.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     */
  async deleteDish(req, res, next) {
    try {
      const { id } = req.params
      const existingDish = await dishesModel.getDishById(id)
      if (!existingDish) {
        return res.status(404).json({ message: 'Dish not found' })
      }
      await dishesModel.deleteDish(id)
      res.status(200).json({ message: 'Dish deleted successfully' })
    } catch (error) {
      next(error)
    }
  }
}

export default new DishesController()
