export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

async function handleResponse<T>(response: Response): Promise<T> {
  let data: { message?: string }
  try {
    data = await response.json()
  } catch {
    throw new Error(response.ok ? "Invalid response from server" : "Request failed")
  }
  if (!response.ok) {
    throw new Error(data.message || "Request failed")
  }
  return data as T
}

export async function fetchNotes(): Promise<Note[]> {
  const data = await handleResponse<{ success: boolean; notes: Note[] }>(
    await fetch(`${API_URL}/notes`)
  )
  return data.notes
}

export async function fetchNote(id: string): Promise<Note> {
  const data = await handleResponse<{ success: boolean; note: Note }>(
    await fetch(`${API_URL}/notes/${id}`)
  )
  return data.note
}

export async function createNote(title: string, content: string): Promise<Note> {
  const data = await handleResponse<{ success: boolean; note: Note }>(
    await fetch(`${API_URL}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    })
  )
  return data.note
}

export async function updateNote(id: string, title: string, content: string): Promise<Note> {
  const data = await handleResponse<{ success: boolean; note: Note }>(
    await fetch(`${API_URL}/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    })
  )
  return data.note
}

export async function deleteNote(id: string): Promise<void> {
  await handleResponse(await fetch(`${API_URL}/notes/${id}`, { method: "DELETE" }))
}
