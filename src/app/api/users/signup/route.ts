import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) { 
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody;

        console.log(reqBody);

        // Check if user already exists
        const user = await User.findOne({ email })
        if (user) { 
            return NextResponse.json({ error: "User already exists", status: 400 });
        }

        // Hash password 
        const salt = await bcryptjs.genSalt(10);
        const hashpassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashpassword
        })

        const saveUser = await newUser.save()
        console.log(saveUser);

        // send verification email notification
        await sendEmail({email, emailType: "VERIFY", userId:saveUser._id})

        return NextResponse.json({
            message: "User created successfully!",
            success: true,
            saveUser
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message, status: 500 })
    }
}