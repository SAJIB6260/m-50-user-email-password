import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";


const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name, email, password, accepted)


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
        else if(!accepted){
            setRegisterError('Please accept our terms and conditions')
            return;
        }

        // create user

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user) 
                setSuccess('user logged in successfully')

                // update Profile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then( () =>{
                    console.log('profile updated')
                })
                .catch()

                sendEmailVerification(result.user)
                .then( () =>{
                    alert('Please check your email and varify your account')
                })

            })
            .catch(error => {
                console.log(error)
                setRegisterError(error.message)
            })
    }

    return (
        <div>
            <div className="mx-auto w-1/2 md:w-1/3">
                <h2 className="text-3xl mb-8">Please Register</h2>
                <form onSubmit={handleRegister}>
                    <span className="text-2xl">Name: </span><br />
                    <input className="mb-4 border bg-base-300 w-full px-4 py-2" type="text" name="name" placeholder="Your Name" id="" required />
                    <br />
                    <span className="text-2xl">Email: </span><br />
                    <input className="mb-4 border bg-base-300 w-full px-4 py-2" type="email" name="email" placeholder="Email Address" id="" required />
                    <br />
                    <span className="text-2xl">Password: </span><br />
                    <div className="mb-4 relative">
                    <input className="border bg-base-300 w-full px-4 py-2" 
                    type={showPassword ? "text" : "password"} 
                    name="password" 
                    placeholder="Password" 
                    id="" 
                    required />
                    <span className="absolute top-4 right-2" onClick={() => setShowPassword(!showPassword)}>
                        {
                            showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                        }
                    </span>
                    </div>
                    <br />
                    <div>
                        <input type="checkbox" name="terms" id="terms" />
                        <label className="ml-2" htmlFor="terms">Accept our <a href="">Terms and Conditions</a></label>
                    </div>
                    <br />
                    <input className="btn btn-secondary w-full px-4 py-2" type="submit" value="Register" />
                </form>
                {
                    registerError && <p className="text-red-600">{registerError}</p>
                }
                {
                    success && <p className="text-green-700">{success}</p>
                }
                <p>Already have an account? Please  <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;