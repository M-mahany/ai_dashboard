// lib/socket.ts
import { io, Socket } from "socket.io-client";

let socket = null;

export function getSocket() {
    if (!socket) {
        socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000", {
            query: {
                clientType: "dashboard",
            },
            transports: ["websocket"],
        });
    }
    return socket;
}
