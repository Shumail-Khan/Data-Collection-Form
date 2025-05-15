import React, { useEffect } from 'react'
import EnquiryList from './EnquiryList';
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2/dist/sweetalert2.js'

function Enquiry() {
  let [formData, setFormData] = React.useState({
    name: "",
    password: "",
    email: "",
    message: "",
    _id: ""
  });

  let[enquiryList, setEnquiryList] = React.useState([]);

  let getEnquiry= ()=>{
    axios.get('http://localhost:8000/api/website/enquiry/view/').then((res)=>{
       return res.data
    }).then(finaldata=>{
      if(finaldata.status===1){
        setEnquiryList(finaldata.enquiryList);
      }
    });
  }

  let saveEnquiry = (e) => {
    e.preventDefault();

    // let formdata = {
    //   name: e.target.name.value,
    //   password: e.target.password.value,
    //   email: e.target.email.value,
    //   message: e.target.message.value
    // }

    if(formData._id){
      axios.put(`http://localhost:8000/api/website/enquiry/update/${formData._id}`, formData).then((res)=>{
        toast.success("Enquiry Updated Successfully", );
        setFormData({
          name: "",
          password: "",
          email: "",
          message: "",
          _id: ""
        })
        getEnquiry();
      })
        
    }
    else{
      axios.post("http://localhost:8000/api/website/enquiry/insert/", formData).then((res)=>{
      toast.success("Enquiry Saved Successfully", );
      setFormData({
        name: "",
        password: "",
        email: "",
        message: ""
      })
      getEnquiry();
    })
    }
  };

  let getValue = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    let oldData= {...formData };

    oldData[inputName] = inputValue;
    setFormData(oldData);
    //   {
  //   name: "",
  //   password: "",
  //   email: "",
  //   message: ""
  // }
  };


  useEffect(() => {
    getEnquiry();
  }, []);

  return (
    <div>
      <ToastContainer />
      <h1 className='text-[40px] text-center font-bold py-6'>User Enquiry</h1>
      
      <div className='grid grid-cols-[30%_auto] gap-20'>
        <div className='bg-gray-200 p-4'>  {/* Form */}

          <h2 className='text-[20px] font-bold'>Enquiry Form</h2>
          <form action="" onSubmit={saveEnquiry}>        
            <div className='py-3'>
              <Label htmlFor="name">Your Name: </Label>
              <TextInput name="name" value={formData.name} onChange={getValue} type="text" placeholder="Enter Your Name" required />    
            </div>
            <div className='py-3'>
              <Label htmlFor="password">Your Password: </Label>
              <TextInput name="password" value={formData.password} onChange={getValue} type="password" placeholder="Enter Your Password" required />
            </div>
            <div className='py-3'>
              <Label htmlFor="email">Your Email: </Label>
              <TextInput name="email"  value={formData.email} onChange={getValue} type="email" placeholder="Enter Your Email" required />
            </div>         
            <div className='py-3'>
              <Label htmlFor="message" value="">Your Message: </Label>
              <Textarea name="message"  value={formData.message} onChange={getValue} placeholder="Enter Your Message..." required rows={5} />
            </div> 
            
            <Button type="submit" className='w-[100%]'>
              { formData._id ? "Update": "Save"}
              </Button>
          </form>
        </div>     
        <EnquiryList data={enquiryList} getenquiry={getEnquiry} swal={Swal} setFormData={setFormData}/>
      </div>
    </div>
  )
}

export default Enquiry
