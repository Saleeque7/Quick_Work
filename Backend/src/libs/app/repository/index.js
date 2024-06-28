import repository from './repositories/userRepository.js';
import { clientRepository } from './repositories/clientRepository.js';
import { loginRepository } from './repositories/loginRepository.js';
import { adminRepository } from './repositories/adminRepository.js';
export const repositories = {
    repository,
    clientRepository,
    loginRepository,
    adminRepository
};


