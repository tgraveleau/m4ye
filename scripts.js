document.addEventListener('DOMContentLoaded', function() {
  const audioPlayer = document.getElementById("audio-player");
  const playPauseButton = document.querySelector(".play-pause");
  const playPauseIcon = document.querySelector(".play-pause span");
  const logoDot = document.querySelector(".logo-dot .logo-animation-wrapper");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const titleBarcodeElement = document.querySelector(".title-barcode");

  const tracks = [
    {
      title: "Eye Lack Love - Likelybirds",
      src: "assets/songs/Eye Lack Love.mp3",
    },
    {
      title: "2_Artist_Name-Song_Title_2",
      src: "your-song-url-2.mp3",
    },
    // Add more tracks as needed
  ];

  let currentTrackIndex = 0;

  function loadTrack(index) {
    const track = tracks[index];
    audioPlayer.src = track.src;
    titleBarcodeElement.textContent = track.title;
  }

  function playTrack() {
    audioPlayer.play();
    playPauseIcon.textContent = "pause";
    logoDot.classList.add("animated");
    titleBarcodeElement.classList.add("animated");
  }

  function pauseTrack() {
    audioPlayer.pause();
    playPauseIcon.textContent = "play_arrow";
    logoDot.classList.remove("animated");
    titleBarcodeElement.classList.remove("animated");
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

  // Load the first track initially
  loadTrack(currentTrackIndex);
});
