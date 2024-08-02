import Schema from "../../database/index.js";
import mongoose from "mongoose";

const { Client, User, JobPost, Proposal, Contract, QbWallet ,Admin } = Schema
export const clientRepository = {
  createClient: async (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      job_role: data.job_role,
      isVerified: true
    }
    const client = await Client.create(userData)
    return client
  },

  findClientByEmail: async (email) => {
    const client = await Client.findOne({ email: email })
    return client
  },
  browseUsers: async (searchQuery) => {
    try {
      
      const query = {
          isUserProfile: true, 
      };

     
      if (searchQuery) {
          query.$or = [
              { jobTitle: { $regex: searchQuery, $options: 'i' } } 
          ];
      }

      const users = await User.find(query)
          .sort({ createdAt: -1 })
          .exec();

      return users;
    } catch (error) {
      console.error("Error in clientrepo: ", error);
      throw new Error('Failed to fetch users');
    }
  },
  createJobrequest: async (data, clientId) => {
    try {
      const jobPostData = {
        clientId: clientId,
        projectTerm: data.selectedItem,
        jobRole: data.jobRole,
        budgetType: data.budgetType,
        skills: data.skills,
        description: data.overviewInput,
      };

      if (data.budgetType === "fixed") {
        jobPostData.budget = data.budget;
      } else if (data.budgetType === "hourly") {
        jobPostData.wageRangeMin = data.wageRangeMin;
        jobPostData.wageRangeMax = data.wageRangeMax;
        jobPostData.selecthour = data.selecthour;
      }
      const jobPost = new JobPost(jobPostData);
      await jobPost.save();


      await Client.findByIdAndUpdate(
        clientId,
        { $push: { jobPosts: jobPost._id } },
        { new: true }
      );

      return jobPost;
    } catch (error) {
      console.error('Error creating job post:', error);
      throw error;
    }
  },
  browseJobapi: async (id) => {
    try {
      const jobdetails = await JobPost.findById(id).exec()
      return jobdetails
    } catch (error) {
      console.error('Error creating job post:', error);
      throw error;
    }
  },
  browseJobPostsapi: async (id,searchQuery) => {
    try {
     
      const query = { clientId: id };
  
    
      if (searchQuery) {
        query.jobRole = { $regex: searchQuery, $options: "i" }; 
      }
  
      
      const jobDetails = await JobPost.find(query).sort({ createdAt: -1 }).exec();
      return jobDetails;
    } catch (error) {
      console.error('Error creating job post:', error);
      throw error;
    }
  },
  browseProposals: async (jobId) => {
    try {
      const proposals = await Proposal.find({ jobId }).sort({ createdAt: -1 })
        .populate('freelancerId', 'name jobTitle skills profile')
        .exec();

      console.log(proposals, "fsdf");

      return proposals;
    } catch (error) {
      console.error('Error browsing job proposals:', error);
      throw error;
    }
  },
  shortList: async (proposalId) => {
    try {
      const proposal = await Proposal.findByIdAndUpdate(proposalId, { status: 'shortList' });

      if (!proposal) {
        throw new Error('Proposal not found');
      }

      return proposal;
    } catch (error) {
      console.error('Error shortlisting proposal:', error);
      throw error;
    }
  },
  unshortList: async (proposalId) => {
    try {
      const proposal = await Proposal.findByIdAndUpdate(proposalId, { status: 'pending' });

      if (!proposal) {
        throw new Error('Proposal not found');
      }

      return proposal;
    } catch (error) {
      console.error('Error unshortlisting proposal:', error);
      throw error;
    }
  },
  archiveList: async (proposalId) => {
    try {
      const proposal = await Proposal.findByIdAndUpdate(proposalId, { status: 'archived' });

      if (!proposal) {
        throw new Error('Proposal not found');
      }

      return proposal;
    } catch (error) {
      console.error('Error archiveList proposal:', error);
      throw error;
    }
  },
  unarchiveList: async (proposalId) => {
    try {
      const proposal = await Proposal.findByIdAndUpdate(proposalId, { status: 'pending' });

      if (!proposal) {
        throw new Error('Proposal not found');
      }

      return proposal;
    } catch (error) {
      console.error('Error archiveList proposal:', error);
      throw error;
    }
  },
  declineProposal: async (proposalId) => {
    try {
      const proposal = await Proposal.findByIdAndUpdate(proposalId, { status: 'rejected' }, { new: true });

      if (!proposal) {
        throw new Error('Proposal not found');
      }
      await JobPost.findByIdAndUpdate(proposal.jobId, { $pull: { proposals: proposalId } });
      return proposal;
    } catch (error) {
      console.error('Error declining proposal:', error);
      throw error;
    }
  },
  getProposalWithUserInfo: async (id) => {
    try {
      const proposal = await Proposal.findById(id).populate('freelancerId');

      if (!proposal) {
        throw new Error('Proposal not found');
      }
      return proposal
    } catch (error) {
      console.error('Error in  userproposal:', error);
      throw error;
    }
  },
  createContract: async (data) => {
    try {
      console.log(data,"wtttt");
      const {
        userId,client, proposalId, jobId,budgetType,contractAmount,contractTitle, paymentOption,contractDueDate,milestones,projectFile,projectStartDate,hoursOfWork,
      } = data
      const proposal = await Proposal.findById(proposalId);

   
      if (!proposal) {
        throw new Error(`Proposal with ID ${proposalId} not found`);
      }
  
   
      proposal.status = 'accepted';
      await proposal.save();
      const contractData = {
        userSide: {
          userId,
        },
        clientSide: {
          clientId: client,
        },
        proposalId,
        jobId,
        budgetType,
        contractTitle,
        contractAmount,
        paymentOption,
        projectFile,
        workDuration:hoursOfWork
      };


      if (budgetType === 'fixed') {
        if (paymentOption === 'fullPay') {
          contractData.contractDueDate = contractDueDate;
        } else if (paymentOption === 'milestones') {
          contractData.milestones = milestones;
        }
      } else if (budgetType === 'hourly') {
        contractData.projectStartDate = projectStartDate;
      }
      const newContract = new Contract(contractData);
      await newContract.save();

      return newContract
         
    } catch (error) {
      console.error('Error in  createContract:', error);
      throw error;
    }
  },
  saveAddress:async(data ,clientId)=>{
    try {
      const {address , city ,state , postal } =  data
      const updatedClient = await Client.findByIdAndUpdate(
        clientId,
        {
          Address: {
            address,
            city,
            state,
            postalCode:postal,
          },
        },
        { new: true } 
      );
      return updatedClient.Address
    } catch (error) {
      console.error('Error in  saveAddress:', error);
      throw error;
    }
  },
  browseContractapi: async (clientId,searchQuery) => {
    try {
     
      const query = { 'clientSide.clientId': clientId };
  
      if (searchQuery) {
        query.$or = [
          { 'contractTitle': { $regex: searchQuery, $options: 'i' } }
        ];
      }
      const contractDetails = await Contract.find(query)
        .sort({ createdAt: -1 })
        .populate('jobId')
        .exec();
  
      return contractDetails;
    } catch (error) {
      console.error('Error fetching job posts:', error);
      throw error;
    }
  },
  paymentafterEdit:async(id , data)=> {
    try {
      const contract = await Contract.findById(id).populate('userSide.userId clientSide.clientId jobId proposalId');
      if (!contract) {
        throw new Error('Contract not found');
      }
    
      contract.QwPayment = true;
      contract.QwId = data
      await contract.save();
    
    
      const notification = {
        proposalId: contract.proposalId,
        clientId: contract.clientSide.clientId,
        jobId: contract.jobId,
        contractId:id
      };
    
      const user = await User.findById(contract.userSide.userId);
      if (!user) {
        throw new Error('User not found');
      }
      user.notifications.push(notification);
      await user.save();
    
      return contract;
    } catch (error) {
      console.error('Error paymentafterEdit:', error);
      throw error;
    }
  },
  getContracinfo:async(id) => {
    try {
      const contract = await Contract.findById(id).populate('userSide.userId jobId proposalId');
      if (!contract) {
        throw new Error('User not found');
      }
      return contract
    } catch (error) {
      console.error('Error getContracinfo:', error);
      throw error;
    }
  },
  getuserInfo:async(id)=>{
    try {

        const client = await User.findOne({ _id:id.id });
        return client;
      } catch (error) {
        console.error('Error fetching user information:', error);
        throw error;
      }
    },
    paymentToWallet:async(data,clientId)=>{
      try {
       
        const { contractAmount, initiationfee, contractId } = data;
    
        if (typeof contractAmount !== 'number' || isNaN(contractAmount)) {
          throw new Error(`Invalid contractAmount: ${contractAmount}`);
        }
        if (typeof initiationfee !== 'number' || isNaN(initiationfee)) {
          throw new Error(`Invalid initiationfee: ${initiationfee}`);
        }
    
        let qbWallet = await QbWallet.findOne();
        if (!qbWallet) {
          qbWallet = new QbWallet();
          await qbWallet.save();
        }
    
        qbWallet.balance = (qbWallet.balance || 0) + contractAmount;
        qbWallet.transactions.push({
          amount: contractAmount,
          source: 'Payment received',
          contractId: contractId,
          ClientId: clientId,
          status: 'credit',
        });
    
        await qbWallet.save();
    
       
        let admin = await Admin.findOne();
        if (!admin) throw new Error('Admin not found');
    
        
        if (!admin.wallet) {
          admin.wallet = { balance: 0, transactions: [] };
        }
    
        
        if (isNaN(admin.wallet.balance)) {
          admin.wallet.balance = 0;
        }
        if (isNaN(initiationfee)) {
          throw new Error(`Invalid initiationfee: ${initiationfee}`);
        }
    
        admin.wallet.balance += initiationfee;
        admin.wallet.transactions.push({
          amount: initiationfee,
          source: 'Payment received',
          contractId: contractId,
          status: 'credit',
        });
    
        await admin.save();

        return qbWallet._id;

      } catch (error) {
        console.error('Error in  paymentToWallet', error);
        throw error; 
      }
    },
    browseSubmittedContract:async(searchQuery , userId)=>{
      try {
        
      } catch (error) {
        console.error(error);
      }
    }
}