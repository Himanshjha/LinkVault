"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import AddBookmarkForm from "@/components/AddBookmarkForm";
import BookmarkCard from "@/components/BookmarkCard";
import { createBookmark, listenToBookmarks, removeBookmark } from "@/lib/bookmarks";
import SortDropdown from "@/components/SortDropdown";


export default function Home() {
  const { user, booting } = useAuth();

  const [bookmarks, setBookmarks] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest"); // latest | oldest | az

  useEffect(() => {
    if (!user) {
      setBookmarks([]);
      return;
    }

    const unsub = listenToBookmarks(user.uid, (data) => {
      setBookmarks(data);
    });

    return () => unsub();
  }, [user]);

  const handleAddBookmark = async ({ title, url }) => {
    await createBookmark({
      uid: user.uid,
      title,
      url,
    });
  };

  const handleDelete = async (id) => {
    await removeBookmark({ uid: user.uid, bookmarkId: id });
  };

  const filteredBookmarks = useMemo(() => {
    let list = [...bookmarks];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.url.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "latest") {
      list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } else if (sortBy === "oldest") {
      list.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    } else if (sortBy === "az") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [bookmarks, search, sortBy]);

  if (booting) {
    return (
      <div className="h-screen flex justify-center items-center text-white/70">
        <div className="glass px-6 py-4 text-lg font-semibold">
          Loading LinkVault...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-10 py-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Navbar />

        {/* Hero Card */}
        <div className="glass rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">🚀 Welcome to LinkVault</h2>
            <p className="text-white/70 mt-2 max-w-xl">
              Save your important links securely. Your bookmarks are private and sync in real-time.
            </p>
          </div>

          <div className="text-sm text-white/60">
            <p className="font-semibold text-white/80">
              Total Bookmarks: {bookmarks.length}
            </p>
            <p className="text-white/50">Private to your account</p>
          </div>
        </div>

        {!user ? (
          <div className="glass rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold">🔒 Login Required</h2>
            <p className="text-white/60 mt-2">
              Please sign in with Google to manage your bookmarks.
            </p>
          </div>
        ) : (
          <>
            <AddBookmarkForm onAdd={handleAddBookmark} />

            {/* Search + Sort */}
<div className="glass rounded-2xl p-5 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
  <div className="flex-1">
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="🔍 Search bookmarks by title or URL..."
      className="input"
    />
  </div>

  <div className="flex items-center gap-3">
    <span className="text-sm text-white/60 hidden md:block">
      Sort:
    </span>

    <SortDropdown value={sortBy} onChange={setSortBy} />
  </div>
</div>

            {/* Bookmark List */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold">
                📌 Your Bookmarks ({filteredBookmarks.length})
              </h2>

              {filteredBookmarks.length === 0 ? (
                <div className="glass rounded-2xl p-10 text-center text-white/70">
                  <h3 className="text-lg font-bold mb-2">No bookmarks found</h3>
                  <p className="text-white/60">
                    Try searching with another keyword or add a new bookmark 🚀
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredBookmarks.map((b) => (
                    <BookmarkCard
                      key={b.id}
                      bookmark={b}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        <footer className="text-center text-white/40 text-sm py-6">
          Built with ❤️ using Next.js + Firebase | LinkVault © 2026
        </footer>
      </div>
    </div>
  );
}
