import React, { useCallback, useEffect, useState } from "react";
// import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { orcamentoSelectors, saveOrcamento, fetchOrcamento } from "../orcamentos/orcamentoSlice";
import { Alert } from "app/utils/alertUtils";

import { OrcamentoFormDialog, OrcamentoList } from "../orcamentos";

export function ProjetoOrcamentoTabPanel({ orcamentos }) {
  const dispatch = useDispatch();
  // const history = useHistory();
  // const { projetoId } = useParams();

  const [openUpdateOrcamento, setOpenUpdateOrcamento] = useState(false);
  const [currentOrcamentoId, setCurrentOrcamentoId] = useState(null);
  const currentOrcamento = useSelector((state) => orcamentoSelectors.selectById(state, currentOrcamentoId));

  useEffect(() => {
    if (currentOrcamentoId) {
      dispatch(fetchOrcamento(currentOrcamentoId));
    }
  }, [dispatch, currentOrcamentoId]);

  const handleUpdateOrcamento = useCallback(
    async (values) => {
      try {
        await dispatch(saveOrcamento(values));
        setOpenUpdateOrcamento(false);
        setCurrentOrcamentoId(null);
        Alert.success("Orçamento salvo com sucesso!");
      } catch (err) {
        Alert.error("Não foi possível salvar o orçamento... :(", err);
      }
    },
    [dispatch],
  );

  return (
    <>
      <OrcamentoList
        orcamentos={orcamentos}
        // onClick={(e) => history.push(`/projetos/${projetoId}/orcamentos/${e.target.value.id}`)}
        onUpdateClick={(e) => {
          setOpenUpdateOrcamento(true);
          setCurrentOrcamentoId(e.target.value.id);
        }}
      />
      <OrcamentoFormDialog
        initialValues={currentOrcamento}
        onSubmit={handleUpdateOrcamento}
        open={openUpdateOrcamento}
        onClose={() => setOpenUpdateOrcamento(false)}
        onExited={() => setCurrentOrcamentoId(null)}
      />
    </>
  );
}
