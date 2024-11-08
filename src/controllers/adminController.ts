// controllers/adminAuthController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel';
import Role from '../models/roleModel'; // Import Role model
import { validatePassword } from '../utils/validatePassword';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const adminSignup = async (req: Request, res: Response) => {
  const { email, password, role_name } = req.body; // Include role_name in the request

  try {
    // Check if the role exists, if not create it
    let role = await Role.findOne({ where: { role_name } });
    
    if (!role) {
      role = await Role.create({ role_name }); // Create a new role
    }

    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Password does not meet complexity requirements' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await Admin.create({ email, password: hashedPassword, role_id: role.id }); // Use the role's ID

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Admin signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {

    const admin = await Admin.findOne({ where: { email }, include: [{ model: Role, as: 'role' }] }); // Include Role
    console.log(admin,"cjeck");
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    console.log(isValidPassword,"cjeck");
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ adminId: admin.id, role: admin.role_id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Admin Login Successful', adminId: admin.id, role: admin.role_id });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const adminForgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(400).json({ message: 'Admin does not exist' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    await admin.update({ reset_token: token, reset_token_expiry: resetTokenExpiry });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `http://localhost:3000/admin/resetpassword/${token}`;
    await transporter.sendMail({
      to: email,
      subject: 'Admin Password Reset Request',
      text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
    });

    res.status(200).json({ message: 'Reset link sent' });
  } catch (error) {
    console.error('Admin forgot password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const adminResetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;

  try {
    const admin = await Admin.findOne({
      where: {
        reset_token: token,
        reset_token_expiry: { [Op.gt]: new Date() }
      }
    });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await admin.update({ password: hashedPassword, reset_token: null, reset_token_expiry: null });

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Admin reset password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
