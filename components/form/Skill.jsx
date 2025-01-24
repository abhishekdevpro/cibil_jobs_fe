// import React, { useContext } from "react";
// import { ResumeContext } from "../../pages/builder";
// import FormButton from "./FormButton";

// const Skill = ({ title }) => {
//   const { resumeData, setResumeData } = useContext(ResumeContext);

//   // skills
//   const handleSkill = (e, index, title) => {
//     const newSkills = [
//       ...resumeData.skills.find((skillType) => skillType.title === title)
//         ?.skills,
//     ];
//     newSkills[index] = e.target.value;
//     setResumeData((prevData) => ({
//       ...prevData,
//       skills: prevData.skills.map((skill) =>
//         skill.title === title ? { ...skill, skills: newSkills } : skill
//       ),
//     }));
//   };

//   const addSkill = (title) => {
//     setResumeData((prevData) => {
//       const skillType = prevData.skills.find(
//         (skillType) => skillType.title === title
//       );
//       if (!skillType) return prevData;

//       const newSkills = [...skillType.skills, ""];
//       const updatedSkills = prevData.skills.map((skill) =>
//         skill.title === title ? { ...skill, skills: newSkills } : skill
//       );
//       return {
//         ...prevData,
//         skills: updatedSkills,
//       };
//     });
//   };

//   const removeSkill = (title, index) => {
//     setResumeData((prevData) => {
//       const skillType = prevData.skills.find(
//         (skillType) => skillType.title === title
//       );
//       if (!skillType) return prevData;

//       const newSkills = [...skillType.skills];
//       newSkills.pop();
//       const updatedSkills = prevData.skills.map((skill) =>
//         skill.title === title ? { ...skill, skills: newSkills } : skill
//       );
//       return {
//         ...prevData,
//         skills: updatedSkills,
//       };
//     });
//   };

//   const skillType = resumeData.skills.find(
//     (skillType) => skillType.title === title
//   );

//   if (!skillType || skillType.skills.length === 0) {
//     return null; // Render nothing if skillType is not found or has no skills
//   }

//   return (
//     <div className="flex-col-gap-3 w-full mt-10 px-10">
//       <h2 className="input-title text-black text-3xl">{title}</h2>
//       {skillType.skills.map((skill, index) => (
//         <div key={index} className="f-col">
//           <input
//             type="text"
//             placeholder={title}
//             name={title}
//             className="w-full other-input border-black border"
//             value={skill}
//             onChange={(e) => handleSkill(e, index, title)}
//           />
//         </div>
//       ))}
//       <FormButton
//         size={skillType.skills.length}
//         add={() => addSkill(title)}
//         remove={() => removeSkill(title)}
//       />
//     </div>
//   );
// };

// export default Skill;

// import React, { useContext, useState } from "react";
// import axios from "axios";
// import FormButton from "./FormButton";
// import { ResumeContext } from "../context/ResumeContext";

// const Skill = ({ title }) => {
//   const { resumeData, setResumeData } = useContext(ResumeContext);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [aiSkills, setAiSkills] = useState([]); // State for AI skills
//   const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
//   const [selectedSkills, setSelectedSkills] = useState([]); // State to hold selected skills

//   // Handle skill change
//   const handleSkill = (e, index, title) => {
//     const newSkills = [
//       ...resumeData.skills.find((skillType) => skillType.title === title)
//         ?.skills,
//     ];
//     newSkills[index] = e.target.value;
//     setResumeData((prevData) => ({
//       ...prevData,
//       skills: prevData.skills.map((skill) =>
//         skill.title === title ? { ...skill, skills: newSkills } : skill
//       ),
//     }));
//   };

//   // Add new skill
//   const addSkill = (title) => {
//     setResumeData((prevData) => {
//       const skillType = prevData.skills.find(
//         (skillType) => skillType.title === title
//       );
//       if (!skillType) return prevData;

//       const newSkills = [...skillType.skills, ""];
//       const updatedSkills = prevData.skills.map((skill) =>
//         skill.title === title ? { ...skill, skills: newSkills } : skill
//       );
//       return {
//         ...prevData,
//         skills: updatedSkills,
//       };
//     });
//   };

//   // Remove individual skill
//   const removeSkill = (title, index) => {
//     setResumeData((prevData) => {
//       const skillType = prevData.skills.find(
//         (skillType) => skillType.title === title
//       );
//       if (!skillType) return prevData;

//       const newSkills = [...skillType.skills];
//       newSkills.splice(index, 1); // Remove the skill at the specific index
//       const updatedSkills = prevData.skills.map((skill) =>
//         skill.title === title ? { ...skill, skills: newSkills } : skill
//       );
//       return {
//         ...prevData,
//         skills: updatedSkills,
//       };
//     });
//   };

//   // Remove all skills
//   const removeAllSkills = (title) => {
//     setResumeData((prevData) => {
//       const updatedSkills = prevData.skills.map((skill) =>
//         skill.title === title ? { ...skill, skills: [] } : skill
//       );
//       return {
//         ...prevData,
//         skills: updatedSkills,
//       };
//     });
//   };

//   const handleAIAssist = async () => {
//     setLoading(true);
//     setError(null);
//     setAiSkills([]); // Clear previous AI skills

//     try {
//       const token = localStorage.getItem("token");
//       const skillType = resumeData.skills.find(
//         (skillType) => skillType.title === title
//       );

//       if (!skillType || !skillType.skills.length) {
//         setError("No skills found for this category.");
//         return;
//       }

//       const response = await axios.post(
//         "https://api.sentryspot.co.uk/api/jobseeker/ai-skills-data",
//         {
//           key: "skills",
//           keyword: title, // Use the skill title (e.g., "Technical Skills")
//           content: resumeData.position || "Job Title", // Use the position or job title
//         },
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );

//       if (response.data.status === "success") {
//         // Update AI skills state with the response from the correct path
//         setAiSkills(response.data.data.resume_analysis.skills); // Correctly access the skills
//         setIsModalOpen(true); // Open the modal after receiving skills
//       } else {
//         setError("Unable to fetch AI data. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error getting AI skills data:", error);
//       setError(
//         "An error occurred while fetching skills data. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle skill selection from AI modal
//   const handleSelectSkill = (skill) => {
//     setSelectedSkills((prevSelectedSkills) => {
//       if (prevSelectedSkills.includes(skill)) {
//         return prevSelectedSkills.filter((s) => s !== skill); // Deselect skill
//       } else {
//         return [...prevSelectedSkills, skill]; // Select skill
//       }
//     });
//   };

//   // Add selected skills to the input field
//   const addSelectedSkills = () => {
//     setResumeData((prevData) => {
//       const skillType = prevData.skills.find(
//         (skillType) => skillType.title === title
//       );
//       if (!skillType) return prevData;

//       const newSkills = [...skillType.skills, ...selectedSkills];
//       const updatedSkills = prevData.skills.map((skill) =>
//         skill.title === title ? { ...skill, skills: newSkills } : skill
//       );
//       return {
//         ...prevData,
//         skills: updatedSkills,
//       };
//     });
//     setIsModalOpen(false); // Close modal after adding skills
//   };

//   const skillType = resumeData.skills.find(
//     (skillType) => skillType.title === title
//   );

//   if (!skillType || skillType.skills.length === 0) {
//     return null; // Render nothing if skillType is not found or has no skills
//   }

//   return (
//     <div className="flex-col-gap-3 w-full mt-10 px-10">
//       <h2 className="input-title text-white text-3xl">{title}</h2>
//       {skillType.skills.map((skill, index) => (
//         <div key={index} className="flex items-center space-x-2">
//           <input
//             type="text"
//             placeholder={title}
//             name={title}
//             className="w-full other-input border-black border"
//             value={skill}
//             onChange={(e) => handleSkill(e, index, title)}
//           />
//           <button
//             type="button"
//             onClick={() => removeSkill(title, index)}
//             className="text-red-500 hover:text-red-700"
//             aria-label="Delete skill"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>
//       ))}
//       <div className="flex space-x-4">
//         <FormButton
//           size={skillType.skills.length}
//           add={() => addSkill(title)}
//         />
//         <button
//           type="button"
//           onClick={() => removeAllSkills(title)}
//           className="text-red-600 hover:text-red-800"
//           aria-label="Delete all skills"
//         >
//           Delete All Skills
//         </button>
//         <button
//           type="button"
//           onClick={handleAIAssist} // Trigger API call with the current title
//           className="border bg-black text-white px-3 rounded-3xl"
//           disabled={loading}
//         >
//           {loading ? "Loading..." : " + Smart Assist"}
//         </button>
//       </div>

//       {/* Modal for AI skill selection */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-xl w-96">
//             <h3 className="text-xl mb-4">Select AI Skills</h3>
//             <ul className="space-y-2">
//               {/* {aiSkills.length > 0 ? (
//                 aiSkills.map((skill, index) => (
//                   <li key={index} className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       checked={selectedSkills.includes(skill)}
//                       onChange={() => handleSelectSkill(skill)}
//                     />
//                     <span>{skill}</span>
//                   </li>
//                 ))
//               ) : (
//                 <li>No AI skills available.</li>
//               )} */}
//               {Array.isArray(aiSkills) && aiSkills.length > 0 ? (
//                 aiSkills.map((skill, index) => (
//                   <li key={index} className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       checked={selectedSkills.includes(skill)}
//                       onChange={() => handleSelectSkill(skill)}
//                     />
//                     <span>{skill}</span>
//                   </li>
//                 ))
//               ) : (
//                 <li>No AI skills available.</li> // Fallback message
//               )}
//             </ul>
//             <button
//               className="mt-4 px-4 py-2 bg-gray-300 rounded-lg"
//               onClick={addSelectedSkills} // Add selected skills
//             >
//               Add Selected Skills
//             </button>
//             <button
//               className="mt-4 ml-2 px-4 py-2 bg-gray-300 rounded-lg"
//               onClick={() => setIsModalOpen(false)} // Close modal
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </div>
//   );
// };

// export default Skill;
import React, { useContext, useState } from "react";
import axios from "axios";
import FormButton from "./FormButton";
import { ResumeContext } from "../context/ResumeContext";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/router";

const Skill = ({ title }) => {
  const { resumeData, setResumeData, resumeStrength } =
    useContext(ResumeContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiSkills, setAiSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [activeTooltip, setActiveTooltip] = useState(null);

  const router = useRouter();
  const { improve } = router.query;

  // Helper function to check if a field has errors
  const hasErrors = (skillIndex) => {
    const skillStrength = resumeStrength?.skills_strenght?.[skillIndex];
    return (
      skillStrength &&
      Array.isArray(skillStrength.skills) &&
      skillStrength.skills.length > 0
    );
  };

  // Helper function to get error messages
  const getErrorMessages = (skillIndex) => {
    const skillStrength = resumeStrength?.skills_strenght?.[skillIndex];
    return skillStrength && Array.isArray(skillStrength.skills)
      ? skillStrength.skills
      : [];
  };

  // Handle skill change
  const handleSkill = (e, index, title) => {
    const newSkills = [
      ...resumeData.skills.find((skillType) => skillType.title === title)
        ?.skills,
    ];
    newSkills[index] = e.target.value;
    setResumeData((prevData) => ({
      ...prevData,
      skills: prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      ),
    }));
  };

  // Add new skill
  const addSkill = (title) => {
    setResumeData((prevData) => {
      const skillType = prevData.skills.find(
        (skillType) => skillType.title === title
      );
      if (!skillType) return prevData;

      const newSkills = [...skillType.skills, ""];
      const updatedSkills = prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      );
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  // Remove individual skill
  const removeSkill = (title, index) => {
    setResumeData((prevData) => {
      const skillType = prevData.skills.find(
        (skillType) => skillType.title === title
      );
      if (!skillType) return prevData;

      const newSkills = [...skillType.skills];
      newSkills.splice(index, 1);
      const updatedSkills = prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      );
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  // Remove all skills
  const removeAllSkills = (title) => {
    setResumeData((prevData) => {
      const updatedSkills = prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: [] } : skill
      );
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  const handleAIAssist = async () => {
    setLoading(true);
    setError(null);
    setAiSkills([]);

    try {
      const token = localStorage.getItem("token");
      const skillType = resumeData.skills.find(
        (skillType) => skillType.title === title
      );

      if (!skillType || !skillType.skills.length) {
        setError("No skills found for this category.");
        return;
      }

      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/ai-skills-data",
        {
          key: "skills",
          keyword: title,
          content: resumeData.position || "Job Title",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.status === "success") {
        setAiSkills(response.data.data.resume_analysis.skills);
        setIsModalOpen(true);
      } else {
        setError("Unable to fetch AI data. Please try again.");
      }
    } catch (error) {
      console.error("Error getting AI skills data:", error);
      setError(
        "An error occurred while fetching skills data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSkill = (skill) => {
    setSelectedSkills((prevSelectedSkills) => {
      if (prevSelectedSkills.includes(skill)) {
        return prevSelectedSkills.filter((s) => s !== skill);
      } else {
        return [...prevSelectedSkills, skill];
      }
    });
  };

  const addSelectedSkills = () => {
    setResumeData((prevData) => {
      const skillType = prevData.skills.find(
        (skillType) => skillType.title === title
      );
      if (!skillType) return prevData;

      const newSkills = [...skillType.skills, ...selectedSkills];
      const updatedSkills = prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      );
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
    setIsModalOpen(false);
    setSelectedSkills([]);
  };

  const skillType = resumeData.skills.find(
    (skillType) => skillType.title === title
  );

  if (!skillType || skillType.skills.length === 0) {
    return null;
  }

  return (
    <div className="flex-col-gap-3 w-full mt-10 px-10">
      <h2 className="input-title text-black text-3xl">{title}</h2>
      {skillType.skills.map((skill, index) => (
        <div key={index} className="relative flex items-center space-x-2">
          <input
            type="text"
            placeholder={title}
            name={title}
            className={`w-full other-input border ${
              improve && hasErrors(index) ? "border-red-500" : "border-black"
            }`}
            value={skill}
            onChange={(e) => handleSkill(e, index, title)}
          />
          {improve && hasErrors(index) && (
            <button
              type="button"
              className="absolute right-8 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
              onClick={() =>
                setActiveTooltip(
                  activeTooltip === `skill-${index}` ? null : `skill-${index}`
                )
              }
            >
              <AlertCircle className="w-5 h-5" />
            </button>
          )}
          <button
            type="button"
            onClick={() => removeSkill(title, index)}
            className="text-red-500 hover:text-red-700"
            aria-label="Delete skill"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {activeTooltip === `skill-${index}` && (
            <div className="absolute z-10 right-16 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="bg-red-50 px-4 py-2 rounded-t-lg border-b border-red-100">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-red-800">Skill Error</span>
                </div>
              </div>
              <div className="p-4">
                {getErrorMessages(index).map((msg, i) => (
                  <div key={i} className="text-gray-700 text-sm mb-2">
                    {msg}
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 p-3 flex justify-end">
                <button
                  onClick={() => setActiveTooltip(null)}
                  className="text-[#00b38d] hover:text-blue-800 text-sm font-medium"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="flex space-x-4">
        <FormButton
          size={skillType.skills.length}
          add={() => addSkill(title)}
        />
        <button
          type="button"
          onClick={() => removeAllSkills(title)}
          className="text-red-600 hover:text-red-800"
          aria-label="Delete all skills"
        >
          Delete All Skills
        </button>
        <button
          type="button"
          onClick={handleAIAssist}
          className="border bg-black text-white px-3 rounded-3xl"
          disabled={loading}
        >
          {loading ? "Loading..." : " + Smart Assist"}
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="text-xl mb-4">Select AI Skills</h3>
            <ul className="space-y-2">
              {Array.isArray(aiSkills) && aiSkills.length > 0 ? (
                aiSkills.map((skill, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill)}
                      onChange={() => handleSelectSkill(skill)}
                    />
                    <span>{skill}</span>
                  </li>
                ))
              ) : (
                <li>No AI skills available.</li>
              )}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-gray-300 rounded-lg"
              onClick={addSelectedSkills}
            >
              Add Selected Skills
            </button>
            <button
              className="mt-4 ml-2 px-4 py-2 bg-gray-300 rounded-lg"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedSkills([]);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Skill;
