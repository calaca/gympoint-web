import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { Label } from './styles';

export default function EnrollmentAdd() {
  const history = useHistory();
  const loading = useSelector(state => state.enrollments.loading);

  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <div className="actions">
        <h1 className="section-title">Cadastro de matrícula</h1>

        <div className="cta">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              history.goBack();
            }}
          >
            <MdChevronLeft size={20} /> <span>Voltar</span>
          </button>
          <button
            type="submit"
            form="register-plan-form"
            className="btn btn-primary"
          >
            <MdCheck size={20} /> <span>{loading ? 'Salvando' : 'Salvar'}</span>
          </button>
        </div>
      </div>
      <div className="box">
        <Form id="register-plan-form" onSubmit={handleSubmit}>
          <Label htmlFor="student">
            Aluno
            <Input
              type="text"
              name="student"
              id="student"
              placeholder="Buscar aluno"
            />
          </Label>
        </Form>
      </div>
    </>
  );
}
