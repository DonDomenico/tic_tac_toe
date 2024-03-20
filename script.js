let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = 'circle';


function init() {
    render();
}

function render() {
    const tableDiv = document.getElementById('table');

    // Generate table HTML
    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateCrossSVG();
            }
            tableHtml += `<td onclick="handleClick(this, ${index})">${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';

    // Set table HTML to tableDiv
    tableDiv.innerHTML += tableHtml;
}

function handleClick(cell, index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        cell.onclick = null;
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
    }
    console.log(checkWinner());
}

function checkWinner() {
    // Überprüfen der horizontalen Reihen
    for (let i = 0; i < 3; i++) {
        if (fields[i * 3] && fields[i * 3] === fields[i * 3 + 1] && fields[i * 3] === fields[i * 3 + 2]) {
            let winningCombo = [i*3, i*3+1, i*3+2];
            drawWinningLine(winningCombo);
            return fields[i];
        }
    }

    // Überprüfen der vertikalen Reihen
    for (let i = 0; i < 3; i++) {
        if (fields[i] && fields[i] === fields[i + 3] && fields[i] === fields[i + 6]) {
            let winningCombo = [i, i+3, i+6];
            drawWinningLine(winningCombo);
            return fields[i];
        }
    }

    // Überprüfen der Diagonalen
    if (fields[0] && fields[0] === fields[4] && fields[0] === fields[8]) {
        let winningCombo = [0, 4, 8];
        drawWinningLine(winningCombo);
        return fields[0];
    }
    if (fields[2] && fields[2] === fields[4] && fields[2] === fields[6]) {
        let winningCombo = [2, 4, 6];
        drawWinningLine(winningCombo);
        return fields[2];
    }

    // Wenn kein Gewinner gefunden wurde
    return null;
}

function drawWinningLine(winningCombo) {
    const cellSize = 100; // Größe eines Zellenfeldes

    // Bestimme Start- und Endkoordinaten der Linie basierend auf der Gewinnkombination
    const startX = (winningCombo[0] % 3 + 0.5) * cellSize; // X-Koordinate des ersten Feldes in der Mitte
    const startY = (Math.floor(winningCombo[0] / 3)) * cellSize; // Y-Koordinate des ersten Feldes in der Mitte
    const endX = (winningCombo[2] % 3 + 0.5) * cellSize; // X-Koordinate des letzten Feldes am rechten Rand
    const endY = (Math.floor(winningCombo[2] / 3) + 1) * cellSize; // Y-Koordinate des letzten Feldes in der Mitte

    // Erzeuge SVG-Element für die Linie
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', `0 0 ${cellSize * 5} ${cellSize * 5}`);

    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', startX);
    line.setAttribute('y1', startY);
    line.setAttribute('x2', endX);
    line.setAttribute('y2', endY);
    line.setAttribute('stroke', 'white'); // Ändere die Linienfarbe zu weiß
    line.setAttribute('stroke-width', '5');

    svg.appendChild(line);

    // Füge das SVG-Element dem Container hinzu
    const mainContent = document.getElementById('main-content');
    mainContent.appendChild(svg);
}

function generateCircleSVG() {
    const width = 70;
    const height = 70;
    const strokeWidth = 10;
    const radius = (width - strokeWidth) / 2;
    const centerX = width / 2;
    const centerY = height / 2;

    const animationDuration = 0.5; // in Sekunden
    const dashArray = 2 * Math.PI * radius;
    
    const svgCode = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="${centerX}" cy="${centerY}" r="${radius}" stroke="lightblue" stroke-width="${strokeWidth}" fill="none" stroke-dasharray="${dashArray}" stroke-dashoffset="${dashArray}">
                            <animate attributeName="stroke-dashoffset" begin="0s" dur="${animationDuration}s" values="${dashArray};0" repeatCount="1" fill="freeze" />
                        </circle>
                    </svg>`;

    return svgCode;
}

function generateCrossSVG() {
    const width = 80; // Breite auf 80px geändert
    const height = 80;
    const animationDuration = 0.5; // in Sekunden

    const svgCode = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                        <line id="line1" x1="10" y1="10" x2="70" y2="70" stroke="gold" stroke-width="10">
                            <animate attributeName="x2" from="10" to="70" dur="${animationDuration}s" fill="freeze" />
                            <animate attributeName="y2" from="10" to="70" dur="${animationDuration}s" fill="freeze" />
                        </line>
                        <line id="line2" x1="70" y1="10" x2="10" y2="70" stroke="gold" stroke-width="10">
                            <animate attributeName="x2" from="70" to="10" dur="${animationDuration}s" fill="freeze" />
                            <animate attributeName="y2" from="10" to="70" dur="${animationDuration}s" fill="freeze" />
                        </line>
                    </svg>`;

    return svgCode;
}

function addSymbolsToPlayerIcons() {
    const circleSvg = generateCircleSVG();
    const crossSvg = generateCrossSVG();
    const playerIconsContainer = document.getElementById("player-icons");
    playerIconsContainer.innerHTML = circleSvg + crossSvg;
}