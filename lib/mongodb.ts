import { MongoClient } from 'mongodb';

const isDevelopment = process.env.NODE_ENV === 'development';
const uri = process.env.MONGODB_URI || (isDevelopment ? 'mongodb://localhost:27017/' : undefined);
const options = {};

if (!uri) {
    throw new Error('MONGODB_URI is not set. Configure it in your deployment environment.');
}

// Declare global type for MongoDB client promise
declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
