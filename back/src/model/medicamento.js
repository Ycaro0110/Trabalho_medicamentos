class Medicamento {
  _id;
  _nome;
  _nomeComercial;
  _dose;

  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }

  get nome() {
    return this._nome;
  }
  set nome(value) {
    this._nome = value;
  }

  get nomeComercial() {
    return this._nomeComercial;
  }
  set nomeComercial(value) {
    this._nomeComercial = value;
  }

  get dose() {
    return this._dose;
  }
  set dose(value) {
    this._dose = value;
  }

  constructor(pId,pNome,pNomeComercial,pDose) {
    this.id = pId;
    this.Nome = pNome;
    this.NomeComercial = pNomeComercial;
    this.Dose = pDose;
  }
}

export default Medicamento;
