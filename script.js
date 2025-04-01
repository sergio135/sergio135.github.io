
javascript
// Simula il salvataggio dell'utente con una quota iniziale di 30 fagioli
let user = {
    id: 'user123', // Simula un ID unico per l'utente
    balance: 30,
    betHistory: [],
};

// Funzione per aggiornare il saldo e lo storico delle scommesse
function updateBalance() {
    document.getElementById("balance").textContent = user.balance;
    const betHistory = document.getElementById("bet-history");
    betHistory.innerHTML = ''; // Resetta la lista

    if (user.betHistory.length === 0) {
        betHistory.innerHTML = '<li>No scommesse effettuate ancora.</li>';
    } else {
        user.betHistory.forEach(bet => {
            const li = document.createElement('li');
            li.textContent = `Scommessa: ${bet.amount} Fagioli, Risultato: ${bet.result}`;
            betHistory.appendChild(li);
        });
    }
}

// Funzione per gestire la scommessa
function makeBet() {
    const betAmount = parseInt(document.getElementById("bet-amount").value);
    if (betAmount > 0 && betAmount <= user.balance) {
        const result = Math.random() < 0.5 ? 'Vittoria' : 'Sconfitta';
        if (result === 'Vittoria') {
            user.balance += betAmount; // Raddoppia la scommessa in caso di vittoria
            user.betHistory.push({ amount: betAmount, result: 'Vittoria' });
        } else {
            user.balance -= betAmount; // Perde la scommessa
            user.betHistory.push({ amount: betAmount, result: 'Sconfitta' });
        }
        updateBalance();
    } else {
        alert("Scommessa non valida. Inserisci un valore inferiore o uguale al saldo disponibile.");
    }
}

// Funzione per generare il QR Code
function generateQRCode() {
    const qrCodeContainer = document.getElementById("qrcode");
    qrCodeContainer.innerHTML = ''; // Resetta il QR Code
    QRCode.toCanvas(qrCodeContainer, user.id, { width: 150 }, function (error) {
        if (error) console.error(error);
        console.log("QR Code generato!");
    });
}

// Event listener per il pulsante della scommessa
document.getElementById("bet-button").addEventListener("click", makeBet);

// Event listener per generare il QR Code
document.getElementById("generate-qr").addEventListener("click", generateQRCode);

// Inizializzazione
updateBalance();
