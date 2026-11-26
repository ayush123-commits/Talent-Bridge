import {Company} from "../models/company.model.js";
import getDatauri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const {companyName} = req.body;
        if(!companyName) {
            return res.status(400).json({
                message: 'Company field is required',
                success: false
            })
        }
            let company = await Company.findOne({name: companyName})
            if(company){
                return res.status(400).json({
                    message: 'Company already exists',
                    success: false
                })
            }
            company = await Company.create({
                name: companyName,
                userId: req.id
            })
            res.status(200).json({
                message: 'Company registered successfully',
                company,
                success: true
            })
        }
        catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Incorrect login',
            error: error
        })
    }
}

export const getCompanies = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({userId});
        if(companies.length === 0){
            return res.status(200).json({
                message: 'No company found with this id',
                success: false
            })
        }
        res.status(200).json({
            companies,
            message: 'Companies sent successfully',
            success: true
        })


    }catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Company not found',
            success: false
        })
    }
}

// get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(400).json({
                message: 'No company found with this id',
                success: false
            })
        }

        return res.status(200).json({
            message: 'Company found with this id',
            company,
            success: true
        })
    }catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Company not found',
            success: false
        })
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;

        const updateData = {
            name,
            description,
            website,
            location,
        };

        // Cloudinary upload will work once the route uses singleUpload
        if (file) {
            const fileUri = getDatauri(file);

            const cloudResponse = await cloudinary.uploader.upload(
                fileUri.content
            );

            updateData.logo = cloudResponse.secure_url;
        }

        const company = await Company.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.id,
            },
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Company info updated successfully",
            company,
            success: true,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

