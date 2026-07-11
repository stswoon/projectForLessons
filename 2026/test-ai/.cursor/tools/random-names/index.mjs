const args = Object.fromEntries(
    process.argv.slice(2).map(arg => {
      const [k, v] = arg.replace(/^--/, "").split("=");
      return [k, v];
    })
  );
  
  const count = Math.min(Number(args.count || 5), 100);
  
  const response = await fetch(
    `https://randomuser.me/api/?results=${count}`
  );
  
  if (!response.ok) {
    console.error("API unavailable");
    process.exit(1);
  }
  
  const data = await response.json();
  
  const names = data.results.map(
    p => `${p.name.first} ${p.name.last}`
  );
  
  console.log(JSON.stringify({ names }, null, 2));