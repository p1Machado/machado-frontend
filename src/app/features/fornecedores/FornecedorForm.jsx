import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bancoSelectors, fetchBancos } from "app/features/bancos/bancoSlice";

import { Box, IconButton, makeStyles, Tooltip, Typography } from "@material-ui/core";
import { FlashOn as AutoFillIcon } from "@material-ui/icons";

import { Condition, Form, SelectField, TextField, TipoPessoaSwitchField } from "app/components/forms/final-form";

import OperacaoCaixaEconomica from "app/domain/OperacaoCaixaEconomica";
import TipoPessoa from "app/domain/TipoPessoa";
import formatString from "format-string-by-pattern";

const cpfPattern = "XXX.XXX.XXX-XX";
const cnpjPattern = "XX.XXX.XXX/XXXX-XX";
const cepPattern = "XXXXX-XXX";
const rgPattern = "X.XXX.XXX";
const iePattern = "XX.XXX.XXX-X";

export default function FornecedorForm({ onSubmit, initialValues, children }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const bancos = useSelector(bancoSelectors.selectAll);
  const bancosOptions = useMemo(
    () => bancos.map(({ id, compe, nome }) => ({ value: id, label: `${compe} - ${nome}` })),
    [bancos],
  );
  const bancosByCompe = useMemo(
    () =>
      bancos.reduce((acc, banco) => {
        acc[banco.compe] = banco.id;
        return acc;
      }, {}),
    [bancos],
  );

  useEffect(() => {
    dispatch(fetchBancos());
  }, [dispatch]);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={(values) => {
        if (!values.nome) {
          return { nome: "Campo obrigatório" };
        }
      }}
      mutators={{
        copyToBankAccount(_args, state, form) {
          form.changeValue(state, "dadosBancarios.favorecido", () => state.formState.values.nome);
          form.changeValue(state, "dadosBancarios.favorecido", () => state.formState.values.nome);
          form.changeValue(state, "dadosBancarios.tipoPessoa", () => state.formState.values.tipoPessoa);
          form.changeValue(state, "dadosBancarios.cpfCnpj", () => state.formState.values.cpfCnpj);
          form.changeValue(
            state,
            "dadosBancarios.rgInscricaoEstadual",
            () => state.formState.values.rgInscricaoEstadual,
          );
        },
      }}
    >
      {(props) => {
        const {
          form: { mutators },
        } = props;
        return (
          <>
            <Box pt={2} pb={1}>
              <Typography variant="subtitle1">Identificação</Typography>
            </Box>
            <Box className={classes.dadosBasicos}>
              <TextField name="nome" label="Nome" required autoFocus />
              <TipoPessoaSwitchField name="tipoPessoa" defaultValue={TipoPessoa.FISICA} />
              <Condition when="tipoPessoa" is={TipoPessoa.FISICA}>
                <CpfField name="cpfCnpj" label="CPF" required />
                <RgField name="rgInscricaoEstadual" label="RG" />
              </Condition>
              <Condition when="tipoPessoa" is={TipoPessoa.JURIDICA}>
                <CnpjField name="cpfCnpj" label="CNPJ" required />
                <IeField name="rgInscricaoEstadual" label="Inscrição estadual" />
              </Condition>
              <TextField name="cep" label="CEP" format={formatString(cepPattern)} />
              <TextField name="endereco" label="Endereço" />
            </Box>
            <Box pt={2} pb={1}>
              <Typography variant="subtitle1">Contato</Typography>
            </Box>
            <Box className={classes.contato}>
              <TextField name="contato.nome" label="Nome" />
              <TextField name="contato.fone1" label="Telefone 1" />
              <TextField name="contato.fone2" label="Telefone 2" />
              <TextField name="contato.mail" label="E-mail" />
            </Box>
            <Box pt={2} pb={1} display="flex">
              <Typography variant="subtitle1" style={{ flex: 1 }}>
                Dados bancários
              </Typography>
              <Tooltip title="Copiar os dados de identificação" placement="left">
                <IconButton onClick={mutators.copyToBankAccount} style={{ marginTop: -10, marginBottom: -10 }}>
                  <AutoFillIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box pb={2} className={classes.dadosBancarios}>
              <TextField name="dadosBancarios.favorecido" label="Favorecido" />
              <TipoPessoaSwitchField name="dadosBancarios.tipoPessoa" defaultValue={TipoPessoa.FISICA} />
              <Condition when="dadosBancarios.tipoPessoa" is={TipoPessoa.FISICA}>
                <CpfField name="dadosBancarios.cpfCnpj" label="CPF" required />
                <RgField name="dadosBancarios.rgInscricaoEstadual" label="RG" />
              </Condition>
              <Condition when="dadosBancarios.tipoPessoa" is={TipoPessoa.JURIDICA}>
                <CnpjField name="dadosBancarios.cpfCnpj" label="CNPJ" required />
                <IeField name="dadosBancarios.rgInscricaoEstadual" label="Inscrição estadual" />
              </Condition>

              <SelectField name="dadosBancarios.bancoId" label="Banco" options={bancosOptions} />
              <TextField name="dadosBancarios.agencia" label="Agência" />
              <TextField name="dadosBancarios.conta" label="Conta" />
              <Condition when="dadosBancarios.bancoId" is={bancosByCompe[104]} /* Caixa Econômica */>
                <SelectField
                  name="dadosBancarios.operacao"
                  label="Número operação"
                  options={OperacaoCaixaEconomica.values}
                  mapOptionToLabel={(option) => `${option.value} - ${option.label}`}
                />
              </Condition>
            </Box>
            {children(props)}
          </>
        );
      }}
    </Form>
  );
}

function CpfField(props) {
  return <TextField format={formatString(cpfPattern)} parse={formatString(cpfPattern)} {...props} />;
}

function RgField(props) {
  return <TextField format={formatString(rgPattern)} parse={formatString(rgPattern)} {...props} />;
}

function CnpjField(props) {
  return <TextField format={formatString(cnpjPattern)} parse={formatString(cnpjPattern)} {...props} />;
}

function IeField(props) {
  return <TextField format={formatString(iePattern)} parse={formatString(iePattern)} {...props} />;
}

const useStyles = makeStyles((theme) => ({
  banco: {
    gridArea: "bancoId",
  },
  dadosBasicos: {
    display: "grid",
    gridTemplateAreas: `
    "nome nome nome nome"
    "tipoPessoa tipoPessoa cpfCnpj rgInscricaoEstadual"
    "cep endereco endereco endereco"
    `,
    columnGap: "1em",
    rowGap: "4px",
    [theme.breakpoints.down("xs")]: {
      display: "unset",
    },
  },
  contato: {
    display: "grid",
    gridTemplateAreas: `
    "nome nome fone1 fone2"
    "mail mail mail ."
    `,
    columnGap: "1em",
    rowGap: ".5em",
    [theme.breakpoints.down("xs")]: {
      display: "unset",
    },
  },
  dadosBancarios: {
    display: "grid",
    gridTemplateAreas: `
    "favorecido favorecido favorecido favorecido"
    "tipoPessoa tipoPessoa cpfCnpj rgInscricaoEstadual"
    "bancoId bancoId agencia conta"
    "operacao operacao . ."
    `,
    columnGap: "1em",
    rowGap: ".5em",
    [theme.breakpoints.down("xs")]: {
      display: "unset",
    },
  },
}));
