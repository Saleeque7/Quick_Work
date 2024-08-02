import express from 'express'
import { clientController } from '../../libs/controllers/index.js'
import { verifyToken, requireRole } from '../../libs/utils/middleWare.js/authMiddleWare.js'
import { uploadDocument } from '../../libs/utils/multer/multer.js'
import { chatController } from '../../libs/controllers/index.js'

export default (dependencies) => {
  const {
    clientAuthController,
    browseUsersController,
    jobSubmitController,
    browseJobController,
    browseJobPostsController,
    browseJobProposalsController,
    shortListJobProposalsController,
    unshortListJobProposalsController,
    archiveJobProposalsController,
    unarchiveJobProposalsController,
    declineJobProposalsController,
    offerLetterController,
    createContractController,
    saveAddressController,
    paymentController,
    verifypaymentController,
    browseContractsController,
    paymentAfterController,
    getContractController,
    getuserInfoController,
    submittedContractController
  } = clientController(dependencies);

  const { createChatcontroller , getChatController ,findchatController , messageController , getmessageController } = chatController(dependencies)



  const router = express.Router()
  router.post('/register', clientAuthController)
  router.get('/browseUsers', verifyToken, requireRole('client'), browseUsersController)
  router.post('/jobSubmit', verifyToken, requireRole('client'), jobSubmitController)
  router.get('/browseJob', verifyToken, requireRole('client'), browseJobController)
  router.get('/browseJobposts', verifyToken, requireRole('client'), browseJobPostsController)
  router.get('/browseJobProposals', verifyToken, requireRole('client'), browseJobProposalsController)
  router.put('/shortListJobProposals', verifyToken, requireRole('client'), shortListJobProposalsController)
  router.put('/unshortListJobProposals', verifyToken, requireRole('client'), unshortListJobProposalsController)
  router.put('/archiveJobProposals', verifyToken, requireRole('client'), archiveJobProposalsController)
  router.put('/unarchiveJobProposals', verifyToken, requireRole('client'), unarchiveJobProposalsController)
  router.put('/declineJobProposals', verifyToken, requireRole('client'), declineJobProposalsController)
  router.get('/browseOfferletter', verifyToken, requireRole('client'), offerLetterController)
  router.post('/createContract', uploadDocument.single("projectFile"), verifyToken, requireRole('client'), createContractController)
  router.post('/saveAddress', verifyToken, requireRole('client'), saveAddressController)
  router.post('/payment', verifyToken, requireRole('client'), paymentController)
  router.post('/verifypayment', verifyToken, requireRole('client'), verifypaymentController)
  router.get('/contracts', verifyToken, requireRole('client'), browseContractsController)
  router.post('/paymentAfter', verifyToken, requireRole('client'), paymentAfterController)
  router.get('/getContract', verifyToken, requireRole('client'), getContractController)
  router.get('/getuserInfo', verifyToken, requireRole('client'), getuserInfoController)
  router.get('/submittedContract', verifyToken, requireRole('client'), submittedContractController)

  router.post('/createChat', verifyToken, requireRole('client'), createChatcontroller)
  router.get('/browseChat',verifyToken ,requireRole('client'),getChatController)
  router.get('/getclientmessage',verifyToken ,requireRole('client'),getmessageController)
  router.post('/addclientmessage',verifyToken ,requireRole('client'),messageController)



  return router
}