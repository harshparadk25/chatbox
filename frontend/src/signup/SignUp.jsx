import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const navigate = useNavigate()
    const {setAuthUser} = useAuth();
    const [loading , setLoading] = useState(false);
    const [inputData , setInputData] = useState({});
    const [selectedLanguage, setSelectedLanguage] = useState("");

    const languages = [ "Auto", "Afrikaans", "Albanian", "Arabic", "Armenian", "Azerbaijani", 
        "Basque", "Belarusian", "Bulgarian", "Catalan", "Chinese (Simplified)", 
        "Chinese (Traditional)", "Croatian", "Czech", "Danish", "Dutch", 
        "English", "Estonian", "Filipino", "Finnish", "French", "Galician", 
        "Georgian", "German", "Greek", "Haitian Creole", "Hebrew", "Hindi", 
        "Hungarian", "Icelandic", "Indonesian", "Irish", "Italian", "Japanese", 
        "Korean", "Latvian", "Lithuanian", "Macedonian", "Malay", "Maltese", 
        "Norwegian", "Persian", "Polish", "Portuguese", "Romanian", "Russian", 
        "Serbian", "Slovak", "Slovenian", "Spanish", "Swahili", "Swedish", 
        "Thai", "Turkish", "Ukrainian", "Urdu", "Vietnamese", "Welsh", "Yiddish" ];

    const handelInput=(e)=>{
        setInputData({
            ...inputData , [e.target.id]:e.target.value
        })
    }
console.log(inputData);

    const selectGender=(selectGender)=>{
        setInputData((prev)=>({
            ...prev , gender:selectGender === inputData.gender ? '' : selectGender
        }))
    }

    const handelSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true)
        if(inputData.password !== inputData.confpassword.toLowerCase()){
            setLoading(false)
            return toast.error("Password Dosen't match")
        }
        try {
            const register = await axios.post(`/api/auth/register`,inputData);
            const data = register.data;
            if(data.success === false){
                setLoading(false)
                toast.error(data.message)
                console.log(data.message);
            }
            toast.success(data?.message)
            localStorage.setItem('chatApp',JSON.stringify(data))
            setAuthUser(data)
            setLoading(false)
            navigate('/login')
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error(error?.response?.data?.message)
        }
    }

  return (
    <div className='flex flex-col items-center justify-center mix-w-full mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-lg
          bg-gray-400 bg-clip-padding
           backderop-filter backdrop-blur-lg bg-opacity-0'>
  <h1 className='text-4xl font-bold text-center text-white'>Register
                    <span className='text-red-600'> Chatters </span>
                    </h1>
                    <form onSubmit={handelSubmit} className='flex flex-col text-black'>
                    <div>
                            <label className='label p-2' >
                                <span className='font-bold text-gray-950 text-2xl label-text'>fullname :</span>
                            </label>
                            <input
                                id='fullname'
                                pattern="[A-Za-z\s]+"
                                type='text'
                                onChange={handelInput}
                                placeholder='Enter Full Name'
                                required
                                className='w-full input input-bordered h-10' />
                        </div>
                        <div>
                            <label className='label p-2' >
                                <span className='font-bold text-gray-950 text-2xl label-text'>username :</span>
                            </label>
                            <input
                                id='username'
                                pattern="^[a-zA-Z]+$|^[a-zA-Z]+[0-9]+$"
                                type='text'
                                onChange={handelInput}
                                placeholder='Enter UserName'
                                required
                                className='w-full input input-bordered h-10' />
                        </div>
                        <div>
                            <label className='label p-2' >
                                <span className='font-bold text-gray-950 text-2xl label-text'>Email :</span>
                            </label>
                            <input
                                id='email'
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                type='email'
                                onChange={handelInput}
                                placeholder='Enter email'
                                required
                                className='w-full input input-bordered h-10' />
                        </div>

                        <div>
                            <label className='label p-2' >
                                <span className='font-bold text-gray-950 text-2xl label-text'>Language:</span>
                            </label>
                            <input
                                id='language'
                                list="languageList"
                                type='language'
                                onChange={handelInput}
                                placeholder='Enter preferred language'
                                required
                                className='w-full input input-bordered h-10 ' />
                                <datalist id="languageList" className='cursor-pointer'>
                                {languages.map((language, index) => (
                                <option key={index} value={language} />
                                ))}
      </datalist>
                        </div>

                        <div>
                            <label className='label p-2' >
                                <span className='font-bold text-gray-950 text-2xl label-text'>Password :</span>
                            </label>
                            <input
                                id='password'
                                type='password'
                                onChange={handelInput}
                                placeholder='Enter password'
                                required
                                className='w-full input input-bordered h-10' />
                        </div>
                        <div>
                            <label className='label p-2' >
                                <span className='font-bold text-gray-950 text-2xl label-text'>Conf.Password :</span>
                            </label>
                            <input
                                id='confpassword'
                                type='text'
                                onChange={handelInput}
                                placeholder='Enter Confirm password'
                                required
                                className='w-full input input-bordered h-10' />
                        </div>

                        <div
                         id='gender' className="flex gap-2">
                        <label className="cursor-pointer label flex gap-2">
                        <span className="label-text text-xl font-semibold text-red-700">male</span>
                        <input 
                        onChange={()=>selectGender('male')}
                        checked={inputData.gender === 'male'}
                        type='checkbox' 
                        className="checkbox checkbox-info"/>
                        </label>
                        <label className="cursor-pointer label flex gap-2">
                        <span className="label-text text-xl font-semibold text-red-700">female</span>
                        <input 
                        checked={inputData.gender === 'female'}
                        onChange={()=>selectGender('female')}
                        type='checkbox' 
                        className="checkbox checkbox-info"/>
                        </label>
                        </div>

                        <button type='submit'
                            className='mt-4 self-center 
                            w-auto px-2 py-1 bg-red-700
                            text-lg hover:bg-gray-900 
                            text-white rounded-lg hover: scale-105'>
                           {loading ? "loading..":"Register"}
                            </button>
                    </form>

                    <div className='pt-2'>
                        <p className='text-sm font-semibold
                         text-white'>
                            Dont have an Acount ? <Link to={'/login'}>
                                <span
                                    className='text-gray-950 
                            font-bold underline cursor-pointer
                             hover:text-green-950'>
                                    Login Now!!
                                </span>
                            </Link>
                        </p>
                    </div>
           </div>
           </div>
  )
}

export default Register