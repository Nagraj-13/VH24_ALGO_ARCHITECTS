import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, IndianRupee, Clock, BarChart2, Gift, Package, TrendingUp } from 'lucide-react'

export default function DonorDashboard() {
  const [activeTab, setActiveTab] = useState('requested')

  const tabData = {
    requested: [
      { id: 1, title: '10kg Rice', amount: 5000, organization: 'WaterAid' },
      { id: 2, title: 'Education for All', amount: 2500, organization: 'UNICEF' },
      { id: 3, title: 'Hunger Relief Program', amount: 3000, organization: 'World Food Programme' },
    ],
    tracking: [
      { id: 1, title: 'Medical Supplies', amount: 1000, status: 'In Transit', progress: 70 },
      { id: 2, title: 'Disaster Relief', amount: 5000, status: 'Delivered', progress: 100 },
      { id: 3, title: 'Animal Shelter', amount: 500, status: 'Processing', progress: 30 },
    ],
    history: [
      { id: 1, title: 'COVID-19 Response', amount: 2000, date: '2023-03-15', impact: '1000 people helped' },
      { id: 2, title: 'Reforestation Project', amount: 1500, date: '2023-02-01', impact: '500 trees planted' },
      { id: 3, title: 'Children\'s Hospital', amount: 3000, date: '2023-01-10', impact: '50 children treated' },
    ],
  }

  const TabContent = ({ data }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {data.map((item) => (
        <motion.div
          key={item.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
            {activeTab === 'requested' && (
              <>
                <p className="text-gray-600 mb-4">Requested by: {item.organization}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-500">₹ {item.amount}</span>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">
                    Donate
                  </button>
                </div>
              </>
            )}
            {activeTab === 'tracking' && (
              <>
                <p className="text-gray-600 mb-2">Status: {item.status}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${item.progress}%` }}></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-500">₹ {item.amount}</span>
                  <span className="text-blue-500 font-semibold">{item.progress}% Complete</span>
                </div>
              </>
            )}
            {activeTab === 'history' && (
              <>
                <p className="text-gray-600 mb-2">Date: {item.date}</p>
                <p className="text-gray-600 mb-4">Impact: {item.impact}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-500">₹ {item.amount}</span>
                  <button className="text-blue-500 hover:underline">View Details</button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Donor Dashboard</h1>
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-100 rounded-lg p-6 flex items-center">
              <IndianRupee className="h-12 w-12 text-green-500 mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">₹ 12,500</h2>
                <p className="text-gray-600">Total Donations</p>
              </div>
            </div>
            <div className="bg-blue-100 rounded-lg p-6 flex items-center">
              <Gift className="h-12 w-12 text-blue-500 mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">15</h2>
                <p className="text-gray-600">Projects Supported</p>
              </div>
            </div>
            <div className="bg-purple-100 rounded-lg p-6 flex items-center">
              <TrendingUp className="h-12 w-12 text-purple-500 mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">+25%</h2>
                <p className="text-gray-600">Impact Increase</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="flex space-x-4 mb-6">
            <button
              className={`flex items-center px-4 py-2 rounded-full ${
                activeTab === 'requested' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveTab('requested')}
            >
              <BarChart2 className="h-5 w-5 mr-2" />
              Requested Donations
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-full ${
                activeTab === 'tracking' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveTab('tracking')}
            >
              <Package className="h-5 w-5 mr-2" />
              Donation Tracking
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-full ${
                activeTab === 'history' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveTab('history')}
            >
              <Clock className="h-5 w-5 mr-2" />
              Donation History
            </button>
          </div>
          <TabContent data={tabData[activeTab]} />
        </div>
      </div>
    </div>
  )
}