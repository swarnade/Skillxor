import { useState } from "react";
import { BottomWarning } from "../../components/BottomWarning";
import { Button } from "../../components/Button";
import { Heading } from "../../components/Heading";
import { InputBox } from "../../components/InputBox";
import { SubHeading } from "../../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ClientSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-90 text-center p-2 h-max px-6">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            placeholder="John"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            placeholder="Doe"
            label={"Last Name"}
          />
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
            placeholder="123456@#"
            label={"Password"}
          />
          <InputBox
            onChange={(e) => {
              setMobileNumber(e.target.value);
            }}
            placeholder="9876543210"
            label={"Mobile Number"}
          />
           <InputBox  
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            placeholder="SRI LANKA"
            label={"Country"}
          />
          
          <div className="pt-4">
            <Button
              onClick={async () => {
                axios.post(
                  "http://localhost:1234/client/signup",
                  {
                    firstName: firstname,
                    lastName : lastname,
                    mobileNumber: mobileNumber,
                    email: email,
                    password: password,
                    country: country,
                  }
                ).then((response)=>{
                  console.log(response);
                  alert("Signup Sucessfully Done");
                  navigate("/employer/login")
                }).catch((error)=>{
                  setPassword("");
                  setEmail("");
                  setMobileNumber("");
                  setFirstname("");
                  setLastname("");
                  setCountry("");
                  alert("Signup not successful")
                  console.log(error);
                })

                //will use this to store token in browser.

                // localStorage.setItem("token", response.data.token)
                // // navigate("/dashboard")
              }}
              label={"Sign up"}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Log in"}
            to={"/employer/login"}
          />
        </div>
      </div>
    </div>
  );
};
