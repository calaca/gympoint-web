import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { useHistory } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import Mask from '~/components/Mask';
import { editRequest } from '~/store/modules/students/actions';
import formatMetricToNumber from '~/utils/formatMetricToInteger';
import { Label, Grid } from './styles';

export default function StudentEdit() {
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.students.loading);
  const [nameValue, setNameValue] = useState(
    history.location.state.student.name
  );
  const [emailValue, setEmailValue] = useState(
    history.location.state.student.email
  );
  const [ageValue, setAgeValue] = useState(history.location.state.student.age);

  function handleSubmit(student) {
    console.tron.log();

    const formattedStudent = {
      ...student,
      weight:
        typeof student.weight !== 'number'
          ? formatMetricToNumber(student.weight)
          : student.weight,
      height:
        typeof student.height !== 'number'
          ? formatMetricToNumber(student.height)
          : student.height,
    };

    console.tron.log(formattedStudent);

    dispatch(editRequest(formattedStudent, history.location.state.student.id));
  }
  return (
    <>
      <div className="actions">
        <h1 className="section-title">Cadastro de aluno</h1>

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
            form="update-student-form"
            className="btn btn-primary"
          >
            <MdCheck size={20} /> <span>{loading ? 'Salvando' : 'Salvar'}</span>
          </button>
        </div>
      </div>
      <div className="box">
        <Form id="update-student-form" onSubmit={handleSubmit}>
          <Label htmlFor="name">
            Nome completo
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Jane Doe"
              value={nameValue}
              onChange={e => setNameValue(e.target.value)}
            />
          </Label>

          <Label htmlFor="email">
            Endereço de email
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="exemplo@email.com"
              value={emailValue}
              onChange={e => setEmailValue(e.target.value)}
            />
          </Label>

          <Grid>
            <Label htmlFor="age">
              Idade
              <Input
                type="number"
                name="age"
                id="age"
                value={ageValue}
                onChange={e => setAgeValue(e.target.value)}
              />
            </Label>

            <Label htmlFor="weight">
              Peso <em>(em kg)</em>
              <Mask
                name="weight"
                inputMask="99,9kg"
                valueDefault={history.location.state.student.weight}
              />
            </Label>

            <Label htmlFor="height">
              Altura
              <Mask
                name="height"
                inputMask="9,99m"
                valueDefault={history.location.state.student.height}
              />
            </Label>
          </Grid>
        </Form>
      </div>
    </>
  );
}
