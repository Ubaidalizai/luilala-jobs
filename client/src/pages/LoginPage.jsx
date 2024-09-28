// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// // Validation schema using Yup
// const loginSchema = yup.object().shape({
//   email: yup.string().email('Invalid email format').required('Email is required'),
//   password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
// });

// export default function LoginPage() {
//   const navigate = useNavigate();

//   // useForm hook from react-hook-form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     setError, // Used to set form errors manually based on API response
//   } = useForm({
//     resolver: yupResolver(loginSchema), // Validate the form based on the schema
//   });

//   // Function to handle form submission
//   const onSubmit = async (data) => {
//       try {
         
//       // Send login data to backend
//       const response = await axios.post('http://127.0.0.1:3000/api/v1/users/auth', {
//         email: data.email,
//         password: data.password,
//       }, {credential: true});

//       // Assuming a successful login returns a token or user data
//       if (response.data.token) {
//         // Store token in local storage or context
//         localStorage.setItem('authToken', response.data.token);

//         // Navigate to dashboard after successful login
//         navigate('/');
//       }
//     } catch (error) {
//       if (error.response) {
//         // If the backend responds with an error, set form errors accordingly
//         const { message } = error.response.data;

//         // Assuming the backend returns specific error messages for email/password
//         if (message.includes('email')) {
//           setError('email', { type: 'manual', message: 'Email not found' });
//         } else if (message.includes('password')) {
//           setError('password', { type: 'manual', message: 'Incorrect password' });
//         }
//       } else {
//         // General error if there's no response from the server
//         console.error('Login error:', error);
//       }
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
//         <h2 className="text-center text-2xl font-bold text-gray-800">Login to Your Account</h2>

//         {/* Login form */}
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Email input */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email address
//             </label>
//             <input
//               type="email"
//               id="email"
//               className={`w-full px-3 py-2 border rounded-md shadow-sm ${
//                 errors.email ? 'border-red-500' : 'border-gray-300'
//               } focus:ring-indigo-500 focus:border-indigo-500`}
//               {...register('email')}
//             />
//             {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//           </div>

//           {/* Password input */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className={`w-full px-3 py-2 border rounded-md shadow-sm ${
//                 errors.password ? 'border-red-500' : 'border-gray-300'
//               } focus:ring-indigo-500 focus:border-indigo-500`}
//               {...register('password')}
//             />
//             {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
//           </div>

//           {/* Submit button */}
//           <div>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               {isSubmitting ? 'Logging in...' : 'Log In'}
//             </button>
//           </div>
//         </form>

//         {/* Option to register or recover password */}
//         <div className="text-center">
//           <p className="text-sm text-gray-600">
//             Don't have an account?{' '}
//             <span
//               className="text-indigo-600 hover:text-indigo-500 cursor-pointer"
//               onClick={() => navigate('/register')}
//             >
//               Sign up
//             </span>
//           </p>
//           <p className="text-sm text-gray-600">
//             Forgot your password?{' '}
//             <span
//               className="text-indigo-600 hover:text-indigo-500 cursor-pointer"
//               onClick={() => navigate('/forgot-password')}
//             >
//               Recover it
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }




import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Validation schema using Yup
const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
});

export default function LoginPage() {
  const navigate = useNavigate();

  // useForm hook from react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError, // Used to set form errors manually based on API response
  } = useForm({
    resolver: yupResolver(loginSchema), // Validate the form based on the schema
  });

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      // Send login data to backend
      const response = await axios.post(
        'http://127.0.0.1:3000/api/v1/users/auth',
        {
          email: data.email,
          password: data.password,
        },
        { credentials: true } // This will allow sending and receiving cookies
      );

      // Assuming a successful login returns a token
      if (response.data.token) {
        // Store token in local storage
        localStorage.setItem('jwt', response.data.token);

        // Set token in cookies (with expiration of 7 days)
        document.cookie = `jwt=${response.data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict`;

        // Navigate to dashboard after successful login
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        // If the backend responds with an error, set form errors accordingly
        const { message } = error.response.data;

        // Assuming the backend returns specific error messages for email/password
        if (message.includes('email')) {
          setError('email', { type: 'manual', message: 'Email not found' });
        } else if (message.includes('password')) {
          setError('password', { type: 'manual', message: 'Incorrect password' });
        }
      } else {
        // General error if there's no response from the server
        console.error('Login error:', error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800">Login to Your Account</h2>

        {/* Login form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-3 py-2 border rounded-md shadow-sm ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:ring-indigo-500 focus:border-indigo-500`}
              {...register('email')}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full px-3 py-2 border rounded-md shadow-sm ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } focus:ring-indigo-500 focus:border-indigo-500`}
              {...register('password')}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting ? 'Logging in...' : 'Log In'}
            </button>
          </div>
        </form>

        {/* Option to register or recover password */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don have an account?{' '}
            <span
              className="text-indigo-600 hover:text-indigo-500 cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Sign up
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Forgot your password?{' '}
            <span
              className="text-indigo-600 hover:text-indigo-500 cursor-pointer"
              onClick={() => navigate('/forgot-password')}
            >
              Recover it
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
