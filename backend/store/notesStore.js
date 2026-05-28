const { v4: uuidv4 } = require("uuid");

const notes = new Map();

function getAll() {
  return Array.from(notes.values());
}

function getById(id) {
  return notes.get(id) ?? null;
}

function create({ title, content }) {
  const now = new Date().toISOString();
  const note = {
    id: uuidv4(),
    title,
    content,
    createdAt: now,
    updatedAt: now,
  };
  notes.set(note.id, note);
  return note;
}

function update(id, { title, content }) {
  const note = notes.get(id);
  if (!note) return null;

  if (title !== undefined) note.title = title;
  if (content !== undefined) note.content = content;
  note.updatedAt = new Date().toISOString();
  return note;
}

function remove(id) {
  return notes.delete(id);
}

module.exports = { getAll, getById, create, update, remove };
