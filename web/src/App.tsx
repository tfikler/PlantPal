import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { LoginForm } from './components/LoginForm/LoginForm';
import { RegisterForm } from './components/RegisterForm/RegisterForm';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Navbar } from './components/Navbar/Navbar';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="min-h-screen bg-gray-50">
                    <Navbar />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <Routes>
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/register" element={<RegisterForm />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/" element={<Navigate to="/dashboard" />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </Provider>
    );
}

export default App;