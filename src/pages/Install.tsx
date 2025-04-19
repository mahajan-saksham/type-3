// No need for React import with modern JSX transform
import { Link } from 'react-router-dom';
import { HomeIcon, Sun, Battery, ArrowRight } from 'lucide-react';

function Install() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Rooftop Solar Installation</h1>

        {/* Benefits */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Benefits of Going Solar</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Battery className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Save on Bills</h3>
              <p className="text-gray-600">Reduce your electricity bills by 80-90% with solar power</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Sun className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">40% Subsidy</h3>
              <p className="text-gray-600">Get government subsidy on your installation</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <HomeIcon className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">25-Year Warranty</h3>
              <p className="text-gray-600">Long-term performance guarantee on solar panels</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-yellow-50 p-8 rounded-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Go Solar?</h2>
          <p className="text-gray-600 mb-8">Book a free site survey and get a customized quote for your roof</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/roi" className="inline-flex items-center px-8 py-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
              Calculate Savings <ArrowRight className="ml-2" />
            </Link>
            <Link to="/dashboard" className="inline-flex items-center px-8 py-4 border-2 border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-50 transition-colors">
              Book Site Survey <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Install;