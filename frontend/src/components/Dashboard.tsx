import { useEffect, useState } from "react"
import actions from "../api"

export default function Dashboard() {

	const getThePosts = async () => {
		let res = await actions.getAllPosts().catch(console.error)
		console.log(res)
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		let res = actions.addPost(post).catch(console.error)
		console.log(res)
	}

	let [post, setPost] = useState('')

	useEffect(() => {
		getThePosts()
	}, [])

	return (<>
		<div>Dashboard</div>
		<form onSubmit={handleSubmit}>
			<input onChange={e => setPost(e.target.value)} type="text" placeholder="Add a Post"></input>
		</form>

	</>)
}