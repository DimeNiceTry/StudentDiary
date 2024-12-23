import React from 'react';

function StudentCardModal({ student, onClose }) {
  if (!student) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
          width: "400px",
        }}
      >
        <h4>Карточка студента</h4>
        <p>
          <strong>ФИО:</strong> {student.name}
        </p>
        <p>
          <strong>Группа:</strong> {student.group}
        </p>
        <p>
          <strong>Шифр:</strong> {student.code}
        </p>
        <p>
          <strong>Средний балл:</strong> {student.average}
        </p>
        <button onClick={onClose} style={{ marginTop: "10px" }}>
          Закрыть
        </button>
      </div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 999,
        }}
        onClick={onClose}
      />
    </>
  );
}

export default StudentCardModal;