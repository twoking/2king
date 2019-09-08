const listButton = document.querySelector("[data-target=degree-filter]");
const degreeInputs = document.querySelectorAll(
	"#degree-filter input[type=checkbox]"
);
// const prependedComma = [", My List", ", 1st", ", 2nd", ", 3rd"];
// const appendedComma = ["My List, ", "1st, ", "2nd, ", "3rd, "];

// TODO: Clean up the the whole code in this file

// Add the newly activated input to the button text
const changeTextContent = (button, text) => {
	// If button text is NOT 'add a filter'
	if (button.textContent === "add a filter") {
		button.textContent = text;
	} else {
		button.textContent += `, ${text}`;
	}
};

// Remove button text if it was activated beforehand
const removeButtonText = (button, text) => {
	// Get current button text from DOM
	const buttonTexts = button.textContent.split(", ");
	// Remove input that was de-activated from *buttonTexts*
	buttonTexts.splice(buttonTexts.indexOf(text), 1);
	// Clear out current button text from DOM
	button.textContent = "";
	buttonTexts.forEach(text => {
		// Check if text is not empty string
		if (text) {
			// Add activated inputs to the DOM
			button.textContent += `${text}, `;
		}
	});

	// Don't show trailing comma and space
	if (button.textContent.endsWith(", ")) {
		button.textContent = button.textContent.substring(
			0,
			button.textContent.length - 2
		);
	}
};

const clearButtonText = button => {
	// If button text is empty, replace with 'add a filter'
	if (!button.textContent) {
		button.textContent = "add a filter";
	}
};

degreeInputs.forEach(input => {
	input.addEventListener("click", e => {
		const target = e.currentTarget;
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

		clearButtonText(listButton);
	});
});
