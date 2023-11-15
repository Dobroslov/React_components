export const getNewURL = () => {
	const url = new URL(window.location.href);
	const searchParams = new URLSearchParams(url.search);
	searchParams.delete('details');
	url.search = searchParams.toString();
	const modifiedURL = url.toString();
	window.history.replaceState({}, document.title, modifiedURL);
};
