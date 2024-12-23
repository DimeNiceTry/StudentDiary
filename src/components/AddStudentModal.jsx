import React, { useState } from 'react';

function AddStudentModal({ onSave, onClose }) {
  const [studentName, setStudentName] = useState("");
  const [studentCode, setStudentCode] = useState("");  // Шифр студента
  const [subjects, setSubjects] = useState([{ subject: "", grade: "" }]);

  const handleAddSubject = () => {
    setSubjects([...subjects, { subject: "", grade: "" }]);
  };

  const handleSubjectChange = (index, key, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][key] = value;
    setSubjects(updatedSubjects);
  };

  const handleSave = () => {
    // Проверка, чтобы не сохранялись пустые предметы
    const subjectsObject = subjects.reduce((acc, { subject, grade }) => {
      if (subject.trim() && grade.trim()) {
        acc[subject] = grade;
      }
      return acc;
    }, {});

    // Сохранение данных
    if (studentName.trim() && studentCode.trim()) {
      onSave(studentName, studentCode, subjectsObject);
      onClose();
    } else {
      alert("Заполните имя студента и шифр!");
    }
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h3>Добавить студента</h3>
        
        {/* Имя студента */}
        <label>
          Имя студента:
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </label>

        {/* Шифр студента */}
        <label>
          Шифр студента:
          <input
            type="text"
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value)}
            style={{ marginBottom: "10px", marginLeft: "10px" }}
          />
        </label>

        {/* Предметы и оценки */}
        {subjects.map((entry, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Предмет"
              value={entry.subject}
              onChange={(e) => handleSubjectChange(idx, "subject", e.target.value)}
              style={{ marginRight: "10px" }}
            />
            <input
              type="text"
              placeholder="Оценка"
              value={entry.grade}
              onChange={(e) => handleSubjectChange(idx, "grade", e.target.value)}
            />
          </div>
        ))}
        <button onClick={handleAddSubject}>Добавить предмет</button>

        <div style={{ marginTop: "20px" }}>
          <button onClick={handleSave} style={modalStyles.button}>
            Сохранить
          </button>
          <button onClick={onClose} style={{ ...modalStyles.button, marginLeft: "10px" }}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    width: "600px",
  },
  button: {
    padding: "10px 15px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "#fff",
  },
};

export default AddStudentModal;
