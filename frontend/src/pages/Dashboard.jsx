import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
const apiUrl = import.meta.env.VITE_API_URL;
import RequestDetailsModal from "../components/RequestDetailsModal";
import NotificationIcon from "../components/NotificationIcon";
import NotificationsPage from "../components/NotificationsPage";
import MultiSelect from "../components/MultiSelect";

export default function Dashboard() {

  const email = localStorage.getItem("staffEmail");
  const staffId = localStorage.getItem("staffId");

  const name = email
    ?.split("@")[0]
    .match(/^[a-zA-Z]+/)?.[0] || "Sir/Ma'am";

  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  const handleOpenModal = (req) => {
    setSelectedRequest(req);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
    setIsModalOpen(false);
  };

  const limit = 10;
  const fetchRequests = async (page = 1, staffId) => {
    try {
      if (!staffId) return;

      const res = await fetch(
        `${apiUrl}/get-all-requests.php?page=${page}&staff_id=${staffId}`
      );
      const result = await res.json();

      setRequests(result.data);
      setCurrentPage(result.currentPage);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error("Failed to fetch requests", err);
    }
  };

  useEffect(() => {
    fetchRequests(currentPage, staffId);
  }, [currentPage, staffId]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const documentOptions = [
    "Aadhar Card",
    "PAN Card",
    "Bank Statement",
    "Invoice",
    "Other",
  ];


  const formik = useFormik({
    initialValues: {
      clientName: "",
      clientEmail: "",
      title: "",
      description: "",
      dueDate: "",
      requestedDocs: [],
    },

    validationSchema: Yup.object({

      clientName: Yup.string()
        .matches(/^[A-Za-z ]+$/, "Invalid name (Alphabets Only)")
        .min(3, "Min 3 characters required")
        .required("Client name is required"),

      clientEmail: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

      title: Yup.string()
        .required("Title is required"),

      description: Yup.string()
        .required("Description is required"),

      dueDate: Yup.date()
        .required("Due date is required")
        .min(new Date(), "Past date not allowed"),

      requestedDocs: Yup.array().min(1, "Select at least 1 document"),
    }),


    onSubmit: async (values, { resetForm }) => {
      const data = new FormData();
      data.append("staff_id", staffId);
      data.append("client_name", values.clientName);
      data.append("client_email", values.clientEmail);
      data.append("title", values.title);
      data.append("description", values.description);
      data.append("due_date", values.dueDate);
      values.requestedDocs.forEach((doc) => data.append("requested_docs[]", doc));

      try {
        const res = await fetch(`${apiUrl}/create-request.php`, {
          method: "POST",
          body: data
        });

        const result = await res.json();

        if (res.ok) {
          alert('Request created successfully');
          resetForm();
          fetchRequests(currentPage, staffId);
        } else {
          alert("Error: " + (result.error || "Something went wrong"));
        }

      } catch (err) {
        console.error("Network error", err);
        alert("Network error. Please try again.");
      }
    }


  });

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">

        <header className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Hi {name}
          </h1>

          <button
            onClick={() => {
              localStorage.removeItem("staffToken");
              localStorage.removeItem("staffId");
              window.location = "/login";
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Logout
          </button>
        </header>

        <div className="mb-6 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Create Document Request
          </h2>

          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >

            <div>
              <label className="text-gray-600 text-sm font-medium px-1 mb-1 inline-block" >Client Name</label>

              <input
                type="text"
                name="clientName"
                className="p-3 border rounded-lg w-full"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.clientName}
              />
              {formik.touched.clientName && formik.errors.clientName && (
                <p className="text-red-500 text-sm">
                  {formik.errors.clientName}
                </p>
              )}
            </div>

            <div>
              <label className="text-gray-600 text-sm font-medium px-1 mb-1 inline-block" >Client Email</label>
              <input
                type="email"
                name="clientEmail"
                className="p-3 border rounded-lg w-full"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.clientEmail}
              />
              {formik.touched.clientEmail && formik.errors.clientEmail && (
                <p className="text-red-500 text-sm">
                  {formik.errors.clientEmail}
                </p>
              )}
            </div>

            <div>
              <label className="text-gray-600 text-sm font-medium px-1 mb-1 inline-block" >Title</label>

              <input
                type="text"
                name="title"
                className="p-3 border rounded-lg w-full"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-red-500 text-sm">
                  {formik.errors.title}
                </p>
              )}
            </div>

            <div>
              <label className="text-gray-600 text-sm font-medium px-1 mb-1 inline-block" >Description</label>
              <input
                type="text"
                name="description"
                className="p-3 border rounded-lg w-full"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-sm">
                  {formik.errors.description}
                </p>
              )}
            </div>

            <div>
              <label className="text-gray-600 text-sm font-medium px-1 mb-1 inline-block" htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                name="dueDate"
                className="p-3 border rounded-lg w-full"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dueDate}
              />
              {formik.touched.dueDate && formik.errors.dueDate && (
                <p className="text-red-500 text-sm">
                  {formik.errors.dueDate}
                </p>
              )}
            </div>
            <div className="">
              <label className="text-gray-600 text-sm font-medium px-1 mb-1 inline-block" >Document</label>
              <MultiSelect options={documentOptions} formik={formik} name="requestedDocs" placeholder="Select requested documents" />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-3 w-full sm:w-2/4 m-auto rounded-lg md:col-span-2"
            >
              Create Request
            </button>

          </form>
        </div>



        <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">

          <h2 className="text-xl font-semibold mb-4">
            Document Requests
          </h2>
          {requests.length === 0 ? (
            <div className="text-center py-10 text-gray-500 font-medium">
              No Records
            </div>
          ) : <div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="text-left">
                  <th className="px-4 py-2">Client</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Due Date</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((req) => (
                  <tr key={req.id}>
                    <td className="px-4 py-2">
                      {req.client_name || "-"}
                      <br />
                      <span className="text-gray-400 text-sm">{req.client_email || "-"}</span>
                    </td>
                    <td className="px-4 py-2">{req.title || "-"}</td>
                    <td className="px-4 py-2">{req.due_date !== "0000-00-00" ? req.due_date : "-"}</td>
                    <td className="px-4 py-2">
                      {(() => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const dueDate = new Date(req.due_date);
                        let status = req.status;
                        if (status !== "Completed" && dueDate < today) {
                          status = "Expired";
                        }
                        return (
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${status === "Pending"
                              ? "bg-yellow-500 text-white"
                              : status === "Completed"
                                ? "bg-green-500 text-white"
                                : "bg-gray-500 text-white" // Expired
                              }`}
                          >
                            {status}
                          </span>
                        );
                      })()}
                    </td>
                    <td className="px-4 py-2">
                      <button onClick={() => handleOpenModal(req)} className="bg-blue-600 px-2 py-1 rounded-full text-xs text-white ">Details</button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white"
                  }`}
              >
                Prev
              </button>

              <span>Page {currentPage} of {totalPages}</span>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white"
                  }`}
              >
                Next
              </button>
            </div>
          </div>
          }
        </div>
      </div>
      {showNotificationPopup && (
        <NotificationsPage
          onClose={() => setShowNotificationPopup(false)}
        />
      )}
      <NotificationIcon
        count={requests.length}
        onClick={() => setShowNotificationPopup(true)}
      />
      <RequestDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        request={selectedRequest}
      />
    </>
  );
}