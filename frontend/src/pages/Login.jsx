import { useState } from "react";
import { useNavigate } from "react-router-dom"
const apiUrl = import.meta.env.VITE_API_URL;
export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false);

    const validate = () => {
        let newErrors = {};

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!password) {
            newErrors.password = "Password is required";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setApiError("");
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setLoading(true);

     try {
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const res = await fetch(`${apiUrl}/login.php`, {
        method: "POST",
        body: formData
    });

    const data = await res.json();

    if (!res.ok || !data.staffToken || !data.staffId) {
        setApiError(data.error || "Invalid email or password");
        setLoading(false);
        return;
    }

    // Save token and staff ID
    localStorage.setItem("staffToken", data.staffToken);
    localStorage.setItem("staffId", data.staffId);
    localStorage.setItem("staffEmail", email);

    alert("Login successful");
    navigate("/dashboard");
} catch (err) {
    console.error("Network error", err);
    alert("Network error. Please try again.");
} finally {
    setLoading(false);
}

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">

            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

                <h2 className="text-2xl font-semibold text-slate-800 text-center mb-1">
                    Staff Portal
                </h2>

                <p className="text-sm text-slate-500 text-center mb-6">
                    Manage and track client document requests securely
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>

                    <div>
                        <label className="block text-sm text-slate-600 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full h-11 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors(prev => ({ ...prev, email: "" }));
                            }}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm text-slate-600 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full h-11 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors(prev => ({ ...prev, password: "" }));
                            }}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {apiError && (
                        <p className="text-red-600 text-sm text-center">
                            {apiError}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 bg-slate-800 text-white rounded-lg flex items-center justify-center hover:bg-slate-900 transition"
                    >
                        {loading ? (
                            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Login"
                        )}
                    </button>

                </form>

            </div>

        </div>
    );
}