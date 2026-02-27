import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function UploadDocuments() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const staffToken = params.get("staffToken");

    const [requestData, setRequestData] = useState(null);
    const [requestedDocs, setRequestedDocs] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitStatus, setSubmitStatus] = useState("");
    const [justUploaded, setJustUploaded] = useState(false);

    const allowedTypes = [
        "application/pdf",
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
        "image/webp",
    ];

    const maxSize = 2 * 1024 * 1024;

    // FETCH DATA
    useEffect(() => {
        if (!staffToken) {
            setSubmitStatus("Access denied: Token missing.");
            setLoading(false);
            return;
        }

        fetch(`${apiUrl}/get-requests-by-token.php?staffToken=${staffToken}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data || data.length === 0) {
                    setSubmitStatus("Invalid token or no request found.");
                    setLoading(false);
                    return;
                }

                const request = data[0];

                setRequestData(request);

                const docs = request.requested_docs
                    ? JSON.parse(request.requested_docs)
                    : [];

                setRequestedDocs(docs);
                setSelectedFiles(docs.map(() => null));
                setErrors(docs.map(() => ""));
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setSubmitStatus("Failed to fetch request data.");
                setLoading(false);
            });
    }, [staffToken]);

    const handleFileChange = (e, idx) => {
        const file = e.target.files[0];
        const updatedFiles = [...selectedFiles];
        const updatedErrors = [...errors];

        if (!file) {
            updatedFiles[idx] = null;
            updatedErrors[idx] = "This document is required.";
        } else if (!allowedTypes.includes(file.type)) {
            updatedFiles[idx] = null;
            updatedErrors[idx] = "Invalid file type.";
        } else if (file.size > maxSize) {
            updatedFiles[idx] = null;
            updatedErrors[idx] = "File size exceeds 2MB.";
        } else {
            updatedFiles[idx] = file;
            updatedErrors[idx] = "";
        }

        setSelectedFiles(updatedFiles);
        setErrors(updatedErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = selectedFiles.map((f) =>
            f ? "" : "This document is required."
        );

        setErrors(newErrors);
        if (newErrors.some((err) => err !== "")) return;

        const formData = new FormData();
        formData.append("token", staffToken);

        selectedFiles.forEach((file) => {
            formData.append("files[]", file);
        });

        fetch(`${apiUrl}/document-upload.php`, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.errors && data.errors.length === 0) {
                    setJustUploaded(true); // ✅ show thank you
                } else {
                    setSubmitStatus(
                        "Upload failed: " +
                        (data.errors ? data.errors.join(", ") : "")
                    );
                }
            })
            .catch(() => {
                setSubmitStatus("Network error.");
            });
    };



    if (loading)
        return <div className="p-6 text-center">Loading...</div>;

    if (!requestData)
        return (
            <div className="p-6 text-center text-red-600">
                {submitStatus}
            </div>
        );

    if (justUploaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                    <h2 className="text-2xl font-bold text-green-600">
                        Thank You! Your documents have been uploaded successfully.
                    </h2>
                </div>
            </div>
        );
    }

    if (requestData.status === "Completed") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                    <h2 className="text-2xl font-bold text-green-600">
                        Document already uploaded
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow-xl">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Document Upload
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {requestedDocs.map((doc, idx) => (
                        <div key={idx}>
                            <label className="block font-medium mb-2">
                                {doc}
                            </label>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(e, idx)}
                                className="w-full border p-2 rounded"
                            />
                            {errors[idx] && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors[idx]}
                                </p>
                            )}
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg"
                    >
                        Submit Uploads
                    </button>
                </form>

                {submitStatus && (
                    <p className="mt-4 text-center text-red-600">
                        {submitStatus}
                    </p>
                )}
            </div>
        </div>
    );
}