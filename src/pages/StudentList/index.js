import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import escapeRegExp from 'escape-string-regexp';
import { removeRequest, loadRequest } from '~/store/modules/students/actions';
import history from '~/services/history';

export default function StudentList() {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students.students);
  const [query, setQuery] = useState('');
  const [studentsToShow, setStudentsToShow] = useState([]);

  useEffect(() => {
    dispatch(loadRequest());
  }, [dispatch]);

  useMemo(() => {
    function filterResults() {
      if (query) {
        const match = new RegExp(escapeRegExp(query.trim().toLowerCase()), 'i');

        const results = students.filter(student => {
          const name = match.test(student.name);
          const email = match.test(student.email);

          return name + email;
        });

        setStudentsToShow(results);
      } else {
        setStudentsToShow(students);
      }
    }

    filterResults();
  }, [query, students]);

  function handleEdit(id) {
    const student = students.find(s => s.id === id);
    history.push(`/students/edit/${id}`, {
      student,
    });
  }

  function handleRemove(id) {
    dispatch(removeRequest(id));
  }

  function handleSearch(e) {
    setQuery(e.target.value);
  }

  return (
    <>
      <div className="actions">
        <h1 className="section-title">Gerenciando alunos</h1>

        <div className="cta">
          <Link to="/students/add" className="btn btn-primary">
            <MdAdd size={20} /> <span>Cadastrar</span>
          </Link>
          <div className="search-wrapper">
            <MdSearch size={16} />
            <input
              className="search"
              type="text"
              placeholder="Buscar aluno"
              value={query}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className="table-wrapper">
        {studentsToShow.length !== 0 ? (
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
        ) : (
          <div className="box">
            <p>
              Não existem resultados para <strong>{query}</strong>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
