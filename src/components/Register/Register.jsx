import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";


const Register = () => {

    const handleRegister = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)

        // create user

        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            console.log(result.user)
        })
        .catch(error =>{
            console.error(error)
        })
    }

    return (
        <div>
            <div className="mx-auto w-1/4">
            <h2 className="text-3xl mb-8">Please Register</h2>
            <form onSubmit={handleRegister}>
                <span className="text-2xl">Email: </span><input className="mb-4 border bg-base-300 w-full px-4 py-2" type="email" name="email" placeholder="Email Address" id="" />
                <br />
                <span className="text-2xl">Password: </span><input className="mb-4 border bg-base-300 w-full px-4 py-2" type="password" name="password" placeholder="Password" id="" />
                <br />
                <input className="btn btn-secondary w-full px-4 py-2" type="submit" value="Register" />
            </form>
            </div>
        </div>
    );
};

export default Register;