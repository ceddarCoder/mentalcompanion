// import mongoose from 'mongoose';

// if (!process.env.MONGODB_URI) {
//     throw new Error('Please add your MONGODB_URI to .env.local');
// }

// const MONGODB_URI: string = process.env.MONGODB_URI;

// interface GlobalMongoose {
//     conn: typeof mongoose | null;
//     promise: Promise<typeof mongoose> | null;
// }

// declare global {
//     var mongoose: GlobalMongoose | undefined;
// }

// const cached: GlobalMongoose = global.mongoose || {
//     conn: null,
//     promise: null,
// };

// if (!global.mongoose) {
//     global.mongoose = cached;
// }

// async function dbConnect(): Promise<typeof mongoose> {
//     if (cached.conn) {
//         return cached.conn;
//     }

//     if (!cached.promise) {
//         const opts = {
//             bufferCommands: true,
//             maxConnecting: 10,
//         };

//         cached.promise = mongoose.connect(MONGODB_URI, opts)
//             .then((mongoose) => {
//                 return mongoose;
//             });
//     }

//     try {
//         cached.conn = await cached.promise;
//     } catch (e) {
//         cached.promise = null;
//         throw e;
//     }

//     return cached.conn;
// }

// export default dbConnect;

// lib/mongodb.ts
import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your MONGODB_URI to .env.local');
}

const MONGODB_URI: string = process.env.MONGODB_URI;

interface GlobalMongoose {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongoose: GlobalMongoose | undefined;
}

const cached: GlobalMongoose = global.mongoose || {
    conn: null,
    promise: null,
};

if (!global.mongoose) {
    global.mongoose = cached;
}

async function dbConnect(): Promise<typeof mongoose> {
    if (cached.conn) {
        console.log('Using cached MongoDB connection');
        return cached.conn;
    }

    if (!cached.promise) {
        console.log('Creating new MongoDB connection');
        const opts: mongoose.ConnectOptions = {
            bufferCommands: true,
            maxPoolSize: 10,
            minPoolSize: 2,
            socketTimeoutMS: 30000,
            serverSelectionTimeoutMS: 5000,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts)
            .then((mongoose) => {
                console.log('MongoDB connected successfully!');
                return mongoose;
            })
            .catch((err) => {
                console.error('MongoDB connection error:', err);
                throw err;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;