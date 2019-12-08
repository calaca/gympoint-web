import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import Mask from '~/components/Mask';
import { Label, Grid } from './styles';

export default function PlanAdd() {
  const history = useHistory();
  const loading = useSelector(state => state.plans.loading);

  function handleSubmit() {}

  return (
    <>
      <div className="actions">
        <h1 className="section-title">Cadastro de plano</h1>

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
          <Label htmlFor="title">
            Título do plano
            <Input type="text" name="title" id="title" placeholder="Exemplo" />
          </Label>

          <Grid>
            <Label htmlFor="duration">
              Duração <em>(em meses)</em>
              <Input
                type="number"
                name="duration"
                id="duration"
                placeholder="1"
              />
            </Label>

            <Label htmlFor="price">
              Preço mensal
              <Mask name="price" inputMask="R$999,99" />
            </Label>

            <Label htmlFor="total">
              Preço total
              <Mask name="total" inputMask="R$999,99" />
            </Label>
          </Grid>
        </Form>
      </div>
    </>
  );
}
