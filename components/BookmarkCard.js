"use client";

export default function BookmarkCard({ bookmark, onDelete }) {
  const getDomain = (url) => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch (err) {
      return "unknown";
    }
  };

  const domain = getDomain(bookmark.url);
  const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  return (
    <div className="glass p-5 flex flex-col gap-4 hover:border-white/30 transition-all hover:scale-[1.01]">
      {/* Top */}
      <div className="flex items-start gap-3">
        <img
          src={favicon}
          alt="favicon"
          className="w-10 h-10 rounded-xl bg-white/10 p-2"
        />

        <div className="flex-1">
          <h3 className="text-lg font-semibold leading-tight">
            {bookmark.title}
          </h3>

          <p className="text-white/50 text-xs mt-1">{domain}</p>

          <a
            href={bookmark.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-300 hover:text-blue-200 underline break-all mt-2 inline-block"
          >
            {bookmark.url}
          </a>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <a
          href={bookmark.url}
          target="_blank"
          rel="noreferrer"
          className="btn-primary !min-w-[110px] !px-4 !py-2 text-sm"
        >
          Open
        </a>

        <button
          onClick={() => onDelete(bookmark.id)}
          className="btn-danger !px-4 !py-2 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
