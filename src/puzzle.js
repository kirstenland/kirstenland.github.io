const colours = ["green", "yellow", "amber", "red"];

const puzzle = [
    [[0 , "F"], [2 , "T"], ["", "E"], [8 , "F"]],
    [[1, "L"], ["", "O"], [11, "G"], ["", "S"]],
    [["", "O"], [5 , "U"], ["", "V"], [9 , "A"]],
    [[5 , "T"], ["", "S"], [7 , "I"], [4 , "M"]],
]

table = document.getElementById("to-insert-rows");

let colorSelectors = [];
puzzle.forEach((row) => {
    const tr = document.createElement("tr");
    row.forEach((item) => {
        const [number, letter] = item
        const td = document.createElement("td");

        // add letters
        const letterDiv = document.createElement("div");
        letterDiv.classList.add("letter")
        letterDiv.append(document.createTextNode(letter));
        td.append(letterDiv);

        td.append(document.createTextNode(number));

        // add colour selectors
        const colorSelector = document.createElement("div");
        colorSelector.classList.add("color-selector");
        colours.forEach((colour) => {
            const div = document.createElement("div");
            div.classList.add(colour);
            div.classList.add("select-square");
            div.addEventListener("click", () => selectColour(colour, td))
            colorSelector.append(div);
        })
        td.append(colorSelector);
        colorSelectors.push(colorSelector);

        td.addEventListener("click", () => showSecrets(colorSelector));

        tr.appendChild(td);
    });
    table.appendChild(tr);
});

const handleSubmit = (event) => {
    event.preventDefault();
    const answer = event.target.querySelector('input').value;
    return checkAnswer(answer).then(isCorrect => {
        if (isCorrect) {
            giveFeedback(`Yay you got it, the answer was ${answer}.`, true);
        } else {
            giveFeedback(`Oops, that's not quite right, ${answer} is not the correct answer.`, false);
        }
    });
};

const giveFeedback = (feedback, isCorrect) => {
    const feedbackParagraph = document.getElementById("feedback");
    feedbackParagraph.innerText = feedback;
    if (isCorrect) {
        feedbackParagraph.classList.add('correct');
    } else {
        feedbackParagraph.classList.remove('correct');
    }
}

console.log(document.getElementById('check-answer'))
document.getElementById('check-answer').addEventListener('submit', (event) => handleSubmit(event))

const showSecrets = (chosenSelector) => {
    const alreadyShown = chosenSelector.classList.contains("show");
    colorSelectors.forEach((selector) => {
        selector.classList.remove("show");
    })
    if (!alreadyShown) {
        chosenSelector.classList.add("show");
    }
}

const selectColour = (chosenColour, chosenCell) => {
    const alreadyColoured = chosenCell.classList.contains(chosenColour);
    colours.forEach((colour) => chosenCell.classList.remove(colour));
    if (!alreadyColoured) {
        chosenCell.classList.add(chosenColour);
    }
}

async function digest(answer) {
    const msgUint8 = new TextEncoder().encode(answer);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function checkAnswer(answer) {
    const digestedAnswer = await digest(answer.toUpperCase()) 
    return digestedAnswer == "4223bc8c6aa931c2ff6c33bf4abed36edb7bb3b220691803d07538fd1529439f";
}
