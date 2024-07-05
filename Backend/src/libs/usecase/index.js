import {
  authRegisterUsecase,
  verifyotpUsecase,
  resendOtpUsecase,
  addProfileUseCase,
  addProfilesecUseCase,
  experienceUsecase,
  isUserprofileUseCase,
  getJobPostUsecase
} from "./user/index.js";


import {clientAuthUsecase , browseUsersUsecase ,jobSubmitUseCase,} from './clients/index.js'

import {
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
  gitLoginUsecase
} from "./login/index.js";

import { adminAuthuseCase, registerUsecase, getUserDataUseCase, getClientDataUseCase, blockUserUseCase, unblockUserUseCase ,  blockclientUseCase,
  unblockclientUseCase } from "./admin/index.js";

export {
  /*user*/
  authRegisterUsecase,
  verifyotpUsecase,
  resendOtpUsecase,
  addProfileUseCase,
  addProfilesecUseCase,
  experienceUsecase,
  isUserprofileUseCase,
  getJobPostUsecase,

  /*client*/
  clientAuthUsecase,
  browseUsersUsecase,
  jobSubmitUseCase,

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
