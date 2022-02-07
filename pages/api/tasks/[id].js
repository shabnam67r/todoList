import { db } from './index'

export default function handler(req, res) {
	if (req.query.id) {
		switch (req.method) {
			case 'GET': {
				let data = db.get('tasks')
				let index = data.findIndex((data) => data.id === parseInt(req.query.id))

				if (index > -1) {
					res.status(200).json(data[index])
				} else {
					res.status(404).json({ message: 'Not Found' })
				}

				break
			}
			case 'PATCH': {
				let data = db.get('tasks')
				let index = data.findIndex((data) => data.id === parseInt(req.query.id))

				if (index > -1) {
					if (req.body.title) data[index].title = req.body.title
					if (req.body.memo) data[index].memo = req.body.memo
					if (req.body.checked) data[index].checked = req.body.checked
					if (req.body.pinned) data[index].pinned = req.body.pinned

					db.set('tasks', data)
					res.status(200).json(data[index])
				} else {
					res.status(404).json({ message: 'Not Found' })
				}

				break
			}
			case 'DELETE': {
				let data = db.get('tasks')
				let index = data.findIndex((data) => data.id === parseInt(req.query.id))

				if (index > -1) {
					let response = data[index]
					data.splice(index, 1)
					db.set('tasks', data)
					res.status(200).json(response)
				} else {
					res.status(404).json({ message: 'Not Found' })
				}

				break
			}
			default:
				res.status(405).json({ message: 'Method Not Allowed' })
		}
	} else res.status(404).json({ message: 'Not Found' })
}
