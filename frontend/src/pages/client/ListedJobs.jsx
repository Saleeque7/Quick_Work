import React, { useState } from "react";
import { FaBriefcase, FaFileAlt, FaUserCheck } from "react-icons/fa";
import Navbar from "../../components/main/Navbar";
import Footer from "../../components/main/footer";
import { Divider , Tooltip } from "@chakra-ui/react";
import { MdCurrencyRupee } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";


const Tabs = () => {
  const [activeTab, setActiveTab] = useState("ViewJob");
  const skills = [
    "HTML/CSS",
    "JavaScript",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Python",
    "Django",
    "SQL",
    "Git",
    "Bootstrap",
    "TypeScript",
    "Redux",
  ];
  return (
    <>
      <Navbar />
      <div className="flex justify-between items-center ">
        <div className="mt-4 pt-10 pl-32">
        <span className="text-teal-700 text-3xl">Node.js developer</span>
        </div>
       {activeTab === "ViewJob" && 
       <div className="mt-4 pt-10 pr-32">
        <Tooltip label="Edit" placement="bottom">
          <Link to="/client/edit">
          <span >
            <CiEdit className="w-6 h-6 text-gray-500 cursor-pointer" />
          </span>
          </Link>
        </Tooltip>
        </div>}
      </div>
      <div className="flex flex-col items-center p-10 pl-20 pr-20">
        <div className="w-full max-w-100%">
          <div className="relative right-0">
            <ul
              className="flex flex-wrap p-1 list-none rounded-xl bg-slate-300"
              role="list"
            >
              <li className="flex-auto text-center">
                <button
                  className={`flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 ${
                    activeTab === "ViewJob"
                      ? "bg-white text-teal-700"
                      : "bg-inherit"
                  }`}
                  onClick={() => setActiveTab("ViewJob")}
                  role="tab"
                  aria-selected={activeTab === "ViewJob"}
                  aria-controls="ViewJob"
                >
                  <FaBriefcase className="w-5 h-5 mr-1" />
                  <span className="ml-1">VIEW JOB POST</span>
                </button>
              </li>
              <li className="flex-auto text-center">
                <button
                  className={`flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 ${
                    activeTab === "message"
                      ? "bg-white text-teal-700"
                      : "bg-inherit"
                  }`}
                  onClick={() => setActiveTab("message")}
                  role="tab"
                  aria-selected={activeTab === "message"}
                  aria-controls="message"
                >
                  <FaFileAlt className="w-5 h-5 mr-1" />
                  <span className="ml-1">REVIEW PROPOSALS</span>
                </button>
              </li>
              <li className="flex-auto text-center">
                <button
                  className={`flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 ${
                    activeTab === "settings"
                      ? "bg-white text-teal-700"
                      : "bg-inherit"
                  }`}
                  onClick={() => setActiveTab("settings")}
                  role="tab"
                  aria-selected={activeTab === "settings"}
                  aria-controls="settings"
                >
                  <FaUserCheck className="w-5 h-5 mr-1" />
                  <span className="ml-1">HIRE</span>
                </button>
              </li>
            </ul>
            <div className="p-5">
              <div
                className={activeTab === "ViewJob" ? "block" : "hidden"}
                id="ViewJob"
                role="tabpanel"
              >
                <section className="p-1 ">
                  <div className="flex m-5 ">
                    posted
                    <span>1 day ago</span>
                  </div>
                  <Divider p={2} color={"gray.500"} opacity={1}></Divider>
                  <div className="flex m-5 ">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Beatae quas eveniet voluptas illum sapiente distinctio,
                      sequi dicta magni, eligendi consequatur ipsam laboriosam.
                      Quaerat repudiandae quis ducimus provident dolore aperiam
                      soluta! Incidunt possimus id odit fuga esse iure et quia
                      ut hic. Quo aperiam voluptatum atque! Repellat a quasi
                      laudantium illo assumenda aliquid voluptatum! Vel
                      exercitationem ipsa suscipit quasi sunt voluptatibus!
                    </p>
                  </div>
                  <Divider p={2} color={"gray.500"} opacity={1}></Divider>
                  <div className="m-5">
                    <div className="flex items-center">
                      <MdCurrencyRupee />
                      <span>2000</span>
                    </div>
                    <div>
                      <span>fixed-price</span>
                    </div>
                  </div>
                  <Divider p={2} color={"gray.500"} opacity={1}></Divider>
                  <div className="flex m-5 ">
                    Project type:
                    <span className="ml-2 font-bold text-gray-500">
                      Short term project
                    </span>
                  </div>
                  <Divider p={2} color={"gray.500"} opacity={1}></Divider>
                  <div className="flex m-5">
                    <h2 className="font-sans font-semibold text-md mb-3 ">
                      Skills and Expertise
                    </h2>
                  </div>
                  <div className="flex flex-wrap m-5">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="flex items-center font-sans bg-gray-100 text-sm p-2 px-4 text-gray-500 rounded-md mr-4 mb-4"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <Divider p={2} color={"gray.500"} opacity={1}></Divider>
                  <div className="flex m-5">
                    Proposals:
                    <span className="ml-2">10</span>
                  </div>
                </section>
              </div>
              <div
                className={activeTab === "message" ? "block" : "hidden"}
                id="message"
                role="tabpanel"
              >
              <section className="p-1 ">
              <div className="flex m-5 ">
                    posted
                    <span>1 day ago</span>
                  </div>
              </section>
              </div>
              <div
                className={activeTab === "settings" ? "block" : "hidden"}
                id="settings"
                role="tabpanel"
              >
                <p className="font-sans text-base antialiased font-light leading-relaxed text-inherit text-blue-gray-500">
                  Comparing yourself to others is the thief of joy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Tabs;
