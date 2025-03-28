async function getUserMedia(audio = true, video = true) {
  let currentStream;
  try {
    currentStream = await navigator.mediaDevices.getUserMedia({ audio, video });
  } catch (error) {
    console.log(error);
    try {
      currentStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
    } catch {
      currentStream = new MediaStream();
    }
  }
  return currentStream;
}

async function getDeviceMedia(audio = true, video = true) {
  let currentStream;
  try {
    currentStream = await navigator.mediaDevices.getDisplayMedia({
      audio,
      video,
    });
  } catch (error) {
    console.log(error);
    try {
      currentStream = await navigator.mediaDevices.getDeviceMedia({
        audio: true,
        video: false,
      });
    } catch {
      currentStream = new MediaStream();
    }
  }
  return currentStream;
}

export { getDeviceMedia, getUserMedia };
