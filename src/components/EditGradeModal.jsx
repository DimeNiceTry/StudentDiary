import React, { useState } from 'react';

function EditGradeModal({ data, onSave, onDeleteStudent, onClose }) {
  const { student, subjects } = data;

  const [editedData, setEditedData] = useState(
    Object.entries(subjects).length > 0
      ? Object.entries(subjects).map(([subject, grade]) => ({ subject, grade }))
      : [{ subject: "", grade: "" }]
  );

  // Добавление нового предмета
  const handleAddSubject = () => {
    setEditedData((prev) => [...prev, { subject: "", grade: "" }]);
  };

  // Изменение названия предмета или оценки
  const handleSubjectChange = (index, key, value) => {
    const updatedData = [...editedData];
    updatedData[index][key] = value;
    setEditedData(updatedData);
  };

  // Удаление предмета
  const handleDeleteSubject = (index) => {
    setEditedData((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Сохранение изменений
  const handleSave = () => {
    const updatedSubjects = editedData.reduce((acc, { subject, grade }) => {
      if (subject.trim() && grade.trim()) {
        acc[subject] = grade;
      }
      return acc;
    }, {});

    onSave(updatedSubjects);
    onClose();
  };

  // Удаление студента
  const handleDeleteStudent = () => {
    onDeleteStudent(student); // Передаем имя студента для удаления
    onClose();
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h3>Редактировать оценки для {student}</h3>
        {editedData.map((entry, idx) => (
          <div key={idx} style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
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
              style={{ marginRight: "10px" }}
            />
            <button
              onClick={() => handleDeleteSubject(idx)}
              style={{ backgroundColor: "#dc3545", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "5px" }}
            >
              Удалить предмет
            </button>
          </div>
        ))}
        <button onClick={handleAddSubject}>Добавить предмет</button>
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
          <button onClick={handleSave} style={modalStyles.button}>
            Сохранить
          </button>
          <button onClick={onClose} style={{ ...modalStyles.button, backgroundColor: "#6c757d" }}>
            Отмена
          </button>
          <button
            onClick={handleDeleteStudent}
            style={{
              ...modalStyles.button,
              backgroundColor: "#dc3545",
              marginLeft: "auto",
            }}
          >
            Удалить студента
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

export default EditGradeModal;
