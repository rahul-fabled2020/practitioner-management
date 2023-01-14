import { FilterQuery, QueryOptions } from "mongoose";
import { Session, SessionSchemaType } from "../models/Session";

export async function create(userId: string, refreshToken: string) {
  const session = await Session.findOne({ userId });

  if (!session) {
    return Session.create({ userId, refreshToken });
  }

  session.set({ userId, refreshToken });

  return session.save();
}

export function destroy(userId: string) {
  return Session.findOneAndDelete({ userId });
}

export function findOne(
  query: FilterQuery<SessionSchemaType>,
  options: QueryOptions = {}
) {
  return Session.findOne(query, {}, options);
}
