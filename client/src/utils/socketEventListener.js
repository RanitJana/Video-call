export default function socketEventListener(
  socket,
  listeners = [["", () => {}]]
) {
  listeners.forEach(([event, handler]) => {
    socket.on(event, handler);
  });
}
