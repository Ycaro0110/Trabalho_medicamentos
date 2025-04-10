import { incluirMedicamento, alterarMedicamento, excluirMedicamento, conferirDados } from './medicamentos.js';

document.addEventListener('DOMContentLoaded', () => {
  const btnIncluir = document.getElementById('btnMedicamentoIncluir');
  const btnAlterar = document.getElementById('btnMedicamentoAlterar');
  const btnExcluir = document.getElementById('btnMedicamentoExcluir');
  const btnConferir = document.getElementById('btnMedicamentoConferir');

  btnIncluir.addEventListener('click', incluirMedicamento);
  btnAlterar.addEventListener('click', alterarMedicamento);
  btnExcluir.addEventListener('click', excluirMedicamento);
  btnConferir.addEventListener('click', conferirDados);
});