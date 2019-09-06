import { callRestaurantFilter } from "./map-filter";

const $panel = $(".panel");
const $toggler = $(".toggler");
const $filterNav = $("#bottom-nav-filter");
const $homeNav = $("#bottom-nav-home");
const $listToggle = $("[data-target=degree-filter]");
const $friendToggle = $("[data-target=friend-filter]");
const $allFriendsToggle = $(".all-friends-toggler");
const $friends = document.querySelectorAll(".friend-filter");
const $triangle = $("#triangle");

// maybe need refactoring

// Gray or Blue box on the nav tabs
const navTabStyle = (e, friend, list) => {
	if (e.currentTarget === list[0]) {
		friend[0].classList.add("text-secondary");
		friend[0].parentElement.classList.add("btn-home-gray");
		list[0].classList.remove("text-secondary");
		list[0].parentElement.classList.remove("btn-home-gray");
	} else {
		list[0].classList.add("text-secondary");
		list[0].parentElement.classList.add("btn-home-gray");
		friend[0].classList.remove("text-secondary");
		friend[0].parentElement.classList.remove("btn-home-gray");
	}
};

$toggler.on("click", function(e) {
	e.preventDefault();
	const $target = $("#" + this.dataset.target).addClass("active");
	$panel.not($target).removeClass("active");

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
