import fs from "node:fs";

const API_KEY = process.env.YT_API_KEY;
if (!API_KEY) {
  console.error("❌ Missing YT_API_KEY environment variable");
  process.exit(1);
}

// MAIN CHANNEL ONLY: ぷろたん日記
const CHANNEL_IDS = [
  "UCl4e200EZm7NXq_iaYSXfeg",
];

async function yt(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function getUploadsPlaylistId(channelId) {
  const data = await yt(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${API_KEY}`
  );
  return data.items[0].contentDetails.relatedPlaylists.uploads;
}

async function getAllPlaylistItems(playlistId) {
  let pageToken = "";
  const all = [];

  while (true) {
    const data = await yt(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}&pageToken=${pageToken}&key=${API_KEY}`
    );

    for (const it of data.items) {
      all.push({
        videoId: it.contentDetails.videoId,
        title: it.snippet.title,
        publishedAt: it.snippet.publishedAt,
        channelTitle: it.snippet.channelTitle,
      });
    }

    if (!data.nextPageToken) break;
    pageToken = data.nextPageToken;
  }

  return all;
}

(async () => {
  const uploads = await getUploadsPlaylistId(CHANNEL_IDS[0]);
  const videos = await getAllPlaylistItems(uploads);

  fs.mkdirSync("public", { recursive: true });
  fs.writeFileSync(
    "public/videos.json",
    JSON.stringify(videos, null, 2)
  );

  console.log(`✅ Done! Total videos: ${videos.length}`);
})();

