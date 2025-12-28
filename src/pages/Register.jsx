import { useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

function Register(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const showSubmit = () => {
      Swal.fire({
  title: "Registered Successfully",
  icon: "success",
  draggable: true
});
    }

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

    const newData = { name, email, password }; // The data object to send

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(newData), // Convert the JavaScript object to a JSON string
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json(); // Optional: Parse the response from the server
      console.log('Success:', result);
      
      // Clear the form fields after successful submission
      setName('');
      setEmail('');
      setPassword('');

    } catch (error) {
      console.error('Error sending data:', error);
    }
    }


  return(
    <div className="register-container">
        <div className="register">
            <form onSubmit={handleRegister}>
                <h2>Create Account</h2>
                <label htmlFor="Name" >Name</label>
                <input type="text" placeholder="Name" width={100} height={60} value={name}  onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="Name">Email</label>
                <input type="email" placeholder="Email" width={100} height={60} value={email}  onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="Name">Password</label>
                <input type="password" placeholder="Password" width={100} height={60} value={password}  onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" onClick={showSubmit}>Register</button>

            </form>
        </div>
    </div>
  )
}

export default Register;