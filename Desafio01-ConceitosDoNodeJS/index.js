const express = require("express");

const server = express();
server.use(express.json());

const projects = [];
let countRequests = 0;

server.use((req, res, next) => {
  countRequests++;
  console.log(countRequests);

  return next();
});

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const locatedPproject = projects.find(p => p.id == id);

  if (!locatedPproject) {
    return res.status(400).json({ message: "Project not fount" });
  }

  return next();
}

server.post("/projects", (req, res) => {
  const { id, title, tasks } = req.body;

  const obj = {
    id: id,
    title: title,
    tasks: tasks ? tasks : []
  };

  projects.push(obj);
  return res.json(obj);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const idx = projects.findIndex(p => p.id == id);

  projects.splice(idx, 1);

  return res.send();
});

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const locatedProject = projects.find(p => p.id == id);

  locatedProject.tasks.push(title);

  return res.json(locatedProject);
});

server.listen(3000);
