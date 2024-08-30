import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const SignUp = () => {
    const { register ,handleSubmit,formState: { errors }} = useForm();
    const {createUser} = useContext(AuthContext)

    const onSubmit = data =>{
        createUser(data.email , data.password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser)
        })
    }
    return(
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">SignUp now Guys!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" {...register("name", { required: true })} name="name" placeholder="Type Your Name" className="input input-bordered"  />
                {errors.name && <span className="text-red-600">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" name="email" {...register("email",{ required: true })} className="input input-bordered" />
                {errors.email && <span className="text-red-600">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" name="password" {...register("password",{ required: true ,minLength:6, maxLength: 20})} className="input input-bordered"/>
              
                {errors.password?.type === "required" && (
        <p  className="text-red-600">This Filed Must Be Required</p>
      )}
                {errors.password?.type === "minLength" && (
        <p  className="text-red-600">Minium Length 6</p>
      )}
                {errors.password?.type === "maxLength" && (
        <p  className="text-red-600">Max Length 20 only</p>
      )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="SignUp" />
        
              </div>
            </form>
           
            <p>Already SignUp ? <Link className="text-xl text-green-600" to={'/login'}>Login </Link></p>
          </div>
        </div>
      </div>
    )
       
    
};

export default SignUp;