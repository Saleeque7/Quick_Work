import crypto from 'crypto';
import config from '../../../config/config.js';

export const verifypaymentuseCase = (dependencies) => {

  const execute = async (razorpayPaymentId, razorpayOrderId, razorpaySignature) => {
    try {
      const sign = razorpayOrderId + "|" + razorpayPaymentId;
      const shasum = crypto.createHmac("sha256", config.RAZORPAY_SECRET_KEY);
      shasum.update(sign.toString());
      const digest = shasum.digest("hex");
      return digest === razorpaySignature;
    } catch (error) {
      console.error("Error in verifypaymentuseCase:", error);
      throw error;
    }
  };
  return { execute };
};