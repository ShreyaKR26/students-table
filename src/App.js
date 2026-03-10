import React, { useState, useEffect } from "react";
import StudentTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";
import Loader from "./components/Loader";
import studentsData from "./data/students";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function App() {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editStudent, setEditStudent] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setStudents(studentsData);
      setLoading(false);
    }, 1500);
  }, []);

  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  const updateStudent = (updated) => {
    setStudents(
      students.map((s) => (s.id === updated.id ? updated : s))
    );
    setEditStudent(null);
  };

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(file, "students.xlsx");
  };

  if (loading) return <Loader />;

  return (
    <div className="container">

      <h2>Students Table</h2>

      <button className="download-btn" onClick={downloadExcel}>
        Download Excel
      </button>

      <StudentForm
        addStudent={addStudent}
        updateStudent={updateStudent}
        editStudent={editStudent}
      />

      <StudentTable
        students={students}
        onEdit={setEditStudent}
        onDelete={deleteStudent}
      />

    </div>
  );
}

export default App;