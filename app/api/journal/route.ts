// app/api/journal/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

// Replace with your MongoDB connection string
const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function GET(req: NextRequest) {
  try {
    await client.connect();
    const database = client.db('health');
    const collection = database.collection('journal-entries');

    const entries = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json(entries);
  } catch (error) {
    console.error('Error fetching entries:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, mood } = body;

    await client.connect();
    const database = client.db('health');
    const collection = database.collection('journal-entries');

    const newEntry = {
      content,
      mood,
      createdAt: new Date().toISOString(),
      userId: 'placeholder-user-id', // Replace with actual user ID from auth
    };

    const result = await collection.insertOne(newEntry);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating entry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function PUT(req: NextRequest) {
    try {
      const body = await req.json();
      const { id, content, mood } = body;
  
      // Validate input data
      if (!id || !content || !mood) {
        return NextResponse.json(
          { error: 'ID, content, and mood are required' },
          { status: 400 }
        );
      }
  
      // Connect to MongoDB
      await client.connect();
      const database = client.db('health');
      const collection = database.collection('journal-entries');
  
      // Update the journal entry
      const updateResult = await collection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            content,
            mood,
            updatedAt: new Date().toISOString(),
          },
        }
      );
  
      // Check if the update was successful
      if (updateResult.matchedCount === 0) {
        return NextResponse.json(
          { message: 'Journal entry not found' },
          { status: 404 }
        );
      }
  
      return NextResponse.json({ message: 'Journal entry updated successfully' });
    } catch (error) {
      console.error('Error updating entry:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
      await client.close();
    }
  }
  

export async function DELETE(req: NextRequest) {
    try {
      const { searchParams } = req.nextUrl;
      const id = searchParams.get('id'); // Extracting the id from the query string
  
      if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
      }
  
      await client.connect();
      const database = client.db('health');
      const collection = database.collection('journal-entries');
  
      const deleteResult = await collection.deleteOne({
        _id: new ObjectId(id),
      });
  
      if (deleteResult.deletedCount === 1) {
        return NextResponse.json({ message: 'Journal entry deleted successfully' });
      } else {
        return NextResponse.json({ message: 'Journal entry not found' }, { status: 404 });
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
      await client.close();
    }
  }
  