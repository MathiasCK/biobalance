/**
 * Home settings controller
 */

// Creating settings state
const settings = new Observable({
	stickySections: true,
});

document.addEventListener('DOMContentLoaded', () => {
	const poppers = Popper('.popper');
	// Settings popper
	const { target: settingsPopperElm, hide: hideSettings } = poppers[0];
	const stickySectionToggle = settingsPopperElm.querySelector(
		'input[type="checkbox"]'
	);

	// When user toggles sticky scroll - update state
	stickySectionToggle.click();

	stickySectionToggle.addEventListener('change', function (e) {
		settings.set((prevSettings) => ({
			...prevSettings,
			stickySections: e.target.checked,
		}));
		hideSettings();
	});
});

// Listening to settings changes
settings.subscribe(({ stickySections }) => {
	// Disable or enable sticky sections
	const sections = document.querySelectorAll('.sticky-section');
	sections.forEach(
		(s) => (s.style.position = stickySections ? 'sticky' : 'relative')
	);
});
