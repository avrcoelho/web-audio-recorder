export default class Recorder {
  constructor() {
    this.audioType = "audio/webm;codecs=opus";
    this.mediaRecorder = {};
    this.recordedBlobs = [];
  }

  _setupe() {
    const options = { mineType: this.audioType };
    const isSupported = MediaRecorder.isTypeSupported(options.mineType);

    if (!isSupported) {
      const message = `the codec: ${options.mineType} ins´t supported!`;
      alert(message);

      throw new Error(message);
    }

    return options;
  }

  startRecording(stream) {
    const options = this._setupe();
    this.mediaRecorder = new MediaRecorder(stream, options);

    this.mediaRecorder.onstop = (event) => {
      console.log("Recorded Blobs", this.recordedBlobs);
    };

    this.mediaRecorder.ondataavailable = (event) => {
      if (!event.data || !event.data.size) return;

      this.recordedBlobs.push(event.data);
    };

    this.mediaRecorder.start();

    console.log("Media recorded started", this.mediaRecorder);
  }

  async stopRecording() {
    if (this.mediaRecorder.state === "inactive") return;

    this.mediaRecorder.stop();
    console.log("Media recorded stoped");
  }

  getRecordingURL() {
    const blob = new Blob(this.recordedBlobs, { type: this.audioType });

    return window.URL.createObjectURL(blob);
  }
}
