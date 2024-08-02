export const paymentAfterUsecase = (dependencies) => {
  const { repositories: { clientRepository: { paymentafterEdit, paymentToWallet } } } = dependencies;
  const execute = async (id, walletInfo, clientId) => {
    try {
      const res = await paymentToWallet(walletInfo, clientId);
      if (res) {
        const result = await paymentafterEdit(id, res);
        return result;
      }
    } catch (error) {
      console.error('Error in paymentAfterUsecase', error);
      throw error;
    }
  };
  return { execute };
};
