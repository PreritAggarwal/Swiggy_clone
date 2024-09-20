// controllers/adminAuthController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel';
import { validatePassword } from '../utils/validatePassword';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const adminSignup = async (req: Request, res: Response) => {
  console.log(req);
  const { email, password } = req.body;
  console.log(req.body ,"ok tets")

  try {
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Password does not meet complexity requirements' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword ,"clear");
    await Admin.create({ email, password: hashedPassword });
    

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Admin signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      console.log(password,isValidPassword,admin.password,"test case 2");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Admin Login Succesfull' ,adminId: admin.id });
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
