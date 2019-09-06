const modalToggler = document.getElementById("modal-toggler");
if (modalToggler && !navigator.userAgent.includes("Mobile")) {
	document.addEventListener("DOMContentLoaded", () => {
		modalToggler.click();
	});
}
