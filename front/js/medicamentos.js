import { BASEURL } from "./consts.js";

const inpIdMed = document.querySelector("#inpIdMed");
const inpDescricaoMed = document.querySelector("#inpDescricaoMed");
const inpValorMed = document.querySelector("#inpValorMed");
const inpDoseMed = document.querySelector("#inpDoseMed");

const ulErros = document.querySelector("#ulErros");

export async function incluirMedicamento() {
    ulErros.innerHTML = "";
    let erros = false;

    if (!inpIdMed.value) {
        ulErros.innerHTML += "<li>Informe o código (ID)</li>";
        erros = true;
    }

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
        id: Number(inpIdMed.value),
        nome: inpDescricaoMed.value,
        nome_comercial: inpValorMed.value,
        dose: Number(inpDoseMed.value)
    };

    try {
        const resp = await fetch(`${BASEURL}medicamentos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(med)
        });

        const txt = await resp.text();

        if (resp.ok && txt.toUpperCase() === "OK") {
            alert("O medicamento foi incluido com sucesso");
            limparCampos();
            carregaMedicamentos();
        } else {
            alert("Erro: O medicamento não foi incluido." + txt);
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro: A conexão com o servidor não foi feita.");
    }
}

export async function alterarMedicamento() {
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

    try {
        const resp = await fetch(`${BASEURL}medicamentos/${med.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(med)
        });

        const txt = await resp.text();

        if (resp.ok && txt.toUpperCase() === "OK") {
            alert("O medicamento foi alterado com sucesso");
            limparCampos();
            carregaMedicamentos();
        } else {
            alert("Erro: Não foi possível alterar medicamento: " + txt);
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro: A conexão com o servidor não foi feita.");
    }
}

export async function excluirMedicamento() {
    ulErros.innerHTML = "";

    if (!inpIdMed.value) {
        ulErros.innerHTML += "<li>Informe o código</li>";
        return;
    }

    if (!confirm("Tem certeza que deseja excluir o medicamento?")) return;

    const id = Number(inpIdMed.value);

    try {
        const resp = await fetch(`${BASEURL}medicamentos/${id}`, {
            method: "DELETE"
        });

        const txt = await resp.text();

        if (resp.ok && txt.toUpperCase() === "OK") {
            alert("O medicamento foi excluído com sucesso");
            limparCampos();
            carregaMedicamentos();
        } else {
            alert("Erro: A conexão com o servidor não foi feita. " + txt);
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro: A conexão com o servidor não foi feita.");
    }
}

export async function conferirDados() {
    ulErros.innerHTML = "";

    if (!inpIdMed.value) {
        ulErros.innerHTML += "<li>Informe o código</li>";
        return;
    }

    const id = Number(inpIdMed.value);

    try {
        const resp = await fetch(`${BASEURL}medicamentos/${id}`);

        if (!resp.ok) {
            alert("Erro: Código não encontrado.");
            return;
        }

        const med = await resp.json();

        if (med.id) {
            inpDescricaoMed.value = med.nome;
            inpValorMed.value = med.nome_comercial;
            inpDoseMed.value = med.dose;
        } else {
            alert("O medicamento não foi encontrado.");
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro: A conexão com o servidor não foi feita.");
    }
}

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
        })
        .catch(error => {
            console.error("Erro ao carregar medicamentos:", error);
            alert("Erro ao carregar os medicamentos.");
        });
}

carregaMedicamentos();



