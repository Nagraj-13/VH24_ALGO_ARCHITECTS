'use client'

import React, { useState, useEffect} from 'react'
import { motion } from 'framer-motion'
import { Package, Truck, Clock, BarChart2, Calendar, Box, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import axios from 'axios'
export default function SupplierDashboard() {

  const [req, setReq] = useState([]);


  useEffect(()=>{
   const getRequests = async ()=>{
      const token = localStorage.getItem('token');
      console.log(token)
      axios.get('http://localhost:5000/api/v1/supplier/fetch-request',{
        headers:{
        'Authorization':`Bearer ${token}`,
        'Content-Type': 'application/json', 
      }})
      .then((res)=>{
        console.log(res)
        setReq(res.data.requests[0])
      })
      .catch(err=>console.log(err))
    }
    getRequests();
    console.log("Request",req)
  } ,[])
  const [activeTab, setActiveTab] = useState('Requests')
  const [availability, setAvailability] = useState(true)
  const [trackingData, setTrackingData] = useState([
    { id: 1, name: 'Emergency Supplies', quantity: 1000, status: 'Accepted', destination: 'Red Cross HQ' },
    { id: 2, name: 'Medical Equipment', quantity: 50, status: 'Packed', destination: 'City Hospital' },
    { id: 3, name: 'Food Packages', quantity: 5000, status: 'Delivering', destination: 'Community Center' },
  ])

  const profileData = {
    name: "Global Supply Co.",
    totalDonatedItems: 15000,
    activeDeliveries: 25,
    reliabilityScore: 98,
  }

  const tabData = {
    Requests: [
      { id: 1, name: 'Canned Food', quantity: 5000, unit: 'cans', status: 'In Stock' },
      { id: 2, name: 'Blankets', quantity: 1000, unit: 'pieces', status: 'Low Stock' },
      { id: 3, name: 'First Aid Kits', quantity: 500, unit: 'kits', status: 'In Stock' },
    ],
    history: [
      { id: 1, name: 'Winter Clothing', quantity: 2000, date: '2023-01-15', recipient: 'Homeless Shelter' },
      { id: 2, name: 'School Supplies', quantity: 5000, date: '2022-08-20', recipient: 'Education Foundation' },
      { id: 3, name: 'Hygiene Kits', quantity: 1000, date: '2022-06-05', recipient: 'Disaster Relief Org' },
    ],
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'In Stock':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'Low Stock':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'Out of Stock':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getTrackingIcon = (status) => {
    switch (status) {
      case 'Accepted':
        return <CheckCircle className="h-5 w-5 text-blue-500" />
      case 'Packed':
        return <Box className="h-5 w-5 text-yellow-500" />
      case 'Delivering':
        return <Truck className="h-5 w-5 text-orange-500" />
      case 'Delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return null
    }
  }

  const handleStatusChange = (id, newStatus) => {
    setTrackingData(trackingData.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ))
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
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.name}</h3>
            {activeTab === 'Requests' && (
              <>
                <p className="text-gray-600 mb-2">Quantity: {item.quantity} {item.unit}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-700">Status: {item.status}</span>
                  {getStatusIcon(item.status)}
                </div>
              </>
            )}
            {activeTab === 'tracking' && (
              <>
                <p className="text-gray-600 mb-2">Quantity: {item.quantity}</p>
                <p className="text-gray-600 mb-2">Destination: {item.destination}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-700">Status: {item.status}</span>
                  {getTrackingIcon(item.status)}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleStatusChange(item.id, 'Accepted')}
                    className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Accepted
                  </button>
                  <button
                    onClick={() => handleStatusChange(item.id, 'Packed')}
                    className="px-2 py-1 text-xs font-semibold text-white bg-yellow-500 rounded hover:bg-yellow-600"
                  >
                    Packed
                  </button>
                  <button
                    onClick={() => handleStatusChange(item.id, 'Delivering')}
                    className="px-2 py-1 text-xs font-semibold text-white bg-orange-500 rounded hover:bg-orange-600"
                  >
                    Delivering
                  </button>
                  <button
                    onClick={() => handleStatusChange(item.id, 'Delivered')}
                    className="px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded hover:bg-green-600"
                  >
                    Delivered
                  </button>
                </div>
              </>
            )}
            {activeTab === 'history' && (
              <>
                <p className="text-gray-600 mb-2">Quantity: {item.quantity}</p>
                <p className="text-gray-600 mb-2">Date: {item.date}</p>
                <p className="text-gray-600">Recipient: {item.recipient}</p>
              </>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">{profileData.name} Dashboard</h1>
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-green-100 rounded-lg p-6 flex items-center">
              <Package className="h-12 w-12 text-green-500 mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{profileData.totalDonatedItems.toLocaleString()}</h2>
                <p className="text-gray-600">Total Donated Items</p>
              </div>
            </div>
            <div className="bg-blue-100 rounded-lg p-6 flex items-center">
              <Truck className="h-12 w-12 text-blue-500 mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{profileData.activeDeliveries}</h2>
                <p className="text-gray-600">Active Deliveries</p>
              </div>
            </div>
            <div className="bg-purple-100 rounded-lg p-6 flex items-center">
              <BarChart2 className="h-12 w-12 text-purple-500 mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{profileData.reliabilityScore}%</h2>
                <p className="text-gray-600">Reliability Score</p>
              </div>
            </div>
            <div className="bg-yellow-100 rounded-lg p-6 flex items-center">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Availability</h2>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" checked={availability} onChange={() => setAvailability(!availability)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {availability ? 'Available' : 'Unavailable'}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="flex flex-wrap space-x-4 mb-6">
            <button
              className={`flex items-center px-4 py-2 rounded-full mb-2 ${
                activeTab === 'Requests' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveTab('Requests')}
            >
              <Box className="h-5 w-5 mr-2" />
              Inventory
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-full mb-2 ${
                activeTab === 'tracking' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveTab('tracking')}
            >
              <Truck className="h-5 w-5 mr-2" />
              Tracking
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-full mb-2 ${
                activeTab === 'history' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveTab('history')}
            >
              <Clock className="h-5 w-5 mr-2" />
              History
            </button>
          </div>
          {
            req.map((request) => (
              <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Request</h3>
              <p className="text-gray-600 mb-2">Institute ID: {request.instituteId}</p>
              <p className="text-gray-600 mb-2">Request Status: {request.isFullfilled ? 'Fullfilled' : 'Not Fullfilled'}</p>
              {request.items.length > 0 && (
                <>
                  <h4 className="text-lg font-semibold mb-2 text-gray-700">Items:</h4>
                  <ul>
                    {request.items.map((item) => (
                      <li key={item._id} className="flex justify-between mb-2">
                        <span>{item.name} - Quantity: {item.quantity}</span>
                        <span>{getStatusIcon(item.isFullfilled)}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            ))
          }
          <TabContent data={activeTab === 'tracking' ? trackingData : tabData[activeTab]} />
        </div>
        <div className="mt-8 bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Deliveries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold">Delivery #{index + 1}</span>
                  <Calendar className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-gray-600">Date: {new Date(Date.now() + (index + 1) * 86400000).toLocaleDateString()}</p>
                <p className="text-gray-600">Items: Various supplies</p>
                <p className="text-gray-600">Destination: Local Charity</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}