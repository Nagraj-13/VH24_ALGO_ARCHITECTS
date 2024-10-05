import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IndianRupee, Users, TrendingUp, PlusCircle, Package, Clock, BarChart2, Send } from 'lucide-react'

export default function InstituteDashboard() {
  const [activeTab, setActiveTab] = useState('requests')
  const [newRequest, setNewRequest] = useState({ title: '', amount: '', description: '' })

  const profileData = {
    name: "Global Care Foundation",
    totalDonations: 150000,
    totalDonors: 1250,
    impactScore: 91,
  }

  const tabData = {
    requests: [
      { id: 1, title: 'Emergency Relief Fund', amount: 50000, status: 'Active', progress: 60 },
      { id: 2, title: 'Children\'s Education Program', amount: 25000, status: 'Active', progress: 40 },
      { id: 3, title: 'Community Health Initiative', amount: 35000, status: 'Completed', progress: 100 },
    ],
    tracking: [
      { id: 1, title: 'COVID-19 Response', amount: 75000, status: 'In Progress', progress: 80 },
      { id: 2, title: 'Clean Water Project', amount: 40000, status: 'Just Started', progress: 10 },
      { id: 3, title: 'Hunger Relief Program', amount: 30000, status: 'Almost Complete', progress: 95 },
    ],
    history: [
      { id: 1, title: 'Disaster Relief Fund', amount: 100000, date: '2023-01-15', impact: '5000 families assisted' },
      { id: 2, title: 'Youth Empowerment Initiative', amount: 50000, date: '2022-11-20', impact: '1000 youth trained' },
      { id: 3, title: 'Environmental Conservation', amount: 25000, date: '2022-09-05', impact: '10000 trees planted' },
    ],
  }

  const handleNewRequestSubmit = (e) => {
    e.preventDefault()
    console.log('New request submitted:', newRequest)
    // Here you would typically send this data to your backend
    setNewRequest({ title: '', amount: '', description: '' })
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
            {(activeTab === 'requests' || activeTab === 'tracking') && (
              <>
                <p className="text-gray-600 mb-2">Status: {item.status}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div 
                    className="bg-blue-500 h-2.5 rounded-full" 
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-500">₹ {item.amount.toLocaleString()}</span>
                  <span className="text-blue-500 font-semibold">{item.progress}% Complete</span>
                </div>
              </>
            )}
            {activeTab === 'history' && (
              <>
                <p className="text-gray-600 mb-2">Date: {item.date}</p>
                <p className="text-gray-600 mb-4">Impact: {item.impact}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-500">₹ {item.amount.toLocaleString()}</span>
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">{profileData.name} Dashboard</h1>
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-100 rounded-lg p-6 flex items-center">
              <IndianRupee className="h-12 w-12 text-green-500 mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">₹ {profileData.totalDonations.toLocaleString()}</h2>
                <p className="text-gray-600">Total Donations Received</p>
              </div>
            </div>
            <div className="bg-blue-100 rounded-lg p-6 flex items-center">
              <Users className="h-12 w-12 text-blue-500 mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{profileData.totalDonors.toLocaleString()}</h2>
                <p className="text-gray-600">Total Donors</p>
              </div>
            </div>
            <div className="bg-purple-100 rounded-lg p-6 flex items-center">
              <TrendingUp className="h-12 w-12 text-purple-500 mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{profileData.impactScore}/100</h2>
                <p className="text-gray-600">Impact Score</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="flex flex-wrap space-x-4 mb-6">
            <button
              className={`flex items-center px-4 py-2 rounded-full mb-2 ${
                activeTab === 'requests' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveTab('requests')}
            >
              <BarChart2 className="h-5 w-5 mr-2" />
              Donation Requests
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-full mb-2 ${
                activeTab === 'tracking' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveTab('tracking')}
            >
              <Package className="h-5 w-5 mr-2" />
              Donation Tracking
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-full mb-2 ${
                activeTab === 'history' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveTab('history')}
            >
              <Clock className="h-5 w-5 mr-2" />
              Donation History
            </button>
          </div>
          {activeTab === 'requests' && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Create New Request</h3>
              <form onSubmit={handleNewRequestSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={newRequest.title}
                    onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount ($)</label>
                  <input
                    type="number"
                    id="amount"
                    value={newRequest.amount}
                    onChange={(e) => setNewRequest({...newRequest, amount: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="description"
                    value={newRequest.description}
                    onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Create Request
                </button>
              </form>
            </div>
          )}
          <TabContent data={tabData[activeTab]} />
        </div>
      </div>
    </div>
  )
}