import ApiError from "../../utility/AppError";
import { User } from "../User/user.model"
import { IAuth } from "./auth.interface"
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import { createToken } from "./auth.utils";
import { config } from '../../config/config';
import { JwtPayload } from "jsonwebtoken";

const loginUser = async(payload: IAuth) => {
    const user = await User.findOne({ email: payload.email }).select("+password");
    if(!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User Not Found!");
    }
    if(user?.isDeleted) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "User is Deleted");
    }
    if(user?.status === 'blocked') {
        throw new ApiError(httpStatus.FORBIDDEN, "User is Blocked");
    }

    const isPassowrdMathced = await bcrypt.compare(payload.password, user.password);
    if(!isPassowrdMathced) {
        throw new ApiError(httpStatus.FORBIDDEN, "Passowrd did not matched!");
    }

    const jwtPayload = {
        userId: user._id.toString(),
        role: user.role
    }
    //generate access token
    const accessToken = createToken(
        jwtPayload, config.jwt_access_secret as string, config.jwt_access_expiresIn as string
    );
    ////generate refresh token
    const refreshToken = createToken(
        jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expiresIn as string
    )

    return {
        accessToken,
        refreshToken
    }
}
const changePassword = async (userData: JwtPayload, payload: {oldPassword: string, newPassword: string}) => {
    const user = await User.findById(userData.userId).select("+password");
    if(!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User Not Found!");
    }
    if(user?.isDeleted) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "User is Deleted");
    }
    if(user?.status === 'blocked') {
        throw new ApiError(httpStatus.FORBIDDEN, "User is Blocked");
    }

    const isPassowrdMathced = await bcrypt.compare(payload.oldPassword, user.password);
    if(!isPassowrdMathced) {
        throw new ApiError(httpStatus.FORBIDDEN, "Passowrd did not matched!");
    }

    const newHashPassword = await bcrypt.hash(payload.newPassword, Number(config.soltRound));
    
    const result = await User.findOneAndUpdate(
        {
            _id: userData.userId,
            role: userData.role
        },
        { password: newHashPassword }
    )

    return result;
}

export const AuthServices = {
    loginUser,
    changePassword
}