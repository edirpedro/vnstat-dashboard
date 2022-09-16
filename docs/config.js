window.vnStat = {

	// How units are prefixed
	// IEC = standard prefixes (KiB and KiB/s) (default)
	// JEDEC = binary prefixes (KB and KB/s)
	// SI = decimal prefixes (kB and kbit/s)

	units: "IEC",

  // API
  
	api: "/vnstat-dashboard/api/demo.json",

	// Interfaces
	
	interfaces: [
		{ name: "en0", title: "Network" }
	]

};
