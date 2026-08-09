import { NextResponse } from "next/server";

const API_URL =
  "https://api.freetouse.com/v3/music/tracks/search";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const query =
      searchParams.get("query") || "lofi";

    const limit = searchParams.get("limit") || "20";

    const url = new URL(API_URL);

    url.searchParams.set("query", query);
    url.searchParams.set("limit", limit);
    url.searchParams.set("order", "plays");
    url.searchParams.set("sort", "desc");

    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Free To Use API Error: ${response.status}`
      );
    }

    const data = await response.json();

    if (!data.ok) {
      throw new Error(
        data.error || "Music API request failed"
      );
    }

    const tracks = (data.data || [])
      .filter((track) => track.files?.mp3)
      .map((track) => ({
        id: track.id,

        title: track.title,

        artist:
          track.artists?.[0]?.[1]?.name ||
          "Unknown Artist",

        genre: track.genre || "Focus",

        duration: track.duration || 0,

        artwork:
          track.thumbnails?.md ||
          track.thumbnails?.sm ||
          null,

        audio: track.files.mp3,

        plays: track.plays || 0,

        likes: track.likes || 0,

        premium: track.is_premium || false,

        tags:
          track.tags?.map((tag) => tag[1]) || [],
      }));

    return NextResponse.json({
      success: true,

      count: tracks.length,

      tracks,
    });
  } catch (error) {
    console.error("Music API Error:", error);

    return NextResponse.json(
      {
        success: false,

        error:
          error.message ||
          "Unable to fetch music",
      },
      {
        status: 500,
      }
    );
  }
}