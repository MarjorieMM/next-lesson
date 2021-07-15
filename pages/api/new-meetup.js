// /api/new-meetup
// only POST requests
import { MongoClient } from "mongodb";
// NwuWYzoBfVemKoaR

async function handler(req, res) {
	if (req.method === "POST") {
		const data = req.body;
		// const { title, image, address, description } = data;

		const client = await MongoClient.connect(
			"mongodb+srv://MarjorieM:NwuWYzoBfVemKoaR@cluster0.wf6qn.mongodb.net/meetups?retryWrites=true&w=majority"
		);
		const db = client.db();
		const meetupsCollection = db.collection("meetups");
		const result = await meetupsCollection.insertOne(data);
		console.log(result);
		// add error handling
		client.close();
		res.status(201).json({ message: "Meetup inserted successfully" });
	}
}

export default handler;
