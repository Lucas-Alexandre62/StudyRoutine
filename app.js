// Dados de exemplo: horários e disciplinas por dia
const rotina = {
    'Segunda': [
        { horario: '07:15', disciplina: 'Ensino Digital' },
        { horario: '09:00', disciplina: 'Desenvolvimento Sustentável e Direitos Individuais' },
        { horario: '07:30', disciplina: 'Usabilidade e Interface Humano Máquina' }
    ],
    'Terça': [
        { horario: '08:30', disciplina: 'Ensino Digital' },
        { horario: '07:40', disciplina: 'Desenvolvimento Sustentável e Direitos Individuais' },
        { horario: '08:35', disciplina: 'Usabilidade e Interface Humano Máquina' }
    ],
    'Quarta': [
        { horario: '09:10', disciplina: 'Ensino Digital' },
        { horario: '08:20', disciplina: 'Desenvolvimento Sustentável e Direitos Individuais' },
        { horario: '09:15', disciplina: 'Usabilidade e Interface Humano Máquina' }
    ],
    'Quinta': [
        { horario: '10:05', disciplina: 'Ensino Digital' },
        { horario: '10:10', disciplina: 'Desenvolvimento Sustentável e Direitos Individuais' },
        { horario: '10:30', disciplina: 'Usabilidade e Interface Humano Máquina' }
    ],
    'Sexta': [
        { horario: '08:00', disciplina: 'Ensino Digital' },
        { horario: '09:30', disciplina: 'Desenvolvimento Sustentável e Direitos Individuais' },
        { horario: '08:05', disciplina: 'Usabilidade e Interface Humano Máquina' }
    ]
};

const dias = Object.keys(rotina);

function renderDias() {
    const diasContainer = document.getElementById('diasContainer');
    diasContainer.innerHTML = '';
    dias.forEach(dia => {
        const btn = document.createElement('button');
        btn.className = 'dia-btn';
        btn.textContent = dia;
        btn.onclick = () => selecionarDia(dia, btn);
        diasContainer.appendChild(btn);
    });
}

function selecionarDia(diaSelecionado, btnSelecionado) {
    document.querySelectorAll('.dia-btn').forEach(btn => btn.classList.remove('selected'));
    btnSelecionado.classList.add('selected');
    const horariosContainer = document.getElementById('horariosContainer');
    horariosContainer.innerHTML = '';
    const horarios = rotina[diaSelecionado];
    if(window.currentLayout === 'table') {
        const table = document.createElement('table');
        table.className = 'horarios-table';
        table.innerHTML = `<tr><th>Horário</th><th>Disciplina</th></tr>`;
        horarios.forEach(item => {
            table.innerHTML += `<tr><td>${item.horario}</td><td>${item.disciplina}</td></tr>`;
        });
        horariosContainer.appendChild(table);
        document.getElementById('diasContainer').style.display = '';
    } else if(window.currentLayout === 'fulltable') {
        const table = document.createElement('table');
        table.className = 'horarios-table';
        let header = '<tr><th>Horário</th><th>Disciplina</th><th>Dia</th></tr>';
        let rows = '';
        dias.forEach(dia => {
            rotina[dia].forEach(item => {
                rows += `<tr><td>${item.horario}</td><td>${item.disciplina}</td><td>${dia}</td></tr>`;
            });
        });
        table.innerHTML = header + rows;
        horariosContainer.appendChild(table);
        document.getElementById('diasContainer').style.display = 'none';
    } else {
        horarios.forEach(item => {
            const card = document.createElement('div');
            card.className = 'horario-card';
            card.innerHTML = `<div class="horario">${item.horario}</div><div class="disciplina">${item.disciplina}</div>`;
            horariosContainer.appendChild(card);
        });
        document.getElementById('diasContainer').style.display = '';
    }
}

window.currentLayout = 'cards';
document.addEventListener('DOMContentLoaded', function() {
    renderDias();
    const primeiroBtn = document.querySelector('.dia-btn');
    if (primeiroBtn) primeiroBtn.click();
    document.getElementById('btn-edicao').onclick = function() {
        window.location.href = 'editar.html';
    };
    document.getElementById('btn-consultar').onclick = function() {
        alert('Disciplinas atuais:\n' + Array.from(new Set([].concat(...Object.values(rotina).map(arr => arr.map(x => x.disciplina))))).join('\n'));
    };
    document.getElementById('btn-avisos').onclick = function() {
        window.location.href = 'avisos.html';
    };
    const btnToggle = document.getElementById('btn-layout-toggle');
    const layoutOptions = document.getElementById('layoutOptions');
    btnToggle.onclick = function(e) {
        e.stopPropagation();
        layoutOptions.style.display = layoutOptions.style.display === 'none' ? 'block' : 'none';
    };
    document.body.addEventListener('click', function() {
        layoutOptions.style.display = 'none';
    });
    layoutOptions.addEventListener('click', function(e) {
        e.stopPropagation();
        if(e.target.classList.contains('layout-option')) {
            window.currentLayout = e.target.getAttribute('data-layout');
            if(window.currentLayout === 'fulltable') {
                const horariosContainer = document.getElementById('horariosContainer');
                horariosContainer.innerHTML = '';
                const table = document.createElement('table');
                table.className = 'horarios-table';
                let header = '<tr><th>Horário</th><th>Disciplina</th><th>Dia</th></tr>';
                let rows = '';
                dias.forEach(dia => {
                    rotina[dia].forEach(item => {
                        rows += `<tr><td>${item.horario}</td><td>${item.disciplina}</td><td>${dia}</td></tr>`;
                    });
                });
                table.innerHTML = header + rows;
                horariosContainer.appendChild(table);
                document.getElementById('diasContainer').style.display = 'none';
            } else {
                const selectedBtn = document.querySelector('.dia-btn.selected');
                if(selectedBtn) selectedBtn.click();
                document.getElementById('diasContainer').style.display = '';
            }
            layoutOptions.style.display = 'none';
            btnToggle.textContent = 'Escolher layout ▼';
        }
    });
});

