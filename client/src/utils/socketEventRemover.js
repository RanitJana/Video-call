export default function socketEventRemover(
  socket,
  listeners = [["", () => {}]]
) {
  listeners.forEach(([event, handler]) => {
    socket.off(event, handler);
  });
}
