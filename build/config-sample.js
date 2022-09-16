window.vnStat = {

	// How units are prefixed
	// IEC = standard prefixes (KiB and Kibit/s) (default)
	// JEDEC = binary prefixes (KB and Kbit/s)
	// SI = decimal prefixes (kB and kbit/s)

	units: "IEC",

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
