// Integração frontend avisos.html com backend Java Spring Boot
const API_URL = '/api/avisos';

document.addEventListener('DOMContentLoaded', function() {
    const lista = document.getElementById('lista-avisos');
    const form = document.getElementById('form-aviso');
    const input = document.getElementById('input-aviso');

    function fetchAvisos() {
        fetch(API_URL)
            .then(res => res.json())
            .then(avisos => renderAvisos(avisos));
    }

    function renderAvisos(avisos) {
        lista.innerHTML = '';
        avisos.forEach(aviso => {
            const li = document.createElement('li');
            li.className = 'aviso-item' + (aviso.lido ? ' aviso-lido' : '');
            li.innerHTML = `
                <input type="checkbox" ${aviso.lido ? 'checked' : ''} class="check-aviso">
                <span class="aviso-text">${aviso.texto}</span>
                <button class="remover-aviso rotina-btn" title="Remover">&times;</button>
            `;
            // Remover aviso
            li.querySelector('.remover-aviso').onclick = function() {
                fetch(`${API_URL}/${aviso.id}`, { method: 'DELETE' })
                    .then(() => fetchAvisos());
            };
            // Marcar como lido
            li.querySelector('.check-aviso').onchange = function() {
                fetch(`${API_URL}/${aviso.id}/lido?lido=${this.checked}`, { method: 'PUT' })
                    .then(() => fetchAvisos());
            };
            lista.appendChild(li);
        });
    }

    form.onsubmit = function(e) {
        e.preventDefault();
        const texto = input.value.trim();
        if (!texto) return;
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `texto=${encodeURIComponent(texto)}`
        }).then(() => {
            input.value = '';
            fetchAvisos();
        });
    };

    fetchAvisos();
});
