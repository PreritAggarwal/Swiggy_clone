import { Request, Response, NextFunction } from 'express';
import Admin from '../models/adminModel';
import Role from '../models/roleModel';

const verifyAdminRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminId = parseInt(req.params.adminId, 10); // Get adminId from the route parameters
    if (isNaN(adminId)) {
      return res.status(400).json({ error: 'Invalid adminId' });
    }
console.log(adminId,'chk de');
    // Find the admin by ID
    const admin = await Admin.findByPk(adminId, {
      include: [{ model: Role, as: 'role' }] // Include the role with alias 'role'
    });
    console.log(admin,'chk de');
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Check if the admin's role is valid (assuming role_id 1 corresponds to the admin role)
    if (admin.role_id !== 1) {
      return res.status(403).json({ error: 'Access denied: Admin role required' });
    }

    // If role is valid, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error verifying admin role:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default verifyAdminRole;
