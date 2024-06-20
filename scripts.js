document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = document.getElementById("audio-player");
  const playPauseButton = document.querySelector(".play-pause");
  const playPauseIcon = document.querySelector(".play-pause span");
  const logoDot = document.querySelector(".logo-dot .logo-animation-wrapper");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const progressBar = document.getElementById("progress-bar");
  const titleBarcodeWrapper = document.querySelector(".title-barcode-wrapper");
  const titleBarcodeElement = document.querySelector(".title-barcode");

  const tracks = [
    {
      title: "Eye Lack Love",
      artist: "Likelybirds",
      album: "Eye Lack Love",
      artwork: [
        {
          src: "https://i.scdn.co/image/ab67616d00001e027181ac0e2d483231184cbad3",
          sizes: "150w",
          type: "image/jpeg",
        },
        {
          src: "https://i.scdn.co/image/ab67616d00001e027181ac0e2d483231184cbad3",
          sizes: "300w",
          type: "image/jpeg",
        },
        {
          src: "https://i.scdn.co/image/ab67616d0000b2737181ac0e2d483231184cbad3",
          sizes: "320w",
          type: "image/jpeg",
        },
        {
          src: "https://i.scdn.co/image/ab67616d0000b2737181ac0e2d483231184cbad3",
          sizes: "640w",
          type: "image/jpeg",
        },
      ],
      src: "assets/songs/Eye Lack Love.mp3",
    },
    // Add more tracks as needed
  ];

  let currentTrackIndex = 0;

  function loadTrack(index) {
    const track = tracks[index];
    const title = `${track.title} - ${track.artist}`;
    audioPlayer.src = track.src;
    audioPlayer.title = title;
    titleBarcodeElement.textContent = title;
    updateMediaSession(track);
    resetScrollAnimation();
  }

  function updateMediaSession(track) {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: track.artist,
        album: track.album,
        artwork: track.artwork,
      });

      navigator.mediaSession.setActionHandler("play", playTrack);
      navigator.mediaSession.setActionHandler("pause", pauseTrack);
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        currentTrackIndex =
          currentTrackIndex > 0 ? currentTrackIndex - 1 : tracks.length - 1;
        loadTrack(currentTrackIndex);
        playTrack();
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        currentTrackIndex =
          currentTrackIndex < tracks.length - 1 ? currentTrackIndex + 1 : 0;
        loadTrack(currentTrackIndex);
        playTrack();
      });
    }
  }

  function playTrack() {
    audioPlayer.play();
    playPauseIcon.textContent = "pause";
    logoDot.classList.add("animated");
    titleBarcodeElement.classList.add("animated");
    setScrollAnimation();
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = "playing";
    }
  }

  function pauseTrack() {
    audioPlayer.pause();
    playPauseIcon.textContent = "play_arrow";
    logoDot.classList.remove("animated");
    titleBarcodeElement.classList.remove("animated");
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = "paused";
    }
  }

  playPauseButton.addEventListener("click", function () {
    if (audioPlayer.paused) {
      playTrack();
    } else {
      pauseTrack();
    }
  });

  prevButton.addEventListener("click", function () {
    currentTrackIndex =
      currentTrackIndex > 0 ? currentTrackIndex - 1 : tracks.length - 1;
    loadTrack(currentTrackIndex);
    playTrack();
  });

  nextButton.addEventListener("click", function () {
    currentTrackIndex =
      currentTrackIndex < tracks.length - 1 ? currentTrackIndex + 1 : 0;
    loadTrack(currentTrackIndex);
    playTrack();
  });

  audioPlayer.addEventListener("ended", function () {
    currentTrackIndex =
      currentTrackIndex < tracks.length - 1 ? currentTrackIndex + 1 : 0;
    loadTrack(currentTrackIndex);
    playTrack();
  });

  // Update progress bar as audio plays
  audioPlayer.addEventListener("timeupdate", function () {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    if (!isNaN(duration)) {
      const progressPercent = (currentTime / duration) * 100;
      progressBar.value = progressPercent;
    }
  });

  // Seek audio
  progressBar.addEventListener("input", function () {
    const duration = audioPlayer.duration;
    if (!isNaN(duration)) {
      const newTime = (progressBar.value / 100) * duration;
      audioPlayer.currentTime = newTime;
    }
  });

  function setScrollAnimation() {
    const scrollAmount =
      titleBarcodeElement.scrollWidth - titleBarcodeWrapper.clientWidth;
    if (scrollAmount > 0) {
      titleBarcodeElement.style.setProperty(
        "--scroll-width",
        `-${scrollAmount}px`
      );
      const scrollSpeed = 10; // pixels per second
      const animationDuration = scrollAmount / scrollSpeed;
      titleBarcodeElement.style.animationDuration = `${animationDuration}s`;
    } else {
      titleBarcodeElement.classList.remove("animated");
    }
  }

  function resetScrollAnimation() {
    titleBarcodeElement.classList.remove("animated");
    titleBarcodeElement.style.animationName = "none";
    setTimeout(
      () => (titleBarcodeElement.style.animationName = "scroll-text"),
      10
    );
    setScrollAnimation();
  }

  // Load the first track initially
  loadTrack(currentTrackIndex);
});
