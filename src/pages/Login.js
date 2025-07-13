import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; // תיקון היבוא ל-useAuth

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setIsAuthenticated } = useAuth(); // שימוש ב-useAuth
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        // Mock API call (replace with real backend call later)
        try {
            const response = { success: true }; // Placeholder
            if (response.success) {
                setIsAuthenticated(true);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">התחברות</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">אימייל</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">סיסמה</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                    >
                        התחבר
                    </button>
                </form>
                <p className="mt-2 text-center">
                    אין לך חשבון?{' '}
                    <a href="/register" className="text-blue-600 hover:underline">
                        הרשם כאן
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;