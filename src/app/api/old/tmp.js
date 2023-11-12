// app/api/users.js
const sequelize = require('../../database/sequelize.js');
const User = require('../../database/model/user.js');
import { useRouter } from 'next/router';

export default async (req, res) => {
  const router = useRouter();
  const { method } = router;

  try {
    if (method === 'GET') {
      // Read Operation (GET)
      const users = await User.findAll();
      res.status(200).json(users);
    } else if (method === 'POST') {
      // Create Operation (POST)
      const { username, email } = req.body;
      const newUser = await User.create({ username, email });
      res.status(201).json(newUser);
    } else if (method === 'PUT') {
      // Update Operation (PUT)
      const userId = req.query.id;
      const { username, email } = req.body;
      const [updatedRowsCount] = await User.update(
        { username, email },
        { where: { id: userId } }
      );
      if (updatedRowsCount > 0) {
        res.status(200).json({ message: 'User updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } else if (method === 'DELETE') {
      // Delete Operation (DELETE)
      const userId = req.query.id;
      const deletedRowsCount = await User.destroy({ where: { id: userId } });
      if (deletedRowsCount > 0) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    // Close the database connection after all operations
    await sequelize.close();
  }
};