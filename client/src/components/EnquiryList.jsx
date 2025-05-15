import React from 'react'
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { ToastContainer, toast } from 'react-toastify';

const EnquiryList = ({data, getenquiry, swal, setFormData}) => {
    let deleteRow = (delid) => {
        swal.fire({
            title: "Do you remove the Entry?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes"
        }).then((result) => {                    
            if(result.isConfirmed) {

                axios.delete(`http://localhost:8000/api/website/enquiry/delete/${delid}`).then((res)=>{
                toast.success("Enquiry Deleted Successfully");
                getenquiry();
                })
                swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
                swal.fire("Data Not Deleted", "", "info");
            }
        });
    }
    let editRow = (editid)=>{
        axios.get(`http://localhost:8000/api/website/enquiry/single/${editid}`).then((res)=>{
            if(res.data.status===1){
                let data = res.data.enquiry;
                console.log(data);
                setFormData({
                    name: data.name,
                    password: data.password,
                    email: data.email,
                    message: data.message,
                    _id: data._id
                })
            }
        })
    }
  return (    
      <div  className='bg-gray-200 p-4'> {/* Table For Collection */}
            <h2 className='text-[20px] font-bold mb-5'>Enquiry List</h2>
            <div className="overflow-x-auto">
                <Table striped>
                    <TableHead>
                    <TableRow>
                        <TableHeadCell>ID.</TableHeadCell>
                        <TableHeadCell>Name </TableHeadCell>
                        <TableHeadCell>Email </TableHeadCell>
                        <TableHeadCell>Password </TableHeadCell>
                        <TableHeadCell>Message </TableHeadCell>
                        <TableHeadCell>Edit</TableHeadCell>
                        <TableHeadCell>Delete</TableHeadCell>
                    </TableRow>
                    </TableHead>
                    
                    <TableBody className="divide-y">
                    {
                        data.length >= 1 ? 
                        data.map((item, index) => {
                           return (
                            <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {index + 1}
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.password}</TableCell>
                                <TableCell>{item.message}</TableCell>
                                <TableCell><button  onClick={()=>editRow(item._id)} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Edit</button></TableCell>
                                <TableCell><button onClick={()=>deleteRow(item._id)} className='bg-red-500 text-white px-4 py-2 rounded-md'>Delete</button></TableCell>
                            </TableRow>
                            
                        )
                        }) : 
                        <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                         <TableCell colSpan={7} className="text-center">No Data Found.</TableCell>
                         </TableRow>
                    }
                    </TableBody>
                </Table>
        </div>
    </div>
  )
}

export default EnquiryList
