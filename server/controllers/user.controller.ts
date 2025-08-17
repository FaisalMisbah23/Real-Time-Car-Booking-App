require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import twilio from "twilio";
import prisma from "../utils/prisma";
import jwt from "jsonwebtoken";
import { nylas } from "../app";
import { sendToken } from "../utils/send-token";

const accountSid = process.env.TWILIO_Account_SID;
const authToken = process.env.TWILIO_Auth_Token;
const client = twilio(accountSid, authToken, {
  lazyLoading: true,
});

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phone_number } = req.body;
    console.log("🚀 ~ registerUser ~ phone_number:", phone_number);

    try {
      await client.verify.v2
        ?.services(process.env.TWILIO_Service_SID!)
        .verifications.create({
          channel: "sms",
          to: phone_number,
        });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
      });
    }

    res.status(201).json({
      success: true,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
    });
  }
};

export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phone_number, otp } = req.body;

    try {
      await client.verify.v2
        .services(process.env.TWILIO_Service_SID!)
        .verificationChecks.create({
          to: phone_number,
          code: otp,
        });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Something went wrong!",
      });
    }

    // is user exist
    const isUserExist = await prisma.user.findUnique({
      where: {
        phone_number: phone_number,
      },
    });

    if (isUserExist) {
      await sendToken(isUserExist, res);
    } else {
      // create account
      const user = await prisma.user.create({
        data: {
          phone_number: phone_number,
        },
      });

      res.status(200).json({
        success: true,
        message: "OTP verified successfully!",
        user: user,
      });
    }
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
    });
  }
};

export const sendingOtpToEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, userId } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const user = {
      userId,
      name,
      email,
    };
    const token = jwt.sign(
      {
        user,
        otp,
      },
      process.env.EMAIL_ACTIVATION_SECRET!,
      {
        expiresIn: "5m",
      }
    );

    try {
      await nylas.messages.send({
        identifier: process.env.USER_GRANT_ID!,
        requestBody: {
          to: [{ name: name, email: email }],
          subject: "Verify your email address!",
          body: `
          <p>Hi ${name},</p>
      <p>Your Ridewave verification code is ${otp}. If you didn't request for this OTP, please ignore this email!</p>
      <p>Thanks,<br>Ridewave Team</p>
          `,
        },
      });
    } catch (error) {
      console.log(error);
    }
    res.status(201).json({
      success: true,
      token,
      otp,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
    });
  }
};

export const verifyingEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { otp, token } = req.body;

    const newUser: any = jwt.verify(
      token,
      process.env.EMAIL_ACTIVATION_SECRET!
    );

    if (newUser.otp !== otp) {
      return res.status(400).json({
        success: true,
        message: "OTP is not correct or expired!",
      });
    }

    const { name, email, userId } = newUser.user;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user?.email === null) {
      const updateUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: name,
          email: email,
        },
      });

      await sendToken(updateUser, res);
    }
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Your opt is expired!",
    });
  }
};

export const getLoggedInUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
    });
  }
};
