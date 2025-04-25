
import React from 'react';
import Link from 'next/link';
// import { useAuth } from '@/context/AuthContext';

const Navbar = () => {

//   const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <span className="text-blue-600 font-bold text-xl cursor-pointer">Teach Team</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/">
                <span className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-blue-600 transition duration-150">
                  Home
                </span>
              </Link>
              <Link href="/tutorForm">
                <span className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-blue-600 transition duration-150">
                  Tutors
                </span>
              </Link>
              <Link href="/lecturer">
                <span className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-blue-600 transition duration-150">
                  Lecturers
                </span>
              </Link>

              <Link href="/lecturer/leaderBoard">
                <span className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-blue-600 transition duration-150">
                  LeaderBoard
                </span>
              </Link>

            </div>
          </div>
          
          <div className="flex items-center">
{/* if user exist then say hi  */}
            {/* {user ? (
              <div className="flex items-center">
                <span className="text-gray-700 mr-4">
                  Hi, {user.email}
                </span>
                <button
                  onClick={logout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none transition duration-150"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 hover:text-blue-600 focus:outline-none transition duration-150 mr-2">
                    Login
                  </span>
                </Link>
                <Link href="/register">
                  <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition duration-150">
                    Register
                  </span>
                </Link>
              </>
            )} */}

          </div>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
