import { User } from "../models/user.model.js"; // Adjust this path to your schema file
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDatauri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// ==========================================
// 1. REGISTER USER
// ==========================================
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        // Validation check for mandatory schema fields
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "A user with this email already exists.",
                success: false
            });
        }

        // Hash the password securely
        const hashedPassword = await bcrypt.hash(password, 10);

        // --- Process Profile Photo with Cloudinary ---
        const file = req.file; // Expecting single file upload middleware like upload.single('file')
        let profilePhotoUrl = "";

        if (file) {
            // Convert file buffer to DataURI payload
            const photoUri = getDatauri(file);

            // Upload directly to your user_profiles folder on Cloudinary
            const photoCloudResponse = await cloudinary.uploader.upload(photoUri.content, {
                folder: "user_profiles",
                transformation: [{ width: 150, height: 150, crop: "fill" }] // Matches your profile update sizing
            });

            profilePhotoUrl = photoCloudResponse.secure_url;
        }

        // Create the user matching your schema format
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: profilePhotoUrl // Will be the Cloudinary link or empty string if no file provided
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });

    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({
            message: "Internal server error during registration.",
            success: false
        });
    }
};
// ==========================================
// 2. LOGIN USER
// ==========================================
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }

        // Find user by unique email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            });
        }

        // Verify password validity
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            });
        }

        // Check if role matches selected option
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account does not exist with the selected role.",
                success: false
            });
        }

        // Generate Authentication Token payload
        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Clean user response data
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        // Send back cookie along with user data
        return res.status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
                httpsOnly: true,
                sameSite: 'strict'
            })
            .json({
                message: `Welcome back, ${user.fullname}`,
                user,
                success: true
            });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            message: "Internal server error during login.",
            success: false
        });
    }
};

// ==========================================
// 3. LOGOUT USER
// ==========================================
export const logout = async (req, res) => {
    try {
        return res.status(200)
            .cookie("token", "", { maxAge: 0 })
            .json({
                message: "Logged out successfully.",
                success: true
            });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({
            message: "Internal server error during logout.",
            success: false
        });
    }
};

// ==========================================
// 4. UPDATE PROFILE
// ==========================================
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const userId = req.id;

        // 1. Initial Validation
        if (!fullname || !email || !phoneNumber) {
            return res.status(400).json({
                message: "Name, email, and phone number cannot be left empty.",
                success: false
            });
        }

        // 2. Database Checks
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }

        if (email !== user.email) {
            const emailTaken = await User.findOne({ email });
            if (emailTaken) {
                return res.status(400).json({
                    message: "This email is already linked to another account.",
                    success: false
                });
            }
        }

        // 3. File Processing (Multer fields configuration handles req.files)
        const resumeFile = req.files?.file?.[0];
        const profilePhotoFile = req.files?.profilePhoto?.[0];

        // --- Process Profile Photo ---
        if (profilePhotoFile) {
            const photoUri = getDatauri(profilePhotoFile);

            // OPTIONAL: Cleanup old profile photo from Cloudinary
            if (user.profile.profilePhoto) {
                try {
                    const publicId = user.profile.profilePhoto.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(`user_profiles/${publicId}`);
                } catch (err) {
                    console.log("Old profile photo deletion skipped or failed:", err.message);
                }
            }

            const photoCloudResponse = await cloudinary.uploader.upload(photoUri.content, {
                folder: "user_profiles",
                transformation: [{ width: 150, height: 150, crop: "fill" }] // Optional sizing optimization
            });

            user.profile.profilePhoto = photoCloudResponse.secure_url;
        }

        // --- Process Resume PDF ---
        if (resumeFile) {
            const fileUri = getDatauri(resumeFile);

            // OPTIONAL: Cleanup old resume from Cloudinary
            if (user.profile.resume) {
                try {
                    const publicId = user.profile.resume.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(`user_resumes/${publicId}`);
                } catch (err) {
                    console.log("Old file deletion skipped or failed:", err.message);
                }
            }

            const resumeCloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "auto",
                folder: "user_resumes"
            });

            user.profile.resume = resumeCloudResponse.secure_url;
            user.profile.resumeOriginalName = resumeFile.originalname;
        }

        // 4. Map definitions & Update
        user.fullname = fullname;
        user.email = email;
        user.phoneNumber = phoneNumber;

        if (bio !== undefined) user.profile.bio = bio;

        if (skills !== undefined) {
            user.profile.skills = skills ? skills.split(",").map(skill => skill.trim()) : [];
        }

        await user.save();

        // 5. Response payload construction
        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            user: updatedUser,
            success: true
        });

    } catch (error) {
        console.error("Profile Update Error:", error);
        return res.status(500).json({
            message: "Internal server error during profile modification.",
            success: false
        });
    }
};