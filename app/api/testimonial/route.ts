import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("portfolio");
        const testimonials = await db
            .collection("testimonials")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json(testimonials, { status: 200 });
    } catch (error) {
        console.error("Testimonial fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch testimonials" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const { name, role, message, rating } = await request.json();

        // Validate required fields
        if (!name || !role || !message || !rating) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("portfolio");

        const testimonial = {
            name,
            role,
            message,
            rating: Number(rating),
            createdAt: new Date(),
        };

        const result = await db.collection("testimonials").insertOne(testimonial);

        return NextResponse.json(
            {
                message: "Testimonial submitted successfully! Thank you for your feedback.",
                testimonial: { ...testimonial, _id: result.insertedId }
            },
        );
    } catch (error) {
        console.error("Testimonial submission error:", error);
        return NextResponse.json(
            { error: "Failed to submit testimonial" },
            { status: 500 }
        );
    }
}
