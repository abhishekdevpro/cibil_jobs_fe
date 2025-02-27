// import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { Globe } from "lucide-react"; // Icon for the toggle button

// function LanguageSelector() {
//   const { i18n } = useTranslation();
//   const [isOpen, setIsOpen] = useState(false);

//   const changeLanguage = (event) => {
//     i18n.changeLanguage(event.target.value);
//     setIsOpen(false); // Close dropdown after selecting a language
//   };

//   return (
//     <div className="fixed top-4 right-4 z-50">
//       {/* Toggle Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="bg-white shadow-lg p-2 rounded-full border hover:bg-gray-100 transition"
//       >
//         <Globe className="w-6 h-6 text-gray-700" />
//       </button>

//       {/* Language Dropdown (Shows only when isOpen is true) */}
//       {isOpen && (
//         <div className="absolute top-12 right-0 bg-white shadow-lg p-2 rounded-md border transition-opacity animate-fadeIn">
//           <select
//             onChange={changeLanguage}
//             defaultValue={i18n.language}
//             className="border p-2 rounded text-black w-32"
//           >
//             <option value="en">🇺🇸 English</option>
//             <option value="fr">🇫🇷 French</option>
//           </select>
//         </div>
//       )}
//     </div>
//   );
// }

// export default LanguageSelector;
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react"; // Icon for the toggle button

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setIsOpen(false); // Close menu after selection
  };

  return (
    <div className="fixed top-12 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white shadow-lg p-2 rounded-full border hover:bg-gray-100 transition"
      >
        <Globe className="w-6 h-6 text-gray-700" />
      </button>

      {/* Language Options (Dropdown) */}
      {isOpen && (
        <div className="absolute top-12 right-0 bg-white shadow-lg p-2 rounded-md border transition-opacity animate-fadeIn flex justify-between items-center">
          <button
            onClick={() => changeLanguage("en")}
            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
              i18n.language === "en"
                ? "font-bold text-blue-600"
                : "text-gray-700"
            }`}
          >
            🇺🇸 English
          </button>
          <button
            onClick={() => changeLanguage("fr")}
            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
              i18n.language === "fr"
                ? "font-bold text-blue-600"
                : "text-gray-700"
            }`}
          >
            🇫🇷 French
          </button>
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
