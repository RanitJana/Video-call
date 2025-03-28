class PeerService {
  constructor() {
    this.peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun4.l.google.com:19302",
            "stun:stun4.l.google.com:5349",
          ],
        },
        {
          urls: ["turn:13.250.13.83:3478?transport=udp"],
          username: "YzYNCouZM1mhqhmseWk6",
          credential: "YzYNCouZM1mhqhmseWk6",
        },
      ],
    });
  }

  async getAnswer(offer) {
    if (this.peer) {
      await this.peer.setRemoteDescription(offer);

      const ans = await this.peer.createAnswer();
      await this.peer.setLocalDescription(ans);

      return ans;
    }
  }

  async setRemoteDescription(ans) {
    if (
      this.peer.signalingState == "have-remote-offer" ||
      this.peer.signalingState == "stable"
    )
      return;
    await this.peer.setRemoteDescription(ans);
  }

  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(offer);
      return offer;
    }
  }

  async setICEcandidate(candidate) {
    if (this.peer.connectionState == "closed") return;
    await this.peer.addIceCandidate(candidate);
  }

  closeConnection() {
    if (this.peer) {
      this.peer.getSenders().forEach((sender) => {
        if (sender.track) sender.track.stop();
      });
      this.peer.getReceivers().forEach((receiver) => {
        if (receiver.track) receiver.track.stop();
      });

      this.peer.close();

      this.peer.ontrack = null;
      this.peer.onicecandidate = null;
      this.peer.onnegotiationneeded = null;
    }
  }
}

export default PeerService;
