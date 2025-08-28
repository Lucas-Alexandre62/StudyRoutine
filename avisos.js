document.addEventListener('DOMContentLoaded', function() {
    const lista = document.getElementById('lista-avisos');
    const form = document.getElementById('form-aviso');
    const input = document.getElementById('input-aviso');

    function getAvisos() {
        return JSON.parse(localStorage.getItem('avisos') || '[]');
    }
    function setAvisos(avisos) {
        localStorage.setItem('avisos', JSON.stringify(avisos));
    }
    function renderAvisos() {
        lista.innerHTML = '';
        const avisos = getAvisos();
        // Mais novos em cima
        avisos.slice().reverse().forEach((aviso, idx) => {
            const li = document.createElement('li');
            li.className = 'aviso-item';
            if (aviso.lido) li.classList.add('aviso-lido');
            li.innerHTML = `
                <input type="checkbox" ${aviso.lido ? 'checked' : ''} class="check-aviso">
                <span class="aviso-text">${aviso.texto}</span>
                <button class="remover-aviso rotina-btn" title="Remover">&times;</button>
            `;
            // Remover aviso
            li.querySelector('.remover-aviso').onclick = function() {
                avisos.splice(avisos.length - 1 - idx, 1);
                setAvisos(avisos);
                renderAvisos();
            };
            // Marcar como lido
            li.querySelector('.check-aviso').onchange = function() {
                avisos[avisos.length - 1 - idx].lido = this.checked;
                setAvisos(avisos);
                renderAvisos();
            };
            lista.appendChild(li);
        });
    }
    form.onsubmit = function(e) {
        e.preventDefault();
        const texto = input.value.trim();
        if (!texto) return;
        const avisos = getAvisos();
        avisos.push({ texto, lido: false });
        setAvisos(avisos);
        input.value = '';
        renderAvisos();
    };
    renderAvisos();
});
