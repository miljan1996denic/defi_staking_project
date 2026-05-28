const notesStore = require("../store/notesStore");
const asyncErrorHandler = require("../middlewares/helpers/asyncErrorHandler");

exports.createNote = asyncErrorHandler(async (req, res) => {
  const { title, content } = req.body;

  if (typeof title !== "string" || typeof content !== "string") {
    return res.status(400).json({ success: false, message: "Title and content are required" });
  }

  const trimmedTitle = title.trim();
  const trimmedContent = content.trim();
  if (!trimmedTitle || !trimmedContent) {
    return res.status(400).json({ success: false, message: "Title and content are required" });
  }

  const note = notesStore.create({ title: trimmedTitle, content: trimmedContent });
  console.log("[Notes] Created:", note);

  res.status(201).json({ success: true, note });
});

exports.getNotes = asyncErrorHandler(async (req, res) => {
  const notes = notesStore.getAll();
  res.status(200).json({ success: true, notes });
});

exports.getNote = asyncErrorHandler(async (req, res) => {
  const note = notesStore.getById(req.params.id);
  if (!note) {
    return res.status(404).json({ success: false, message: "Note not found" });
  }
  res.status(200).json({ success: true, note });
});

exports.updateNote = asyncErrorHandler(async (req, res) => {
  const { title, content } = req.body;

  if (typeof title !== "string" || typeof content !== "string") {
    return res.status(400).json({ success: false, message: "Title and content are required" });
  }

  const trimmedTitle = title.trim();
  const trimmedContent = content.trim();
  if (!trimmedTitle || !trimmedContent) {
    return res.status(400).json({ success: false, message: "Title and content are required" });
  }

  const note = notesStore.update(req.params.id, {
    title: trimmedTitle,
    content: trimmedContent,
  });

  if (!note) {
    return res.status(404).json({ success: false, message: "Note not found" });
  }

  console.log("[Notes] Updated:", note);
  res.status(200).json({ success: true, note });
});

exports.deleteNote = asyncErrorHandler(async (req, res) => {
  const deleted = notesStore.remove(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: "Note not found" });
  }

  console.log("[Notes] Deleted:", req.params.id);
  res.status(200).json({ success: true, message: "Note deleted" });
});
