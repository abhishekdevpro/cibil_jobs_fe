// import React, { useContext, useState } from "react";
// import FormButton from "./FormButton";
// import axios from "axios";
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css"; // Import Quill CSS for styling
// import { ResumeContext } from "../context/ResumeContext";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// const WorkExperience = () => {
//   const { resumeData, setResumeData } = useContext(ResumeContext);

//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [summaries, setSummaries] = useState([]); // Store key achievements
//   const [selectedSummaries, setSelectedSummaries] = useState([]); // Store selected key achievements
//   const [showPopup, setShowPopup] = useState(false); // Popup visibility state
//   const [popupIndex, setPopupIndex] = useState(null); // Store index of the work experience entry being edited
//   const token = localStorage.getItem("token");

//   // Month and Year Dropdown options
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   const years = Array.from({ length: 40 }, (_, index) => 1980 + index); // Adjust the range as needed

//   const handleWorkExperience = (e, index) => {
//     const newWorkExperience = [...resumeData.workExperience];
//     newWorkExperience[index][e.target.name] = e.target.value;
//     setResumeData({ ...resumeData, workExperience: newWorkExperience });
//   };

//   const addWorkExperience = () => {
//     setResumeData({
//       ...resumeData,
//       workExperience: [
//         ...resumeData.workExperience,
//         {
//           company: "",
//           position: "",
//           description: "",
//           keyAchievements: "",
//           startYear: "",
//           startMonth: "",
//           endYear: "",
//           endMonth: "",
//           location: "",
//         },
//       ],
//     });
//   };

//   const removeWorkExperience = (index) => {
//     const newWorkExperience = [...resumeData.workExperience];
//     newWorkExperience[index] = newWorkExperience[newWorkExperience.length - 1];
//     newWorkExperience.pop();
//     setResumeData({ ...resumeData, workExperience: newWorkExperience });
//   };

//   const handleAIAssist = async (index) => {
//     setIsLoading(true);
//     setError("");
//     try {
//       const response = await axios.post(
//         "https://api.resumeintellect.com/api/jobseeker/ai-resume-profexp-data",
//         {
//           key: "professional_experience",
//           keyword:
//             "Generate professional summary and Checklist of professional experience in manner of content and information",
//           content: resumeData.workExperience[index].position,
//           company_name: resumeData.workExperience[index].company,
//           job_title: resumeData.workExperience[index].position,
//           location: resumeData.workExperience[index].location,
//         },
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );

//       handleWorkExperience(
//         {
//           target: {
//             name: "description",
//             value: response.data.data.resume_analysis.professional_summary,
//           },
//         },
//         index
//       );

//       setSummaries(response.data.data.resume_analysis.responsibilities); // Save key achievements
//       setPopupIndex(index); // Store the index of the work experience entry being edited
//       setShowPopup(true); // Show the popup for key achievements selection
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyAchievementSelect = (achievement) => {
//     const isSelected = selectedSummaries.includes(achievement);
//     if (isSelected) {
//       // Deselect the achievement
//       setSelectedSummaries(
//         selectedSummaries.filter((item) => item !== achievement)
//       );
//     } else {
//       // Add to selected achievements
//       setSelectedSummaries([...selectedSummaries, achievement]);
//     }
//   };

//   const handleSaveSelectedAchievements = (index, e) => {
//     e.preventDefault(); // Prevent page refresh

//     const newWorkExperience = [...resumeData.workExperience];
//     newWorkExperience[index].keyAchievements = selectedSummaries.join("\n"); // Save selected achievements
//     setResumeData({
//       ...resumeData,
//       workExperience: newWorkExperience,
//     });

//     setShowPopup(false); // Close the popup
//   };

//   return (
//     <div className="flex-col-gap-3 w-full mt-10 px-10">
//       <h2 className="input-title text-white text-3xl">Work Experience</h2>
//       {resumeData.workExperience.map((workExperience, index) => (
//         <div key={index} className="f-col">
//           <label className="mt-2 text-white">Company</label>
//           <input
//             type="text"
//             placeholder="Company"
//             name="company"
//             className="w-full other-input border-black border"
//             value={workExperience.company}
//             onChange={(e) => handleWorkExperience(e, index)}
//           />
//           <label className="mt-2 text-white">Job Title</label>
//           <input
//             type="text"
//             placeholder="Job Title"
//             name="position"
//             className="w-full other-input border-black border"
//             value={workExperience.position}
//             onChange={(e) => handleWorkExperience(e, index)}
//           />
//           <div className="">
//             <label className="mt-2 text-white">Start Date</label>
//             <div className="flex-wrap-gap-2">
//               <select
//                 name="startMonth"
//                 className="other-input border-black border flex-1"
//                 value={workExperience.startMonth}
//                 onChange={(e) => handleWorkExperience(e, index)}
//               >
//                 {months.map((month, idx) => (
//                   <option key={idx} value={month}>
//                     {month}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 name="startYear"
//                 className="other-input border-black border flex-1"
//                 value={workExperience.startYear}
//                 onChange={(e) => handleWorkExperience(e, index)}
//               >
//                 {years.map((year, idx) => (
//                   <option key={idx} value={year}>
//                     {year}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <label className="mt-2 text-white">End Date</label>
//             <div className="flex-wrap-gap-2">
//               <select
//                 name="endMonth"
//                 className="other-input border-black border flex-1"
//                 value={workExperience.endMonth}
//                 onChange={(e) => handleWorkExperience(e, index)}
//               >
//                 {months.map((month, idx) => (
//                   <option key={idx} value={month}>
//                     {month}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 name="endYear"
//                 className="other-input border-black border flex-1"
//                 value={workExperience.endYear}
//                 onChange={(e) => handleWorkExperience(e, index)}
//               >
//                 {years.map((year, idx) => (
//                   <option key={idx} value={year}>
//                     {year}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <label className="mt-2 text-white">Location</label>
//           <input
//             type="text"
//             placeholder="Location"
//             name="location"
//             className="w-full other-input border-black border"
//             value={workExperience.location}
//             onChange={(e) => handleWorkExperience(e, index)}
//           />

//           <div className="flex justify-between mb-2">
//             <label className="mt-2 text-white">Description</label>
//             <button
//               type="button"
//               className="border bg-black text-white px-3 rounded-3xl"
//               onClick={() => handleAIAssist(index)}
//               disabled={isLoading}
//             >
//               {isLoading ? "Loading..." : "+ Smart Assist"}
//             </button>
//           </div>
//           <ReactQuill
//             placeholder="Description"
//             className="w-full other-input border-black border h-100"
//             value={workExperience.description}
//             onChange={(value) =>
//               handleWorkExperience(
//                 { target: { name: "description", value } },
//                 index
//               )
//             }
//             theme="snow"
//             modules={{
//               toolbar: [["bold", "italic", "underline"], ["clean"]],
//             }}
//           />

//           <label className="mt-2 text-white">Key Achievements</label>
//           <textarea
//             type="text"
//             placeholder="Key Achievements"
//             name="keyAchievements"
//             className="w-full other-input border-black border h-40"
//             value={workExperience.keyAchievements}
//             onChange={(e) => handleWorkExperience(e, index)}
//           />
//         </div>
//       ))}
//       <FormButton
//         size={resumeData.workExperience.length}
//         add={addWorkExperience}
//         remove={removeWorkExperience}
//       />

//       {/* Popup for Key Achievements */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg">
//             <h3 className="text-xl font-bold mb-4">Select Key Achievements</h3>
//             <div className="space-y-3 max-h-96 overflow-y-auto">
//               {summaries.map((summary, index) => (
//                 <div key={index} className="flex items-start gap-3">
//                   <input
//                     type="checkbox"
//                     checked={selectedSummaries.includes(summary)}
//                     onChange={() => handleKeyAchievementSelect(summary)}
//                     className="mt-1"
//                   />
//                   <p className="text-gray-800">{summary}</p>
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={(e) => handleSaveSelectedAchievements(popupIndex, e)} // Pass the index of the work experience
//               className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
//             >
//               Save Selected Achievements
//             </button>
//             <button
//               onClick={() => setShowPopup(false)}
//               className="mt-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-300"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WorkExperience;

// // import { ResumeContext } from "../context/ResumeContext";
// // import FormButton from "./FormButton";
// // import React, { useContext, useState } from "react";
// // import { AlertCircle, X } from "lucide-react";

// // const WorkExperience = () => {
// //   const { resumeData, setResumeData, resumeStrength } = useContext(ResumeContext);
// //   const [activeTooltip, setActiveTooltip] = useState(null);

// //   const handleWorkExperience = (e, index) => {
// //     const { name, value } = e.target;
// //     const newWorkExperience = [...resumeData.workExperience];
// //     newWorkExperience[index][name] = value;
// //     setResumeData({ ...resumeData, workExperience: newWorkExperience });
// //   };

// //   const months = [
// //     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
// //     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
// //   ];

// //   const years = Array.from(
// //     { length: 50 },
// //     (_, i) => new Date().getFullYear() - i
// //   );

// //   const handleMonthChange = (e, index, field) => {
// //     const newWorkExperience = [...resumeData.workExperience];
// //     const currentDate = newWorkExperience[index][field] || "Jan,2024";
// //     const [_, year] = currentDate.split(",");
// //     newWorkExperience[index][field] = `${e.target.value},${year || ""}`;
// //     setResumeData({ ...resumeData, workExperience: newWorkExperience });
// //   };

// //   const handleYearChange = (e, index, field) => {
// //     const newWorkExperience = [...resumeData.workExperience];
// //     const currentDate = newWorkExperience[index][field] || "Jan,2024";
// //     const [month, _] = currentDate.split(",");
// //     newWorkExperience[index][field] = `${month || ""},${e.target.value}`;
// //     setResumeData({ ...resumeData, workExperience: newWorkExperience });
// //   };

// //   const addWorkExperience = () => {
// //     setResumeData({
// //       ...resumeData,
// //       workExperience: [
// //         ...resumeData.workExperience,
// //         {
// //           company: "",
// //           position: "",
// //           startYear: "Jan,2024",
// //           endYear: "Dec,2024",
// //           location: "",
// //           descriptionDetails: "",
// //           KeyAchievements: "",
// //         },
// //       ],
// //     });
// //   };

// //   const removeWorkExperience = (index) => {
// //     const newWorkExperience = [...resumeData.workExperience];
// //     newWorkExperience.splice(index, 1);
// //     setResumeData({ ...resumeData, workExperience: newWorkExperience });
// //   };

// //   const hasErrors = (index, field) => {
// //     const workStrength = resumeStrength?.work_experience_strenght?.[index];
// //     return workStrength && Array.isArray(workStrength[field]) && workStrength[field].length > 0;
// //   };

// //   const getErrorMessages = (index, field) => {
// //     const workStrength = resumeStrength?.work_experience_strenght?.[index];
// //     return workStrength && Array.isArray(workStrength[field]) ? workStrength[field] : [];
// //   };
// //   const handleSearchChange = async (e) => {
// //     const value = e.target.value;
// //     setSearchValue(value);
// //     if (e.key === 'Enter' && value.length > 2) {
// //       setIsLoading(true);
// //       try {
// //         const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_GENAI_API_KEY);
// //         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// //         const result = await model.generateContent(value);
// //         const response = result.response;
// //         const responsibilities = response.text().split('\n').filter(line => line.trim() !== '');
// //         setSearchResults(responsibilities);
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     } else {
// //       setSearchResults([]);
// //     }
// //   };

// //   const handleDescriptionChange = (value, index) => {
// //     handleWorkExperience({ target: { name: 'description', value } }, index);
// //   };

// //   const handleSearchResultSelect = (result, index) => {
// //     const currentDescription = resumeData.workExperience[index].description || '';
// //     const newDescription = currentDescription ? `${currentDescription}\n${result}` : result;
// //     handleDescriptionChange(newDescription, index);
// //     setSearchValue('');
// //     setSearchResults([]);
// //   };

// //   const handleAssistClick = (e, index) => {
// //     e.preventDefault();
// //     handleSearchChange({ target: { value: searchValue }, key: 'Enter' });
// //   };

// //   return (
// //     <div className="flex-col gap-3 w-full mt-10 px-10">
// //       <h2 className="input-title text-white text-3xl">Work Experience</h2>

// //       {resumeData.workExperience.map((experience, index) => (
// //         <div key={index} className="f-col">
// //           <div className="relative mb-4">
// //           {/* <button
// //               type="button"
// //               className="border bg-black text-white px-3 rounded-3xl"
// //               onClick={(e) => handleAssistClick(e, index)}
// //             >
// //               + AI Assist
// //             </button> */}
// //             <input
// //               type="text"
// //               placeholder="Company"
// //               name="company"
// //               className={`w-full other-input border ${
// //                 hasErrors(index, 'company') ? 'border-red-500' : 'border-black'
// //               }`}
// //               value={experience.company}
// //               onChange={(e) => handleWorkExperience(e, index)}
// //             />
// //             {hasErrors(index, 'company') && (
// //               <button
// //                 type="button"
// //                 className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
// //                 onClick={() => setActiveTooltip(activeTooltip === `company-${index}` ? null : `company-${index}`)}
// //               >
// //                 <AlertCircle className="w-5 h-5" />
// //               </button>
// //             )}
// //             {activeTooltip === `company-${index}` && (
// //               <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
// //                 <div className="p-4 border-b border-gray-700">
// //                   <div className="flex items-center justify-between">
// //                     <div className="flex items-center space-x-2">
// //                       <AlertCircle className="w-5 h-5 text-red-400" />
// //                       <span className="font-medium text-black">Company Suggestions</span>
// //                     </div>
// //                     <button
// //                       onClick={() => setActiveTooltip(null)}
// //                       className="text-black  transition-colors"
// //                     >
// //                       <X className="w-5 h-5" />
// //                     </button>
// //                   </div>
// //                 </div>
// //                 <div className="p-4">
// //                   {getErrorMessages(index, 'company').map((msg, i) => (
// //                     <div key={i} className="flex items-start space-x-3 mb-3 last:mb-0">
// //                       <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
// //                       <p className="text-black text-sm">{msg}</p>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           <div className="relative mb-4">
// //             <input
// //               type="text"
// //               placeholder="Position"
// //               name="position"
// //               className={`w-full other-input border ${
// //                 hasErrors(index, 'position') ? 'border-red-500' : 'border-black'
// //               }`}
// //               value={experience.position}
// //               onChange={(e) => handleWorkExperience(e, index)}
// //             />
// //             {hasErrors(index, 'position') && (
// //               <button
// //                 type="button"
// //                 className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
// //                 onClick={() => setActiveTooltip(activeTooltip === `position-${index}` ? null : `position-${index}`)}
// //               >
// //                 <AlertCircle className="w-5 h-5" />
// //               </button>
// //             )}
// //             {activeTooltip === `position-${index}` && (
// //               <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
// //                 <div className="p-4 border-b border-gray-700">
// //                   <div className="flex items-center justify-between">
// //                     <div className="flex items-center space-x-2">
// //                       <AlertCircle className="w-5 h-5 text-red-400" />
// //                       <span className="font-medium text-black">Position Suggestions</span>
// //                     </div>
// //                     <button
// //                       onClick={() => setActiveTooltip(null)}
// //                       className="text-black  transition-colors"
// //                     >
// //                       <X className="w-5 h-5" />
// //                     </button>
// //                   </div>
// //                 </div>
// //                 <div className="p-4">
// //                   {getErrorMessages(index, 'position').map((msg, i) => (
// //                     <div key={i} className="flex items-start space-x-3 mb-3 last:mb-0">
// //                       <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
// //                       <p className="text-black text-sm">{msg}</p>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           <div className="">
// //             <label className="text-white">Start Date</label>
// //             <div className="flex-wrap-gap-2">
// //               <select
// //                 className={`border other-input flex-1 ${
// //                   hasErrors(index, 'startYear') ? 'border-red-500' : 'border-black'
// //                 }`}
// //                 value={(experience.startYear || "Jan,2024").split(",")[0]}
// //                 onChange={(e) => handleMonthChange(e, index, "startYear")}
// //               >
// //                 {months.map((month, idx) => (
// //                   <option key={idx} value={month}>{month}</option>
// //                 ))}
// //               </select>
// //               <select
// //                 className={`other-input border flex-1 ${
// //                   hasErrors(index, 'startYear') ? 'border-red-500' : 'border-black'
// //                 }`}
// //                 value={(experience.startYear || "Jan,2024").split(",")[1]}
// //                 onChange={(e) => handleYearChange(e, index, "startYear")}
// //               >
// //                 {years.map((year, idx) => (
// //                   <option key={idx} value={year}>{year}</option>
// //                 ))}
// //               </select>
// //             </div>

// //             <label className="text-white">End Date</label>
// //             <div className="flex-wrap-gap-2">
// //               <select
// //                 className={`other-input border flex-1 ${
// //                   hasErrors(index, 'endYear') ? 'border-red-500' : 'border-black'
// //                 }`}
// //                 value={(experience.endYear || "Dec,2024").split(",")[0]}
// //                 onChange={(e) => handleMonthChange(e, index, "endYear")}
// //               >
// //                 {months.map((month, idx) => (
// //                   <option key={idx} value={month}>{month}</option>
// //                 ))}
// //               </select>
// //               <select
// //                 className={`other-input border flex-1 ${
// //                   hasErrors(index, 'endYear') ? 'border-red-500' : 'border-black'
// //                 }`}
// //                 value={(experience.endYear || "Dec,2024").split(",")[1]}
// //                 onChange={(e) => handleYearChange(e, index, "endYear")}
// //               >
// //                 {years.map((year, idx) => (
// //                   <option key={idx} value={year}>{year}</option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>

// //           <div className="relative mb-4">
// //             <label className="mt-2 text-white">Location</label>
// //             <input
// //               type="text"
// //               placeholder="Location"
// //               name="location"
// //               className={`w-full other-input border ${
// //                 hasErrors(index, 'location') ? 'border-red-500' : 'border-black'
// //               }`}
// //               value={experience.location}
// //               onChange={(e) => handleWorkExperience(e, index)}
// //             />
// //             {hasErrors(index, 'location') && (
// //               <button
// //                 type="button"
// //                 className="absolute right-2 top-1/2 translate-y-1 text-red-500 hover:text-red-600 transition-colors"
// //                 onClick={() => setActiveTooltip(activeTooltip === `location-${index}` ? null : `location-${index}`)}
// //               >
// //                 <AlertCircle className="w-5 h-5" />
// //               </button>
// //             )}
// //             {activeTooltip === `location-${index}` && (
// //               <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
// //                 <div className="p-4 border-b border-gray-700">
// //                   <div className="flex items-center justify-between">
// //                     <div className="flex items-center space-x-2">
// //                       <AlertCircle className="w-5 h-5 text-red-400" />
// //                       <span className="font-medium text-black">Location Suggestions</span>
// //                     </div>
// //                     <button
// //                       onClick={() => setActiveTooltip(null)}
// //                       className="text-black  transition-colors"
// //                     >
// //                       <X className="w-5 h-5" />
// //                     </button>
// //                   </div>
// //                 </div>
// //                 <div className="p-4">
// //                   {getErrorMessages(index, 'location').map((msg, i) => (
// //                     <div key={i} className="flex items-start space-x-3 mb-3 last:mb-0">
// //                       <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
// //                       <p className="text-black text-sm">{msg}</p>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           <div className="relative mb-4">
// //             <label className="text-white">Description Details</label>
// //             <textarea
// //               placeholder="Description Details"
// //               name="descriptionDetails"
// //               className={`w-full other-input border ${
// //                 hasErrors(index, 'descriptionDetails') ? 'border-red-500' : 'border-black'
// //               }`}
// //               value={experience.descriptionDetails?.descriptionSummary || ""}
// //               onChange={(e) => handleWorkExperience(e, index)}
// //               rows={4}
// //             />
// //             {hasErrors(index, 'descriptionDetails') && (
// //               <button
// //                 type="button"
// //                 className="absolute right-2 top-8 text-red-500 hover:text-red-600 transition-colors"
// //                 onClick={() => setActiveTooltip(activeTooltip === `description-${index}` ? null : `description-${index}`)}
// //               >
// //                 <AlertCircle className="w-5 h-5" />
// //               </button>
// //             )}
// //             {activeTooltip === `description-${index}` && (
// //               <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
// //                 <div className="p-4 border-b border-gray-700">
// //                   <div className="flex items-center justify-between">
// //                     <div className="flex items-center space-x-2">
// //                       <AlertCircle className="w-5 h-5 text-red-400" />
// //                       <span className="font-medium text-black">Description Suggestions</span>
// //                     </div>
// //                     <button
// //                       onClick={() => setActiveTooltip(null)}
// //                       className="text-black  transition-colors"
// //                     >
// //                       <X className="w-5 h-5" />
// //                     </button>
// //                   </div>
// //                 </div>
// //                 <div className="p-4">
// //                   {getErrorMessages(index, 'descriptionDetails').map((msg, i) => (
// //                     <div key={i} className="flex items-start space-x-3 mb-3 last:mb-0">
// //                       <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
// //                       <p className="text-black text-sm">{msg}</p>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           <div className="relative mb-4">
// //             <label className="text-white">Key Achievements</label>
// //             <textarea
// //               placeholder="Key Achievements"
// //               name="KeyAchievements"
// //               className={`w-full other-input border ${
// //                 hasErrors(index, 'KeyAchievements') ? 'border-red-500' : 'border-black'
// //               }`}
// //               value={experience.KeyAchievements}
// //               onChange={(e) => handleWorkExperience(e, index)}
// //               rows={4}
// //             />
// //             {hasErrors(index, 'KeyAchievements') && (
// //               <button
// //                 type="button"
// //                 className="absolute right-2 top-8 text-red-500 hover:text-red-600 transition-colors"
// //                 onClick={() => setActiveTooltip(activeTooltip === `achievements-${index}` ? null : `achievements-${index}`)}
// //               >
// //                 <AlertCircle className="w-5 h-5" />
// //               </button>
// //             )}
// //             {activeTooltip === `achievements-${index}` && (
// //               <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
// //                 <div className="p-4 border-b border-gray-700">
// //                   <div className="flex items-center justify-between">
// //                     <div className="flex items-center space-x-2">
// //                       <AlertCircle className="w-5 h-5 text-red-400" />
// //                       <span className="font-medium text-black">Achievement Suggestions</span>
// //                     </div>
// //                     <button
// //                       onClick={() => setActiveTooltip(null)}
// //                       className="text-black  transition-colors"
// //                     >
// //                       <X className="w-5 h-5" />
// //                     </button>
// //                   </div>
// //                 </div>
// //                 <div className="p-4">
// //                   {getErrorMessages(index, 'KeyAchievements').map((msg, i) => (
// //                     <div key={i} className="flex items-start space-x-3 mb-3 last:mb-0">
// //                       <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
// //                       <p className="text-black text-sm">{msg}</p>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       ))}
// //       <FormButton
// //         size={resumeData.workExperience.length}
// //         add={addWorkExperience}
// //         remove={removeWorkExperience}
// //       />
// //     </div>
// //   );
// // };

// // export default WorkExperience;

import React, { useContext, useState } from "react";
import { ResumeContext } from "../context/ResumeContext";
import FormButton from "./FormButton";
import { AlertCircle, X } from "lucide-react";
import axios from "axios";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/router";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const WorkExperience = () => {
  const { resumeData, setResumeData, resumeStrength } =
    useContext(ResumeContext);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [summaries, setSummaries] = useState([]);
  const [selectedSummaries, setSelectedSummaries] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const token = localStorage.getItem("token");
  const router = useRouter();
  const { improve } = router.query;

  const handleWorkExperience = (e, index) => {
    const { name, value } = e.target;
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience[index][name] = value;
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const years = Array.from(
    { length: 50 },
    (_, i) => new Date().getFullYear() - i
  );

  const handleMonthChange = (e, index, field) => {
    const newWorkExperience = [...resumeData.workExperience];
    const currentDate = newWorkExperience[index][field] || "Jan,2024";
    const [_, year] = currentDate.split(",");
    newWorkExperience[index][field] = `${e.target.value},${year || ""}`;
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  };

  const handleYearChange = (e, index, field) => {
    const newWorkExperience = [...resumeData.workExperience];
    const currentDate = newWorkExperience[index][field] || "Jan,2024";
    const [month, _] = currentDate.split(",");
    newWorkExperience[index][field] = `${month || ""},${e.target.value}`;
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  };

  const handleDescriptionChange = (value, index) => {
    handleWorkExperience({ target: { name: "description", value } }, index);
  };

  const handleAIAssist = async (index) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "https://api.resumeintellect.com/api/user/ai-resume-profexp-data",
        {
          key: "professional_experience",
          keyword:
            "Generate professional summary and Checklist of professional experience in manner of content and information",
          content: resumeData.workExperience[index].position,
          company_name: resumeData.workExperience[index].company,
          job_title: resumeData.workExperience[index].position,
          location: resumeData.workExperience[index].location,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      handleWorkExperience(
        {
          target: {
            name: "description",
            value: response.data.data.resume_analysis.professional_summary,
          },
        },
        index
      );

      setSummaries(response.data.data.resume_analysis.responsibilities);
      setPopupIndex(index);
      setShowPopup(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyAchievementSelect = (achievement) => {
    const isSelected = selectedSummaries.includes(achievement);
    if (isSelected) {
      setSelectedSummaries(
        selectedSummaries.filter((item) => item !== achievement)
      );
    } else {
      setSelectedSummaries([...selectedSummaries, achievement]);
    }
  };

  const handleSaveSelectedAchievements = (index, e) => {
    e.preventDefault();
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience[index].keyAchievements = selectedSummaries.join("\n");
    setResumeData({
      ...resumeData,
      workExperience: newWorkExperience,
    });
    setShowPopup(false);
  };

  const addWorkExperience = () => {
    setResumeData({
      ...resumeData,
      workExperience: [
        ...resumeData.workExperience,
        {
          company: "",
          position: "",
          startYear: "Jan,2024",
          endYear: "Dec,2024",
          location: "",
          description: "",
          descriptionDetails: "",
          keyAchievements: "",
        },
      ],
    });
  };

  const removeWorkExperience = (index) => {
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience.splice(index, 1);
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  };

  const hasErrors = (index, field) => {
    const workStrength = resumeStrength?.work_experience_strenght?.[index];
    return (
      workStrength &&
      Array.isArray(workStrength[field]) &&
      workStrength[field].length > 0
    );
  };

  const getErrorMessages = (index, field) => {
    const workStrength = resumeStrength?.work_experience_strenght?.[index];
    return workStrength && Array.isArray(workStrength[field])
      ? workStrength[field]
      : [];
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (e.key === "Enter" && value.length > 2) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://api.resumeintellect.com/api/user/ai-resume-profexp-data",
          {
            key: "professional_experience",
            keyword: value,
            content: value,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setSearchResults(
          response.data.data.resume_analysis.responsibilities || []
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSearchResultSelect = (result, index) => {
    const currentDescription =
      resumeData.workExperience[index].description || "";
    const newDescription = currentDescription
      ? `${currentDescription}\n${result}`
      : result;
    handleDescriptionChange(newDescription, index);
    setSearchValue("");
    setSearchResults([]);
  };

  return (
    <div className="flex-col gap-3 w-full mt-10 px-10">
      <h2 className="input-title text-black text-3xl">Work Experience</h2>

      {resumeData.workExperience.map((experience, index) => (
        <div key={index} className="f-col">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Company"
              name="company"
              className={`w-full other-input border ${
                improve && hasErrors(index, "company")
                  ? "border-red-500"
                  : "border-black"
              }`}
              value={experience.company}
              onChange={(e) => handleWorkExperience(e, index)}
            />
            {improve && hasErrors(index, "company") && (
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                onClick={() =>
                  setActiveTooltip(
                    activeTooltip === `company-${index}`
                      ? null
                      : `company-${index}`
                  )
                }
              >
                <AlertCircle className="w-5 h-5" />
              </button>
            )}
            {activeTooltip === `company-${index}` && (
              <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <span className="font-medium text-black">
                        Company Suggestions
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveTooltip(null)}
                      className="text-black transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  {getErrorMessages(index, "company").map((msg, i) => (
                    <div
                      key={i}
                      className="flex items-start space-x-3 mb-3 last:mb-0"
                    >
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                      <p className="text-black text-sm">{msg}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Position"
              name="position"
              className={`w-full other-input border ${
                improve && hasErrors(index, "position")
                  ? "border-red-500"
                  : "border-black"
              }`}
              value={experience.position}
              onChange={(e) => handleWorkExperience(e, index)}
            />
            {/* Position error tooltip */}
            {improve && hasErrors(index, "position") && (
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                onClick={() =>
                  setActiveTooltip(
                    activeTooltip === `position-${index}`
                      ? null
                      : `position-${index}`
                  )
                }
              >
                <AlertCircle className="w-5 h-5" />
              </button>
            )}
            {activeTooltip === `position-${index}` && (
              <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                {/* Position error content */}
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <span className="font-medium text-black">
                        Position Suggestions
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveTooltip(null)}
                      className="text-black transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  {getErrorMessages(index, "position").map((msg, i) => (
                    <div
                      key={i}
                      className="flex items-start space-x-3 mb-3 last:mb-0"
                    >
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                      <p className="text-black text-sm">{msg}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="">
            <label className="text-black">Start Date</label>
            <div className="flex-wrap-gap-2">
              <select
                className={`other-input border flex-1 ${
                  improve && hasErrors(index, "startYear")
                    ? "border-red-500"
                    : "border-black"
                }`}
                value={(experience.startYear || "Jan,2024").split(",")[0]}
                onChange={(e) => handleMonthChange(e, index, "startYear")}
              >
                {months.map((month, idx) => (
                  <option key={idx} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                className={`other-input border flex-1 ${
                  improve && hasErrors(index, "startYear")
                    ? "border-red-500"
                    : "border-black"
                }`}
                value={(experience.startYear || "Jan,2024").split(",")[1]}
                onChange={(e) => handleYearChange(e, index, "startYear")}
              >
                {years.map((year, idx) => (
                  <option key={idx} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <label className="text-black">End Date</label>
            <div className="flex-wrap-gap-2">
              <select
                className={`other-input border flex-1 ${
                  improve && hasErrors(index, "endYear")
                    ? "border-red-500"
                    : "border-black"
                }`}
                value={(experience.endYear || "Dec,2024").split(",")[0]}
                onChange={(e) => handleMonthChange(e, index, "endYear")}
              >
                {months.map((month, idx) => (
                  <option key={idx} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                className={`other-input border flex-1 ${
                  improve && hasErrors(index, "endYear")
                    ? "border-red-500"
                    : "border-black"
                }`}
                value={(experience.endYear || "Dec,2024").split(",")[1]}
                onChange={(e) => handleYearChange(e, index, "endYear")}
              >
                {years.map((year, idx) => (
                  <option key={idx} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative mb-4">
            <label className="mt-2 text-black">Location</label>
            <input
              type="text"
              placeholder="Location"
              name="location"
              className={`w-full other-input border ${
                improve && hasErrors(index, "location")
                  ? "border-red-500"
                  : "border-black"
              }`}
              value={experience.location}
              onChange={(e) => handleWorkExperience(e, index)}
            />
            {improve && hasErrors(index, "location") && (
              <button
                type="button"
                className="absolute right-2 top-1/2 translate-y-1 text-red-500 hover:text-red-600 transition-colors"
                onClick={() =>
                  setActiveTooltip(
                    activeTooltip === `location-${index}`
                      ? null
                      : `location-${index}`
                  )
                }
              >
                <AlertCircle className="w-5 h-5" />
              </button>
            )}
            {activeTooltip === `location-${index}` && (
              <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <span className="font-medium text-black">
                        Location Suggestions
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveTooltip(null)}
                      className="text-black transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  {getErrorMessages(index, "location").map((msg, i) => (
                    <div
                      key={i}
                      className="flex items-start space-x-3 mb-3 last:mb-0"
                    >
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                      <p className="text-black text-sm">{msg}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative mb-4">
            <div className="flex justify-between mb-2">
              <label className="text-black">Description</label>
              <button
                type="button"
                className="border bg-black text-white px-3 rounded-3xl"
                onClick={() => handleAIAssist(index)}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "+ Smart Assist"}
              </button>
            </div>
            <ReactQuill
              placeholder="Description"
              value={experience.description}
              onChange={(value) => handleDescriptionChange(value, index)}
              className={`bg-white rounded-md ${
                improve && hasErrors(index, "descriptionDetails")
                  ? "border-red-500"
                  : "border-black"
              }`}
              theme="snow"
              modules={{
                toolbar: [["bold", "italic", "underline"], ["clean"]],
              }}
            />
            {improve && hasErrors(index, "descriptionDetails") && (
              <button
                type="button"
                className="absolute right-2 top-8 text-red-500 hover:text-red-600 transition-colors"
                onClick={() =>
                  setActiveTooltip(
                    activeTooltip === `description-${index}`
                      ? null
                      : `description-${index}`
                  )
                }
              >
                <AlertCircle className="w-5 h-5" />
              </button>
            )}
            {activeTooltip === `description-${index}` && (
              <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <span className="font-medium text-black">
                        Description Suggestions
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveTooltip(null)}
                      className="text-black transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  {getErrorMessages(index, "descriptionDetails").map(
                    (msg, i) => (
                      <div
                        key={i}
                        className="flex items-start space-x-3 mb-3 last:mb-0"
                      >
                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                        <p className="text-black text-sm">{msg}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="relative mb-4">
            <label className="text-black">Key Achievements</label>
            <textarea
              placeholder="Key Achievements"
              name="keyAchievements"
              className={`w-full other-input border ${
                improve && hasErrors(index, "keyAchievements")
                  ? "border-red-500"
                  : "border-black"
              }`}
              value={experience.keyAchievements}
              onChange={(e) => handleWorkExperience(e, index)}
              rows={4}
            />
            {improve && hasErrors(index, "keyAchievements") && (
              <button
                type="button"
                className="absolute right-2 top-8 text-red-500 hover:text-red-600 transition-colors"
                onClick={() =>
                  setActiveTooltip(
                    activeTooltip === `achievements-${index}`
                      ? null
                      : `achievements-${index}`
                  )
                }
              >
                <AlertCircle className="w-5 h-5" />
              </button>
            )}
            {activeTooltip === `achievements-${index}` && (
              <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <span className="font-medium text-black">
                        Achievement Suggestions
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveTooltip(null)}
                      className="text-black transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  {getErrorMessages(index, "keyAchievements").map((msg, i) => (
                    <div
                      key={i}
                      className="flex items-start space-x-3 mb-3 last:mb-0"
                    >
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                      <p className="text-black text-sm">{msg}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      <FormButton
        size={resumeData.workExperience.length}
        add={addWorkExperience}
        remove={removeWorkExperience}
      />

      {/* Smart Assist Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg">
            <h3 className="text-xl font-bold mb-4">Select Key Achievements</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {summaries.map((summary, index) => (
                <div key={index} className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedSummaries.includes(summary)}
                    onChange={() => handleKeyAchievementSelect(summary)}
                    className="mt-1"
                  />
                  <p className="text-gray-800">{summary}</p>
                </div>
              ))}
            </div>
            <button
              onClick={(e) => handleSaveSelectedAchievements(popupIndex, e)}
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Save Selected Achievements
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-2 ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 bg-white rounded-lg shadow-xl mt-2">
          {searchResults.map((result, idx) => (
            <div
              key={idx}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSearchResultSelect(result, popupIndex)}
            >
              {result}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkExperience;

// import React, { useContext, useState } from "react";
// import { ResumeContext } from "../context/ResumeContext";
// import FormButton from "./FormButton";
// import { AlertCircle, X } from 'lucide-react';
// import axios from "axios";
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// const WorkExperience = () => {
//   // Context and state management
//   const { resumeData, setResumeData, resumeStrength } = useContext(ResumeContext);
//   const [activeTooltip, setActiveTooltip] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [summaries, setSummaries] = useState([]);
//   const [selectedSummaries, setSelectedSummaries] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupIndex, setPopupIndex] = useState(null);
//   const [searchValue, setSearchValue] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const token = localStorage.getItem("token");

//   // Constants
//   const months = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//   ];

//   const years = Array.from(
//     { length: 50 },
//     (_, i) => new Date().getFullYear() - i
//   );

//   // Helper functions for date formatting
//   const formatDateForBackend = (dateString) => {
//     if (!dateString) return "";
//     const [month, year] = dateString.split(",");
//     const monthIndex = months.indexOf(month) + 1;
//     const paddedMonth = monthIndex.toString().padStart(2, '0');
//     return `${year}-${paddedMonth}-01`;
//   };

//   const formatDateForUI = (dateString) => {
//     if (!dateString) return "Jan,2024";
//     try {
//       const date = new Date(dateString);
//       const month = months[date.getMonth()];
//       const year = date.getFullYear();
//       return `${month},${year}`;
//     } catch (error) {
//       return "Jan,2024";
//     }
//   };

//   // Error handling functions
//   const hasErrors = (index, field) => {
//     const workStrength = resumeStrength?.work_experience_strenght?.[index];
//     return workStrength && Array.isArray(workStrength[field]) && workStrength[field].length > 0;
//   };

//   const getErrorMessages = (index, field) => {
//     const workStrength = resumeStrength?.work_experience_strenght?.[index];
//     return workStrength && Array.isArray(workStrength[field]) ? workStrength[field] : [];
//   };

//   // Event handlers
//   const handleWorkExperience = (e, index) => {
//     const { name, value } = e.target;
//     const newWorkExperience = [...resumeData.workExperience];

//     if (name === "keyAchievements") {
//       newWorkExperience[index][name] = value.split('\n').filter(item => item.trim());
//     } else if (name === "description") {
//       newWorkExperience[index].descriptionDetails = {
//         descriptionSummary: value,
//         descriptionKeyPoints: null
//       };
//     } else {
//       newWorkExperience[index][name] = value;
//     }

//     setResumeData({ ...resumeData, workExperience: newWorkExperience });
//   };

//   const handleMonthChange = (e, index, field) => {
//     const newWorkExperience = [...resumeData.workExperience];
//     const currentDate = newWorkExperience[index][field] || "Jan,2024";
//     const [_, year] = currentDate.split(",");
//     const newDate = `${e.target.value},${year || ""}`;
//     newWorkExperience[index][field] = formatDateForBackend(newDate);
//     setResumeData({ ...resumeData, workExperience: newWorkExperience });
//   };

//   const handleYearChange = (e, index, field) => {
//     const newWorkExperience = [...resumeData.workExperience];
//     const currentDate = newWorkExperience[index][field] || "Jan,2024";
//     const [month, _] = currentDate.split(",");
//     const newDate = `${month || ""},${e.target.value}`;
//     newWorkExperience[index][field] = formatDateForBackend(newDate);
//     setResumeData({ ...resumeData, workExperience: newWorkExperience });
//   };

//   const handleDescriptionChange = (value, index) => {
//     const newWorkExperience = [...resumeData.workExperience];
//     newWorkExperience[index].descriptionDetails = {
//       descriptionSummary: value,
//       descriptionKeyPoints: null
//     };
//     setResumeData({ ...resumeData, workExperience: newWorkExperience });
//   };

//   const handleAIAssist = async (index) => {
//     setIsLoading(true);
//     setError("");
//     try {
//       const response = await axios.post(
//         "https://api.resumeintellect.com/api/jobseeker/ai-resume-profexp-data",
//         {
//           key: "professional_experience",
//           keyword: "Generate professional summary and Checklist of professional experience in manner of content and information",
//           content: resumeData.workExperience[index].position,
//           company_name: resumeData.workExperience[index].company,
//           job_title: resumeData.workExperience[index].position,
//           location: resumeData.workExperience[index].location,
//         },
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );

//       const newWorkExperience = [...resumeData.workExperience];
//       newWorkExperience[index].descriptionDetails = {
//         descriptionSummary: response.data.data.resume_analysis.professional_summary,
//         descriptionKeyPoints: null
//       };
//       setResumeData({ ...resumeData, workExperience: newWorkExperience });

//       setSummaries(response.data.data.resume_analysis.responsibilities);
//       setPopupIndex(index);
//       setShowPopup(true);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyAchievementSelect = (achievement) => {
//     const isSelected = selectedSummaries.includes(achievement);
//     if (isSelected) {
//       setSelectedSummaries(selectedSummaries.filter((item) => item !== achievement));
//     } else {
//       setSelectedSummaries([...selectedSummaries, achievement]);
//     }
//   };

//   const handleSaveSelectedAchievements = (index, e) => {
//     e.preventDefault();
//     const newWorkExperience = [...resumeData.workExperience];
//     newWorkExperience[index].keyAchievements = selectedSummaries;
//     setResumeData({
//       ...resumeData,
//       workExperience: newWorkExperience,
//     });
//     setShowPopup(false);
//   };

//   const addWorkExperience = () => {
//     setResumeData({
//       ...resumeData,
//       workExperience: [
//         ...resumeData.workExperience,
//         {
//           company: "",
//           position: "",
//           startYear: formatDateForBackend("Jan,2024"),
//           endYear: formatDateForBackend("Dec,2024"),
//           location: "",
//           descriptionDetails: {
//             descriptionSummary: "",
//             descriptionKeyPoints: null
//           },
//           keyAchievements: []
//         },
//       ],
//     });
//   };

//   const removeWorkExperience = (index) => {
//     const newWorkExperience = [...resumeData.workExperience];
//     newWorkExperience.splice(index, 1);
//     setResumeData({ ...resumeData, workExperience: newWorkExperience });
//   };

//   // Return JSX
//   return (
//     <div className="flex-col gap-3 w-full mt-10 px-10">
//       <h2 className="input-title text-white text-3xl">Work Experience</h2>

//       {resumeData.workExperience.map((experience, index) => (
//         <div key={index} className="f-col">
//           {/* Company Input */}
//           <div className="relative mb-4">
//             <input
//               type="text"
//               placeholder="Company"
//               name="company"
//               className={`w-full other-input border ${
//                 hasErrors(index, 'company') ? 'border-red-500' : 'border-black'
//               }`}
//               value={experience.company}
//               onChange={(e) => handleWorkExperience(e, index)}
//             />
//             {/* Company Error Tooltip */}
//             {hasErrors(index, 'company') && (
//               <button
//                 type="button"
//                 className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
//                 onClick={() => setActiveTooltip(activeTooltip === `company-${index}` ? null : `company-${index}`)}
//               >
//                 <AlertCircle className="w-5 h-5" />
//               </button>
//             )}
//             {activeTooltip === `company-${index}` && (
//               <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-700">
//                 <div className="p-4 border-b border-gray-700">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                       <AlertCircle className="w-5 h-5 text-red-400" />
//                       <span className="font-medium text-black">Company Suggestions</span>
//                     </div>
//                     <button
//                       onClick={() => setActiveTooltip(null)}
//                       className="text-black transition-colors"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   {getErrorMessages(index, 'company').map((msg, i) => (
//                     <div key={i} className="flex items-start space-x-3 mb-3 last:mb-0">
//                       <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
//                       <p className="text-black text-sm">{msg}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Position Input */}
//           <div className="relative mb-4">
//             <input
//               type="text"
//               placeholder="Position"
//               name="position"
//               className={`w-full other-input border ${
//                 hasErrors(index, 'position') ? 'border-red-500' : 'border-black'
//               }`}
//               value={experience.position}
//               onChange={(e) => handleWorkExperience(e, index)}
//             />
//             {/* Position Error Tooltip */}
//             {hasErrors(index, 'position') && (
//               <button
//                 type="button"
//                 className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
//                 onClick={() => setActiveTooltip(activeTooltip === `position-${index}` ? null : `position-${index}`)}
//               >
//                 <AlertCircle className="w-5 h-5" />
//               </button>
//             )}
//             {activeTooltip === `position-${index}` && (
//               <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-700">
//                 <div className="p-4 border-b border-gray-700">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                       <AlertCircle className="w-5 h-5 text-red-400" />
//                       <span className="font-medium text-black">Position Suggestions</span>
//                     </div>
//                     <button
//                       onClick={() => setActiveTooltip(null)}
//                       className="text-black transition-colors"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   {getErrorMessages(index, 'position').map((msg, i) => (
//                     <div key={i} className="flex items-start space-x-3 mb-3 last:mb-0">
//                       <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
//                       <p className="text-black text-sm">{msg}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Date Inputs */}
//           <div className="">
//             <label className="text-white">Start Date</label>
//             <div className="flex-wrap-gap-2">
//               <select
//                 className={`other-input border flex-1 ${
//                   hasErrors(index, 'startYear') ? 'border-red-500' : 'border-black'
//                 }`}
//                 value={formatDateForUI(experience.startYear).split(",")[0]}
//                 onChange={(e) => handleMonthChange(e, index, "startYear")}
//               >
//                 {months.map((month, idx) => (
//                   <option key={idx} value={month}>{month}</option>
//                 ))}
//               </select>
//               <select
//                 className={`other-input border flex-1 ${
//                   hasErrors(index, 'startYear') ? 'border-red-500' : 'border-black'
//                 }`}
//                 value={formatDateForUI(experience.startYear).split(",")[1]}
//                 onChange={(e) => handleYearChange(e, index, "startYear")}
//               >
//                 {years.map((year, idx) => (
//                   <option key={idx} value={year}>{year}</option>
//                 ))}
//               </select>
//             </div>

//             <label className="text-white">End Date</label>
//             <div className="flex-wrap-gap-2">
//               <select
//                 className={`other-input border flex-1 ${
//                   hasErrors(index, 'endYear') ? 'border-red-500' : 'border-black'
//                 }`}
//                 value={formatDateForUI(experience.endYear).split(",")[0]}
//                 onChange={(e) => handleMonthChange(e, index, "endYear")}
//               >
//                 {months.map((month, idx) => (
//                   <option key={idx} value={month}>{month}</option>
//                 ))}
//               </select>
//               <select
//                 className={`other-input border flex-1 ${
//                   hasErrors(index, 'endYear') ? 'border-red-500' : 'border-black'
//                 }`}
//                 value={formatDateForUI(experience.endYear).split(",")[1]}
//                 onChange={(e) => handleYearChange(e, index, "endYear")}
//               >
//                 {years.map((year, idx) => (
//                   <option key={idx} value={year}>{year}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Location Input */}
//           <div className="relative mb-4">
//             <label className="mt-2 text-white">Location</label>
//             <input
//               type="text"
//               placeholder="Location"
//               name="location"
//               className={`w-full other-input border ${
//                 hasErrors(index, 'location') ? 'border-red-500' : 'border-black'
//               }`}
//               value={experience.location}
//               onChange={(e) => handleWorkExperience(e, index)}
//             />
//             {/* Location Error Tooltip */}
//             {hasErrors(index, 'location') && (
//               <button
//                 type="button"
//                 className="absolute right-2 top-1/2 translate-y-1 text-red-500 hover:text-red-600 transition-colors"
//                 onClick={() => setActiveTooltip(activeTooltip === `location-${index}` ? null : `location-${index}`)}
//               >
//                 <AlertCircle className="w-5 h-5" />
//               </button>
//             )}
//             {activeTooltip === `location-${index}` && (
//               <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-700">
//                 <div className="p-4 border-b border-gray-700">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                       <AlertCircle className="w-5 h-5 text-red-400" />
//                       <span className="font-medium text-black">Location Suggestions</span>
//                     </div>
//                     <button
//                       onClick={() => setActiveTooltip(null)}
//                       className="text-black transition-colors"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   {getErrorMessages(index, 'location').map((msg, i) => (
//                     <div key={i} className="flex items-start space-x-3 mb-3 last:mb-0">
//                       <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
//                       <p className="text-black text-sm">{msg}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Description Input */}
//           <div className="relative mb-4">
//             <div className="flex justify-between mb-2">
//               <label className="text-white">Description</label>
//               <button
//                 type="button"
//                 className="border bg-black text-white px-3 rounded-3xl"
//                 onClick={() => handleAIAssist(index)}
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Loading..." : "+ Smart Assist"}
//               </button>
//             </div>
//             <ReactQuill
//               placeholder="Description"
//               value={experience.descriptionDetails?.descriptionSummary || ""}
//               onChange={(value) => handleDescriptionChange(value, index)}
//               className={`bg-white rounded-md ${
//                 hasErrors(index, 'description') ? 'border-red-500' : 'border-black'
//               }`}
//               theme="snow"
//               modules={{
//                 toolbar: [
//                   ['bold', 'italic', 'underline'],
//                   ['clean']
//                 ]
//               }}
//             />
//             {/* Description Error Tooltip */}
//             {hasErrors(index, 'description') && (
//               <button
//                 type="button"
//                 className="absolute right-2 top-8 text-red-500 hover:text-red-600 transition-colors"
//                 onClick={() => setActiveTooltip(activeTooltip === `description-${index}` ? null : `description-${index}`)}
//               >
//                 <AlertCircle className="w-5 h-5" />
//               </button>
//             )}
//             {activeTooltip === `description-${index}` && (
//               <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-700">
//                 <div className="p-4 border-b border-gray-700">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                       <AlertCircle className="w-5 h-5 text-red-400" />
//                       <span className="font-medium text-black">Description Suggestions</span>
//                     </div>
//                     <button
//                       onClick={() => setActiveTooltip(null)}
//                       className="text-black transition-colors"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   {getErrorMessages(index, 'description').map((msg, i) => (
//                     <div key={i} className="flex items-start space-x-3 mb-3 last:mb-0">
//                       <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
//                       <p className="text-black text-sm">{msg}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Key Achievements Input */}
//           <div className="relative mb-4">
//             <label className="text-white">Key Achievements</label>
//             <textarea
//               placeholder="Key Achievements"
//               name="keyAchievements"
//               className={`w-full other-input border ${
//                 hasErrors(index, 'keyAchievements') ? 'border-red-500' : 'border-black'
//               }`}
//               value={Array.isArray(experience.keyAchievements) ? experience.keyAchievements.join('\n') : ''}
//               onChange={(e) => handleWorkExperience(e, index)}
//               rows={4}
//             />
//             {/* Key Achievements Error Tooltip */}
//             {hasErrors(index, 'keyAchievements') && (
//               <button
//                 type="button"
//                 className="absolute right-2 top-8 text-red-500 hover:text-red-600 transition-colors"
//                 onClick={() => setActiveTooltip(activeTooltip === `achievements-${index}` ? null : `achievements-${index}`)}
//               >
//                 <AlertCircle className="w-5 h-5" />
//               </button>
//             )}
//             {activeTooltip === `achievements-${index}` && (
//               <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-700">
//                 <div className="p-4 border-b border-gray-700">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                       <AlertCircle className="w-5 h-5 text-red-400" />
//                       <span className="font-medium text-black">Achievement Suggestions</span>
//                     </div>
//                     <button
//                       onClick={() => setActiveTooltip(null)}
//                       className="text-black transition-colors"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   {getErrorMessages(index, 'keyAchievements').map((msg, i) => (
//                     <div key={i} className="flex items-start space-x-3 mb-3 last:mb-0">
//                       <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
//                       <p className="text-black text-sm">{msg}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}

//       <FormButton
//         size={resumeData.workExperience.length}
//         add={addWorkExperience}
//         remove={removeWorkExperience}
//       />

//       {/* Smart Assist Popup */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg">
//             <h3 className="text-xl font-bold mb-4">Select Key Achievements</h3>
//             <div className="space-y-3 max-h-96 overflow-y-auto">
//               {summaries.map((summary, index) => (
//                 <div key={index} className="flex items-start gap-3">
//                   <input
//                     type="checkbox"
//                     checked={selectedSummaries.includes(summary)}
//                     onChange={() => handleKeyAchievementSelect(summary)}
//                     className="mt-1"
//                   />
//                   <p className="text-gray-800">{summary}</p>
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={(e) => handleSaveSelectedAchievements(popupIndex, e)}
//               className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
//             >
//               Save Selected Achievements
//             </button>
//             <button
//               onClick={() => setShowPopup(false)}
//               className="mt-2 ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-300"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Search Results */}
//       {searchResults.length > 0 && (
//         <div className="absolute z-50 top-full left-0 right-0 bg-white rounded-lg shadow-xl mt-2">
//           {searchResults.map((result, idx) => (
//             <div
//               key={idx}
//               className="p-2 hover:bg-gray-100 cursor-pointer"
//               onClick={() => handleSearchResultSelect(result, popupIndex)}
//             >
//               {result}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WorkExperience;
