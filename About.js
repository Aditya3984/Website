const events = [
  { title: "Art Competition", desc: "Annual competition for artists." },
  { title: "Sketchathon", desc: "Sketching marathon event." },
  { title: "Poster Making", desc: "Creative poster design event." },
  { title: "Exhibition", desc: "Showcase your artwork." },
  { title: "Workshop", desc: "Hands-on learning." }
];

const team = [
  { name: "Rohit Lohat", role: "Coordinator" },
  { name: "Aditya Kumar", role: "Web Designer" },
  { name: "Sam Chen", role: "Secretary" },
  { name: "Maya Patel", role: "Treasurer" }
];

const eventsContainer = document.getElementById("eventsContainer");
events.forEach(e => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `<h3>${e.title}</h3><p>${e.desc}</p>`;
  eventsContainer.appendChild(div);
});

const teamContainer = document.getElementById("teamContainer");
team.forEach(m => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <div class="avatar">${m.name.split(" ").map(n => n[0]).join("")}</div>
    <h3>${m.name}</h3>
    <p>${m.role}</p>`;
  teamContainer.appendChild(div);
});
