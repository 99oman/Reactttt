import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RadioGroup ,Radio,FormControlLabel} from "@mui/material";

const AddPatient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  const [patientFName, setpatientFName] = useState("");
  const [patientLName, setpatientLName] = useState("");
  const [age, setage] = useState("");
  const [appointmentDate, setappointmentDate] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");
  const [bodyPart, setbodyPart] = useState("");
  const [exsistingDisease, setexsistingDisease] = useState("");
  const [dob, setdob] = useState("");


  

 
  const handlechangepatientFName = (value) => {
    setpatientFName(value);
  };
  const handlechangepatientLName = (value) => {
    setpatientLName(value);
  };
 
  const handlechangeappointmentdate = (value) => {
    setappointmentDate(value);
  };
  const handlechangephone = (value) => {
    setphone(value);
  };
 
  const handlechangeemail = (value) => {
    setemail(value);
  };

  const handlechangegender = (event) => {
    setgender(event.target.value);
   
  };

 
  const handlechangebodypart = (value) => {
    setbodyPart(value);
  };
  const handlechangeexsistingDisease = (value) => {
    setexsistingDisease(value);
  };
  const handlechangedob = (value) => {
    setdob(value);
  

    calculateAge(value);
 
  };

  const calculateAge = (birthDate) => {
    
    const today = new Date();
    const birthDateObj = new Date(birthDate);
  
    let calage = today.getFullYear() - birthDateObj.getFullYear();
    const months = today.getMonth() - birthDateObj.getMonth();
  
    if (months < 0 || (months === 0 && today.getDate() < birthDateObj.getDate())) {
      calage--; // Adjust for incomplete year
    }
  
    setage(calage);
    
  };

  const validateDOB = (value) => {
    if (!value) {
      return 'Date of birth is required.';
    }

    const today = new Date();
    const dob = new Date(value);

    if (dob > today) {
      return 'Date of birth cannot be in the future.';
    }
  };
 
  const validateAppointmentDate = (value) => {
    if (!value) {
      return 'Appointment date is required.';
    }

    const today = new Date();
    const appointmentDate = new Date(value);

    if (appointmentDate < today) {
      return 'Appointment date cannot be in the past.';
    }
  };

  const bodyParts = [
    { value: 'head', label: 'Head' },
    { value: 'torso', label: 'Torso' },
    { value: 'arm', label: 'Arm' },
    { value: 'leg', label: 'Leg' },
    // ... Add more body parts as needed
  ];
  const diseases = [
    'Diabetes',
    'Heart Disease',
    'High Blood Pressure',
    'Asthma',
    'Cancer',
    'Other',
  ];
  const navigate = useNavigate();
  const onSubmit = async () => {
    const data = {
     
       
        patientFName: patientFName,
        patientLName: patientLName,
        age:age,
        appointmentDate:appointmentDate,
        phone:phone,
        email: email,
        gender: gender,
        bodyPart: bodyPart,
        exsistingDisease:exsistingDisease,
        dob:dob,
    };
    const url = await "http://localhost:5106/api/Patient";
    await axios
      .post(url, data)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        if ((error.status = 400)) {
          alert("You got some error.");
        }
      });
  };
  return (
    <>
      

      <div class="container">
       
        <div class="login-content">
          <form onSubmit={handleSubmit(onSubmit)}>
        
            <br />
            <label>Patient First Name</label>
            <div className="form-group">
              <textarea
                class="form-control"
                placeholder="Patient First Name"
                rows="3"
                {...register('patientFName', { required: 'Required' })}
                onChange={(e) => handlechangepatientFName(e.target.value)}
              ></textarea>
             {errors.patientFName && <p className="error">{errors.patientFName.message}</p>}

            </div>
            <br/>
            <label>Patient Last Name</label>
            <div className="form-group">
              <textarea
                class="form-control"
                placeholder="Patient Last Name"
                rows="3"
                {...register("patientLName", {
                  required: { value: true, message: "Required" },
                })}
                onChange={(e) => handlechangepatientLName(e.target.value)}
              ></textarea>
             {errors.patientLName && <p className="error">{errors.patientLName.message}</p>}
            </div>
            <br/>
            
            <br/>
            <label>appointmentDate</label>
            <div className="form-group">
            <input
              type="datetime-local"
              class="form-control"
              placeholder="Appointment Date"
              {...register("appintmentDate", { validate: validateAppointmentDate }, {
                required: { value: true, message: "Required" }
              })}
              onChange={(e) => handlechangeappointmentdate(e.target.value)}
            />
           
            </div>
            {errors.appintmentDate && <p className="error">{errors.appintmentDate.message}</p>}
            <br/>
            <label>Phone</label>
            <div className="form-group">
              <input
                type="textarea"
                class="form-control"
                placeholder="Phone"
                {...register("phone", {
                  required: { value: true, message: "Required" },
                  pattern: {
                    value: /^\d{10}$/,
                    message: 'Invalid phone number format (10 digits).',
                  },
                })}
                onChange={(e) => handlechangephone(e.target.value)}
              />
              
            </div>
            {errors.phone && <p className="error">{errors.phone.message}</p>}
            <br/>
            <br/>
            <label>Email</label>
            <div className="form-group">
              <input
                type="textarea"
                class="form-control"
                placeholder="Email"
                {...register("email", {
                  required: { value: true, message: "Required" },

                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: 'Invalid email format.',}

                  
                })}
                onChange={(e) => handlechangeemail(e.target.value)}
              />
              
            </div>
            {errors.email && <p className="error">{errors.email.message}</p>}
            <br/>
            <br/>
            

<label>Select your gender:</label>
      <RadioGroup name="gender" value={gender} onChange={handlechangegender}>
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
      

            <br/>
           
<div>
      <label htmlFor="bodyPart">Select Body Part:</label>
      <select id="bodyPart" value={bodyPart} onChange={(e)=>handlechangebodypart(e.target.value)}>
        <option value="">-- Select --</option>
        {bodyParts.map((bodyPart) => (
          <option key={bodyPart.value} value={bodyPart.value}>
            {bodyPart.label}
          </option>
        ))}
      </select>
    </div>
            <br/>
            
            <label>Exsiting Disease</label>
            <div className="form-group">
              <input
                type="textarea"
                class="form-control"
                placeholder="Any Exsisting Disease"
                {...register("exsistingdisease", {
                  required: { value: true, message: "Required" },
                })}
                onChange={(e) => handlechangeexsistingDisease(e.target.value)}
              />
              
            </div>
            {errors.exsistingdisease && <p className="error">{errors.exsistingdisease.message}</p>}
            <br/>
            <label>DOB</label>
            <div className="form-group">
            <input
              type="datetime-local"
              class="form-control"
              placeholder="Patient DOB"
              {...register("dob", { validate: validateDOB },{
                required: { value: true, message: "Required" }
              })}
              onChange={(e) => handlechangedob(e.target.value)}
            />
           
            </div>
            {errors.dob && <p className="error">{errors.dob.message}</p>}
            <br/>
            {/* <label>Patient Age</label>
            <div className="form-group">
              <input
                type="textarea"
                class="form-control"
                
                placeholder="Patient Age"
                {...register("age", {
                  required: { value: true, message: "Required" },
                })}
               // onChange={(e) => handlechangeage(e.target.value)}
              />
              
            </div> */}

            <button type="submit" className="btn" id="login">
              Add Patient
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPatient;
