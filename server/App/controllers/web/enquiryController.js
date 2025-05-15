const UserEnquiry = require("../../models/userenquiry");

let enquiryInsert = (req, res)=>{
    let {name, email, password, message} = req.body;
    let userEnquiry = new UserEnquiry({
        name:name,
        email:email,
        password:password,
        message:message
});
    userEnquiry.save()
        .then((result)=>{
            res.send({
                status: 1,
                message: "Enquiry submitted successfully",
                data: result
            });
        })
        .catch((err)=>{
            res.send({
                status: 0,
                message: "Error submitting enquiry",
                error: err
            });
        });
};

let enquiryList = async (req, res)=>{
    let enquiry = await UserEnquiry.find();
    res.send({status:1, message:"Enquiry List", enquiryList: enquiry});
};

let enquiryDelete = async (req, res)=>{
    let enquiryId = req.params.id;
    let enquiry = await UserEnquiry.deleteOne({_id: enquiryId});
    if(enquiry){
        res.send({status:1, message:"Enquiry Deleted Successfully", response: enquiry});
}
}

let enquirysinglerow = async (req, res)=>{
    let enquiryId = req.params.id;
    let enquiry = await UserEnquiry.findOne({_id: enquiryId})
    res.send({status:1, enquiry});
}

let enquiryupdate = async( req, res)=>{
    let enquiryId = req.params.id;
    let {name, email, password, message} = req.body;
    let updateObject = {
        name,
        email,
        password,
        message
    }
    let updateres = await UserEnquiry.updateOne({_id:enquiryId}, updateObject)

    res.send({status:1, message:"Enquiry Updated Successfully", updateres});
}

module.exports = {enquiryInsert, enquiryList, enquiryDelete, enquirysinglerow, enquiryupdate};