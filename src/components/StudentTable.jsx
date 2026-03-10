import React from "react";

function StudentTable({ students, onEdit, onDelete }) {
  return (
    <table border="1" width="100%">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.age}</td>
            <td>
  <button onClick={() => onEdit(student)}>Edit</button>
  <button onClick={() => onDelete(student.id)}>Delete</button>
</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;