document.addEventListener('DOMContentLoaded', function() {
    const btnEdicao = document.getElementById('btn-edicao');
    let modoEdicaoAtivo = false;
    btnEdicao.addEventListener('click', function() {
        modoEdicaoAtivo = !modoEdicaoAtivo;
        const table = document.querySelector('table');
        for (let i = 1; i < table.rows.length; i++) {
            for (let j = 0; j < table.rows[i].cells.length; j++) {
                const cell = table.rows[i].cells[j];
                cell.contentEditable = modoEdicaoAtivo;
                cell.style.background = modoEdicaoAtivo ? '#ffe066' : '';
                cell.style.outline = modoEdicaoAtivo ? '2px solid #4f8cff' : '';
            }
        }
        btnEdicao.textContent = modoEdicaoAtivo ? 'Salvar edição' : 'Modo edição';
    });

    // Consultar disciplinas atuais
    document.getElementById('btn-consultar').addEventListener('click', function() {
        const table = document.querySelector('table');
        let disciplinas = [];
        for (let i = 1; i < table.rows.length; i++) {
            disciplinas.push(table.rows[i].cells[0].textContent.trim());
        }
        alert('Disciplinas atuais:\n' + disciplinas.join('\n'));
    });

    // Datas e avisos
    document.getElementById('btn-avisos').addEventListener('click', function() {
        alert('Nenhum aviso cadastrado.');
    });
});

