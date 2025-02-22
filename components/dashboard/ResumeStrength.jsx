import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import FullScreenLoader from "../ResumeLoader/Loader";
import { useTranslation } from "react-i18next";

const ResumeStrength = ({ score, strength, resumeId }) => {
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const getSectionsList = (data) => {
    if (!data) return [];
    return [
      {
        name: t("resumeStrength.sections.personalInformation"),
        completed: data.is_personal_info,
        score: data.personal_score,
      },
      {
        name: t("resumeStrength.sections.socialLinks"),
        completed: data.is_social,
        score: data.social_score,
      },
      {
        name: t("resumeStrength.sections.personalSummary"),
        completed: data.is_personal_summery,
        score: data.personal_summery_score,
      },
      {
        name: t("resumeStrength.sections.education"),
        completed: data.is_education,
        score: data.education_score,
      },
      {
        name: t("resumeStrength.sections.workHistory"),
        completed: data.is_work_history,
        score: data.work_history_score,
      },
      {
        name: t("resumeStrength.sections.projects"),
        completed: data.is_project,
        score: data.project_score,
      },
      {
        name: t("resumeStrength.sections.skills"),
        completed: data.is_skills,
        score: data.skills_score,
      },
      {
        name: t("resumeStrength.sections.languages"),
        completed: data.is_languages,
        score: data.languages_score,
      },
      {
        name: t("resumeStrength.sections.certification"),
        completed: data.is_certifications,
        score: data.certifications_score,
      },
    ];
  };
  const handleImproveResume = () => {
    setShowLoader(true);
    setTimeout(() => {
      router.push({
        pathname: `/dashboard/aibuilder/${resumeId}`,
        query: {
          improve: "true", // Example query parameter
        },
      });
    }, 5000);
  };

  const sectionsList = getSectionsList(strength);

  return (
    <>
      {showLoader && <FullScreenLoader />}
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">
              {t("resumeStrength.resumeStrength")}
            </h2>
            <div className="flex items-center gap-2">
              <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-lg font-semibold">
                {score}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <h3 className="text-xl font-semibold mb-1">
              {t("resumeStrength.fixResume")}{" "}
            </h3>
            {/* <p className="text-gray-600">
              We found
              <span className="font-bold">
                {strength.total_errors} errors
              </span>{" "}
              in your resume.
            </p> */}
            <p className="text-gray-600">
              {t("resumeStrength.foundErrors", {
                errors: strength.total_errors,
              })}
            </p>

            <p className="text-gray-600">{t("resumeStrength.useTool")}</p>

            <button
              onClick={handleImproveResume}
              disabled={!resumeId}
              className={`mt-2 px-6 py-2 bg-[#00b38d] text-white rounded-lg hover:bg-[#00b38d] w-full sm:w-auto ${
                !resumeId ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {t("resumeStrength.improveResume")}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {sectionsList.map((section) => (
            <div key={section.name} className="flex items-center gap-2">
              <div
                className={`p-1 rounded-full ${
                  section.completed
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {section.completed ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </div>
              <span className="text-gray-700">{section.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ResumeStrength;
