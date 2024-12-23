import React, { useState, useEffect } from 'react';
import StudentCardModal from './StudentCardModal';

function StudentPanel() {
  const [grades, setGrades] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const storedGrades = JSON.parse(localStorage.getItem('grades')) || {};
    setGrades(storedGrades);
  }, []);

  const calculateAverage = (studentName) => {
    const allGrades = Object.values(grades).flatMap((session) =>
      Object.values(session[studentName]?.subjects || {}).map((grade) => parseFloat(grade))
    );

    const total = allGrades.reduce((sum, grade) => sum + grade, 0);
    return allGrades.length ? (total / allGrades.length).toFixed(2) : "Нет данных";
  };

  const openStudentCard = (studentName) => {
    setSelectedStudent({
      name: studentName,
      group: "Группа A",
      code: "12345",
      average: calculateAverage(studentName),
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedStudent(null);
  };

  return (
    <div>
      <h3>Панель студента</h3>
      <h4>Результаты сессий:</h4>
      {Object.keys(grades).map((session) => (
        <div key={session} style={{ marginBottom: "20px" }}>
          <h5>{session}</h5>
          {Object.keys(grades[session]).length ? (
            <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>Студент</th>
                  <th>Предметы и Оценки</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(grades[session]).map(([student, { subjects }]) => (
                  <tr
                    key={student}
                    onClick={() => openStudentCard(student)}
                    style={{ cursor: "pointer", transition: "background-color 0.3s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f8ff")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                  >
                    <td>{student}</td>
                    <td>
                      {Object.entries(subjects).map(([subject, grade]) => (
                        <div key={subject}>
                          <b>{subject}:</b>{" "}
                          {typeof grade === "object" ? JSON.stringify(grade) : grade}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Нет данных</p>
          )}
        </div>
      ))}

      {modalVisible && (
        <StudentCardModal student={selectedStudent} onClose={closeModal} />
      )}
    </div>
  );
}

export default StudentPanel;
