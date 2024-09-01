import { FaGoogle } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log('User signed in:', result.user);
                const userInfo = {
                    email:result.user?.email,
                    name:result.user?.displayName
                }
                axiosPublic.post('/users',userInfo)
                .then(res =>{
                    console.log(res.data);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Login Successfully",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      navigate('/')
                })
            })
            .catch(error => {
                console.log(error)
            });
    };

    return (
        <div className="w-full flex justify-center">
            <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
            >
                <FaGoogle className="mr-2 text-xl" />
                <span className="text-xl font-bold">Login with Google</span>
            </button>
        </div>
    );
};

export default SocialLogin;
