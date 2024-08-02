import React, { useState, useEffect , useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Rating from "../../components/uic/Rating";
import { userAxiosInstance } from "../../utils/api/privateAxios";

import {
  findWorkapi,
  saveJobApi,
  unsaveJobApi,
  disLikeJobApi,
  LikeJobApi,
} from "../../utils/api/api";
import { FaSearch } from "react-icons/fa";
import { setUser } from "../../utils/Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { HiOutlineThumbDown, HiThumbDown } from "react-icons/hi";
import debounce from "lodash/debounce"; 

const FindWork = () => {
  const user = useSelector((state) => state.persisted.user.user);

  const userReviews = [2];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [DislikeJobs, setDislikeJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  const fetchJobs = useCallback(debounce(async (query) => {
    try {
      const response = await userAxiosInstance.get(`${findWorkapi}?search=${query}`);
      if(response.data){
        console.log("API response data:", response.data);
        setJobs(response.data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }, 500), []);

  useEffect(() => {
    fetchJobs(searchQuery);
  }, [searchQuery, fetchJobs]);

  // useEffect(() => {
  //   const fetchJob = async () => {
  //     try {
  //       const response = await userAxiosInstance.get(findWorkapi);
  //       console.log("API response data:", response.data);
  //       setJobs(response.data);
  //     } catch (error) {
  //       console.error("Error fetching jobs:", error);
  //     }
  //   };
  //   fetchJob();
  // }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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

  const handleSaveJob = async (jobId) => {
    try {
      const res = await userAxiosInstance.post(saveJobApi, { jobId });
      if (res.data) {
        console.log(res.data);
        dispatch(setUser(res.data));
        const savedJobIds = getSavedJobIds();
        setSavedJobs([...savedJobs, jobId]);
      }
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  const handleUnSaveJob = async (jobId) => {
    try {
      const res = await userAxiosInstance.post(unsaveJobApi, { jobId });
      if (res.data) {
        dispatch(setUser(res.data));
        const savedJobIds = getSavedJobIds();
        setSavedJobs(savedJobs.filter((id) => id !== jobId));
      }
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  const getSavedJobIds = () => {
    return user.savedJobs.map((job) => job.job);
  };

  const handleDislikeJob = async (jobId) => {
    try {
      const res = await userAxiosInstance.put(disLikeJobApi, { jobId });
      if (res.data) {
        dispatch(setUser(res.data));
        setDislikeJobs([...DislikeJobs, jobId]);
      }
    } catch (error) {
      console.error(error, "error in dislike job");
    }
  };

  const handleLikeJob = async (jobId) => {
    try {
      const res = await userAxiosInstance.put(LikeJobApi, { jobId });
      if (res.data) {
        dispatch(setUser(res.data));
        setDislikeJobs(DislikeJobs.filter((id) => id !== jobId));
      }
    } catch (error) {
      console.error(error, "error in like job");
    }
  };
  const savedJobIds = user.savedJobs.map((job) => job.job);
  const DislikedJobs = user.notInterestedJobs.map((job) => job.job);

  const filteredJobs = jobs.filter((job) =>
    job.jobRole.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="p-20 min-h-[80vh]">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center text-2xl px-8 font-semibold text-teal-800">
            Find Work That Matches You
          </div>

          <div className="flex items-center bg-white border border-gray-300 rounded-xl overflow-hidden w-1/2">
            <input
              aria-label="Search"
              placeholder="Search"
              type="search"
               value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 outline-none w-full rounded-l-xl"
            />
            <FaSearch className="text-gray-500 mx-2" />
          </div>
        </div>

      
        {Array.isArray(filteredJobs) &&
          filteredJobs.map((job, index) => (
            <>
              {!DislikedJobs.includes(job._id) ? (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-xl p-8 m-4  w-full "
                >
                  {isLoading ? (
                    <div className="h-5 bg-gray-200 mb-4 animate-pulse" />
                  ) : (
                    <p className="text-xs text-gray-500">
                      Posted: {timeAgo(job.createdAt)}
                    </p>
                  )}

                  <div className="flex justify-end items-center">
                    {!savedJobIds.includes(job._id) &&
                      !DislikedJobs.includes(job._id) && (
                        <button
                          className="text-teal-700 text-2xl mr-4"
                          aria-label="Not Interested"
                          onClick={() => handleDislikeJob(job._id)}
                        >
                          <HiOutlineThumbDown />
                        </button>
                      )}

                    {DislikedJobs.includes(job._id) && (
                      <button
                        className="text-teal-700 text-2xl mr-4"
                        aria-label="Interested"
                        onClick={() => handleLikeJob(job._id)}
                      >
                        <HiThumbDown />
                      </button>
                    )}

                    {!DislikedJobs.includes(job._id) &&
                      !savedJobIds.includes(job._id) && (
                        <button
                          className="text-teal-700 text-2xl mr-8"
                          aria-label="Save Job"
                          onClick={() => handleSaveJob(job._id)}
                        >
                          <IoBookmarkOutline />
                        </button>
                      )}

                    {savedJobIds.includes(job._id) && (
                      <button
                        className="text-teal-700 text-2xl mr-8"
                        aria-label="Unsave Job"
                        onClick={() => handleUnSaveJob(job._id)}
                      >
                        <IoBookmark />
                      </button>
                    )}
                  </div>

                  <div className="flex justify-start items-center mt-[-12px]">
                    {isLoading ? (
                      <div className="h-6 w-1/2 bg-gray-200 animate-pulse" />
                    ) : (
                      <p
                        className="text-xl font-bold text-teal-500 cursor-pointer"
                        onClick={() => navigate(`/user/JobProfile/${job._id}`)}
                      >
                        {job.jobRole}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-start items-center mt-3 mb-8">
                    {isLoading ? (
                      <div className="h-4 w-1/5 bg-gray-200 animate-pulse" />
                    ) : (
                      <div>
                        <p className="text-xs text-gray-500">
                          {job.projectTerm} -{" "}
                          {job.budgetType === "fixed"
                            ? `${job.budgetType} Price - ₹${job.budget}`
                            : `${job.budgetType} rate - ₹${job.wageRangeMin} to ${job.wageRangeMax}`}
                        </p>
                        {job.budgetType === "hourly" && (
                          <p className="text-xs text-gray-500 mt-1">
                            Estimated Time: {job.selecthour} hrs
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {isLoading ? (
                    <div className="h-30 bg-gray-200 animate-pulse" />
                  ) : (
                    <p className="text-md mb-4">{job.description}</p>
                  )}

                  <div className="flex justify-start items-center mt-2 flex-wrap">
                    {job.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center border border-gray-400 bg-gray-200 rounded-md m-2 px-4 py-2"
                      >
                        {isLoading ? (
                          <div className="h-4 w-10 bg-gray-200 animate-pulse" />
                        ) : (
                          skill
                        )}
                      </div>
                    ))}
                  </div>

                  {!isLoading && (
                    <Rating layout="JobCards" reviews={userReviews} />
                  )}
                  <div className="flex justify-start items-center mt-3">
                    {isLoading ? (
                      <div className="h-4 w-1/5 bg-gray-200 animate-pulse" />
                    ) : (
                      <p className="text-xs text-gray-500">Proposals: 20</p>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-xl p-8 m-4  w-full "
                >
                  {isLoading ? (
                    <div className="h-5 bg-gray-200 mb-4 animate-pulse" />
                  ) : (
                    <p className="text-xs text-gray-500">
                      Posted: {timeAgo(job.createdAt)}
                    </p>
                  )}
                  <div className="flex justify-end items-center">
                    {DislikedJobs.includes(job._id) && (
                      <button
                        className="text-teal-700 text-2xl mr-4"
                        aria-label="Interested"
                        onClick={() => handleLikeJob(job._id)}
                      >
                        <HiThumbDown />
                      </button>
                    )}
                  </div>
                  <div className="flex justify-start items-center mt-[-12px]">
                    {isLoading ? (
                      <div className="h-6 w-1/2 bg-gray-200 animate-pulse" />
                    ) : (
                      <p className="text-xl font-bold text-teal-500 cursor-pointer">
                        {job.jobRole}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          ))}
      </div>
    </>
  );
};

export default FindWork;
