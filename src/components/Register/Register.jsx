import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";


const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('')

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)


        // error reset
        setRegisterError('');
        setSuccess('');


        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer');
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
            <div className="mx-auto w-1/4">
                <h2 className="text-3xl mb-8">Please Register</h2>
                <form onSubmit={handleRegister}>
                    <span className="text-2xl">Email: </span><input className="mb-4 border bg-base-300 w-full px-4 py-2" type="email" name="email" placeholder="Email Address" id="" required />
                    {/* {
                        registerError && <p className="text-red-600">{registerError}</p>
                    } */}
                    <br />
                    <span className="text-2xl">Password: </span><input className="mb-4 border bg-base-300 w-full px-4 py-2" type="password" name="password" placeholder="Password" id="" required />
                    <br />
                    <input className="btn btn-secondary w-full px-4 py-2" type="submit" value="Register" />
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