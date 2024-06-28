import { config } from "../../config/config";
const API_URL = config.API_URL
const USER_API_URL = config.USER_API_URL
const ADMIN_API_URL = config.ADMIN_API_URL

export const refreshTokenAPI = `${API_URL}/refresh`
export const addprofileApi = `${USER_API_URL}/addProfile`
export const addprofilesecApi = `${USER_API_URL}/addProfilesec`
export const addExperienceApi = `${USER_API_URL}/experience`
export const isUserprofileApi = `${USER_API_URL}/isUserprofileApi`
export const getDataApi = `${USER_API_URL}/getData`
export const collectUserDataApi = `${ADMIN_API_URL}/userData`
export const SearchInfoApi = `${ADMIN_API_URL}/search?search:`
export const collectClientsDataApi = `${ADMIN_API_URL}/clientData`
export const blockUserApi = `${ADMIN_API_URL}/blockUser`
export const unblockUserApi = `${ADMIN_API_URL}/unblockUser`
export const blockClientApi = `${ADMIN_API_URL}/blockClient`
export const unblockClientApi = `${ADMIN_API_URL}/unblockClient`