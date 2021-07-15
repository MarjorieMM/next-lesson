import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
// import { useEffect } from "react";

const DUMMY_MEETUPS = [
	{
		id: "m1",
		title: "A First Meetup",
		image:
			"https://blog-assets.lightspeedhq.com/img/2021/03/acf42389-blog_successful-business-ideas-for-small-towns_1200x628.jpg",
		address: "5, some city",
		description: "This is a first meetup",
	},
	{
		id: "m2",
		title: "A Second Meetup",
		image:
			"https://blog-assets.lightspeedhq.com/img/2021/03/acf42389-blog_successful-business-ideas-for-small-towns_1200x628.jpg",
		address: "90, some city",
		description: "This is a second meetup",
	},
];
function HomePage(props) {
	// const [loadedMeetups, setLoadedMeetups] = useState([]);
	// useEffect(() => {
	// 	// send http request and fetch data
	// 	setLoadedMeetups(DUMMY_MEETUPS);
	// 	return () => {
	// 		cleanup;
	// 	};
	// }, []);
	// return <MeetupList meetups={loadedMeetups} />;
	return (
		<Fragment>
			<Head>
				<title>React Meetups</title>
				<meta
					name="description"
					content="Browse a huge list of highly active Reatc meetups"
				></meta>
			</Head>
			<MeetupList meetups={props.meetups} />
		</Fragment>
	);
}

// export async function getServerSideProps(context) {
// 	// will run for every request, for data which changes frequently
// 	const req = context.req;
// 	const res = context.res;
// 	//fetch data from an API
// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		},
// 	};
// }

export async function getStaticProps() {
	const client = await MongoClient.connect(
		"mongodb+srv://MarjorieM:NwuWYzoBfVemKoaR@cluster0.wf6qn.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = client.db();
	const meetupsCollection = db.collection("meetups");
	const meetups = await meetupsCollection.find().toArray();
	client.close();
	// fetch data from a database
	// always return an object
	return {
		props: {
			meetups: (await meetups).map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 10,
		// number of seconds next will wait until it will regenerate the page fpor an incoming request
	};
}
export default HomePage;
