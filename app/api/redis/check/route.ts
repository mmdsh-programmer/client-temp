import { headers } from "next/headers";
import { NextResponse } from "next/server";

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const headersList = await headers();  
    const Authorization = headersList.get("Authorization");
    if (
      !Authorization ||
      Authorization.replace("Bearer ", "") !== process.env.API_TOKEN
    ) {
      return NextResponse.json(
        { message: "Client is not authorized" },
        { status: 401 }
      );
    }
    
    const client = await global.redisClient;

    const environment = {
      redisNode: process.env.REDIS_NODE,
      redisUser: process.env.REDIS_USER,
      redisPass: process.env.REDIS_PASS,
    };
    if (!client) {
      return NextResponse.json(
        { error: "Redis is not connected", environment },
        { status: 500 }
      );
    }

    // Check if connection is alive
    await client.set("ping", "pong");
    const ping = await client.get("ping");
    
    // Get basic server info
    const serverInfo = await client.info("server");
    const replicationInfo = await client.info("replication");
    const statsInfo = await client.info("stats");
    const memoryInfo = await client.info("memory");
    
    // Parse server info to determine Redis mode
    const redisMode = serverInfo.match(/redis_mode:(\w+)/)?.[1] || "standalone";
    
    let redisDetails: Record<string, unknown> = {
      status: "connected",
      ping,
      mode: redisMode,
      environment,
    };

    // Check if it's a cluster
    try {
      const clusterInfo = await client.sendCommand(["CLUSTER", "INFO"]);
      if (clusterInfo) {
        const clusterEnabled = clusterInfo.match(/cluster_state:(\w+)/)?.[1];
        
        if (clusterEnabled) {
          // Get cluster nodes information
          const clusterNodes = await client.sendCommand(["CLUSTER", "NODES"]);
          const clusterSlots = await client.sendCommand(["CLUSTER", "SLOTS"]);
          
          // Parse cluster info
          const clusterSize = clusterInfo.match(/cluster_size:(\d+)/)?.[1];
          const clusterKnownNodes = clusterInfo.match(/cluster_known_nodes:(\d+)/)?.[1];
          const clusterState = clusterInfo.match(/cluster_state:(\w+)/)?.[1];
          
          redisDetails = {
            ...redisDetails,
            type: "cluster",
            cluster: {
              state: clusterState,
              size: clusterSize,
              knownNodes: clusterKnownNodes,
              info: clusterInfo,
              nodes: clusterNodes,
              slots: clusterSlots,
            },
          };
        }
      }
    } catch (clusterError) {
      // Not a cluster, it's a standalone or replica instance
      
      // Parse replication info
      const role = replicationInfo.match(/role:(\w+)/)?.[1] || "unknown";
      const connectedSlaves = replicationInfo.match(/connected_slaves:(\d+)/)?.[1] || "0";
      const masterHost = replicationInfo.match(/master_host:([^\r\n]+)/)?.[1];
      const masterPort = replicationInfo.match(/master_port:(\d+)/)?.[1];
      const masterLinkStatus = replicationInfo.match(/master_link_status:(\w+)/)?.[1];
      
      // Parse server info
      const redisVersion = serverInfo.match(/redis_version:([^\r\n]+)/)?.[1];
      const os = serverInfo.match(/os:([^\r\n]+)/)?.[1];
      const arch = serverInfo.match(/arch_bits:(\d+)/)?.[1];
      const uptimeInSeconds = serverInfo.match(/uptime_in_seconds:(\d+)/)?.[1];
      
      // Parse memory info
      const usedMemory = memoryInfo.match(/used_memory_human:([^\r\n]+)/)?.[1];
      const usedMemoryPeak = memoryInfo.match(/used_memory_peak_human:([^\r\n]+)/)?.[1];
      const maxMemory = memoryInfo.match(/maxmemory_human:([^\r\n]+)/)?.[1];
      
      // Parse stats info
      const totalConnectionsReceived = statsInfo.match(/total_connections_received:(\d+)/)?.[1];
      const totalCommandsProcessed = statsInfo.match(/total_commands_processed:(\d+)/)?.[1];
      const opsPerSec = statsInfo.match(/instantaneous_ops_per_sec:(\d+)/)?.[1];
      
      redisDetails = {
        ...redisDetails,
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
      };
    }

    return NextResponse.json({ data: redisDetails });
  } catch (error) {
    console.error("Redis GET Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to connect to Redis", message: errorMessage },
      { status: 500 }
    );
  }
}
