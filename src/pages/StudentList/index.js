import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { Debounce } from 'react-throttle';
import Search from '~/components/Search';
import api from '~/services/api';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [studentsToShow, setStudentsToShow] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');

      setStudents(response.data);
      setStudentsToShow(response.data);
    }

    loadStudents();
  }, []);

  function handleEdit(id) {
    console.tron.log(id);
  }

  function handleRemove(id) {
    console.tron.log(id);
  }

  function handleSearch(query) {
    console.tron.log(query);
    console.tron.log(students);
  }

  return (
    <>
      <div className="actions">
        <h1 className="section-title">Gerenciando alunos</h1>

        <div className="cta">
          <Link to="/student-add" className="btn btn-primary">
            <MdAdd size={20} /> <span>Cadastrar</span>
          </Link>
          <Debounce time="400" handler="onChange">
            <Search onChange={e => handleSearch(e.target.value)} />
          </Debounce>
        </div>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th colSpan="1">Nome</th>
              <th colSpan="1">Email</th>
              <th colSpan="1">Idade</th>
              <th colSpan="1" aria-label="Ações" />
            </tr>
          </thead>
          <tbody>
            {studentsToShow.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>
                  <div className="actions">
                    <button
                      className="edit"
                      type="button"
                      onClick={() => handleEdit(student.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="remove"
                      type="button"
                      onClick={() => handleRemove(student.id)}
                    >
                      Apagar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
