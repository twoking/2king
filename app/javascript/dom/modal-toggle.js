const modalToggler = document.getElementById("modal-toggler");
const toggleModal = toggler => {
	document.addEventListener("DOMContentLoaded", () => {
		toggler.click();
	});
};

// If app is run on non-PWA, run everything
if (!window.matchMedia("(display-mode: standalone)").matches) {
	if (!localStorage.visited) {
		localStorage.visited = 0;
		toggleModal(modalToggler);
	}

	if (modalToggler && !navigator.userAgent.includes("Mobile")) {
		if (Number(localStorage.visited) === 4) {
			toggleModal(modalToggler);
			localStorage.visited = 0;
		}

		localStorage.visited = Number(localStorage.visited) + 1;
	}
}
