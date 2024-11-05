import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { Analytics } from './components/Analytics';
import { DataSources } from './components/DataSources';
import { PlatformRules } from './components/rules/PlatformRules';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/data-sources" element={<DataSources />} />
            <Route path="/rules" element={<PlatformRules />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}