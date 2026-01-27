import { headers } from "next/headers";
import { NextResponse } from "next/server";

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const headersList = await headers();
    const Authorization = headersList.get("Authorization");
    if (!Authorization || Authorization.replace("Bearer ", "") !== process.env.API_TOKEN) {
      return NextResponse.json({}, { status: 404 });
    }

    const client = await global.redisClient;

    const environment = {
      redisNode: process.env.REDIS_NODE,
      redisUser: process.env.REDIS_USER,
      redisPass: process.env.REDIS_PASS,
    };
    if (!client) {
      return NextResponse.json({ error: "Redis is not connected", environment }, { status: 500 });
    }

    // Check if connection is alive
    // These commands are key-based, so they work on both
    // standalone and cluster clients.
    await client.set("ping", "pong");
    const ping = await client.get("ping");

    let redisDetails: Record<string, unknown> = {
      status: "connected",
      ping,
      environment,
    };

    if (typeof client.getMasters === "function") {
      // --- CLUSTER CLIENT LOGIC ---

      // Get the list of master nodes
      const masters = client.getMasters();
      if (!masters || masters.length === 0) {
        throw new Error("Redis cluster client is connected but has no master nodes.");
      }

      // Pick one master node to run admin commands on.
      // We must use its underlying .client object.
      const adminClient = masters[0].client;

      // Now, run admin commands on that specific node's client
      const clusterInfo = await adminClient.sendCommand(["CLUSTER", "INFO"]);
      const clusterNodes = await adminClient.sendCommand(["CLUSTER", "NODES"]);
      const clusterSlots = await adminClient.sendCommand(["CLUSTER", "SLOTS"]);

      // Parse cluster info
      const clusterState = clusterInfo.match(/cluster_state:(\w+)/)?.[1];
      const clusterSize = clusterInfo.match(/cluster_size:(\d+)/)?.[1];
      const clusterKnownNodes = clusterInfo.match(/cluster_known_nodes:(\d+)/)?.[1];

      redisDetails = {
        ...redisDetails,
        mode: "cluster",
        type: "cluster",
        cluster: {
          state: clusterState,
          size: clusterSize,
          knownNodes: clusterKnownNodes,
          info: clusterInfo.toString(), // Convert buffer to string if needed
          nodes: clusterNodes.toString(),
          slots: clusterSlots.toString(),
        },
      };
    } else {
      // --- STANDALONE CLIENT LOGIC ---

      // It's a standard client, so we can safely run INFO commands
      const serverInfo = await client.sendCommand(["INFO", "server"]);
      const replicationInfo = await client.sendCommand(["INFO", "replication"]);
      const statsInfo = await client.sendCommand(["INFO", "stats"]);
      const memoryInfo = await client.sendCommand(["INFO", "memory"]);

      // (Your original parsing logic for standalone is perfect)
      const redisMode = serverInfo.match(/redis_mode:(\w+)/)?.[1] || "standalone";
      const role = replicationInfo.match(/role:(\w+)/)?.[1] || "unknown";
      // ... (rest of your parsing logic) ...

      // (Pasting the rest of your parsing for completeness)
      const connectedSlaves = replicationInfo.match(/connected_slaves:(\d+)/)?.[1] || "0";
      const masterHost = replicationInfo.match(/master_host:([^\r\n]+)/)?.[1];
      const masterPort = replicationInfo.match(/master_port:(\d+)/)?.[1];
      const masterLinkStatus = replicationInfo.match(/master_link_status:(\w+)/)?.[1];
      const redisVersion = serverInfo.match(/redis_version:([^\r\n]+)/)?.[1];
      const os = serverInfo.match(/os:([^\r\n]+)/)?.[1];
      const arch = serverInfo.match(/arch_bits:(\d+)/)?.[1];
      const uptimeInSeconds = serverInfo.match(/uptime_in_seconds:(\d+)/)?.[1];
      const usedMemory = memoryInfo.match(/used_memory_human:([^\r\n]+)/)?.[1];
      const usedMemoryPeak = memoryInfo.match(/used_memory_peak_human:([^\r\n]+)/)?.[1];
      const maxMemory = memoryInfo.match(/maxmemory_human:([^\r\n]+)/)?.[1];
      const totalConnectionsReceived = statsInfo.match(/total_connections_received:(\d+)/)?.[1];
      const totalCommandsProcessed = statsInfo.match(/total_commands_processed:(\d+)/)?.[1];
      const opsPerSec = statsInfo.match(/instantaneous_ops_per_sec:(\d+)/)?.[1];

      // const isWhitelisted = await client.sismember("white-list-ip", "123");
      const isWhitelisted = await client.sendCommand(["SISMEMBER", "white-list-ip", "123"]);
      
      redisDetails = {
        ...redisDetails,
        mode: redisMode, // Added mode here
        type: role === "master" ? "standalone-master" : "standalone-replica",
        server: {
          version: redisVersion,
          os,
          architecture: `${arch}-bit`,
          uptimeSeconds: uptimeInSeconds,
        },
        replication: {
          role,
          connectedSlaves,
          ...(masterHost && {
            master: {
              host: masterHost,
              port: masterPort,
              linkStatus: masterLinkStatus,
            },
          }),
        },
        memory: {
          used: usedMemory,
          peak: usedMemoryPeak,
          max: maxMemory || "unlimited",
        },
        stats: {
          totalConnections: totalConnectionsReceived,
          totalCommands: totalCommandsProcessed,
          opsPerSecond: opsPerSec,
        },
        isWhitelisted
      };
    }

    return NextResponse.json({ data: redisDetails });
  } catch (error) {
    console.error("Redis GET Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to connect to Redis", message: errorMessage },
      { status: 500 },
    );
  }
}
