"use client";

import { useEffect, useRef, useState } from "react";

import {
  Music2,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Search,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef(null);

  const [tracks, setTracks] = useState([]);

  const [currentTrack, setCurrentTrack] =
    useState(0);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [volume, setVolume] =
    useState(0.7);

  const [progress, setProgress] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

  const currentSong =
    tracks[currentTrack];


  /*
   * Fetch music
   */
  const fetchMusic = async (
    query = "lofi"
  ) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/music?query=${encodeURIComponent(
          query
        )}&limit=20`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Unable to fetch music"
        );
      }

      setTracks(data.tracks || []);

      setCurrentTrack(0);
      setProgress(0);
      setIsPlaying(false);
    } catch (error) {
      console.error(
        "Music fetch error:",
        error
      );

      setError(
        "Unable to load music right now."
      );
    } finally {
      setLoading(false);
    }
  };


  /*
   * Initial music
   */
  useEffect(() => {
    fetchMusic("lofi");
  }, []);


  /*
   * Volume
   */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);


  /*
   * Current song
   */
  useEffect(() => {
    const audio =
      audioRef.current;

    if (!audio || !currentSong) {
      return;
    }

    audio.pause();

    audio.src =
      currentSong.audio;

    audio.load();

    setProgress(0);

    setDuration(
      currentSong.duration || 0
    );

    if (isPlaying) {
      audio
        .play()
        .catch((error) => {
          console.error(
            "Play error:",
            error
          );

          setIsPlaying(false);
        });
    }
  }, [currentTrack]);


  /*
   * Audio events
   */
  useEffect(() => {
    const audio =
      audioRef.current;

    if (!audio) return;

    const handleTimeUpdate =
      () => {
        setProgress(
          audio.currentTime
        );
      };

    const handleLoadedMetadata =
      () => {
        if (
          audio.duration &&
          !Number.isNaN(
            audio.duration
          )
        ) {
          setDuration(
            audio.duration
          );
        }
      };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener(
      "timeupdate",
      handleTimeUpdate
    );

    audio.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata
    );

    audio.addEventListener(
      "play",
      handlePlay
    );

    audio.addEventListener(
      "pause",
      handlePause
    );

    return () => {
      audio.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );

      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

      audio.removeEventListener(
        "play",
        handlePlay
      );

      audio.removeEventListener(
        "pause",
        handlePause
      );
    };
  }, []);


  /*
   * Play / Pause
   */
  const togglePlay = async () => {
    const audio =
      audioRef.current;

    if (!audio || !currentSong) {
      return;
    }

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
      }
    } catch (error) {
      console.error(
        "Audio play error:",
        error
      );

      setIsPlaying(false);
    }
  };


  /*
   * Previous
   */
  const previousTrack = () => {
    if (!tracks.length) return;

    setCurrentTrack(
      (previous) =>
        previous === 0
          ? tracks.length - 1
          : previous - 1
    );

    setIsPlaying(true);
  };


  /*
   * Next
   */
  const nextTrack = () => {
    if (!tracks.length) return;

    setCurrentTrack(
      (previous) =>
        previous ===
        tracks.length - 1
          ? 0
          : previous + 1
    );

    setIsPlaying(true);
  };


  /*
   * Song ended
   */
  const handleEnded = () => {
    nextTrack();
  };


  /*
   * Seek
   */
  const handleSeek = (event) => {
    const value =
      Number(event.target.value);

    if (audioRef.current) {
      audioRef.current.currentTime =
        value;
    }

    setProgress(value);
  };


  /*
   * Search
   */
  const handleSearch = (event) => {
    event.preventDefault();

    const value =
      search.trim();

    if (!value) return;

    fetchMusic(value);
  };


  /*
   * Select song
   */
  const selectTrack = (index) => {
    setCurrentTrack(index);

    setProgress(0);

    setIsPlaying(true);
  };


  /*
   * Format time
   */
  const formatTime = (time) => {
    if (
      !time ||
      Number.isNaN(time)
    ) {
      return "0:00";
    }

    const minutes =
      Math.floor(time / 60);

    const seconds =
      Math.floor(time % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${seconds}`;
  };


  return (
    <section
      id="music-section"
      className="mt-6 scroll-mt-6"
    >

      <div className="rounded-3xl bg-white p-6 shadow-lg md:p-8">


        {/* AUDIO */}
        <audio
          ref={audioRef}
          onEnded={handleEnded}
          preload="metadata"
        />


        {/* HEADER */}
        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--lavender-soft)]">

              <Music2
                size={21}
                className="text-[var(--lavender-primary)]"
              />

            </div>

            <div>

              <h2 className="text-xl font-semibold text-[var(--lavender-dark)]">
                Study Music
              </h2>

              <p className="text-xs text-[var(--text-muted)]">
                Focus better with relaxing music
              </p>

            </div>

          </div>

        </div>


        {/* SEARCH */}
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-6 max-w-2xl"
        >

          <div className="flex items-center gap-3 rounded-2xl border border-[var(--lavender-light)] bg-[var(--lavender-soft)] px-4 py-3">

            <Search
              size={18}
              className="shrink-0 text-[var(--lavender-dark)]"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search music..."
              className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />

          </div>

        </form>


        {/* LOADING */}
        {loading && (

          <div className="flex min-h-[350px] flex-col items-center justify-center">

            <Loader2
              size={32}
              className="animate-spin text-[var(--lavender-primary)]"
            />

            <p className="mt-4 text-sm text-[var(--text-muted)]">
              Finding music...
            </p>

          </div>

        )}


        {/* ERROR */}
        {!loading &&
          error && (

            <div className="flex min-h-[350px] flex-col items-center justify-center text-center">

              <AlertCircle
                size={34}
                className="text-[var(--lavender-primary)]"
              />

              <p className="mt-4 text-sm font-medium">
                Music unavailable
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {error}
              </p>

            </div>

          )}


        {/* NO MUSIC */}
        {!loading &&
          !error &&
          tracks.length === 0 && (

            <div className="flex min-h-[350px] items-center justify-center">

              <p className="text-sm text-gray-400">
                No music found.
              </p>

            </div>

          )}


        {/* PLAYER */}
        {!loading &&
          !error &&
          currentSong && (

            <>

              <div className="mx-auto mt-7 max-w-2xl rounded-3xl bg-[var(--lavender-soft)] p-6">


                {/* ARTWORK */}
                <div className="flex flex-col items-center">

                  <div className="h-32 w-32 overflow-hidden rounded-2xl bg-white shadow-md">

                    {currentSong.artwork ? (

                      <img
                        src={
                          currentSong.artwork
                        }
                        alt={
                          currentSong.title
                        }
                        className={`h-full w-full object-cover ${
                          isPlaying
                            ? "scale-105"
                            : ""
                        }`}
                      />

                    ) : (

                      <div className="flex h-full w-full items-center justify-center">

                        <Music2
                          size={45}
                          className="text-[var(--lavender-primary)]"
                        />

                      </div>

                    )}

                  </div>


                  <h3 className="mt-5 max-w-md truncate text-center text-lg font-semibold text-gray-800">
                    {currentSong.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    {currentSong.artist}
                  </p>

                </div>


                {/* PROGRESS */}
                <div className="mt-7">

                  <input
                    type="range"
                    min="0"
                    max={
                      duration || 0
                    }
                    value={Math.min(
                      progress,
                      duration || 0
                    )}
                    onChange={
                      handleSeek
                    }
                    className="w-full accent-[var(--lavender-primary)]"
                  />

                  <div className="mt-1 flex justify-between text-[11px] text-gray-400">

                    <span>
                      {formatTime(
                        progress
                      )}
                    </span>

                    <span>
                      {formatTime(
                        duration
                      )}
                    </span>

                  </div>

                </div>


                {/* CONTROLS */}
                <div className="mt-5 flex items-center justify-center gap-5">

                  <button
                    onClick={
                      previousTrack
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--lavender-dark)] transition hover:bg-[var(--lavender-light)] active:scale-95"
                    aria-label="Previous"
                  >

                    <SkipBack
                      size={18}
                    />

                  </button>


                  <button
                    onClick={
                      togglePlay
                    }
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--lavender-primary)] text-white shadow-md transition hover:bg-[var(--lavender-dark)] active:scale-95"
                    aria-label={
                      isPlaying
                        ? "Pause"
                        : "Play"
                    }
                  >

                    {isPlaying ? (

                      <Pause size={23} />

                    ) : (

                      <Play
                        size={23}
                        className="ml-0.5"
                      />

                    )}

                  </button>


                  <button
                    onClick={
                      nextTrack
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--lavender-dark)] transition hover:bg-[var(--lavender-light)] active:scale-95"
                    aria-label="Next"
                  >

                    <SkipForward
                      size={18}
                    />

                  </button>

                </div>


                {/* VOLUME */}
                <div className="mx-auto mt-6 flex max-w-xs items-center gap-3">

                  {volume === 0 ? (

                    <VolumeX
                      size={18}
                      className="text-[var(--lavender-dark)]"
                    />

                  ) : (

                    <Volume2
                      size={18}
                      className="text-[var(--lavender-dark)]"
                    />

                  )}

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(event) =>
                      setVolume(
                        Number(
                          event.target.value
                        )
                      )
                    }
                    className="w-full accent-[var(--lavender-primary)]"
                  />

                </div>

              </div>


              {/* TRACK LIST */}
              <div className="mx-auto mt-6 max-w-2xl">

                <div className="mb-3 flex items-center justify-between">

                  <h3 className="text-sm font-semibold text-[var(--lavender-dark)]">
                    Focus Tracks
                  </h3>

                  <span className="text-xs text-gray-400">
                    {tracks.length} tracks
                  </span>

                </div>


                <div className="max-h-80 space-y-2 overflow-y-auto pr-1">

                  {tracks.map(
                    (track, index) => {

                      const active =
                        index ===
                        currentTrack;

                      return (

                        <button
                          key={
                            track.id
                          }
                          onClick={() =>
                            selectTrack(
                              index
                            )
                          }
                          className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${
                            active
                              ? "bg-[var(--lavender-light)]"
                              : "bg-[var(--lavender-soft)] hover:bg-[var(--lavender-light)]"
                          }`}
                        >

                          {/* IMAGE */}
                          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-white">

                            {track.artwork ? (

                              <img
                                src={
                                  track.artwork
                                }
                                alt=""
                                className="h-full w-full object-cover"
                              />

                            ) : (

                              <div className="flex h-full w-full items-center justify-center">

                                <Music2
                                  size={18}
                                  className="text-[var(--lavender-primary)]"
                                />

                              </div>

                            )}

                          </div>


                          {/* INFO */}
                          <div className="min-w-0 flex-1">

                            <p className="truncate text-sm font-medium text-gray-800">
                              {
                                track.title
                              }
                            </p>

                            <p className="truncate text-xs text-gray-400">
                              {
                                track.artist
                              }
                            </p>

                          </div>


                          {/* DURATION */}
                          <span className="shrink-0 text-xs text-gray-400">

                            {formatTime(
                              track.duration
                            )}

                          </span>

                        </button>

                      );
                    }
                  )}

                </div>

              </div>

            </>

          )}

      </div>

    </section>
  );
}