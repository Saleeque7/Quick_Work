import { repositories } from "../libs/app/repository/index.js";
import config from '../config/config.js'

import {
  /*user*/
  authRegisterUsecase,
  verifyotpUsecase,
  resendOtpUsecase,
  addProfileUseCase,
  addProfilesecUseCase,
  experienceUsecase,

  /*client*/
  clientAuthUsecase,


  /*login*/
  loginUsecase,
  forgotPasswordUseCase,
  forgotVerifyOtpUseCase,
  otpResendOtpuseCase,
  resetPasswordUsecase,
  refreshTokenuseCase,
  googleSinUpVerifyUsecase,
  googleLoginUseCase,
  gitHubUsecase,
  gitUserInfoUsecase,
  gitLoginUsecase,
  isUserprofileUseCase,

  /*admin*/
  adminAuthuseCase,
  registerUsecase,
  getUserDataUseCase,
  getClientDataUseCase,
  blockUserUseCase,
  unblockUserUseCase,
  blockclientUseCase,
  unblockclientUseCase
} from "../libs/usecase/index.js";

const use_case = {
  /*user*/
  authRegisterUsecase,
  verifyotpUsecase,
  resendOtpUsecase,
  addProfileUseCase,
  addProfilesecUseCase,
  experienceUsecase,
  isUserprofileUseCase,

  /*client*/
  clientAuthUsecase,

  /*login*/
  loginUsecase,
  forgotPasswordUseCase,
  forgotVerifyOtpUseCase,
  otpResendOtpuseCase,
  resetPasswordUsecase,
  refreshTokenuseCase,
  googleSinUpVerifyUsecase,
  googleLoginUseCase,
  gitHubUsecase,
  gitUserInfoUsecase,
  gitLoginUsecase,

  /*admin*/
  adminAuthuseCase,
  registerUsecase,
  getUserDataUseCase,
  getClientDataUseCase,
  blockUserUseCase,
  unblockUserUseCase,
  blockclientUseCase,
  unblockclientUseCase
};

export default { use_case, repositories, config };
