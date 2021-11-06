import { locationLogger } from "@fridgespy/logging";
import { Request, Response } from "express";

export interface SSEClient {
  id: string;
  res: Response;
}
let subscribers: SSEClient[] = [];
const clients = () => {
  const add = (client: SSEClient): void => {
    subscribers.push(client);
  };

  const remove = (id: string): void => {
    subscribers = subscribers.filter((client) => client.id !== id);
  };

  const getById = (id: string): SSEClient[] => {
    const clients = subscribers.filter((sub) => sub.id.includes(id));
    return clients;
  };

  const getAll = (): SSEClient[] => {
    return subscribers;
  };

  return { add, remove, getById, getAll };
};

export const setupSSE = (req: Request, res: Response) => {
  // Set the headers needed for SSE
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };

  if (req && !req.user) {
    res
      .status(401)
      .send("You're not authorized to do that, nice try though...");
    return;
  }

  res.writeHead(200, headers);

  // The client id is the current date, and the user id combined, to facilitate multiple subscriptions from multiple devices
  const clientId = Date.now() + req.user.id;

  // Create the subscriber object
  const newSubscriber = {
    id: clientId,
    res,
  };

  // Add the client to the list of clients, to store the reference for later
  clients().add(newSubscriber);

  // On the close event, remove the client from the array
  res.on("close", () => {
    clients().remove(newSubscriber.id);
    res.end();
  });
};

export const publishClientEvent = async <T>(
  customerId: string,
  data: T
): Promise<void> => {
  // Find the clients that need to be notified
  const clientsToPublishTo = clients().getById(customerId);

  // Async push the messages to the clients
  for await (const client of clientsToPublishTo) {
    // Sending data to all the clients
    try {
      client.res.write(`data: ${JSON.stringify(data)}\n\n`);
    } catch (err) {
      locationLogger.error(err);
      continue;
    }
  }

  // At the end, just return
  return;
};
