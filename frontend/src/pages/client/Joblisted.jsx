import { FaSearch } from "react-icons/fa";
import { useEffect, useState, useCallback } from "react";
import { FaTrashAlt, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { clientAxiosInstance } from "../../utils/api/privateAxios";
import { browseJobPostsApi, browseContracts,browseSubmittedApi } from "../../utils/api/api";
import { FaHourglassHalf, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import debounce from "lodash.debounce";

export default function Joblisted() {
  const [activeminTab, setActiveminTab] = useState("All Job Posts");
  const [jobs, setJob] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [submittedContract , setSubmittedContract] = useState([])
  const navigate = useNavigate();
  const [searchQueryContracts, setSearchQueryContracts] = useState("");
  const [searchQueryJobPosts, setSearchQueryJobPosts] = useState("");
  const [submittedContractsearchQuery, setSubmittedContractsearchQuery] = useState("");

  const fetchJob = async (query) => {
    try {
      const response = await clientAxiosInstance.get(browseJobPostsApi, { params: { searchQuery: query } });
      console.log(response.data);
      setJob(response.data);
    } catch (error) {
      console.error("Failed to fetch job details", error);
    }
  };

  const fetchContract = async (query) => {
    try {
      const response = await clientAxiosInstance.get(browseContracts, { params: { searchQuery: query } });
      console.log(response.data);
      setContracts(response.data);
    } catch (error) {
      console.error("Failed to fetch contract details", error);
    }
  };

  const fetchSubmitContract = async (query) =>{
    try {
      const response = await clientAxiosInstance.get(browseSubmittedApi, { params: { searchQuery: query } });
      console.log(response.data);
      setSubmittedContract(response.data);
    } catch (error) {
      console.error("Failed to fetch contract details", error);
    }
  };

  const handleFetchJob = useCallback(debounce((query) => fetchJob(query), 300), []);
  const handleFetchContract = useCallback(debounce((query) => fetchContract(query), 300), []);
  const handlesubmittedContract = useCallback(debounce((query) => fetchSubmitContract(query), 300), []);


  useEffect(() => {
    if (activeminTab === "All Job Posts") {
      handleFetchJob(searchQueryJobPosts);
    }

    if (activeminTab === "All Contracts") {
      handleFetchContract(searchQueryContracts);
    }
    if (activeminTab === "All submitted Contracts") {
      handlesubmittedContract(submittedContractsearchQuery);
    }
  }, [activeminTab, searchQueryJobPosts, searchQueryContracts,submittedContractsearchQuery, handleFetchJob, handleFetchContract ,handlesubmittedContract]);

  const timeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);

    if (seconds < 60) {
      return `${seconds}s ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes}m ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours}h ago`;
    } else {
      const today = now.setHours(0, 0, 0, 0);
      const yesterday = new Date(today - 86400000);

      if (date.getTime() >= today) {
        return "today";
      } else if (date.getTime() >= yesterday.getTime()) {
        return "yesterday";
      } else {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return date.toLocaleDateString(undefined, options);
      }
    }
  };

  const handleView = (id) => {
    navigate(`/client/listjobs/${id}`);
  };

  const handleContractView = (id) => {
    navigate(`/client/viewContract/${id}`);
  };

  return (
    <>
      <div className="p-10 min-h-[100vh]">
        <section className="p-1">
          <div className="flex justify-between items-center p-3">
            <nav>
              <ul className="flex">
                <li className="mr-4 font-semibold">
                  <button
                    className={`${
                      activeminTab === "All Job Posts"
                        ? "border-b-2 border-teal-500 text-teal-700 font-bold"
                        : "text-gray-500"
                    } px-2 py-1`}
                    onClick={() => setActiveminTab("All Job Posts")}
                  >
                    All Job Posts
                  </button>
                </li>
                <li className="mr-4 font-semibold">
                  <button
                    className={`${
                      activeminTab === "All Contracts"
                        ? "border-b-2 border-teal-500 text-teal-700 font-bold"
                        : "text-gray-500"
                    } px-2 py-1`}
                    onClick={() => setActiveminTab("All Contracts")}
                  >
                    All Contract Requests
                  </button>
                </li>
                <li className="mr-4 font-semibold">
                  <button
                    className={`${
                      activeminTab === "All submitted Contracts"
                        ? "border-b-2 border-teal-500 text-teal-700 font-bold"
                        : "text-gray-500"
                    } px-2 py-1`}
                    onClick={() => setActiveminTab("All submitted Contracts")}
                  >
                    All submitted Contracts 
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <hr className="w-full border-t-1 border-gray-500 mb-12" />
          {activeminTab === "All Job Posts" && (
            <div className="flex justify-between px-12 pb-5">
              <h1 className="text-3xl text-gray-700 font-bold">
                All Job Posts
              </h1>
              <button className="bg-teal-800 text-white px-3 py-2 rounded-xl hover:bg-green-600">
                <Link to={"/client/postJob"}>Post a new job</Link>
              </button>
            </div>
          )}
        </section>
        <div>
          {activeminTab === "All Job Posts" && (
            <section className="px-10">
              <div className="flex items-center bg-white border border-gray-300 rounded-xl mb-5 overflow-hidden w-1/2">
                <input
                  aria-label="Search"
                  placeholder="Search"
                  type="search"
                  value={searchQueryJobPosts}
                  onChange={(e) => setSearchQueryJobPosts(e.target.value)}
                  className="px-4 py-2 outline-none w-full rounded-l-xl"
                />
                <FaSearch className="text-gray-500 mx-2" />
              </div>
              {jobs.length > 0 ? (
                <div className="w-full mx-auto py-8">
                  {jobs.map((job) => (
                    <div
                      key={job._id}
                      className="flex justify-between items-center p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-md"
                    >
                      <div>
                        <h2
                          className="text-lg font-semibold cursor-pointer"
                          onClick={() => handleView(job._id)}
                        >
                          {job.jobRole}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {timeAgo(job.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          className="px-3 py-2 text-teal-500 rounded-md hover:bg-teal-600 hover:text-white focus:outline-none"
                          onClick={() => handleView(job._id)}
                        >
                          View Job <FaEye className="inline ml-1" />
                        </button>
                        <button className="text-red-500 hover:text-red-600 focus:outline-none">
                          <FaTrashAlt className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center mt-20">
                  <p className="text-start font-semibold text-xl text-orange-400">
                  You don't have any job posts yet
                  </p>
                  </div>
              )}
            </section>
          )}
        </div>
        {activeminTab === "All Contracts" && (
          <>
            {contracts.length > 0 ? (
              <section className="px-10">
                {activeminTab === "All Contracts" && (
                  <div className="flex justify-between pb-5">
                    <h1 className="text-3xl text-gray-700 font-bold">
                      All Job Contracts
                    </h1>
                  </div>
                )}
                <div className="flex items-center bg-white border border-gray-300 rounded-xl mb-5 overflow-hidden w-1/2">
                  <input
                    aria-label="Search"
                    placeholder="Search"
                    type="search"
                    value={searchQueryContracts}
                    onChange={(e) => setSearchQueryContracts(e.target.value)}
                    className="px-4 py-2 outline-none w-full rounded-l-xl"
                  />
                  <FaSearch className="text-gray-500 mx-2" />
                </div>
                <div className="w-full mx-auto py-8">
                  {contracts.map((contract) => (
                    <div
                      key={contract._id}
                      className="flex justify-between items-center p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-md"
                    >
                      <div className="cursor-pointer" onClick={() => handleContractView(contract._id)}>
                        <h2 className="text-lg font-semibold ">
                          {contract?.contractTitle || ""}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {timeAgo(contract?.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center mr-5 space-x-2">
                          {contract?.userSide?.status === "pending" ? (
                            <>
                              <FaHourglassHalf className="text-md text-yellow-500" />
                              <span className="text-yellow-500">Pending</span>
                            </>
                          ) : contract?.userSide?.status === "accepted" ? (
                            <>
                              <FaCheckCircle className="text-md text-green-500" />
                              <span className="text-green-500">Accepted</span>
                            </>
                          ) : contract?.userSide?.status === "rejected" ? (
                            <>
                              <FaTimesCircle className="text-md text-red-500" />
                              <span className="text-red-500">Rejected</span>
                            </>
                          ) : (
                            <span className="text-gray-700">
                              Unknown Status
                            </span>
                          )}
                        </div>
                        <button className="text-red-500 hover:text-red-600 focus:outline-none">
                          <FaTrashAlt className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : (
              <div className="flex justify-center">
                You don't have any contracts yet
              </div>
            )}
          </>
        )}
        {activeminTab === "All submitted Contracts" && (
          <>
              <section className="px-10">
                {activeminTab === "All submitted Contracts" && (
                  <div className="flex justify-between pb-5">
                    <h1 className="text-3xl text-gray-700 font-bold">
                    All submitted Contracts
                    </h1>
                  </div>
                 )} 
                <div className="flex items-center bg-white border border-gray-300 rounded-xl mb-5 overflow-hidden w-1/2">
                  <input
                    aria-label="Search"
                    placeholder="Search"
                    type="search"
                    value={submittedContractsearchQuery}
                    onChange={(e) => setSubmittedContractsearchQuery(e.target.value)}
                    className="px-4 py-2 outline-none w-full rounded-l-xl"
                  />
                  <FaSearch className="text-gray-500 mx-2" />
                </div>
            {submittedContract.length > 0 ? (

                <div className="w-full mx-auto py-8">
                  {submittedContract.map((contract) => (
                    <div
                      key={contract._id}
                      className="flex justify-between items-center p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-md"
                    >
                      <div className="cursor-pointer"
                      //  onClick={() => handleContractView(contract._id)}
                       >
                        <h2 className="text-lg font-semibold ">
                          {contract?.contractTitle || ""}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {timeAgo(contract?.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center mr-5 space-x-2">
                          {contract?.userSide?.status === "pending" ? (
                            <>
                              <FaHourglassHalf className="text-md text-yellow-500" />
                              <span className="text-yellow-500">Pending</span>
                            </>
                          ) : contract?.userSide?.status === "accepted" ? (
                            <>
                              <FaCheckCircle className="text-md text-green-500" />
                              <span className="text-green-500">Accepted</span>
                            </>
                          ) : contract?.userSide?.status === "rejected" ? (
                            <>
                              <FaTimesCircle className="text-md text-red-500" />
                              <span className="text-red-500">Rejected</span>
                            </>
                          ) : (
                            <span className="text-gray-700">
                              Unknown Status
                            </span>
                          )}
                        </div>
                        <button className="text-red-500 hover:text-red-600 focus:outline-none">
                          <FaTrashAlt className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                   ))}
                </div>
                    ) : ( 
                      <div className="flex justify-center">
                        You don't have any contracts that submited  yet
                      </div>
                     )} 
              </section>
         
          </>
        )}
      </div>
    </>
  );
}
