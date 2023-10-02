import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false)

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)


        // error reset
        setRegisterError('');
        setSuccess('');


        if (password.length < 8) {
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setRegisterError('your password at least one UpperCase characters');
            return;
        }

        // create user

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess('user created successfully')
            })
            .catch(error => {
                console.log(error)
                setRegisterError(error.message)
            })
    }

    return (
        <div>
            <div className="mx-auto w-1/2">
                <h2 className="text-3xl mb-8">Please Register</h2>
                <form onSubmit={handleRegister}>
                    <span className="text-2xl">Email: </span><br />
                    <input className="mb-4 border bg-base-300 w-3/4 px-4 py-2" type="email" name="email" placeholder="Email Address" id="" required />
                    {/* {
                        registerError && <p className="text-red-600">{registerError}</p>
                    } */}
                    <br />
                    <span className="text-2xl">Password: </span><br />
                    <input className="mb-4 border bg-base-300 w-3/4 px-4 py-2" 
                    type={showPassword ? "text" : "password"} 
                    name="password" 
                    placeholder="Password" 
                    id="" 
                    required />
                    <span onClick={() => setShowPassword(!showPassword)}>
                        {
                            showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                        }
                    </span>
                    <br />
                    <input className="btn btn-secondary w-3/4 px-4 py-2" type="submit" value="Register" />
                </form>
                {
                    registerError && <p className="text-red-600">{registerError}</p>
                }
                {
                    success && <p className="text-green-700">{success}</p>
                }
            </div>
        </div>
    );
};

export default Register;