window.vnStat = {
  // API

	api: "http://localhost:3000/api/vnstat.json.php",

	// Interfaces
	
	interfaces: [
		{ name: "en0+en1", title: "Network" },
		{ name: "en0", title: "Cable" },
		{ name: "en1", title: "Wi-Fi" }
	],

	// Themes

	themes: [
		{ title: "My Theme", file: "/my-themes/file.css" },
		{ title: "My Theme", file: "/my-themes/file.css", video: "/my-themes/video.mp4" },
	],
	
};
