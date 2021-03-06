import { callRestaurantFilter } from "./map-filter";

const $panel = $(".panel");
const $toggler = $(".toggler");
const $filterNav = $("#bottom-nav-filter");
const $homeNav = $("#bottom-nav-home");
const $listToggle = $("[data-target=degree-filter]");
const $friendToggle = $("[data-target=friend-filter]");
const $allFriendsToggle = $(".all-friends-toggler");
const $friends = document.querySelectorAll(".friend-filter");
const $degrees = document.querySelectorAll(".restaurant-filter");
const $triangle = $("#triangle");

// maybe need refactoring
const addStyle = navToggler => {
	navToggler[0].classList.add("text-secondary");
	navToggler[0].parentElement.classList.add("btn-home-gray");
};

const removeStyle = navToggler => {
	navToggler[0].classList.remove("text-secondary");
	navToggler[0].parentElement.classList.remove("btn-home-gray");
};

// Gray or Blue box on the nav tabs
const navTabStyle = (e, friend, list) => {
	if (e.currentTarget === list[0]) {
		addStyle(friend);
		removeStyle(list);
	} else {
		addStyle(list);
		removeStyle(friend);
	}
};

// Uncheck inactive tabs and the label's style
const uncheckAndRemoveClass = items => {
	items.forEach(item => {
		item.checked = false;
		item.nextElementSibling.classList.remove("font-weight-bold");
	});
};

const disableOtherFilter = e => {
	const { parentElement } = e.currentTarget;
	const { firstElementChild } =
		parentElement.previousElementSibling || parentElement.nextElementSibling;

	if (e.currentTarget.dataset.target === "friend-filter") {
		// Special case for Connection tab text
		console.log(firstElementChild);
		firstElementChild.textContent = "add a filter";
		// Call the function with an empty array, so the map clears the degree-filtered places
		callRestaurantFilter([]);
		uncheckAndRemoveClass($degrees);
	} else {
		// Gray the triangle
		$triangle[0].classList.remove("blue-triangle");
		// Call the function with an empty array, so the map clears the friend-filtered places
		callRestaurantFilter([]);
		uncheckAndRemoveClass($friends);
	}
};

$toggler.on("click", function(e) {
	e.preventDefault();
	const $target = $("#" + this.dataset.target).addClass("active");
	$panel.not($target).removeClass("active");

	disableOtherFilter(e);

	navTabStyle(e, $friendToggle, $listToggle);

	$filterNav.removeClass("active");
	$homeNav.addClass("active");
});

$homeNav.on("click", function(e) {
	$filterNav.addClass("active");
	$homeNav.removeClass("active");

	$panel.slice(1).removeClass("active");
	$panel.first().addClass("active");
});

if ($allFriendsToggle) {
	const activeFriends = {};
	$allFriendsToggle.on("click", e => {
		e.preventDefault();
		// Initialize empty array to push friend ids into
		activeFriends.friendIds = [];
		$triangle[0].classList.toggle("blue-triangle");

		// If triangle is on, call restaurant filter function with the ID's of all friends
		if ($triangle[0].classList.contains("blue-triangle")) {
			$friends.forEach(friend => {
				friend.checked = true;
				friend.nextElementSibling.classList.add("font-weight-bold");
				activeFriends.friendIds.push(friend.value);
			});
		} else {
			// If not, turn off all friends
			$friends.forEach(friend => {
				friend.checked = false;
				friend.nextElementSibling.classList.remove("font-weight-bold");
			});
		}
		callRestaurantFilter(activeFriends);
	});
}

$friends.forEach(friend => {
	friend.addEventListener("click", e => {
		const triangleOn = $triangle[0].classList.contains("blue-triangle");
		// Gray triangle if any one of the input is inactive
		if (triangleOn && !e.currentTarget.checked) {
			$triangle[0].classList.remove("blue-triangle");
		}

		const checkedFriends = [];
		Array.from($friends).map(friend => {
			checkedFriends.push(friend.checked);
		});

		// Check if every input is active, add blue triangle if yes
		if (checkedFriends.every(ele => ele)) {
			$triangle[0].classList.add("blue-triangle");
		}
	});
});
