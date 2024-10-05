import React from 'react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Label } from '../components/ui/Label'
import { Heart, Building, Truck, CheckCircle, Gift, Users, Shield } from "lucide-react"
import { useNavigate, Link } from 'react-router-dom'


export default function Home() {
  const imgpath = "https://img.freepik.com/free-vector/charity-flat-concept-with-smiling-volunteers-holding-donation-boxes-big-heart-vector-illustration_1284-79449.jpg?t=st=1728096563~exp=1728100163~hmac=16c4993b0427167bfb61402809bf7a825ce46aee51b7daae106f3c5810fe2536&w=1380"

  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">DonorNet</div>
        <nav>
          <Button variant="ghost"><Link to="/login">Login</Link></Button>
          <Button variant="outline" className="ml-2"><Link to="/signup">Sign Up</Link></Button>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* <section className="text-center mb-16 mt-4">
          <h1 className="text-5xl font-bold mb-4">Connecting Generosity with Need</h1>
          <p className="text-2xl text-gray-600 mb-8">Join our community of givers and make a lasting impact on causes you care about.<br /> Together, we can create a better world.</p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white"><Link to="/signup">Get Started</Link></Button>
        </section> */}

<section className="flex flex-col md:flex-row items-center justify-around  md:py-6 ml-4 mb-8 px-6">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Connecting Generosity with Need
              {/* <span className="text-teal-600"> Our Planet's Future</span> */}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
            Join our community of givers and make a lasting impact on causes you care about. Together, we can create a better world.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigate('/signup')}>
                Get started
              </Button>
            
              
            </div>
          </div>
          <div className="md:w-[50%]">
            <img
              src={imgpath}
              alt="Illustration of people planting trees and caring for the environment"
              className="rounded-lg shadow-2xl w-[100%]"
            />
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Heart className="w-10 h-10 text-red-500 mb-2" />
            <h2 className="text-xl font-bold mb-2">For Donors</h2>
            <p className="text-gray-600 mb-4">Make a difference with your generosity</p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Find causes you care about</li>
              <li>Track your donations</li>
              <li>See the impact of your giving</li>
            </ul>
            <Button className="w-full"><Link to="/donarRegistration">Donate Now</Link></Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Building className="w-10 h-10 text-blue-500 mb-2" />
            <h2 className="text-xl font-bold mb-2">For Institutes</h2>
            <p className="text-gray-600 mb-4">Receive support for your cause</p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Create fundraising campaigns</li>
              <li>Manage donations efficiently</li>
              <li>Connect with donors and suppliers</li>
            </ul>
            <Button className="w-full"><Link to="/instituteRegistration">Register Institute</Link></Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Truck className="w-10 h-10 text-green-500 mb-2" />
            <h2 className="text-xl font-bold mb-2">For Suppliers</h2>
            <p className="text-gray-600 mb-4">Provide goods and services</p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>List your products or services</li>
              <li>Fulfill donation requests</li>
              <li>Grow your business while helping others</li>
            </ul>
            <Button className="w-full"><Link to="/supplierRegistration">Become a Supplier</Link></Button>
          </div>
        </section>

        <section className="bg-white rounded-lg py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <Shield className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure & Transparent</h3>
              <p className="text-gray-600">Every transaction is secure and fully traceable</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Gift className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Diverse Causes</h3>
              <p className="text-gray-600">Support Verified Causes Aligned Values</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Users className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community-Driven</h3>
              <p className="text-gray-600">Collaborate, Donate, and Amplify Impact</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigate('/signup')}>Join DonorNet Today</Button>
        </div>
      </section>
        
      </main>

      <footer className="bg-gray-100 p-4 text-center text-gray-600 ">
        <p>&copy; 2024 DonorNet. All rights reserved.</p>
      </footer>
    </div>
  )
}