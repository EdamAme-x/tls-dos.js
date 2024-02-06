import nodeTls from "npm:node-tls";
import net from "node:net";

const tls = nodeTls.tls;

// create TLS client
let socket = new net.Socket();

let client = tls.createConnection({
  server: false,
  verify: function (
    connection: any,
    verified: boolean,
    depth: number,
    certs: any[],
  ) {
    console.log("[tls] server certificate verified");
    return true;
  },
  connected: function (connection: any) {
    console.log("[tls] connected");
    client.prepare("GET / HTTP/1.0\r\n\r\n");
  },
  tlsDataReady: function (connection: any) {
    let data = connection.tlsData.getBytes();
    socket.write(data, "binary");
  },
  dataReady: function (connection: any) {
    // skip
  },
  closed: function () {
    console.log("[tls] disconnected");
  },
  error: function (connection: any, error: string) {
    console.log("[tls] error", error);
  },
});

socket.on("connect", function () {
  console.log("[socket] connected");
  client.handshake();
});
socket.on("data", function (data) {
  client.process(data.toString("binary")); // encoding should be 'binary'
});
socket.on("end", function () {
  console.log("[socket] disconnected");
});

// connect to google.com
socket.connect(443, "google.com");
