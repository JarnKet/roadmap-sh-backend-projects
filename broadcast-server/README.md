# 📡 Broadcast Server

> **A real-time WebSocket-based broadcast server that allows multiple clients to send and receive messages simultaneously**

## 🎯 Project Overview

This is a CLI-based broadcast server implementation using WebSocket technology. The server can handle multiple client connections and broadcast messages from any client to all connected clients in real-time. It's perfect for understanding real-time communication, WebSocket protocols, and building chat-like applications.

## ✨ Features

- **Real-time Broadcasting**: Messages sent by any client are instantly broadcasted to all connected clients
- **Multiple Client Support**: Handle unlimited concurrent connections
- **CLI Interface**: Easy-to-use command-line interface for both server and client
- **Connection Management**: Automatic client connection/disconnection handling
- **Error Handling**: Robust error handling for network issues
- **Interactive Client**: User-friendly prompt-based message input

## 🛠️ Technologies Used

- **Node.js**: Runtime environment
- **WebSocket (ws)**: Real-time communication protocol
- **Express.js**: Web framework
- **Yargs**: Command-line argument parsing
- **Readline**: Interactive command-line interface

## 📁 Project Structure

```
broadcast-server/
├── index.js       # Main CLI entry point
├── server.js      # WebSocket server implementation
├── client.js      # WebSocket client implementation
├── package.json   # Dependencies and scripts
└── README.md      # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **pnpm**

### Installation

1. **Navigate to the project directory**
   ```bash
   cd broadcast-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Make the CLI globally available (optional)**
   ```bash
   npm link
   ```

## 💻 Usage

### Starting the Server

Open a terminal and run:

```bash
node index.js start
```

You should see:
```
🚀  Broadcast server started on ws://localhost:8080
```

The server will start listening on port 8080 for WebSocket connections.

### Connecting Clients

Open **additional terminal windows** (one for each client) and run:

```bash
node index.js connect
```

You should see:
```
✅  Connected to the broadcast server.
Type your message and press Enter to broadcast.
```

### Sending Messages

Once connected as a client:

1. Type any message and press **Enter**
2. The message will be broadcasted to **all connected clients**
3. You'll see messages from other clients in real-time

Example interaction:
```
> Hello everyone!
📢  Broadcast: Hello everyone!
📢  Broadcast: Hi there! (from another client)
> How is everyone doing?
📢  Broadcast: How is everyone doing?
```

### Exiting

- **Server**: Press `Ctrl+C` to stop the server
- **Client**: Press `Ctrl+C` or close the terminal to disconnect

## 🎮 Demo Scenario

1. **Terminal 1** - Start the server:
   ```bash
   node index.js start
   ```

2. **Terminal 2** - Connect first client:
   ```bash
   node index.js connect
   ```

3. **Terminal 3** - Connect second client:
   ```bash
   node index.js connect
   ```

4. **Terminal 4** - Connect third client:
   ```bash
   node index.js connect
   ```

Now type messages in any client terminal and watch them appear in all other client terminals instantly!

## 🏗️ How It Works

### Server Architecture

1. **WebSocket Server**: Creates a WebSocket server on port 8080
2. **Client Management**: Uses a `Set` to track all connected clients
3. **Message Broadcasting**: When a message is received from any client, it's sent to all connected clients
4. **Connection Handling**: Automatically adds new clients and removes disconnected ones

### Client Architecture

1. **WebSocket Connection**: Connects to the server at `ws://localhost:8080`
2. **Interactive Interface**: Uses `readline` for user input
3. **Message Display**: Shows incoming broadcasts with proper formatting
4. **Error Handling**: Handles connection errors and server disconnections

## 🔧 Configuration

### Changing the Port

To change the default port (8080), modify the `PORT` constant in `server.js`:

```javascript
const PORT = 3000; // Change to your desired port
```

Also update the client connection URL in `client.js`:

```javascript
const serverAddress = 'ws://localhost:3000'; // Match your new port
```

### Remote Connections

To allow remote connections, you can modify the server address in `client.js`:

```javascript
const serverAddress = 'ws://your-server-ip:8080';
```

## 🧪 Testing

### Manual Testing

1. Start the server
2. Connect multiple clients from different terminals
3. Send messages from different clients
4. Verify all clients receive all messages
5. Disconnect clients and verify the server handles it gracefully

### Load Testing

You can test with many clients by running multiple instances:

```bash
# Run this command in multiple terminals
for i in {1..10}; do node index.js connect & done
```

## 🚨 Error Handling

The application handles various error scenarios:

- **Server not running**: Client shows connection error
- **Client disconnection**: Server removes client from active list  
- **Network issues**: Both server and client log appropriate error messages
- **Invalid commands**: CLI shows help information

## 🔍 Learning Objectives

This project teaches:

- **WebSocket Protocol**: Understanding real-time communication
- **Event-Driven Programming**: Handling connection and message events
- **CLI Development**: Building command-line applications with Node.js
- **Connection Management**: Tracking and managing multiple client connections
- **Real-time Broadcasting**: Implementing message distribution systems
- **Error Handling**: Managing network and connection errors

## 🎯 Possible Extensions

- **User Authentication**: Add login system
- **Private Messages**: Direct messaging between specific clients
- **Chat Rooms**: Multiple broadcast channels
- **Message History**: Store and replay recent messages
- **File Sharing**: Broadcast file attachments
- **Web Interface**: Add a web-based client interface
- **Message Encryption**: Secure message transmission

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```
   Error: listen EADDRINUSE: address already in use :::8080
   ```
   **Solution**: Change the port number or kill the process using port 8080

2. **Cannot connect to server**
   ```
   Connection error: connect ECONNREFUSED 127.0.0.1:8080
   ```
   **Solution**: Make sure the server is running before connecting clients

3. **Module not found**
   ```
   Error: Cannot find module 'ws'
   ```
   **Solution**: Run `npm install` to install dependencies

## 📚 Related Roadmap.sh Projects

- **Chat Application**: Extend this to build a full chat app
- **Real-time Collaboration**: Use for collaborative editing
- **Live Notifications**: Implement real-time notification system

## 🤝 Contributing

Feel free to contribute by:
- Adding new features
- Improving error handling
- Adding tests
- Enhancing documentation
- Fixing bugs

---

**Happy Broadcasting! 📡**
