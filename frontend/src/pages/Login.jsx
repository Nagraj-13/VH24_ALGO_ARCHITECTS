import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Mail, Lock } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [userType, setUserType] = useState(''); // To store the selected user type

  
  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log('Logged in', data);
    axios.post("http://localhost:5000/api/v1/auth/login", {data,userType})
      .then(res => {
        console.log(res.data);
        localStorage.setItem("token",JSON.stringify(res.data.token));
        if (userType === 'donor') {
          navigate('/donorDashboard');
      } else if (userType === 'institute') {
          navigate('/instituteDashboard');
      } else if (userType === 'supplier') {
          navigate('/supplierDashboard');
      }
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back to DonorNet
        <div className="flex mb-2 justify-center font-semibold">
          <Label className='flex text-2xl justify-center'>Login</Label>                    
        </div>
        </h1>
        <div className='flex justify-evenly '>
                      <Label>
                          <input
                              type="radio"
                              value="donor"
                              checked={userType === 'donor'}
                              onChange={(e) => setUserType(e.target.value)}
                          />
                          Donor
                      </Label>
                      <Label>
                          <input
                              type="radio"
                              value="institute"
                              checked={userType === 'institute'}
                              onChange={(e) => setUserType(e.target.value)}
                          />
                          Institute
                      </Label>
                      <Label>
                          <input
                              type="radio"
                              value="supplier"
                              checked={userType === 'supplier'}
                              onChange={(e) => setUserType(e.target.value)}
                          />
                          Supplier
                      </Label>
                  </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input id="email" type="email" required {...register('email')} className="pl-10" />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input id="password" type="password" required {...register('password')} className="pl-10" />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Login
          </Button>
        </form>
        
        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?
          <Link to="/signup">
            <button className="text-blue-600 hover:underline">
              Signup
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
}
