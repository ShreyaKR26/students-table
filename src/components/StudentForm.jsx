import React, { useState, useEffect } from "react";

function StudentForm({ addStudent, updateStudent, editStudent }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (editStudent) {
      setName(editStudent.name);
      setEmail(editStudent.email);
      setAge(editStudent.age);
    }
  }, [editStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !age) {
      alert("All fields are required");
      return;
    }

    const emailPattern = /\S+@\S+\.\S+/;

    if (!emailPattern.test(email)) {
      alert("Invalid email format");
      return;
    }

    const student = {
      id: Date.now(),
      name,
      email,
      age
    };

    if (editStudent) {
      updateStudent(student);
    } else {
      addStudent(student);
    }

    setName("");
    setEmail("");
    setAge("");
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button className="add-btn" type="submit">
  {editStudent ? "Update Student" : "Add Student"}
</button>

    </form>
  );
}

export default StudentForm;