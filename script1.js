const start = document.getElementById("startscreen");
const stop = document.getElementById("stopscreen");
const video = document.querySelector("video");
let recorderscreen, streamscreen;

async function startRecordingscreen() {
  streamscreen = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: "screen" }
  });
  recorderscreen = new MediaRecorder(streamscreen);

  const chunks = [];
  recorderscreen.ondataavailable = e => chunks.push(e.data);
  recorderscreen.onstop = e => {
    const completeBlob = new Blob(chunks, { type: chunks[0].type });
    video.src = URL.createObjectURL(completeBlob);
  };

  recorderscreen.start();
}

start.addEventListener("click", () => {
  start.setAttribute("disabled", true);
  stop.removeAttribute("disabled");

  startRecordingscreen();
});

stop.addEventListener("click", () => {
  stop.setAttribute("disabled", true);
  start.removeAttribute("disabled");

  recorderscreen.stop();
  streamscreen.getVideoTracks()[0].stop();
});
