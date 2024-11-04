// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UsuariosPage from './pages/UsuariosPage';
import AgricultoresPage from './pages/AgricultoresPage';
import ParcelasPage from './pages/ParcelasPage';
import EmisionesPage from './pages/EmisionesPage';
import Dashboard from './pages/Dashboard';
import ReportesPage from './pages/ReportesPage'; // Importa ReportesPage
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                {/* Ruta de login sin protección */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* Rutas protegidas */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/usuarios"
                    element={
                        <ProtectedRoute>
                            <UsuariosPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/agricultores"
                    element={
                        <ProtectedRoute>
                            <AgricultoresPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/parcelas"
                    element={
                        <ProtectedRoute>
                            <ParcelasPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/emisiones"
                    element={
                        <ProtectedRoute>
                            <EmisionesPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/reportes"
                    element={
                        <ProtectedRoute>
                            <ReportesPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
