import { useState } from "react";
import { BottomWarning } from "../../components/BottomWarning";
import { Button } from "../../components/Button";
import { Heading } from "../../components/Heading";
import { InputBox } from "../../components/InputBox";
import { SubHeading } from "../../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ClientLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-90 text-center p-2 h-max px-6">
          <Heading label={"Login"} />
          <SubHeading label={"Enter your credentials to sign in"} />
          <InputBox
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="abcd@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="********"
            label={"Password"}
            type="password"
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
               
                await axios.post(
                    "http://localhost:1234/client/login",
                    {
                      email: email,
                      password: password,
                    }
                  ).then((response)=>{
                    // console.log(response.data)
                    localStorage.setItem("token", response.data.token);
                    // console.log(response.data.Token)
                    setEmail("");
                    setPassword("");

                    navigate("/client/projects");  //this need to be changed later....
                    alert("Login Successfully Done");  

                  }).catch ((error)=> {
                    console.log(error);
                    alert("Login Failed");
                  })

              }}
              label={"Login"}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/client/signup"}
          />
        </div>
      </div>
    </div>
  );
};
