import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


import UserModal from "../model/User.js";

const secret = "youtube";

export const login = async (req, res) => {
  // console.log("login called")
  const { email, password } = req.body;
  // console.log(req.body);

  try {
    
    const oldUser = await UserModal.findOne({ email });
    // console.log(oldUser);

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result:oldUser, token,message:" Successfully Logged In" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const signup = async (req, res) => {
  console.log("signup called");
  console.log(req.body);
  // const { email, password, firstName, lastName} = req.body;
  const email=req.body.email;
  const password=req.body.password;
  const firstName=req.body.firstName;
  const lastName=req.body.lastName;
  console.log(email, password, firstName, lastName);


  try {
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  
  const correctedFirstName=capitalizeFirstLetter(firstName);
  const correctedLastName=capitalizeFirstLetter(lastName);
  
  
    function checkPassword(passwords){
      var passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      return passwordRegex.test(passwords); 
    };
  
  
    let flag=checkPassword(password);
    // console.log(flag);

    const oldUser = await UserModal.findOne({ email });
    // console.log(oldUser);

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    if(flag){
      var newPass=password;
      // console.log(flag);
    }else{
      return res.status(400).json({message:"Password is not validated"});
    }

    const hashedPassword = await bcrypt.hash(newPass,12)

    
    const result = await UserModal.create({ email, password: hashedPassword, name: `${correctedFirstName} ${correctedLastName}` });
    // console.log(result);

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token,message:"Account Created  Successfully" });
  } catch (error) {  
  res.status(500).json({ message: "Something went wrong in sign up" });
    console.log(error);
  }
};








