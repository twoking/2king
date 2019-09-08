const listButton = document.querySelector("[data-target=degree-filter]");
const degreeInputs = document.querySelectorAll(
	"#degree-filter input[type=checkbox]"
);
// const prependedComma = [", My List", ", 1st", ", 2nd", ", 3rd"];
// const appendedComma = ["My List, ", "1st, ", "2nd, ", "3rd, "];

// TODO: Clean up the the whole code in this file

const changeTextContent = (button, text) => {
	if (button.textContent) {
		button.textContent += `, ${text}`;
	} else {
		button.textContent += text;
	}
};

const removeButtonText = (button, text) => {
	const buttonTexts = button.textContent.split(", ");
	buttonTexts.splice(buttonTexts.indexOf(text), 1);
	button.textContent = "";
	buttonTexts.forEach(text => {
		if (text) {
			button.textContent += `${text}, `;
		}
	});

	if (button.textContent.endsWith(", ")) {
		button.textContent = button.textContent.substring(
			0,
			button.textContent.length - 2
		);
	}
};

const clearButtonText = button => {
	const inputsChecked = Array.from(degreeInputs).map(input => input.checked);
	if (inputsChecked.includes(true)) {
		button.textContent = button.textContent.replace("add a filter", "");
	} else {
		button.textContent = "add a filter";
	}
};

degreeInputs.forEach(input => {
	input.addEventListener("click", e => {
		const target = e.currentTarget;
		clearButtonText(listButton);
		if (target.checked) {
			if (target.id === "user-list") {
				changeTextContent(listButton, "My List");
			} else if (target.id === "first-degree") {
				changeTextContent(listButton, "1st");
			} else if (target.id === "second-degree") {
				changeTextContent(listButton, "2nd");
			} else if (target.id === "third-degree") {
				changeTextContent(listButton, "3rd");
			}
		} else {
			if (target.id === "user-list") {
				removeButtonText(listButton, "My List");
			} else if (target.id === "first-degree") {
				removeButtonText(listButton, "1st");
			} else if (target.id === "second-degree") {
				removeButtonText(listButton, "2nd");
			} else if (target.id === "third-degree") {
				removeButtonText(listButton, "3rd");
			}
		}
	});
});
