import {BASEURL} from "./consts.js";

const BASEURL = "http://localhost:3000/";
const inpIdMed = document.querySelector("#inpIdMed");
const inpDescricaoMed = document.querySelector("#inpDescricaoMed");
const inpValorMed = document.querySelector("#inpValorMed");
const inpDoseMed = document.querySelector("#inpDoseMed");

const btnIncluir = document.querySelector("#btnMedicamentoIncluir");
const btnAlterar = document.querySelector("#btnMedicamentoAlterar");
const btnExcluir = document.querySelector("#btnMedicamentoExcluir");
const btnConferir = document.querySelector("#btnMedicamentoConferir");

const ulErros = document.querySelector("#ulErros");

btnIncluir.onclick = async () => {
    ulErros.innerHTML = "";
    let erros = false;

    if (!inpDescricaoMed.value) {
        ulErros.innerHTML += "<li>Informe o nome</li>";
        erros = true;
    }

    if (!inpValorMed.value) {
        ulErros.innerHTML += "<li>Informe o nome comercial</li>";
        erros = true;
    }

    if (!inpDoseMed.value) {
        ulErros.innerHTML += "<li>Informe a dose</li>";
        erros = true;
    }

    if (erros) return;

    const med = {
        nome: inpDescricaoMed.value,
        nome_comercial: inpValorMed.value,
        dose: Number(inpDoseMed.value)
    };

    const dados = JSON.stringify(med);

    const resp = await fetch(`${BASEURL}medicamentos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: dados
    });

    const txt = await resp.text();

    if (txt.toUpperCase() === "OK") {
        limparCampos();
        carregaMedicamentos();
    }
};

btnAlterar.onclick = async () => {
    ulErros.innerHTML = "";

    if (!inpIdMed.value) {
        ulErros.innerHTML += "<li>Informe o código</li>";
        return;
    }

    const med = {
        id: Number(inpIdMed.value),
        nome: inpDescricaoMed.value,
        nome_comercial: inpValorMed.value,
        dose: Number(inpDoseMed.value)
    };

    const dados = JSON.stringify(med);

    const resp = await fetch(`${BASEURL}medicamentos/${med.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: dados
    });

    const txt = await resp.text();

    if (txt.toUpperCase() === "OK") {
        limparCampos();
        carregaMedicamentos();
    }
};

btnExcluir.onclick = async () => {
    ulErros.innerHTML = "";

    if (!inpIdMed.value) {
        ulErros.innerHTML += "<li>Informe o código</li>";
        return;
    }

    if (!confirm("Deseja realmente excluir?")) return;

    const id = Number(inpIdMed.value);

    const resp = await fetch(`${BASEURL}medicamentos/${id}`, {
        method: "DELETE"
    });

    const txt = await resp.text();

    if (txt.toUpperCase() === "OK") {
        limparCampos();
        carregaMedicamentos();
    }
};

btnConferir.onclick = async () => {
    ulErros.innerHTML = "";

    if (!inpIdMed.value) {
        ulErros.innerHTML += "<li>Informe o código</li>";
        return;
    }

    const id = Number(inpIdMed.value);

    const resp = await fetch(`${BASEURL}medicamentos/${id}`);
    const med = await resp.json();

    if (med.id) {
        inpDescricaoMed.value = med.nome;
        inpValorMed.value = med.nome_comercial;
        inpDoseMed.value = med.dose;
    } else {
        alert("Medicamento não encontrado.");
    }
};

function limparCampos() {
    inpIdMed.value = "";
    inpDescricaoMed.value = "";
    inpValorMed.value = "";
    inpDoseMed.value = "";
}

function carregaMedicamentos() {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    fetch(`${BASEURL}medicamentos`)
        .then(res => res.json())
        .then(medicamentos => {
            medicamentos.forEach(med => {
                tbody.innerHTML += `
                    <tr>
                        <td>${med.id}</td>
                        <td>${med.nome}</td>
                        <td>${med.nome_comercial}</td>
                        <td>${med.dose}</td>
                    </tr>
                `;
            });
        });
}

carregaMedicamentos();
