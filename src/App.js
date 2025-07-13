import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <AuthProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="*" element={<Login />} /> {/* Default route */}
                        </Routes>
                    </BrowserRouter>
                </AuthProvider>
            </header>
        </div>
    );
}

export default App;