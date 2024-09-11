import { useState } from "react";
import { InputBox } from "./InputBox";
import axios from "axios";
import { Button } from "./Button";

// ModalComponent.js
const ModalComponent = ({ isOpen, onClose}) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  const [title,setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");

  const clientToken = localStorage.getItem("token");


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await axios.post(
        "http://localhost:1234/client/project/create",
        {
          title,
          description,
          budget,
          deadline
        },
        {
          headers: {
            Authorization:  clientToken
          }
        }
      );
      console.log(response);
      alert("Project Created Successfully.");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to create project.");
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-1/3">
        {/* Modal Content */}
        <h2 className="text-lg font-semibold mb-4">Enter Details to create project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <InputBox
                onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="xyz project name"
              label={"Title"}
            />
            <InputBox
                onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder=" brief description"
              label={"Description"}
            />
            <InputBox
                onChange={(e) => {
                setBudget(e.target.value);
              }}
              placeholder="enter amount"
              label={"Budget"}
            />
            <InputBox
                onChange={(e) => {
                setDeadline(e.target.value);
              }}
              placeholder="YYYY-MM-DD"
              label={"Deadline"}
            />
            
          </div>

          {/* <Button
              onSubmit={async () => {
                axios.post(
                  "http://localhost:1234/client/project/create",{
                    "title": title,
                    "description": description,  
                    "budget": budget,
                    "deadline": deadline
                  },
                  {
                    headers : {
                        "Authorization": clientToken
                    }
                }).then((response)=>{
                  console.log(response);
                  alert("Project Created Successfully..");
                  
                }).catch((error)=>{

                  alert("Failed to create Project..")
                  console.log(error);
                })

                //will use this to store token in browser.

                // localStorage.setItem("token", response.data.token)
                // // navigate("/dashboard")
              }}
              label={"Submit"}
            /> */}
            {/* <Button label={"Submit"} type="submit" /> */}

            <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            disabled={!title || !description || !budget || !deadline}
          >
            Submit
          </button>
        </form>

        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ModalComponent;
