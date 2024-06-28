function abrirModal(){
    overlay.classList.add("active");
    criarTarefa.classList.add("active");
}

function fecharModal(){
    overlay.classList.remove("active");
    criarTarefa.classList.remove("active");
}

function buscarTarefa(){
    fetch("http://localhost:3000/tarefas")
        .then(res => res.json())
        .then(res => {
            inserirTarefas(res);
        })
        .catch(err => console.error('Erro ao buscar tarefas:', err));
}
buscarTarefa();

function inserirTarefas(listaDeTarefas){
    if (listaDeTarefas.length > 0){
        lista.innerHTML = ""

        listaDeTarefas.map(tarefa => {
            lista.innerHTML += `
                <li>
                    <h5>${tarefa.titulo}</h5>
                    <p>${tarefa.descricao}</p>
                    <div class="action">
                        <box-icon name='trash' type='solid' size="sm"></box-icon>
                    </div>
                </li>
            `;
        });
    }
}

function novaTarefa(){
    event.preventDefault();

    let tarefa = {
        titulo: titulo.value,
        descricao: descricao.value
    };

    fetch("http://localhost:3000/tarefas",{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(tarefa)
    })
    .then(res => res.json())
    .then(res => {
        fecharModal();
        buscarTarefas();
    })
}