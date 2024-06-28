import {
  authRegisterUsecase,
  verifyotpUsecase,
  resendOtpUsecase,
  addProfileUseCase,
  addProfilesecUseCase,
  experienceUsecase,
  isUserprofileUseCase
} from "./user/index.js";
import { clientAuthUsecase } from "./clients/clientAuthUseCase.js";
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
