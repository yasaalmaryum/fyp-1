import React, { useEffect, useState } from "react";
import Navbar from "../pages/Navbar";
import { toast } from "react-toastify";
import axios from "axios";
import URLS from "../API/Axios/URLS";
import { useSession } from "../redux/Reducers/AuthReducer";

const HRrecord = () => {
  const { authActions, SESSION_STORAGE_KEY } = useSession();
  console.log(JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY)).token);

  const [formVisible, setFormVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const showForm = () => {
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
    setSelectedUser(null);
  };
  const fetchStudents = async () => {
    const token = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY)).token; // Replace with actual token

    const headers = {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    };

    try {
      const response = await axios.get(URLS.listFaculty, {
        headers: headers,
      });
      console.log("Students data:", response.data.results);
      setUsers(response.data.results); // Assuming the API returns an array of students
    } catch (error) {
      console.error("Error fetching HRs:", error);
      toast("Error fetching students", { type: "error" });
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the request body as per the API's expected format
    const apiRequestBody = {
      user: {
        full_name: `${firstName} ${lastName}`, // Combining firstName and lastName
        email: email,
        password: password,
        dp: 1, // Assuming 'dp' is a constant value, change as needed
      },
      department: 2, // Make sure department is a number
      staff_id: registrationNumber,
      semester: 7, // Assuming semester is a constant value, change as needed
      program: "BS", // Assuming program is a constant value, change as needed
      role: "HR",
    };

    const token = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY)).token; // Replace with actual token

    const headers = {
      "Content-Type": "application/json",
      Authorization: `token ${token}`, // Format as Bearer token
    };

    if (selectedUser) {
      console.log("selected user ", selectedUser);
      // Update student
      axios
        .put(URLS.deleteFaculty.replace(":id", selectedUser), apiRequestBody, {
          headers: headers,
        })
        .then((res) => {
          console.log("Student updated successfully:", res.data);
          toast("Student Updated Successfully", { type: "success" });
          fetchStudents(); // Refresh the list of students
          closeForm(); // Close the form
        })
        .catch((error) => {
          console.error("Error updating student:", error);
          toast("Error updating student", { type: "error" });
        });
    } else {
      // Create new student
      axios
        .post(URLS.createFaculty, apiRequestBody, { headers: headers })
        .then((res) => {
          console.log("Student created successfully:", res.data);
          toast("Student Added Successfully", { type: "success" });
          fetchStudents(); // Refresh the list of students
          closeForm(); // Close the form
        })
        .catch((error) => {
          console.error("Error creating student:", error);
          toast("Error adding student", { type: "error" });
        });
    }

    // Resetting form fields
    setFirstName("");
    setLastName("");
    setRegistrationNumber("");
    setDepartment("");
    setEmail("");
    setPassword("");
    // ... (any other state you want to reset)
  };

  const handleUpdate = (index) => {
    const userToUpdate = users[index];
    setFirstName(userToUpdate.user.full_name);
    setLastName(userToUpdate.user.full_name);
    setRegistrationNumber(userToUpdate.staff_id);
    setDepartment(userToUpdate.department_data.name);
    setEmail(userToUpdate.user.email);
    setPassword(userToUpdate?.password);
    setSelectedUser(userToUpdate.id);
    setFormVisible(true);
  };

  const handleDelete = (index) => {
    setSelectedUser(index);
    setDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    if (selectedUser) {
      const token = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY)).token; // Replace with actual token
      const headers = {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      };

      try {
        // Make the DELETE request to the API
        await axios.delete(URLS.deleteFaculty.replace(":id", selectedUser), {
          headers,
        });
        console.log(`Deleted user with ID: ${selectedUser}`);
        toast("User deleted successfully", { type: "success" });

        // Update the local state to remove the user from the list
        setUsers(users.filter((user) => user.user.id !== selectedUser));
      } catch (error) {
        console.error("Error deleting user:", error);
        toast("Error deleting user", { type: "error" });
      }
    }

    // Reset states
    setDeleteConfirmation(false);
    setSelectedUser(null);
    fetchStudents();
  };

  const cancelDelete = () => {
    setDeleteConfirmation(false);
    setSelectedUser(null);
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md relative">
        <button
          onClick={showForm}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Create HR
        </button>

        {formVisible && (
          <>
            <div className="absolute top-0 right-0 mt-2 mr-2">
              <button onClick={closeForm} className="text-gray-600">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your last name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Staff ID
                </label>
                <input
                  type="text"
                  id="registrationNumber"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your registratin number"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your departments"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your password"
                />
              </div>

              {/* ... (other form fields) */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>

      {users.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">
            <center>Faculty Record</center>
          </h2>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Full Name</th>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Department</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Password</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) => user.user.is_staff && user.role === "HR") // Filter to only include students
                .map((user, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : ""}
                  >
                    <td className="border px-4 py-2">{user.user.full_name}</td>
                    <td className="border px-4 py-2">{user.id}</td>
                    <td className="border px-4 py-2">
                      {user.department_data.name}
                    </td>
                    <td className="border px-4 py-2">{user.user.email}</td>
                    <td className="border px-4 py-2">{user.role}</td>
                    <td className="border px-4 py-2">********</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleUpdate(index)}
                        className="text-blue-500"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500 ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-md">
            <p className="mb-4">Do you want to delete this user?</p>
            <button
              onClick={confirmDelete}
              className="bg-red-500 text-white px-4 py-2 mr-2"
            >
              OK
            </button>
            <button
              onClick={cancelDelete}
              className="bg-gray-500 text-white px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRrecord;
