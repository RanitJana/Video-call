class VADProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.silenceStart = currentTime;
    this.silenceThreshold = 1.0; // seconds
    this.volumeThreshold = 0.05; // Adjust as needed
  }

  process(inputs) {
    const input = inputs[0][0];
    if (!input) return true;

    let sum = 0;
    for (let i = 0; i < input.length; i++) {
      sum += input[i] * input[i];
    }
    const volume = Math.sqrt(sum / input.length);

    if (volume > this.volumeThreshold) {
      this.silenceStart = currentTime;
      this.port.postMessage("speech");
    } else if (currentTime - this.silenceStart > this.silenceThreshold) {
      this.port.postMessage("silence");
    }

    return true;
  }
}

export default registerProcessor("vad-processor", VADProcessor);
