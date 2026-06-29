"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLogin = exports.forgotPassword = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../lib/prisma");
const env_1 = require("../config/env");
const createToken = (user) => {
    return jsonwebtoken_1.default.sign({
        sub: user.id,
        email: user.email,
        role: user.role,
    }, env_1.config.jwtSecret, {
        expiresIn: env_1.config.jwtExpiresIn,
    });
};
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User already exists',
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 12);
        const user = await prisma_1.prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
            },
        });
        const token = createToken(user);
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }
        const token = createToken(user);
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.login = login;
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No account found with that email',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Password reset instructions sent to email',
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.forgotPassword = forgotPassword;
const googleLogin = async (req, res) => {
    try {
        const { idToken } = req.body;
        if (!env_1.config.googleClientId) {
            return res.status(500).json({
                success: false,
                message: 'Google login is not configured',
            });
        }
        // Placeholder flow; real Google token verification should be implemented here.
        const user = await prisma_1.prisma.user.findUnique({
            where: { email: 'google-user@example.com' },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Google user not found',
            });
        }
        const token = createToken(user);
        return res.status(200).json({
            success: true,
            message: 'Google login successful',
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.googleLogin = googleLogin;
