import { Request, Response, RequestHandler } from "express"
import { catchAsync } from "../../utility/cathcAsync"
import sendResponse from "../../utility/sendResponse"
import httpStatus from 'http-status'
import { AuthServices } from "./auth.service"
import { config } from '../../config/config'

const loginUser: RequestHandler = catchAsync(
    async(req: Request, res: Response): Promise<any> => {
        const result = await AuthServices.loginUser(req.body)
        const {  accessToken, refreshToken} = result;

        res.cookie("refreshToken", refreshToken, {
            secure: config.node_env == "production",
            httpOnly: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24 * 365 //1 year 
        });
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Login Successfull",
            data: { accessToken }
        })
    }
)

const changePassword: RequestHandler = catchAsync(
    async(req: Request, res: Response): Promise<any> => {
        const result = await AuthServices.changePassword(req.user, req.body)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Password Changed Successfully",
            data: null
        })
    }
)

export const AuthController = {
    loginUser,
    changePassword
}