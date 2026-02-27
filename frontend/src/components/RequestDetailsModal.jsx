import React from "react";

export default function RequestDetailsModal({ isOpen, onClose, request }) {
  if (!isOpen || !request) return null;

  const requestedDocs = request.requested_docs ? JSON.parse(request.requested_docs) : [];
  const clientLink = `${window.location.origin}/UploadDocuments/?staffToken=${request.token}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(clientLink)
      .then(() => alert("Link copied to clipboard!"))
      .catch(() => alert("Failed to copy link."));
  };

  // const handleShare = () => {
  //   const url = encodeURIComponent(clientLink);
  //   const text = encodeURIComponent(`Please upload your documents here:`);
  //   // Open WhatsApp share as example
  //   window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, "_blank");
  // };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-11/12 max-w-md p-6 relative">

        <button
          onClick={onClose}
          className="absolute text-lg top-3 right-3 text-gray-500 hover:text-gray-800 font-bold"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">{request.client_name}'s Request</h2>

        <p className="mb-2"><strong>Title:</strong> {request.title}</p>
        <p className="mb-2"><strong>Due Date:</strong> {request.due_date}</p>

        <h3 className="font-semibold mt-4 mb-2">Requested Documents:</h3>
        <ul className="list-disc pl-5">
          {requestedDocs.map((doc, idx) => (
            <li key={idx}>
              {doc} -{" "}
              <span className={request.status && request.status == "Pending" ? "text-green-600" : "text-red-600"}>
                {request.status && request.status == "Completed" ? "Completed" : "Pending"}
              </span>
            </li>
          ))}
        </ul>

        {request.status !== "Completed" && (
          <div className="mt-6">
            <label className="block mb-2 font-medium">Client Upload Link:</label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                readOnly
                value={clientLink}
                className="flex-1 p-3 border border-gray-300 rounded-lg"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}