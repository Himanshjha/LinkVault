"use client";

import { useState } from "react";

export default function AddBookmarkForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !url.trim()) {
      alert("Please enter both title and URL.");
      return;
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      alert("URL must start with http:// or https://");
      return;
    }

    await onAdd({ title: title.trim(), url: url.trim() });
    setTitle("");
    setUrl("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass rounded-2xl p-5 space-y-4"
    >
      <h2 className="text-xl font-bold">➕ Add New Bookmark</h2>

      <input
        className="input"
        placeholder="Bookmark title (e.g. LeetCode)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="input"
        placeholder="Bookmark URL (https://...)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button type="submit" className="btn-primary">
        Save Bookmark
      </button>
    </form>
  );
}
