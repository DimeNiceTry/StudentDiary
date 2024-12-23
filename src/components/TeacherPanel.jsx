import React, { useState, useEffect } from 'react';
import EditGradeModal from './EditGradeModal';
import AddStudentModal from './AddStudentModal';

function TeacherPanel() {
  const initialGrades = {
    "Сессия 1": {},
    "Сессия 2": {},
    "Сессия 3": {},
    "Сессия 4": {},
    "Сессия 5": {},
    "Сессия 6": {},
    "Сессия 7": {},
    "Сессия 8": {},
  };

  const [grades, setGrades] = useState(() => {
    const storedGrades = localStorage.getItem('grades');
    return storedGrades ? JSON.parse(storedGrades) : initialGrades;
  });

  const [currentSession, setCurrentSession] = useState("Сессия 1");
  const [editingData, setEditingData] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem('grades', JSON.stringify(grades));
  }, [grades]);

  const handleSessionChange = (e) => {
    setCurrentSession(e.target.value);
  };

  const addStudent = (studentName, studentCode, subjects) => {
    const formattedSubjects = Object.fromEntries(
      Object.entries(subjects).map(([key, value]) => [key, value || "Нет данных"])
    );
    setGrades((prev) => {
      const sessionGrades = { ...prev[currentSession] };
      sessionGrades[studentName] = { code: studentCode, subjects: formattedSubjects };
      return { ...prev, [currentSession]: sessionGrades };
    });
  };

  const openEditModal = (student, data) => {
    const { code, subjects } = data;
    setEditingData({ student, code, subjects });
  };

  const updateGrade = (student, updatedSubjects) => {
    setGrades((prev) => {
      const sessionGrades = { ...prev[currentSession] };
      sessionGrades[student] = { ...sessionGrades[student], subjects: updatedSubjects };
      return { ...prev, [currentSession]: sessionGrades };
    });
    setEditingData(null);
  };

  const deleteStudent = (studentName) => {
    setGrades((prev) => {
      const sessionGrades = { ...prev[currentSession] };
      delete sessionGrades[studentName];
      return { ...prev, [currentSession]: sessionGrades };
    });
    setEditingData(null);
  };

  const resetGrades = () => {
    setGrades((prev) => {
      const resetSessionGrades = Object.fromEntries(
        Object.entries(prev).map(([session, students]) => [
          session,
          Object.fromEntries(
            Object.entries(students).map(([student, data]) => [
              student,
              { ...data, subjects: Object.fromEntries(
                Object.keys(data.subjects).map((subject) => [subject, "Нет данных"])
              ) }
            ])
          )
        ])
      );
      return resetSessionGrades;
    });
  };

  const closeAddModal = () => setAddModalVisible(false);

  const gradesForSession = grades[currentSession] || {};

  return (
    <div>
      <h3>Панель преподавателя</h3>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Выберите сессию:
          <select value={currentSession} onChange={handleSessionChange}>
            {Object.keys(initialGrades).map((session) => (
              <option key={session} value={session}>
                {session}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button onClick={() => setAddModalVisible(true)}>Добавить студента</button>
      <button onClick={resetGrades} style={{ marginLeft: "10px", backgroundColor: "#ff4d4d", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>
        Сбросить все оценки
      </button>
      <h4>Оценки для {currentSession}:</h4>
      <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Студент</th>
            <th>Шифр</th>
            <th>Предметы и Оценки</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(gradesForSession).length > 0 ? (
            Object.entries(gradesForSession).map(([student, { code, subjects }], idx) => (
              <tr
                key={`${student}-${idx}`}
                onClick={() => openEditModal(student, { code, subjects })}
                style={{ cursor: "pointer", transition: "background-color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f8ff")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
              >
                <td>{student}</td>
                <td>{code}</td>
                <td>
                  {Object.entries(subjects).map(([subject, grade]) => (
                    <p key={subject}>
                      <b>{subject}:</b>{" "}
                      {typeof grade === "object" ? JSON.stringify(grade) : grade}
                    </p>
                  ))}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                Нет данных
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {editingData && (
        <EditGradeModal
          data={editingData}
          onSave={(updatedSubjects) => updateGrade(editingData.student, updatedSubjects)}
          onDeleteStudent={deleteStudent}
          onClose={() => setEditingData(null)}
        />
      )}

      {addModalVisible && (
        <AddStudentModal
          onSave={(studentName, studentCode, subjects) =>
            addStudent(studentName, studentCode, subjects)
          }
          onClose={closeAddModal}
        />
      )}
    </div>
  );
}

export default TeacherPanel;
