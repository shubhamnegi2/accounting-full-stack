import { useState, useRef, useEffect } from "react";

export default function MultiSelect({ options, formik, name, placeholder }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleOption = (option) => {
    const current = formik.values[name] || [];
    if (current.includes(option)) {
      formik.setFieldValue(name, current.filter((o) => o !== option));
    } else {
      formik.setFieldValue(name, [...current, option]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div
        className="border rounded-lg p-3 cursor-pointer flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        <div className="text-gray-700">
          {formik.values[name]?.length
            ? formik.values[name].join(", ")
            : placeholder}
        </div>
        <svg
          className={`w-4 h-4 transform transition-transform ${open ? "rotate-180" : ""
            }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {open && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-md max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => toggleOption(option)}
            >
              <input
                type="checkbox"
                checked={formik.values[name]?.includes(option) || false}
                readOnly
                className="w-4 h-4"
              />
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}

      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-sm mt-1">{formik.errors[name]}</p>
      )}
    </div>
  );
}