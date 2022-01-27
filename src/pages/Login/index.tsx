import * as React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth';
import capybara from '../../images/capybara-pomo.png';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../../redux/slices/authSlice';
import { IRootState } from '../../redux/store';

const Login = () => {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const error = useSelector((state: IRootState) => state.user.error);

    const dispatch = useDispatch();

    const signInWithEmail = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(signInUser({ email, password }));
        setEmail("");
        setPassword("");
    }

    const signInWithGoogle = () => {

    }

    React.useEffect(() => {
        console.log(error)
    }, [error])

    return (
        <div className='w-full h-fit flex flex-col items-center justify-center p-4 px-8 gap-14 md:max-w-xl'>
            {/* Capybara */}
            <div className='w-full flex justify-center mt-12'>
                <img src={capybara} alt='A capybara head image' className='w-[40%] max-w-[12rem]' />
            </div>

            {/* Sign in Info */}
            <div className='w-full flex flex-col items-center gap-12'>
                <div className='w-full flex flex-col gap-4'>
                    <form className='w-full flex flex-col gap-4' onSubmit={signInWithEmail}>
                        <input className='h-14 outline-none border-2 bg-transparent border-[#292C2D] px-2 text-white placeholder:text-[#4C5053] text-xl'
                            placeholder='Email' type='email' required onChange={(e) => setEmail(e.currentTarget.value)} />
                        <input className='h-14 outline-none border-2 bg-transparent border-[#292C2D] px-2 text-white placeholder:text-[#4C5053] text-xl'
                            placeholder='Password' type='password' required onChange={(e) => setPassword(e.currentTarget.value)} />
                        <Link className='ml-auto text-[#464646]' to={'/reset'}> Forgot Password </Link>
                        <input className='w-full h-14 bg-[#2881D9] text-white text-xl font-semibold' type='submit' value={"Sign In"} />

                    </form>
                </div>
            </div>

            {/* Other sign in options */}
            <div className='w-full h-full flex flex-col items-center gap-8 pb-16'>
                <div className='w-full flex items-center gap-2'>
                    <div className='w-full border-t-[1px] border-t-[#707070]' />
                    <p className='w-full text-center text-white'> Or Sign In With </p>
                    <div className='w-full border-t-[1px] border-t-[#707070]' />
                </div>
                <button className='flex items-center text-white gap-8 bg-[#0943a2] px-6 py-2'> <FcGoogle size={40} /> Sign in with google </button>
                <div className='w-full flex gap-4 items-center justify-center mt-auto'>
                    <p className='text-white'> Don't have an account? </p>
                    <Link className='text-[#2881D9]' to={'/register'}> Sign Up </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;