let rotina = {
    'Segunda': [],
    'Terça': [],
    'Quarta': [],
    'Quinta': [],
    'Sexta': []
};

const dias = Object.keys(rotina);
let modoEdicao = false;

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
    
    if (horarios.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'empty-msg';
        emptyMsg.textContent = 'Nenhuma disciplina ou horário cadastrado.';
        horariosContainer.appendChild(emptyMsg);
    } else if(window.currentLayout === 'table') {
        const tableContainer = document.createElement('div');
        tableContainer.className = 'table-container';
        const table = document.createElement('table');
        table.className = 'horarios-table';
        table.innerHTML = `<tr><th>Horário</th><th>Disciplina</th></tr>`;
        horarios.forEach((item, idx) => {
            const tr = document.createElement('tr');
            const tdHorario = document.createElement('td');
            tdHorario.textContent = item.horario || 'Adicionar horário';
            tdHorario.id = `${diaSelecionado}_${idx}`;
            if(modoEdicao) {
                tdHorario.className = 'editavel';
                tdHorario.contentEditable = true;
                tdHorario.onblur = function() {
                    rotina[diaSelecionado][idx].horario = tdHorario.textContent;
                };
            }
            const tdDisciplina = document.createElement('td');
            tdDisciplina.textContent = item.disciplina || '';
            if(modoEdicao) {
                tdDisciplina.className = 'editavel';
                tdDisciplina.contentEditable = true;
                tdDisciplina.onblur = function() {
                    rotina[diaSelecionado][idx].disciplina = tdDisciplina.textContent;
                };
            }
            tr.appendChild(tdHorario);
            tr.appendChild(tdDisciplina);
            table.appendChild(tr);
        });
        tableContainer.appendChild(table);
        horariosContainer.appendChild(tableContainer);
    } else if(window.currentLayout === 'fulltable') {
        const table = document.createElement('table');
        table.className = 'horarios-table';
        let header = '<tr><th>Horário</th><th>Disciplina</th><th>Dia</th></tr>';
        let rows = '';
        dias.forEach(dia => {
            if (rotina[dia].length === 0) {
                rows += `<tr><td colspan='3'>Nenhuma disciplina ou horário cadastrado.</td></tr>`;
            } else {
                rotina[dia].forEach((item, idx) => {
                    rows += `<tr><td id='${dia}_${idx}'>${item.horario || 'Adicionar horário'}</td><td>${item.disciplina || ''}</td><td>${dia}</td></tr>`;
                });
            }
        });
        table.innerHTML = header + rows;
        horariosContainer.appendChild(table);
        document.getElementById('diasContainer').style.display = 'none';
    } else {
        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'cards-container';
        horarios.forEach((item, idx) => {
            const card = document.createElement('div');
            card.className = 'horario-card';
            card.innerHTML = `
                <div class="horario" id='${diaSelecionado}_${idx}'>${item.horario || 'Adicionar horário'}</div>
                <div class="disciplina">${item.disciplina || ''}</div>
            `;
            cardsContainer.appendChild(card);
        });
        horariosContainer.appendChild(cardsContainer);
    }
}

// Função para criar elementos decorativos
function createFloatingElements() {
    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-elements-container';
    document.body.appendChild(floatingContainer);

    const shapes = ['floating-circle', 'floating-star', 'floating-square', 'floating-triangle'];
    const numElementsPerShape = 15; // 15 elementos de cada forma
    
    shapes.forEach(shape => {
        for (let i = 0; i < numElementsPerShape; i++) {
            const element = document.createElement('div');
            element.className = shape;
            
            // Posição aleatória
            element.style.left = `${Math.random() * 100}vw`;
            element.style.top = `${Math.random() * 100}vh`;
            
            // Tamanho aleatório
            const size = Math.random() * 30 + 20;
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            
            // Rotação inicial aleatória
            element.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            // Animação com delay aleatório
            element.style.animationDelay = `${Math.random() * 2}s`;
            element.style.animationDuration = `${Math.random() * 4 + 4}s`;
            
            floatingContainer.appendChild(element);
        }
    });
}

window.currentLayout = 'cards';
document.addEventListener('DOMContentLoaded', function() {
    renderDias();
    const primeiroBtn = document.querySelector('.dia-btn');
    if (primeiroBtn) primeiroBtn.click();

    // Menu Toggle functionality
    const menuToggle = document.getElementById('btn-menu-toggle');
    const menuOptions = document.getElementById('menuOptions');

    // Toggle menu when clicking the menu button
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        menuOptions.style.display = menuOptions.style.display === 'none' ? 'block' : 'none';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menuOptions.contains(e.target) && e.target !== menuToggle) {
            menuOptions.style.display = 'none';
        }
    });

    // Handle all menu option clicks
    menuOptions.addEventListener('click', function(e) {
        e.stopPropagation();
        const option = e.target.closest('.menu-option');
        if (!option) return;

        // Handle layout options
        const layout = option.dataset.layout;
        if (layout) {
            window.currentLayout = layout;
            const selectedBtn = document.querySelector('.dia-btn.selected');
            if (selectedBtn) {
                selecionarDia(selectedBtn.textContent, selectedBtn);
            }
            document.getElementById('diasContainer').style.display = 
                layout === 'fulltable' ? 'none' : '';
        }

        // Handle other menu options
        switch(option.id) {
            case 'btn-edicao':
                modoEdicao = !modoEdicao;
                window.currentLayout = 'table';
                const selectedBtn = document.querySelector('.dia-btn.selected');
                if(selectedBtn) {
                    selecionarDia(selectedBtn.textContent, selectedBtn);
                }
                option.querySelector('span:not(.icon)').textContent = 
                    modoEdicao ? 'Salvar edição' : 'Modo edição';
                break;
            case 'btn-consultar':
                alert('Disciplinas atuais:\n' + 
                    Array.from(new Set([].concat(...Object.values(rotina)
                        .map(arr => arr.map(x => x.disciplina)))))
                        .filter(Boolean)
                        .join('\n')
                );
                break;
            case 'btn-avisos':
                window.location.href = 'avisos.html';
                break;
        }

        // Close menu after action
        menuOptions.style.display = 'none';
    });

    const btnAdicionarDisciplina = document.getElementById('btn-adicionar-disciplina');
    if(btnAdicionarDisciplina) {
        btnAdicionarDisciplina.onclick = function() {
            const selectedBtn = document.querySelector('.dia-btn.selected');
            if(selectedBtn) {
                const diaSelecionado = selectedBtn.textContent;
                rotina[diaSelecionado].push({ horario: '', disciplina: '' });
                selecionarDia(diaSelecionado, selectedBtn);
            }
        };
    }

    createFloatingElements();
});

