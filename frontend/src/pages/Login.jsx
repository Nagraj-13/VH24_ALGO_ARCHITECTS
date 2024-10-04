import React, { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Label } from '../components/ui/Label'
import { Mail, Lock, User } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Logged in')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
       
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          WelcomeBack to DonorNet
        </h1>
        
        <div className="flex mb-2 justify-center font-semibold">
          <Label className='flex text-2xl justify-center '>Login</Label>                    
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input id="email" type="email" required className="pl-10" />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input id="password" type="password" required className="pl-10" />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
           Login
          </Button>
        </form>
        
        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?
          <Link to="/signup" >
          <button
            className="text-blue-600 hover:underline"
          >
            Signup
          </button>
          </Link>
        </p>
      </div>
    </div>
  )
}